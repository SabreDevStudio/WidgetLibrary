define([
    'angular',
    'widgets/SDSWidgets'
    ],
    function (
    angular,
    SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerariesFilterPanel', function () {
                return {
                    scope: true,
                    templateUrl: '../widgets/view-templates/widgets/ItinerariesFilterPanelWidget.tpl.html'
                };
            });
    });