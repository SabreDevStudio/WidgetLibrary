define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        var configurationModule = angular.module('configuration', [])
            .value('credentials', {
                clientId: 'V1:pe6myrbaa021f2br:DEVCENTER:EXT',
                clientSecret: 'DUaEf51f',
                apiURL: 'https://api.test.sabre.com'
            })
            .directive('widgetsConfig', function () {
                return {
                      restrict: 'E'
                    , controller: function ($scope) {
                        configurationModule.value('clientId', $scope.clientId); //TODO not working!!
                    }
                    , scope: {
                        clientId: '@'
                    }
                };
            });

        return configurationModule;
    });
