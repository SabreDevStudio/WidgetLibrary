define([
          'util/LodashExtensions'
        , 'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/AltDatesMockDataService'
    ],
    function (
          _
        , angular
        , SDSWebServices
        , AltDatesMockDataService
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AlternateDatesSearchStrategyFactory', [
                  'AdvancedCalendarDataService'
                , 'LeadPriceCalendarDataService'
                 //'AltDatesMockDateService'//
                 ,'BargainFinderMaxDataService'
            , function (
                   AdvancedCalendarDataService
                 , LeadPriceCalendarDataService
                 , BargainFinderMaxDataService
            ) {
                return {
                    createSearchStrategy: function (activeSearchWebService) {
                        activeSearchWebService = activeSearchWebService || 'bfmAltDates';

                        function collectValidationErrors() { //TODO dup with one day strategy
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
                            case 'bfmAltDates':
                                return {
                                    getAlternateDatesPriceMatrix: function (searchCriteria, successCallback, failureCallback) {
                                        BargainFinderMaxDataService.getAlternateDatesPriceMatrix(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, BargainFinderMaxDataService);
                                    }
                                };
                            case 'advancedCalendar':
                                return {
                                    getAlternateDatesPriceMatrix: function (searchCriteria, successCallback, failureCallback) {
                                        AdvancedCalendarDataService.getAlternateDatesPriceMatrix(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, AdvancedCalendarDataService);
                                    }
                                };
                            case 'leadPriceCalendar':
                                return {
                                    getAlternateDatesPriceMatrix: function (searchCriteria, successCallback, failureCallback) {
                                        LeadPriceCalendarDataService.getAlternateDatesPriceMatrix(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, LeadPriceCalendarDataService);
                                    }
                                };
                            default:
                                throw new Error('unrecognized web service: ' + activeSearchWebService);
                        }
                    }
                };
            }
        ]);

    });
