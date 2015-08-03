define([
          'util/LodashExtensions'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/ItineraryPricePerStopsPerAirlineSummary.tpl.html'
    ],
    function (
          _
        , angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryPricePerStopsPerAirlineSummaryTemplate

    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerarySummaryPricePerStopsPerAirline', function () {
                return {
                    scope: {
                        summary: '='
                    },
                    transclude: true,
                    template: ItineraryPricePerStopsPerAirlineSummaryTemplate,
                    controller: function ($scope) {

                        $scope.isAnyDataToDisplayAvailable = function () {
                            return (_.isDefined($scope.summary));
                        };

                    }
                }
            });
    });
