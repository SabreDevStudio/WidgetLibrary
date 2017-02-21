define([
        'lodash'
        , 'util/LodashExtensions'
        , 'moment'
        , 'datamodel/search/SearchCriteria'
        , 'datamodel/search/SearchCriteriaLeg'
        , 'datamodel/search/alternateDates/DaysOfWeekAtDestination'
        , 'datamodel/search/alternateDates/PlusMinusDaysTravelDatesFlexibility'
        , 'datamodel/search/alternateDates/EarliestDepartureLatestReturnTravelDatesFlexibility'
        , 'datamodel/search/DiversityModelOptions'
    ],
    function (
        _
        , __
        , moment
        , SearchCriteria
        , SearchCriteriaLeg
        , DaysOfWeekAtDestination
        , PlusMinusDaysTravelDatesFlexibility
        , EarliestDepartureLatestReturnTravelDatesFlexibility
        , DiversityModelOptions
    ) {
        'use strict';

        function SearchFormCtrl (
            $scope
            , widgetIdGenerator
            , SearchCriteriaBroadcastingService
        ) {

            $scope.widgetId = widgetIdGenerator.next();

            $scope.diversityModelOptions = new DiversityModelOptions();

            $scope.detailsVisibility = {useDiversityModelOptions: false};

            $scope.tripType = 'returnTrip';

            $scope.multiDestinationLegs = [{}, {}, {}];
            $scope.simpleTrip = {
                Origin:{
                    airportCode: undefined
                }
            };

            var DEFAULT_PAX_COUNT = 1;

            $scope.generalSearchCriteria = {
                ADTPaxCount: DEFAULT_PAX_COUNT
            };

            $scope.preferredAirlines = {
                selected: []
            }; // cannot keep here simple scope property like just $scope.preferredAirlines, as the angular-ui-select is unable to assign to scope simple property, but only to property of the object, see http://stackoverflow.com/questions/25937098/ng-model-is-not-getting-changed-in-ui-select

            $scope.lengthsOfStay = {
                selected: {}
            };

            function createLegs(tripType) {
                switch (tripType) {
                    case 'oneWay': {
                        var firstLeg = new SearchCriteriaLeg({
                            origin: $scope.simpleTrip.Origin.airportCode
                            , destination: $scope.simpleTrip.Destination.airportCode
                            , departureDateTime: moment($scope.simpleTrip.DepartureDate)
                        });
                        return [firstLeg];
                    }
                    case 'returnTrip': {
                        firstLeg = new SearchCriteriaLeg({
                            origin: $scope.simpleTrip.Origin.airportCode
                            , destination: $scope.simpleTrip.Destination.airportCode
                        });
                        var secondLeg = new SearchCriteriaLeg({
                            origin: $scope.simpleTrip.Destination.airportCode
                            , destination: $scope.simpleTrip.Origin.airportCode
                        });

                        if (!($scope.flexDatesMode.isEarliestDepartureLatestReturnActive())) {
                            firstLeg.departureDateTime = moment($scope.simpleTrip.DepartureDate);
                            secondLeg.departureDateTime = moment($scope.simpleTrip.ReturnDate);
                        }
                        return [firstLeg, secondLeg];
                    }
                    case 'multiDestination': {
                        return $scope.multiDestinationLegs.map(function (leg) {
                            var departureDate = moment(leg.DepartureDate);
                            return new SearchCriteriaLeg({
                                origin: leg.Origin.airportCode
                                , destination: leg.Destination.airportCode
                                , departureDateTime: departureDate
                            });
                        });
                    }
                    default: throw new Error('Trip type: ' + $scope.tripType + ' not recognized');
                }
            }

            $scope.addNextSearchCriteriaLeg = function () {
                $scope.multiDestinationLegs.push({});
            };

            $scope.removeLastSearchCriteriaLeg = function () {
                $scope.multiDestinationLegs.pop();
            };

            /* jshint maxcomplexity:15 */
            $scope.createNewSearchCriteria = function () {
                var searchCriteria = new SearchCriteria();

                var searchCriteriaLegs = createLegs($scope.tripType);
                searchCriteriaLegs.forEach(function (searchCriteriaLeg) {
                    searchCriteria.addLeg(searchCriteriaLeg);
                });

                if ($scope.flexDatesMode.activeMode === 'earliestDepartureLatestReturn.daysOfWeekAtDestination') {
                    var daysOfWeekAtDestination = new DaysOfWeekAtDestination($scope.daysOfWeekAtDestination.selected);
                    searchCriteria.earliestDepartureLatestReturnDatesFlexibility = new EarliestDepartureLatestReturnTravelDatesFlexibility({
                        earliestDepartureDateTime: moment($scope.simpleTrip.EarliestDepartureDate)
                        , latestReturnDateTime: moment($scope.simpleTrip.LatestReturnDate)
                        , minDays: daysOfWeekAtDestination.lengthOfStay()
                        , maxDays: daysOfWeekAtDestination.lengthOfStay()
                        , daysOfWeekAtDestination: daysOfWeekAtDestination
                    });
                }

                if ($scope.flexDatesMode.activeMode === 'earliestDepartureLatestReturn.losDays') {
                    searchCriteria.earliestDepartureLatestReturnDatesFlexibility = new EarliestDepartureLatestReturnTravelDatesFlexibility({
                        earliestDepartureDateTime: moment($scope.simpleTrip.EarliestDepartureDate)
                        , latestReturnDateTime: moment($scope.simpleTrip.LatestReturnDate)
                        , minDays: $scope.lengthsOfStay.selected.minDays
                        , maxDays: $scope.lengthsOfStay.selected.maxDays
                        , departureDaysOfWeek: $scope.departureDaysOfWeek.selected
                        , returnDaysOfWeek: $scope.returnDaysOfWeek.selected
                    });
                }

                if ($scope.flexDatesMode.activeMode === 'plusMinusConstantDaysFlexibility') {
                    var DEFAULT_DATE_FLEXIBILITY_REQUESTED = 3;
                    searchCriteria.dateFlexibilityDays = PlusMinusDaysTravelDatesFlexibility.prototype.buildConstantDaysFlexibility(DEFAULT_DATE_FLEXIBILITY_REQUESTED);
                } else if ($scope.flexDatesMode.activeMode === 'plusMinusVariableDaysFlexibility') {
                    searchCriteria.dateFlexibilityDays = $scope.advancedDateFlexibility;
                }

                searchCriteria.addPassenger("ADT", $scope.generalSearchCriteria.ADTPaxCount);

                if (__.isDefined($scope.generalSearchCriteria.bagsRequested)) {
                    searchCriteria.bagsRequested = $scope.generalSearchCriteria.bagsRequested;
                }

                if ($scope.generalSearchCriteria.DirectFlightsOnly) {
                    searchCriteria.maxStops = 0;
                }

                if ($scope.generalSearchCriteria.preferredCabin) {
                    searchCriteria.preferredCabin = $scope.generalSearchCriteria.preferredCabin;
                }

                if ($scope.preferredAirlines.selected) {
                    $scope.preferredAirlines.selected.forEach((airlineCode) => searchCriteria.addPreferredAirline(airlineCode));
                }

                if ($scope.optionsPerDay) {
                    searchCriteria.optionsPerDay = $scope.optionsPerDay;
                }

                if($scope.detailsVisibility.useDiversityModelOptions){
                    searchCriteria.diversityModelOptions = $scope.diversityModelOptions;
                }

                SearchCriteriaBroadcastingService.searchCriteria = searchCriteria;
                SearchCriteriaBroadcastingService.broadcast();

                if (__.isDefined($scope.newSearchCriteriaCallback)) {
                    $scope.newSearchCriteriaCallback({searchCriteria: searchCriteria});
                }
            };

            $scope.plusMinusConstantDateFlexibilityCheckboxClicked = function () {
                if ($scope.flexDatesMode.activeMode !== 'plusMinusConstantDaysFlexibility') {
                    $scope.flexDatesMode.activeMode = 'plusMinusConstantDaysFlexibility'
                } else { // when the checkbox is being unchecked
                    $scope.flexDatesMode.activeMode = undefined;
                }
            };

            $scope.isVisible = function (htmlFieldName) {
                if (_.contains($scope.optionalFields, htmlFieldName)) {
                    return _.contains($scope.optionalFieldsToShow, htmlFieldName);
                }
                return !_.contains($scope.fieldsToHide, htmlFieldName);
            }

            $scope.isAnyOfVisible = function () {
                return [].slice.call(arguments).some($scope.isVisible);
            }

        }

        return SearchFormCtrl;
    }
)

