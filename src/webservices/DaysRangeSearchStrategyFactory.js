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
            .factory('DaysRangeSearchStrategyFactory', [
                  'AdvancedCalendarDataService'
                , 'LeadPriceCalendarDataService'
            , function (
                  AdvancedCalendarDataService
                , LeadPriceCalendarDataService
            ) {
                return {
                    createSearchStrategy: function (activeSearchWebService) {
                        activeSearchWebService = activeSearchWebService || 'leadPriceCalendar';

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
                            case 'advancedCalendar':
                                return {
                                    getLeadPricesForRange: function (searchCriteria, range, successCallback, failureCallback) {
                                        AdvancedCalendarDataService.getLeadPricesForRange(searchCriteria, range).then(successCallback, failureCallback);
                                    },
                                    getMinDateAndPricePair: function (searchCriteria) {
                                        return AdvancedCalendarDataService.getMinDateAndPricePair(searchCriteria);
                                    },
                                    getMaxAvailableDate: function (searchCriteria) {
                                        return AdvancedCalendarDataService.getMaxAvailableDate(searchCriteria);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, AdvancedCalendarDataService);
                                    },
                                    getItineraries: AdvancedCalendarDataService.getItineraries
                                };
                            case 'leadPriceCalendar':
                                return {
                                    getLeadPricesForRange: function (searchCriteria, range, successCallback, failureCallback) {
                                        LeadPriceCalendarDataService.getLeadPricesForRange(searchCriteria, range).then(successCallback, failureCallback);
                                    },
                                    getMinDateAndPricePair: function (searchCriteria) {
                                        return LeadPriceCalendarDataService.getMinDateAndPricePair(searchCriteria);
                                    },
                                    getMaxAvailableDate: function (searchCriteria) {
                                        return LeadPriceCalendarDataService.getMaxAvailableDate(searchCriteria);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, LeadPriceCalendarDataService);
                                    }
                                };
                            default:
                                throw new Error('unrecognized web service: ' + activeSearchWebService);
                        }
                    }
                }
            }
        ]);

    });
