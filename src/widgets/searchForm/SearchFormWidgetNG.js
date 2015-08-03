define([
          'moment'
        , 'util/LodashExtensions'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'datamodel/SearchCriteria'
        , 'datamodel/SearchCriteriaLeg'
        , 'text!view-templates/SearchFormWidget.tpl.html'
        , 'util/AirportNameLookup'
        , 'AirportNameBestSuggestionComparator'
    ],
    function (
          moment
        ,  _
        , angular
        , angular_bootstrap
        , SDSWidgets
        , SearchCriteria
        , SearchCriteriaLeg
        , SearchFormWidgetTemplate
        , AirportNameLookup
        , AirportNameBestSuggestionComparator
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .filter('airportNameWithIATACode', function () {
                return function (airportAndIATACode) {
                    if (_.isDefined(airportAndIATACode)) {
                        return airportAndIATACode.fullName + ' (' + airportAndIATACode.airportCode + ')';
                    }
                };
            })
            .filter('airportNameBestSuggestionComparator', function () {
                return function (allMatches, userCurrentInput) {
                    return allMatches.sort(new AirportNameBestSuggestionComparator(userCurrentInput)).reverse();
                };
            })
            .service('SearchCriteriaBroadcastingService', [ //TODO dup with SDSWidgets
                '$rootScope'
                , 'newSearchCriteriaEvent'
                , function ($rootScope, newSearchCriteriaEvent) {
                    var service = {};
                    service.searchCriteria = undefined;
                    service.broadcast = function () {
                        $rootScope.$broadcast(newSearchCriteriaEvent);
                    };
                    return service;
            }])
            .controller('SearchFormCtrl' , [
                  '$scope'
                , 'DateService'
                , 'WidgetIdGeneratorService'
                , 'SearchCriteriaBroadcastingService'
                , 'AirlineNameLookupService'
            , function (
                  $scope
                , $DateService
                , widgetIdGenerator
                , SearchCriteriaBroadcastingService
                , AirlineNameLookupService
                ) {

                var DEFAULT_ADVANCE_PURCHASE_DAYS = 14;
                var DEFAULT_LENGTH_OF_STAY = 14;
                var DEFAULT_DATE_FLEXIBILITY_REQUESTED = 3;

                $scope.datepickerOptions = {
                      format: 'dd-MMM-yyyy'
                    , earliestTravelStart: $DateService.now().startOf('day').toDate()
                };

                $scope.widgetId = widgetIdGenerator.next();

                $scope.tripType = 'returnTrip';

                $scope.multiDestinationLegs = [{}, {}, {}];

                var DEFAULT_PAX_COUNT = 1;
                $scope.ADTPaxCount = DEFAULT_PAX_COUNT;

                function setReturnDateToDefaultLengthOfStay() {
                    $scope.ReturnDate = moment($scope.DepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                }

                var returnDateWasEverChanged = false;

                $scope.onDepartureDateChange = function () {
                    if (!returnDateWasEverChanged) {
                        setReturnDateToDefaultLengthOfStay();
                    }
                };

                $scope.onReturnDateChange = function () {
                    returnDateWasEverChanged = true;
                };

                $scope.DepartureDate = $DateService.now().startOf('day').add(DEFAULT_ADVANCE_PURCHASE_DAYS, 'days').toDate();
                setReturnDateToDefaultLengthOfStay();

                $scope.openDepartureDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isDepartureDatePickerOpened = true;
                };

                $scope.openReturnDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isReturnDatePickerOpened = true;
                };

                $scope.openMultiDestinationDepartureDatePicker = function ($event, index) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    if (_.isUndefined($scope.isMultiDestinationDepartureDatePickerOpened)) {
                        $scope.isMultiDestinationDepartureDatePickerOpened = [];
                    }
                    $scope.isMultiDestinationDepartureDatePickerOpened[index] = true;
                };

                /**
                 * loads all mappings of airport code into full name, into array of objects expected by jQuery Autocomplete widget: [ {label: 'Krakow (KRK)', code: 'KRK'}, {label: 'Amsterdam Schiphol (AMS)', code: 'AMS'}, .... ]
                 * We want the label to be displayed to user, while aiport code must be passed as field value.
                 */
                var loadLabelsForAutocomplete = function () {
                    var airportNameLookup = (window.SDS)? window.SDS.airportNameLookup() : new AirportNameLookup();
                    var output = [];
                    _.each(airportNameLookup.getAllMappings(), function (airportFullName, airportCode) {
                        output.push({fullName: airportFullName, airportCode: airportCode});
                    });
                    return output;
                };

                $scope.airports = loadLabelsForAutocomplete();

                //TODO into own selectAirline directive:
                $scope.preferredAirline = { // cannot keep here simple scope property like just $scope.preferredAirline, as the angular-ui-select is unable to assign to scope simple property, but only to property of the object, see http://stackoverflow.com/questions/25937098/ng-model-is-not-getting-changed-in-ui-select
                    selected: undefined
                };

                $scope.allAirlines = [];
                _.each(AirlineNameLookupService.getAllMappings(), function (airlineName, airlineCode) {
                    $scope.allAirlines.push({name: airlineName, code: airlineCode});
                });

                function createLegs(tripType) {
                    switch (tripType) {
                        case 'oneWay': {
                            var firstLegDepartureDate = moment($scope.DepartureDate);
                            var firstLeg = new SearchCriteriaLeg($scope.Origin.airportCode, $scope.Destination.airportCode, firstLegDepartureDate);
                            return [firstLeg];
                        }
                        case 'returnTrip': {
                            var firstLegDepartureDate = moment($scope.DepartureDate);
                            var firstLeg = new SearchCriteriaLeg($scope.Origin.airportCode, $scope.Destination.airportCode, firstLegDepartureDate);

                            var secondLegDepartureDate = moment($scope.ReturnDate);
                            var secondLeg = new SearchCriteriaLeg($scope.Destination.airportCode, $scope.Origin.airportCode, secondLegDepartureDate);
                            return [firstLeg, secondLeg];
                        }
                        case 'multiDestination': {
                            return $scope.multiDestinationLegs.map(function (leg) {
                                var departureDate = moment(leg.DepartureDate);
                                return new SearchCriteriaLeg(leg.Origin.airportCode, leg.Destination.airportCode, departureDate);
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

                $scope.createNewSearchCriteria = function () {
                    var searchCriteria = new SearchCriteria();

                    //var DATE_FORMAT_FOR_MOMENT = 'DD-MMM-YYYY';
                    var searchCriteriaLegs = createLegs($scope.tripType);
                    searchCriteriaLegs.forEach(function (searchCriteriaLeg) {
                        searchCriteria.addLeg(searchCriteriaLeg);
                    });

                    searchCriteria.addPassenger("ADT", $scope.ADTPaxCount);

                    if ($scope.dateFlexibility) {
                        searchCriteria.dateFlexibility(DEFAULT_DATE_FLEXIBILITY_REQUESTED);
                    }

                    if ($scope.directFlightsOnly) {
                        searchCriteria.maxStops = 0;
                    }

                    if ($scope.preferredCabin) {
                        searchCriteria.preferredCabin = $scope.preferredCabin;
                    }

                    if ($scope.preferredAirline.selected) {
                        searchCriteria.addPreferredAirline($scope.preferredAirline.selected.code);
                    }

                    SearchCriteriaBroadcastingService.searchCriteria = searchCriteria;
                    SearchCriteriaBroadcastingService.broadcast();
                };
            }])
            .directive('searchForm', function () {
               return {
                   restrict: 'A',
                   template: SearchFormWidgetTemplate, //TODO will it use templateCache this way?
                   controller: 'SearchFormCtrl',
                   scope: {}
               };
            });
    });
