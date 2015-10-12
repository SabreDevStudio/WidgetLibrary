define([
          'util/LodashExtensions'
        , 'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
    ],
    function (
          __
        , angular
        , SDSWebServices
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('BrandedItinerariesSearchStrategyFactory', [
                  'BargainFinderMaxDataService'
            , function (
                  BargainFinderMaxDataService
            ) {
                return {
                    createSearchStrategy: function (activeSearchWebService) {
                        activeSearchWebService = activeSearchWebService || 'bfm';

                        function collectValidationErrors() { //TODO DUP with ItinerariesSearchStrategyFactory
                            var args = [].slice.call(arguments);
                            var searchCriteria = args.shift();
                            var webServices = args;
                            return webServices
                                .map(function (webService) {
                                    return webService.validateSearchCriteria(searchCriteria);
                                }
                            )
                                .reduce(function (acc, curr) {
                                    return __.pushAll(acc, curr);
                                }, []);
                        }

                        switch (activeSearchWebService) {
                            case 'bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        BargainFinderMaxDataService.getBrandedItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            default: {
                                throw new Error('unrecognized search web service: ' + activeSearchWebService);
                            }
                        }
                    }
                }
            }
        ]);

    });
