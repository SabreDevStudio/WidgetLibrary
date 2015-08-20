define([
          'util/LodashExtensions'
        , 'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
    ],
    function (
          _
        , angular
        , SDSWebServices
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('OneDaySearchStrategyFactory', [
                  'BargainFinderMaxDataService'
                , 'InstaflightsDataService' //, 'ShoppingMockDateService'
            , function (
                  BargainFinderMaxDataService
                , InstaflightsDataService
            ) {
                return {
                    createSearchStrategy: function (activeSearchWebService) {
                        activeSearchWebService = activeSearchWebService || 'instaflights';

                        function collectValidationErrors() {
                            var args = [].slice.call(arguments);
                            var searchCriteria = args.shift();
                            var webServices = args;
                            return webServices
                                .map(function (webService) {
                                    return webService.validateSearchCriteria(searchCriteria);
                                }
                            )
                                .reduce(function (acc, curr) {
                                    return _.pushAll(acc, curr);
                                }, []);
                        }

                        switch (activeSearchWebService) {
                            case 'bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            case 'instaflights': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        InstaflightsDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService);
                                    }
                                };
                            }
                            case 'first-instaflights-on-errors-bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        InstaflightsDataService.getItineraries(searchCriteria).then(
                                            successCallback
                                            , function () {
                                                BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                            });
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            case 'instaflights-updated-with-bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {

                                        var instaflightSuccessCallback = function (value) {
                                            successCallback(value);
                                            BargainFinderMaxDataService.getItineraries(searchCriteria).then(updateCallback);
                                        };

                                        var instaflightsFailureCallback = function () {
                                            BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                        };

                                        InstaflightsDataService.getItineraries(searchCriteria).then(instaflightSuccessCallback, instaflightsFailureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService, BargainFinderMaxDataService);
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
