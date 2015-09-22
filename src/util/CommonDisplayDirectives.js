define([
        'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/AirlineLogo.tpl.html'
    ],
    function (moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , AirlineLogoTpl
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('airlineLogo', function () {
                return {
                    template: AirlineLogoTpl,
                    scope: true,
                    link: function (scope, element, attrs) {
                        scope.airlineCode = attrs.airlineCode;
                    }
                }
            });
    });
