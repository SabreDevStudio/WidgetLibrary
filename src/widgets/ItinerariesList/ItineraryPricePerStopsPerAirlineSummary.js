define([
          'util/LodashExtensions'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/ItineraryPricePerStopsPerAirlineSummary.tpl.html'
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
                    template: ItineraryPricePerStopsPerAirlineSummaryTemplate,
                    controller: ['$scope', function ($scope) {

                        $scope.isAnyDataToDisplayAvailable = function () {
                            return (_.isDefined($scope.summary));
                        };
                    }]
                }
            });
    });
