import _ = require('lodash')
import angular = require('angular')

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
                apiURL: 'https://sabreapibridge.crt.aws.sabrenow.com/sabreapibridge/api',
                apiSpecificHeaders: {},
                pointOfSaleCountry: 'DE',
                bfmRequestPcc: '1X8H'
            }
        };

        const selectedConfig = _.cloneDeep(configs.DE);

        var configurationModule = angular.module('configuration', [])
            .value('selectedCountryConfigs', selectedConfig)
            .constant('countryConfigs', configs)

            .value('fareNabberApiURL', 'http://farenabber.prod.ha.sabre.com/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions DAILY
            //.value('fareNabberApiURL', 'http://ttfhli502:51000/v1/AirShopping/FNB_Subscriptions') // address of resource to create Fare Nabber subscriptions INT
            .value('fareNabberRegistrationPCC', 'E8KE')

export let Configuration = configurationModule;
