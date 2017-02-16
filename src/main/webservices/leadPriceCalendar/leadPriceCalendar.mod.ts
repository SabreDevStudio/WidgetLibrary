define([
    'angular',
    'webservices/leadPriceCalendar/LeadPriceCalendarWebService',
    'webservices/leadPriceCalendar/LeadPriceCalendarDataService',
    'webservices/leadPriceCalendar/LeadPriceCalendarResponseParser'
], function (
    angular,
    LeadPriceCalendarWebService,
    LeadPriceCalendarDataService,
    LeadPriceCalendarResponseParser
) {
    'use strict';

    angular.module('sabreDevStudioWebServices.leadPriceCalendar', [])

        .factory('LeadPriceCalendarResponseParser'
            , LeadPriceCalendarResponseParser
        )

        .service('LeadPriceCalendarWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , LeadPriceCalendarWebService
        ])

        .factory('LeadPriceCalendarDataService', [
            '$q'
            , '$cacheFactory'
            , 'LeadPriceCalendarWebService'
            , 'LeadPriceCalendarResponseParser'
            , 'selectedCountryConfigs'
            , 'ErrorReportingService'
            , 'ValidationErrorReportingService'
            , 'businessMessagesErrorHandler'
            , LeadPriceCalendarDataService
        ])


});