define([
          'angular'
        , 'moment'
        , 'moment_range'
        , 'webservices/AuthenticationService' // TODO: seems not needed here but without it and with interceptor modules not not load
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'webservices/BargainFinderMaxRequestFactory'
        , 'webservices/OTAResponseParser'
    ],
    function (
          angular
        , moment
        , moment_range
        , AuthenticationService
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , BargainFinderMaxRequestFactory
        , OTAResponseParser
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('BargainFinderMaxDataService', [
                      '$q'
                    , 'BargainFinderMaxSearchService'
                , function (
                      $q
                    , bfmSearchService
                ) {
                    var bfmRequestFactory = new BargainFinderMaxRequestFactory();

                    var parser = new OTAResponseParser();

                    return {
                        getItineraries: function(searchCriteria) {
                            var bfmRequest = bfmRequestFactory.createRequest(searchCriteria);
                            return $q(function(resolve, reject) {
                                bfmSearchService.sendRequest(bfmRequest).then(function (response) {
                                    var itinerariesList = parser.parse(response);
                                    resolve(itinerariesList);
                                }).catch(function (reason) {
                                    var businessErrorMessage = parser.getBusinessErrorMessage(reason.data.message);
                                    reject(businessErrorMessage);
                                });
                            });
                        }
                    }
            }]);
    });
