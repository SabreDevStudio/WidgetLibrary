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

                        switch (activeSearchWebService) {
                            case 'bfm': {
                                return {
                                    search: function (searchCriteria, callbacks) {
                                        BargainFinderMaxDataService
                                            .getBrandedItineraries(searchCriteria)
                                            .then(callbacks.successCallback, callbacks.failureCallback)
                                            .finally(callbacks.streamEndCallback);
                                    }
                                };
                            }
                            default: {
                                throw new Error('unrecognized search web service: ' + activeSearchWebService);
                            }
                        }
                    }
                };
            }
        ]);

    });
