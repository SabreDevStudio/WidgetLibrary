define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        const configs = {
            US: {
                apiURL: 'http://airports.ds36.net/api/sabre', //'http://localhost:8088/sabreapibridge/api'
                apiSpecificHeaders: {
                    'application-key': 'YWQ3NmM5ZWYtZGNmYi00ODA0LTg0YzgtNjYwNGYzOGJkMzhhNGE4YzY5NWQtMjZjMy00NmZmLTg5ZDEtYzVhODU0MzYwN2Uz'
                },
                pointOfSaleCountry: 'US',
                bfmRequestPcc: 'E8KE'
            },
            DE: {
                apiURL: 'http://10.14.54.160:8088/sabreapibridge/api',
                apiSpecificHeaders: {},
                pointOfSaleCountry: 'DE',
                bfmRequestPcc: 'E8KE'
            }
        };

        const selectedConfig = configs.DE;

        var configurationModule = angular.module('configuration', [])
            .value('apiURL', selectedConfig.apiURL)
            .value('apiSpecificHeaders', selectedConfig.apiSpecificHeaders)
            .value('pointOfSaleCountry', selectedConfig.pointOfSaleCountry)
            .value('bfmRequestPcc', selectedConfig.bfmRequestPcc)

            .value('fareNabberApiURL', 'http://farenabber.prod.ha.sabre.com/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions DAILY
            //.value('fareNabberApiURL', 'http://ttfhli502:51000/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions INT
            .value('fareNabberRegistrationPCC', 'E8KE')

        return configurationModule;
    });
