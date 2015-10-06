define([
          'angular'
        , 'lodash'
        , 'moment'
        , 'moment_range'
        , 'webservices/AdvancedCalendarSearchCriteriaValidator'
        , 'webservices/AdvancedCalendarRequestFactory'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'webservices/AdvancedCalendarRequestDatesExpander'
        , 'datamodel/ShoppingData'
        , 'webservices/OTAResponseParser'
    ],
    function (
          angular
        , _
        , moment
        , moment_range
        , AdvancedCalendarSearchCriteriaValidator
        , AdvancedCalendarRequestFactory
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , AdvancedCalendarRequestDatesExpander
        , ShoppingData
        , OTAResponseParser
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AdvancedCalendarDataService', [
                '$q'
                , 'AdvancedCalendarSearchService'
                , 'ShoppingOptionsCacheService'
                , 'StandardErrorHandler'
                , function (
                    $q
                    , AdvancedCalendarSearchService
                    , ShoppingOptionsCacheService
                    , StandardErrorHandler
                ) {

                    var requestDatesExpander = new AdvancedCalendarRequestDatesExpander();
                    var requestBuilderForDateRanges = new AdvancedCalendarRequestFactory(requestDatesExpander);

                    var requestBuilder = new AdvancedCalendarRequestFactory();

                    var responseParser = new OTAResponseParser();

                    var validator = new AdvancedCalendarSearchCriteriaValidator();

                    function createCacheKey(searchCriteria) {
                        var keyElements = [
                            searchCriteria.getFirstLeg().origin
                            , searchCriteria.getFirstLeg().destination
                            , JSON.stringify(searchCriteria.getMinMaxLengthOfStay()) || searchCriteria.getLengthOfStay()
                            , JSON.stringify(searchCriteria.getDepartureDateFrom())
                            , JSON.stringify(searchCriteria.getDepartureDateTo())
                            , JSON.stringify(searchCriteria.getReturnDateFrom())
                            , JSON.stringify(searchCriteria.getReturnDateTo())
                            , JSON.stringify(searchCriteria.preferredAirlines)
                            , searchCriteria.maxStops
                            , JSON.stringify(searchCriteria.passengerSpecifications)
                        ];
                        return keyElements.join('-');
                    }

                    return {
                        getLeadPricesForRange: function (searchCriteria, range) {
                            return $q(function(resolve, reject) {
                                var cacheKey = createCacheKey(searchCriteria);
                                var optionsFromCache = ShoppingOptionsCacheService.getLeadPricesForRange(cacheKey, range.start, range.end);
                                if (_.size(optionsFromCache) > 0) {
                                    return resolve(optionsFromCache);
                                }
                                var advancedCalendarRequest = requestBuilderForDateRanges.createRequest(searchCriteria);
                                AdvancedCalendarSearchService.sendRequest(advancedCalendarRequest).then(
                                    function (response) {
                                        var itinerariesList = responseParser.parse(response);

                                        var shoppingData = new ShoppingData(); //TODO far too complex interface to ShoppingData
                                        shoppingData.markRequestedData(cacheKey, range.start, range.end);
                                        itinerariesList.getItineraries().forEach(function(itineary) {
                                            shoppingData.addItinerary(cacheKey, itineary, itineary.getOutboundDepartureDateTime());
                                        });
                                        shoppingData.updateLeadPrices(cacheKey);

                                        ShoppingOptionsCacheService.addUpdate(shoppingData);
                                        var leadPricesForRange = shoppingData.getLeadPricesForRange(cacheKey, range.start, range.end);
                                        return resolve(leadPricesForRange);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        },
                        getItineraries : function (searchCriteria) {
                            return $q(function(resolve, reject) {
                                var advancedCalendarRequest = requestBuilder.createRequest(searchCriteria);
                                AdvancedCalendarSearchService.sendRequest(advancedCalendarRequest).then(
                                    function (response) {
                                        var itinerariesList = responseParser.parse(response);
                                        return resolve(itinerariesList);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        },
                        getAlternateDatesPriceMatrix: function (searchCriteria) {
                            if (!searchCriteria.isAlternateDatesRequest()) {
                                throw new Error('Calling Alternative Dates service for non alternative dates request');
                            }
                            var advancedCalendarRequest = requestBuilder.createRequest(searchCriteria);
                            return $q(function(resolve, reject) {
                                AdvancedCalendarSearchService.sendRequest(advancedCalendarRequest).then(
                                    function (response) {
                                        var alternateDatesPriceMatrix = responseParser.extractAlternateDatesPriceMatrix(response);
                                        resolve(alternateDatesPriceMatrix);
                                    },
                                    function (reason) {
                                        var businessErrorMessages = responseParser.getBusinessErrorMessages(reason.data.message);
                                        reject(businessErrorMessages);
                                    }
                                );
                            });

                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return validator.validate(searchCriteria);
                        },
                        getMinDateAndPricePair: function (searchCriteria) { //todo for now assume it is called after getLeadPricesForRange
                            var cacheKey = createCacheKey(searchCriteria);
                            var minDateAndPricePair = ShoppingOptionsCacheService.getMinDateAndPricePair(cacheKey);
                            return {
                                totalFareAmount: minDateAndPricePair.totalFareAmount
                                , currency: minDateAndPricePair.totalFareCurrency
                                , date: minDateAndPricePair.date
                            }
                        },
                        getMaxAvailableDate: function (searchCriteria) {
                            var cacheKey = createCacheKey(searchCriteria);
                            return ShoppingOptionsCacheService.getMaxAvailableDate(cacheKey);
                        }
                    };
                }])
    });
