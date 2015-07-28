define([
          'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'datamodel/ItinerariesListSummaryByAirlineAndNumberOfStops'
        , 'text!view-templates/ItineraryPricePerStopsPerAirlineSummary.tpl.html'
    ],
    function (
          angular
        , angular_bootstrap
        , SDSWidgets
        , ItinerariesListSummaryByAirlineAndNumberOfStops
        , ItineraryPricePerStopsPerAirlineSummary

    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerarySummaryPricePerStopsPerAirline', function () {
                return {
                    scope: {
                        itineraries: '='
                    },
                    transclude: true,
                    template: ItineraryPricePerStopsPerAirlineSummary,
                    controller: function ($scope) {

                        $scope.isAnyDataToDisplayAvailable = function () {
                            return ($scope.itineraries && ($scope.itineraries.length > 0));
                        };

                        $scope.$watch('itineraries', function (value) {
                            if (value) {
                                $scope.summary = (new ItinerariesListSummaryByAirlineAndNumberOfStops(value)).getSummaries();
                            }
                        });

                    }
                }
            });
    });
