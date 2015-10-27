define([
          'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'util/CommonDisplayDirectives'
    ],
    function (
          angular
        , angular_bootstrap
        , SDSWidgets
        , CommonDisplayDirectives

    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itineraryShortSummary', function () {
                return {
                    scope: {
                        itinerary: '=itin'
                    },
                    templateUrl: '../src/view-templates/widgets/ItineraryShortSummary.tpl.html'
                }
            });
    });
