define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        var configurationModule = angular.module('configuration', [])
            .value('apiURL', 'http://localhost:8080/sabreapibridge/api');

        return configurationModule;
    });
