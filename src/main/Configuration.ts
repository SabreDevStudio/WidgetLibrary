define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        var configurationModule = angular.module('configuration', [])
            //.value('apiURL', 'http://localhost:8088/sabreapibridge/api')
            .value('apiURL', 'http://10.14.54.160:8088/sabreapibridge/api')
            //.value('apiURL', 'http://airports.ds36.net/api/sabre')
            //.value('apiSpecificHeaders', {
            //    'application-key': 'YWQ3NmM5ZWYtZGNmYi00ODA0LTg0YzgtNjYwNGYzOGJkMzhhNGE4YzY5NWQtMjZjMy00NmZmLTg5ZDEtYzVhODU0MzYwN2Uz'
            //})
            .value('apiSpecificHeaders', {})
            .value('pointOfSaleCountry', 'DE')
            //.value('pointOfSaleCountry', 'US')
            .value('fareNabberApiURL', 'http://pifhli101:51000/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions DAILY
            //.value('fareNabberApiURL', 'http://ttfhli502:51000/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions INT
            .value('fareNabberRegistrationPCC', 'E8KE')

            //.value('bfmRequestPcc', 'E8KE')
            .value('bfmRequestPcc', '')

        return configurationModule;
    });
