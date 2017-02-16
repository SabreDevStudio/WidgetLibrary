import angular = require('angular')
import _ = require('lodash')

import InstaFlightsWebService = require('./instaflights/InstaFlightsWebService')
import FareForecastWebService = require('./informational/FareForecastWebService')
import FareRangeWebService = require('./informational/FareRangeWebService')
import LowFareHistoryWebService = require('./informational/LowFareHistoryWebService')
import TravelSeasonalityWebService = require('./informational/TravelSeasonalityWebService')
import DestinationPricerWebService = require('./inspirational/DestinationPricerWebService')
import DestinationFinderWebService = require('./inspirational/DestinationFinderWebService')
import AirlineLookupWebService = require('./lookup/AirlineLookupWebService')
import EquipmentLookupWebService = require('./lookup/EquipmentLookupWebService')
import PointOfSaleCountryLookupWebService = require('./lookup/PointOfSaleCountryLookupWebService')
import ShoppingAirportsAndCitiesLookupWebService = require('./lookup/ShoppingAirportsAndCitiesLookupWebService')
import FareRangeAirportsAndCitiesLookupWebService = require('./lookup/FareRangeAirportsAndCitiesLookupWebService')
import LowFareForecastAirportsAndCitiesLookupWebService = require('./lookup/LowFareForecastAirportsAndCitiesLookupWebService')
import TravelThemeLookupWebService = require('./lookup/TravelThemeLookupWebService')
import GeoSearchWebService = require('./geo/GeoSearchWebService')
import GeoCodeWebService = require('./geo/GeoCodeWebService')
import CachingDecorator = require('./CachingDecorator')
import DaysRangeSearchStrategyFactory = require('./common/searchStrategyFactories/DaysRangeSearchStrategyFactory')

    angular.module('sabreDevStudioWebServices', [
        'ngResource'
        , 'configuration'
        , 'NGPromiseUtils'
        , 'ngStorage'
        , 'sabreDevStudioWebServices.advancedCalendar'
        , 'sabreDevStudioWebServices.bargainFinderMax'
        , 'sabreDevStudioWebServices.leadPriceCalendar'
        , 'sabreDevStudioWebServices.informational'
    ])

            .constant('dateTimeFormat', 'YYYY-MM-DDTHH:mm:ss')
            .constant('dateFormat', 'YYYY-MM-DD')
            .constant('errorEvent', 'errorEvent')
            .constant('networkErrorEvent', 'networkErrorEvent')
            .constant('validationErrorEvent', 'validationErrorEvent')
            .constant('resetErrorsEvent', 'resetErrorsEvent')

        .factory('requestHeadersFactory', [
            'selectedCountryConfigs',
            function (
                selectedCountryConfigs
            ) {
                const generalHeaders = {
                    'Content-Type' : 'application/JSON'
                };
                return {
                    getHeaders: () => _.extend({}, generalHeaders, selectedCountryConfigs.apiSpecificHeaders)
                }
            }
        ])

        .factory('CachingDecorator', [
            '$q'
            , '$cacheFactory'
            , CachingDecorator
        ])

        .factory('DaysRangeSearchStrategyFactory', [
            'AdvancedCalendarDataService'
            , 'LeadPriceCalendarDataService'
            , DaysRangeSearchStrategyFactory
        ])

        .service('InstaFlightsWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , InstaFlightsWebService
        ])

        .service('FareForecastWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , FareForecastWebService
        ])

        .service('FareRangeWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , FareRangeWebService
        ])

        .service('LowFareHistoryWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , LowFareHistoryWebService
        ])

        .service('DestinationPricerWebService', [ // aka Flights To
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , DestinationPricerWebService
        ])

        .service('DestinationFinderWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , DestinationFinderWebService
        ])

        .service('AirlineLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , AirlineLookupWebService
        ])

        .service('EquipmentLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , EquipmentLookupWebService
        ])

        .service('PointOfSaleCountryLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , PointOfSaleCountryLookupWebService
        ])

        .service('ShoppingAirportsAndCitiesLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , ShoppingAirportsAndCitiesLookupWebService
        ])

        .service('FareRangeAirportsAndCitiesLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , FareRangeAirportsAndCitiesLookupWebService
        ])

        .service('LowFareForecastAirportsAndCitiesLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , LowFareForecastAirportsAndCitiesLookupWebService
        ])

        .service('TravelThemeLookupWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , TravelThemeLookupWebService
        ])

        .service('TravelSeasonalityWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , TravelSeasonalityWebService
        ])

        .service('GeoSearchWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , 'CachingDecorator'
            , GeoSearchWebService
        ])

        .service('GeoCodeWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , 'CachingDecorator'
            , GeoCodeWebService
        ])


            .factory('businessMessagesErrorHandler', ['ErrorReportingService', function (ErrorReportingService) {
                function identityAsArray(arg) {
                    return [arg];
                }
                return {
                    handle: function(reject, reason, errorParsingFn) {
                        errorParsingFn = errorParsingFn || identityAsArray;
                        if (reason.data !== null) {
                            var businessErrorMessages = errorParsingFn(reason.data.message);
                            ErrorReportingService.reportErrors(businessErrorMessages);
                        }
                        return reject(businessErrorMessages);
                    }
                }
            }])
            .service('ErrorReportingService', ['$rootScope', 'errorEvent', function ($rootScope, errorEvent) {
                return {
                    reportError: function (error, searchCriteria) {
                        $rootScope.$broadcast(errorEvent, [error], searchCriteria);
                    },
                    reportErrors: function (errorsArray, searchCriteria) {
                        $rootScope.$broadcast(errorEvent, errorsArray, searchCriteria);
                    }
                };
            }])
            .service('NetworkErrorReportingService', ['$rootScope', 'networkErrorEvent', function ($rootScope, errorEvent) {
                return {
                    reportError: function (error) {
                        $rootScope.$broadcast(errorEvent, [error], 'Network error');
                    }
                };
            }])
            .factory('ValidationErrorReportingService', [
                '$rootScope',
                'validationErrorEvent'
                , function (
                    $rootScope,
                    validationErrorEvent
                ) {
                    return {
                        reportErrors: function (errors, errorsCategory) {
                            $rootScope.$broadcast(validationErrorEvent, errors, errorsCategory);
                        }
                    };
                }])
