define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        var configurationModule = angular.module('configuration', [])
            //.value('apiURL', 'http://localhost:8080/sabreapibridge/api')
            .value('apiURL', 'http://10.14.54.160:8088/sabreapibridge/api')
            //.value('apiURL', 'http://bridge.dev.sabre.cometari.com/api')
            .value('pointOfSaleCountry', 'DE');

        return configurationModule;
    });
