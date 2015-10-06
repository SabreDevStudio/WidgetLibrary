define([
          'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/ItineraryShortSummary.tpl.html'
        , 'util/CommonDisplayDirectives'
    ],
    function (
          angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryShortSummaryTemplate
        , CommonDisplayDirectives

    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itineraryShortSummary', function () {
                return {
                    scope: {
                        itinerary: '=itin'
                    },
                    template: ItineraryShortSummaryTemplate
                }
            });
    });
