define([
    'angular',
    'webservices/informational/TravelSeasonalityDataService',
], function (
    angular,
    TravelSeasonalityDataService
) {
    'use strict';

    angular.module('sabreDevStudioWebServices.informational', [])

        .factory('TravelSeasonalityDataService', [
            '$q'
            , 'TravelSeasonalityWebService'
            , 'ErrorReportingService'
            , 'businessMessagesErrorHandler'
            , TravelSeasonalityDataService
        ]);
});