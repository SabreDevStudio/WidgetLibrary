define([
        'lodash'
        , 'moment'
        , 'widgets/searchForm/TravelDatesFlexibilitySelectionMode'
        , 'datamodel/search/alternateDates/PlusMinusDaysTravelDatesFlexibility'
        , 'widgets/WidgetGlobalCallbacks'
    ],
    function (
        _
        , moment
        , TravelDatesFlexibilitySelectionMode
        , PlusMinusDaysTravelDatesFlexibility
        , WidgetGlobalCallbacks
    ) {
        'use strict';

        function SearchFormDrv (DateService, $timeout) {
            return {
                templateUrl: '../widgets/view-templates/widgets/SearchFormWidget.tpl.html',
                controller: 'SearchFormCtrl',
                scope: {
                    selectableAirportsForThisPosOnly: '@'
                    , selectableAirportsDictionary: '@'
                    , newSearchCriteriaCallback: '&?'
                    , showDiversityOptions: '@?'
                },
                link: function (scope, element) {

                    var DEFAULT_LENGTH_OF_STAY = 14;
                    var DEFAULT_ADVANCE_PURCHASE_DAYS = 14;

                    scope.optionalFields = ['BagsRequested']

                    parseFieldsToHide();

                    parseOptionalFieldsToShow();

                    parseSearchOptionsDefaults();

                    parseAdvancedDateFlexibilityOptions();

                    calculateTravelDatesDefaults();

                    setUpTravelDatesOnChangeListeners();

                    scheduleDeferredElementsLoad();

                    WidgetGlobalCallbacks.linkComplete(scope, element);

                    function parseFieldsToHide() {
                        scope.fieldsToHide = element.attr('hide-fields') && element.attr('hide-fields').split(',') || [];
                    }

                    function parseOptionalFieldsToShow() {
                        scope.optionalFieldsToShow = element.attr('show-optional-fields') && element.attr('show-optional-fields').split(',') || [];
                    }

                    function parseSearchOptionsDefaults() {
                        scope.optionsPerDay = parseInt(element.attr('options-per-day'));

                        var checkboxesToBeSetAsChecked = element.attr('set-checkboxes-as-checked') && element.attr('set-checkboxes-as-checked').split(',') || [];
                        checkboxesToBeSetAsChecked.forEach(function (checkbox) {
                            scope.generalSearchCriteria[checkbox] = true;
                        });
                    }

                    function calculateTravelDatesDefaults() {
                        scope.earliestTravelStart = DateService.now().startOf('day').toDate();

                        scope.simpleTrip.DepartureDate = DateService.now().startOf('day').add(DEFAULT_ADVANCE_PURCHASE_DAYS, 'days').toDate();
                        scope.simpleTrip.EarliestDepartureDate = DateService.now().startOf('day').add(DEFAULT_ADVANCE_PURCHASE_DAYS, 'days').toDate();

                        scope.simpleTrip.ReturnDate = moment(scope.simpleTrip.DepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                        scope.simpleTrip.LatestReturnDate = moment(scope.simpleTrip.EarliestDepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                    }

                    function setUpTravelDatesOnChangeListeners() {
                        var returnDateWasEverChanged = false;
                        var latestReturnDateWasEverChanged = false;

                        scope.onDepartureDateChange = function () {
                            if (!returnDateWasEverChanged) {
                                scope.simpleTrip.ReturnDate = moment(scope.simpleTrip.DepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                            }
                        };

                        scope.onEarliestDepartureDateChange = function () {
                            if (!latestReturnDateWasEverChanged) {
                                scope.simpleTrip.LatestReturnDate = moment(scope.simpleTrip.EarliestDepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                            }
                        };

                        scope.onReturnDateChange = function () {
                            returnDateWasEverChanged = true;
                        };

                        scope.onLatestReturnDateChange = function () {
                            latestReturnDateWasEverChanged = true;
                        };
                    }

                    function parseAdvancedDateFlexibilityOptions() {
                        /*jshint maxcomplexity:7 */
                        var advancedDateFlexibilityCriteriaToShow = element.attr('show-date-flexibility-criteria') && element.attr('show-date-flexibility-criteria').split(',').map(_.trim) || [];
                        scope.flexDatesMode = new TravelDatesFlexibilitySelectionMode(advancedDateFlexibilityCriteriaToShow);

                        var preselectedFlexDatesMode = element.attr('preselect-date-flexibility-criterion');
                        if (preselectedFlexDatesMode) {
                            scope.flexDatesMode.activeMode = preselectedFlexDatesMode;
                        }

                        // prepare model structures for various date flexibility options:
                        if (scope.flexDatesMode.isSelectableBy('plusMinusVariableDaysFlexibility')) {
                            var plusMinusDaysMaxDaysArg = parseInt(element.attr('plus-minus-days-flexibility-max-days'));
                            if (_.isFinite(plusMinusDaysMaxDaysArg)) {
                                scope.plusMinusDaysMaxDays = plusMinusDaysMaxDaysArg;
                            }

                            var DEFAULT_DATE_FLEXIBILITY_REQUESTED = 3;
                            scope.advancedDateFlexibility = new PlusMinusDaysTravelDatesFlexibility({
                                departureMinusDays: DEFAULT_DATE_FLEXIBILITY_REQUESTED
                                , departurePlusDays: DEFAULT_DATE_FLEXIBILITY_REQUESTED
                                , returnMinusDays: DEFAULT_DATE_FLEXIBILITY_REQUESTED
                                , returnPlusDays: DEFAULT_DATE_FLEXIBILITY_REQUESTED
                            });
                        }

                        if (scope.flexDatesMode.isSelectableByEarliestDepartureLatestReturn()) {

                            scope.departureDaysOfWeek = {
                                selected: []
                            };
                            scope.returnDaysOfWeek = {
                                selected: []
                            };

                            scope.daysOfWeekAtDestination = {
                                selected: []
                            };
                        }
                    }

                    function scheduleDeferredElementsLoad() {
                        //performance optimization fo form load time: loading date pickers in deferred mode, saving 50ms
                        $timeout(function () {
                            scope.loadDeferredElements = true;
                        }, 1);
                    }
                }
            };
        }

        return SearchFormDrv
    });

