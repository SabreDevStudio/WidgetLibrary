define([
    'angular',
    'webservices/bargainFinderMax/BargainFinderMaxAlternateDateWebService',
    'webservices/bargainFinderMax/BargainFinderMaxWebService',
    'webservices/bargainFinderMax/BargainFinderMaxDataService'
], function (
    angular,
    BargainFinderMaxAlternateDateWebService,
    BargainFinderMaxWebService,
    BargainFinderMaxDataService
) {

    'use strict';

    angular.module('sabreDevStudioWebServices.bargainFinderMax', [])

        .service('BargainFinderMaxAlternateDateWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , 'CachingDecorator'
            , BargainFinderMaxAlternateDateWebService
        ])
        .service('BargainFinderMaxWebService', [
            '$resource'
            , 'selectedCountryConfigs'
            , 'requestHeadersFactory'
            , 'CachingDecorator'
            , BargainFinderMaxWebService
        ])

        .factory('BargainFinderMaxDataService', [
            '$q'
            , 'BargainFinderMaxWebService'
            , 'BargainFinderMaxAlternateDateWebService'
            , 'ErrorReportingService'
            , 'businessMessagesErrorHandler'
            , 'selectedCountryConfigs'
            , BargainFinderMaxDataService
        ])
});