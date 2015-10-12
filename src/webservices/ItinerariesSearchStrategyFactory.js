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
            .factory('ItinerariesSearchStrategyFactory', [
                  'BargainFinderMaxDataService'
                , 'InstaflightsDataService' //, 'ShoppingMockDateService'
                , 'AdvancedCalendarDataService'
            , function (
                  BargainFinderMaxDataService
                , InstaflightsDataService
                , AdvancedCalendarDataService
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
                                    return __.pushAll(acc, curr);
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
                            case 'advancedCalendar': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback) {
                                        AdvancedCalendarDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, AdvancedCalendarDataService);
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
