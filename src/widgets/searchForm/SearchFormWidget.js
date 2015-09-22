define([
          'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'datamodel/SearchCriteria'
        , 'datamodel/SearchCriteriaLeg'
        , 'text!view-templates/SearchFormWidget.tpl.html'
    ],
    function (
          moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , SearchCriteria
        , SearchCriteriaLeg
        , SearchFormWidgetTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
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
            , function (
                  $scope
                , $DateService
                , widgetIdGenerator
                , SearchCriteriaBroadcastingService
                ) {

                var DEFAULT_ADVANCE_PURCHASE_DAYS = 14;
                var DEFAULT_LENGTH_OF_STAY = 14;
                var DEFAULT_DATE_FLEXIBILITY_REQUESTED = 3;

                $scope.earliestTravelStart = $DateService.now().startOf('day').toDate();

                $scope.widgetId = widgetIdGenerator.next();

                $scope.tripType = 'returnTrip';

                $scope.multiDestinationLegs = [{}, {}, {}];

                var DEFAULT_PAX_COUNT = 1;

                $scope.generalSearchCriteria = {
                      ADTPaxCount: DEFAULT_PAX_COUNT
                };

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

                $scope.preferredAirline = {}; // cannot keep here simple scope property like just $scope.preferredAirline, as the angular-ui-select is unable to assign to scope simple property, but only to property of the object, see http://stackoverflow.com/questions/25937098/ng-model-is-not-getting-changed-in-ui-select

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

                    var searchCriteriaLegs = createLegs($scope.tripType);
                    searchCriteriaLegs.forEach(function (searchCriteriaLeg) {
                        searchCriteria.addLeg(searchCriteriaLeg);
                    });

                    searchCriteria.addPassenger("ADT", $scope.generalSearchCriteria.ADTPaxCount);

                    if ($scope.generalSearchCriteria.IsPlusMinus3DaysFlexible) {
                        searchCriteria.dateFlexibilityDays = DEFAULT_DATE_FLEXIBILITY_REQUESTED;
                    }

                    if ($scope.generalSearchCriteria.DirectFlightsOnly) {
                        searchCriteria.maxStops = 0;
                    }

                    if ($scope.generalSearchCriteria.preferredCabin) {
                        searchCriteria.preferredCabin = $scope.generalSearchCriteria.preferredCabin;
                    }

                    if ($scope.preferredAirline.selected && $scope.preferredAirline.selected.AirlineCode) {
                        searchCriteria.addPreferredAirline($scope.preferredAirline.selected.AirlineCode);
                    }

                    if ($scope.optionsPerDay) {
                        searchCriteria.optionsPerDay = $scope.optionsPerDay;
                    }

                    SearchCriteriaBroadcastingService.searchCriteria = searchCriteria;
                    SearchCriteriaBroadcastingService.broadcast();
                };
            }])
            .directive('searchForm', function () {
               return {
                   restrict: 'AE',
                   template: SearchFormWidgetTemplate, //TODO will it use templateCache this way?
                   controller: 'SearchFormCtrl',
                   scope: true,
                   link: function (scope, element) {
                       scope.optionsPerDay = parseInt(element.attr('options-per-day'));

                       var checkboxesToBeSetAsChecked = element.attr('set-checkboxes-as-checked') && element.attr('set-checkboxes-as-checked').split(',') || [];
                       checkboxesToBeSetAsChecked.forEach(function (checkbox) {
                           scope.generalSearchCriteria[checkbox] = true;
                       });
                   }
               };
            });
    });
