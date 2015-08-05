define([
          'angular'
        , 'util/LodashExtensions'
        , 'moment'
        , 'moment_range'
        , 'webservices/InstaflightResponseParser'
        , 'webservices/OTAResponseParser'
        , 'util/BaseServices'
        , 'webservices/AuthenticationService' // TODO: seems not needed here but without it and with interceptor modules not not load
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'datamodel/FareForecast'
        , 'datamodel/ShoppingData'
        , 'webservices/AdvancedCalendarRequestFactory'
        , 'datamodel/InstaflightSearchCriteriaValidator'
    ],
    function (
          angular
        , _
        , moment
        , moment_range
        , InstaflightsResponseParser
        , OTAResponseParser
        , BaseServices
        , AuthenticationService
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , FareForecast
        , ShoppingData
        , AdvancedCalendarRequestFactory
        , InstaflightSearchCriteriaValidator
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AdvancedCalendarDataService', [
                    '$q'
                  , 'AdvancedCalendarSearchService'
                  , 'ShoppingOptionsCacheService'
                , function (
                      $q
                    , AdvancedCalendarSearchService
                    , ShoppingOptionsCacheService
                ) {
                var requestBuilder = new AdvancedCalendarRequestFactory();

                var responseParser = new OTAResponseParser();

                function createCacheKey(searchCriteria) {
                    return searchCriteria.getFirstLeg().origin + '-' + searchCriteria.getFirstLeg().destination + '-' + searchCriteria.getLengthOfStay();
                }

                return {
                    getLeadPricesForRange: function (searchCriteria, range) {
                        return $q(function(resolve, reject) {
                            var cacheKey = createCacheKey(searchCriteria);
                            var optionsFromCache = ShoppingOptionsCacheService.getLeadPricesForRange(cacheKey, range.start, range.end); //TODO
                            if (_.size(optionsFromCache) > 0) {
                                return resolve(optionsFromCache);
                            }
                            var advancedCalendarRequest = requestBuilder.createRequest(searchCriteria);
                            AdvancedCalendarSearchService.sendRequest(advancedCalendarRequest).then(
                                function (response) {
                                    var itinerariesList = responseParser.parse(response);

                                    var shoppingData = new ShoppingData();
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
                                    return reject(error);
                                }
                            );
                        });
                    },
                    getItineraries : function (searchCriteria) { //TODO near all dup with previous. When works refactor
                        return $q(function(resolve, reject) {
                            var cacheKey = createCacheKey(searchCriteria);
                            var tripDepartureDay = searchCriteria.getFirstLeg().departureDateTime.clone().startOf('day');
                            var optionsFromCache = ShoppingOptionsCacheService.getItinerariesList(cacheKey, tripDepartureDay);
                            if (optionsFromCache.size() > 0) {
                                return resolve(optionsFromCache);
                            }
                            var advancedCalendarRequest = requestBuilder.createRequest(searchCriteria);
                            AdvancedCalendarSearchService.sendRequest(advancedCalendarRequest).then(
                                function (response) {
                                    var itinerariesList = responseParser.parse(response);

                                    var shoppingData = new ShoppingData();
                                    shoppingData.markRequestedData(cacheKey, range.start, range.end);
                                    itinerariesList.getItineraries().forEach(function(itineary) {
                                        shoppingData.addItinerary(cacheKey, itineary, itineary.getOutboundDepartureDateTime());
                                    });
                                    shoppingData.updateLeadPrices(cacheKey);

                                    ShoppingOptionsCacheService.addUpdate(shoppingData);
                                    var itineraries = shoppingData.getItinerariesList(cacheKey, tripDepartureDay);
                                    return resolve(itineraries);
                                },
                                function (error) {
                                    return reject(error);
                                }
                            );

                        });
                    },
                    getMinDateAndPricePair: function (searchCriteria) { //todo for now assume it is called after getLeadPricesForRange
                        var cacheKey = createCacheKey(searchCriteria);
                        return ShoppingOptionsCacheService.getMinDateAndPricePair(cacheKey);
                    },
                    getMaxAvailableDate: function (searchCriteria) {
                        var cacheKey = createCacheKey(searchCriteria);
                        return ShoppingOptionsCacheService.getMaxAvailableDate(cacheKey);
                    }
                };
            }])
            .factory('InstaflightsDataService', [
                      '$q'
                    , 'InstaFlightsWebService'
                    , 'dateFormat'
                , function (
                      $q
                    , InstaFlightsWebService
                    , dateFormat
                ) {
                    var parser = new InstaflightsResponseParser();

                    var validator = new InstaflightSearchCriteriaValidator();

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        var requestOptions = {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: searchCriteria.getFirstLeg().departureDateTime.format(dateFormat)
                            , returndate: searchCriteria.getSecondLeg().departureDateTime.format(dateFormat)
                        };
                        if (searchCriteria.preferredAirlines.length > 0) {
                            _.extend(requestOptions, {
                                includedcarriers: searchCriteria.preferredAirlines.join()
                            });
                        }
                        if (searchCriteria.maxStops) {
                            _.extend(requestOptions, {
                                  outboundflightstops: searchCriteria.maxStops
                                , inboundflightstops: searchCriteria.maxStops
                            });
                        }
                        if (searchCriteria.optionsPerDay) {
                            _.extend(requestOptions, {
                                limit: searchCriteria.optionsPerDay
                            });
                        }
                        if (searchCriteria.passengerSpecifications.length > 0) {
                            _.extend(requestOptions, {
                                passengercount: searchCriteria.getTotalPassengerCount()
                            });
                        }
                        return requestOptions;
                    }

                    return {
                        getItineraries: function(searchCriteria) {
                            return $q(function(resolve, reject) {
                                var validationErrors = validator.validate(searchCriteria);
                                if (_.isDefined(validationErrors)) {
                                    return reject(validationErrors);
                                }
                                var webServiceRequest = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                InstaFlightsWebService.get(webServiceRequest).$promise.then(
                                    function (response) {
                                        var itinerariesList = parser.parse(response);
                                        resolve(itinerariesList);
                                    },
                                    function (reason) {
                                        var businessErrorMessage = reason.data.message;
                                        reject(businessErrorMessage);
                                    }
                                );
                            });
                        }
                    };

                }])
            .factory('LeadPriceCalendarResponseParser', function () {
                return {
                    parse: function (response) {
                        return response.FareInfo.map(function (fareInfo) {
                            return {
                                  departureDateTime: fareInfo.DepartureDateTime
                                , lowestFare: fareInfo.LowestFare
                                , lowestNonStopFare: fareInfo.LowestNonStopFare
                            };
                        });
                    }
                };
            })
            .factory('LeadPriceCalendarDataService', [
                      '$q'
                    , '$cacheFactory'
                    , 'LeadPriceCalendarWebService'
                    , 'LeadPriceCalendarResponseParser'
                , function (
                      $q
                    , $cacheFactory
                    , LeadPriceCalendarWebService
                    , parser
                ) {

                    var leadFaresCache = $cacheFactory('leadPricesCache');

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        return {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        }
                    }

                    function sliceLeadFares(leadFares, range) { //TODO into data model object: LeadPrices
                        return leadFares.filter(function (leadFare) {
                            var date = moment(leadFare.departureDateTime, moment.ISO_8601);
                            return range.contains(date);
                        });
                    }

                    function getMinDateAndPricePair(leadFares, maxStops) {
                        var minLeadFare = _.min(leadFares, function (leadFare) {
                            return (maxStops === 0)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                        });
                        return { //todo into model
                              totalFareAmount: (maxStops === 0)? minLeadFare.lowestNonStopFare: minLeadFare.lowestFare
                            , date: moment(minLeadFare.departureDateTime, moment.ISO_8601)
                        };
                    }

                    function getMaxAvailableDate(leadFares) {
                        var maxAvailableDateString = leadFares.reduce(function (maxAvailableDate, leadFare) {
                            if (_.isUndefined(maxAvailableDate) || (leadFare.departureDateTime > maxAvailableDate)) {
                                return leadFare.departureDateTime;
                            }
                        });
                        return moment(maxAvailableDateString, moment.ISO_8601);
                    }

                    function buildLeadPrices(leadFaresForRange, maxStops) {
                        return leadFaresForRange.reduce(function (acc, leadFare) {
                            var dateKey = moment(leadFare.departureDateTime, moment.ISO_8601).toString();
                            var leadPrice = (maxStops === 0)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                            acc[dateKey] = leadPrice;
                            return acc;
                        }, {});
                    }

                    return {
                        getLeadPricesForRange: function (searchCriteria, range) {
                            return $q(function(resolve, reject) {
                                var dataFromCache = leadFaresCache.get(searchCriteria);
                                if (dataFromCache) {
                                    var leadFaresForRange = sliceLeadFares(dataFromCache, range);
                                    var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.maxStops);
                                    return resolve(leadPrices);
                                }
                                var webServiceRequestOptions = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                    LeadPriceCalendarWebService.get(webServiceRequestOptions).$promise.then(
                                        function(response) {
                                            var leadFares = parser.parse(response); //TODO variables naming
                                            leadFaresCache.put(searchCriteria, leadFares);
                                            var leadFaresForRange = sliceLeadFares(leadFares, range);
                                            var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.maxStops);
                                            return resolve(leadPrices);
                                        },
                                        function(error) {
                                            //TODO? put result of 404 in cache also?
                                            return reject(error);
                                        }
                                    );
                            });
                        },
                        getMinDateAndPricePair: function (searchCriteria) { //todo for now assume it is called after getLeadPricesForRange
                            var dataFromCache = leadFaresCache.get(searchCriteria);
                            if (_.isUndefined(dataFromCache)) {
                                throw new Error('trying to get aggregate from lead prices data while first call not done yet'); //TODO handle
                            }
                            return getMinDateAndPricePair(dataFromCache, searchCriteria.maxStops);
                        },
                        getMaxAvailableDate: function (searchCriteria) {
                            var dataFromCache = leadFaresCache.get(searchCriteria);
                            if (_.isUndefined(dataFromCache)) {
                                throw new Error('trying to get aggregate from lead prices data while first call not done yet'); //TODO handle
                            }
                            return getMaxAvailableDate(dataFromCache);
                        }

                    };
                }
            ])
            .factory('FareForecastResponseParser', function () {
                return {
                    parse: function (response) {
                        var recommendation = response.Recommendation;
                        return new FareForecast(recommendation);
                    }
                };
            })
            .factory('FareForecastDataService', [
                      '$q'
                    , 'FareForecastWebService'
                    , 'FareForecastResponseParser'
                , function (
                      $q
                    , FareForecastWebService
                    , FareForecastResponseParser) {

                function translateSearchCriteriaIntoRequestParams(searchCriteria) {
                    return {
                          origin: searchCriteria.getFirstLeg().origin
                        , destination: searchCriteria.getFirstLeg().destination
                        , departuredate: searchCriteria.getFirstLeg().departureDateTime.format('YYYY-MM-DD')
                        , returndate: searchCriteria.getSecondLeg().departureDateTime.format('YYYY-MM-DD')
                    };
                }

                return {
                    getFareForecast: function (searchCriteria) {
                        return $q(function(resolve, reject) {
                            var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                            FareForecastWebService.get(requestParams).$promise.then(
                                function (response) {
                                    var fareForecast = FareForecastResponseParser.parse(response);
                                    resolve(fareForecast);
                                },
                                function (error) {
                                    reject(error);
                                }
                            );
                        });
                    }
                };
            }])
            .factory('FareRangeDataService', [
                      '$q'
                    , 'FareRangeWebService'
                , function (
                      $q
                    , FareRangeWebService
                ) {

                    function translateSearchCriteriaIntoRequestParams(searchCriteria, departureDateRangeRange) {
                        return {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , earliestdeparturedate: departureDateRangeRange.start.format('YYYY-MM-DD')
                            , latestdeparturedate: departureDateRangeRange.end.format('YYYY-MM-DD')
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        };
                    }

                    return {
                        getFareRange: function (searchCriteria, departureDateRangeRange) {
                            return $q(function(resolve, reject) {
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria, departureDateRangeRange);
                                FareRangeWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        resolve(response);
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            });
                        }
                    };
            }])

});
