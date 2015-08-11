define([
          'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/ItineraryShortSummary.tpl.html'
    ],
    function (
          angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryShortSummaryTemplate

    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itineraryShortSummary', function () {
                return {
                    scope: {
                        itinerary: '='
                    },
                    template: ItineraryShortSummaryTemplate,
                    transclude: true
                }
            });
    });
