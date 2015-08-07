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
                clientSecret: 'DUaEf51f'
            })
            .value('apiURL', 'https://api.test.sabre.com');

        return configurationModule;
    });
