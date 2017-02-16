define([
    'angular',
    'webservices/advancedCalendar/AdvancedCalendarSearchService',
    'webservices/advancedCalendar/AdvancedCalendarService'
], function (
    angular,
    AdvancedCalendarSearchService,
    AdvancedCalendarService
) {
    'use strict';

    angular.module('sabreDevStudioWebServices.advancedCalendar', [])

        .service('AdvancedCalendarSearchService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , 'CachingDecorator'
            , AdvancedCalendarSearchService
        ])

        .factory('AdvancedCalendarDataService', [
            '$q'
            , 'AdvancedCalendarSearchService'
            , 'ShoppingOptionsCacheService'
            , 'ErrorReportingService'
            , 'ValidationErrorReportingService'
            , 'businessMessagesErrorHandler'
            , 'selectedCountryConfigs'
            , AdvancedCalendarService
        ])
});