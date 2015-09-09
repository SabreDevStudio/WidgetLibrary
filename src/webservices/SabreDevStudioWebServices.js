define([ //TODO too long
          'angular'
        , 'util/LodashExtensions'
        , 'moment'
        , 'moment_range'
        , 'webservices/InstaflightResponseParser'
        , 'webservices/OTAResponseParser'
        , 'util/BaseServices'
        , 'webservices/AuthenticationService' // without it interceptor modules that use it do not not load
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'datamodel/FareForecast'
        , 'datamodel/ShoppingData'
        , 'datamodel/AlternateDatesRoundTripPriceMatrix'
        , 'webservices/AdvancedCalendarRequestFactory'
        , 'webservices/AdvancedCalendarRequestFactoryForAltDates'
        , 'webservices/InstaflightSearchCriteriaValidator'
        , 'webservices/AdvancedCalendarSearchCriteriaValidator'
        , 'webservices/LeadPriceCalendarSearchCriteriaValidator'
        , 'webservices/TravelInsightEngineSearchCriteriaValidator'
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
        , AlternateDatesRoundTripPriceMatrix
        , AdvancedCalendarRequestFactory
        , AdvancedCalendarRequestFactoryForAltDates
        , InstaflightSearchCriteriaValidator
        , AdvancedCalendarSearchCriteriaValidator
        , LeadPriceCalendarSearchCriteriaValidator
        , TravelInsightEngineSearchCriteriaValidator
    ) {
        'use strict';

        var HTTP_NETWORK_ERROR_MSG = 'Unable to communicate with the Sabre Dev Studio';

        var errorsStandardHandler = function(reason) {
            if (reason.status == 0) {
                return [HTTP_NETWORK_ERROR_MSG];
            }
            var businessErrorMessage = reason.data.message; //TODO replicate this pattern reason.data.message to all data services
            return [businessErrorMessage];
        };

        var travelInsightEngineSearchCriteriaValidator = new TravelInsightEngineSearchCriteriaValidator();

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
                var requestBuilderForAltDates = new AdvancedCalendarRequestFactoryForAltDates();

                var responseParser = new OTAResponseParser();

                var validator = new AdvancedCalendarSearchCriteriaValidator();

                function createCacheKey(searchCriteria) {
                    var keyElements = [
                          searchCriteria.getFirstLeg().origin
                        , searchCriteria.getFirstLeg().destination
                        , searchCriteria.getLengthOfStay()
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
                            var advancedCalendarRequest = requestBuilder.createRequest(searchCriteria);
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
                                    return reject(errorsStandardHandler(error));
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
                                    shoppingData.markRequestedData(cacheKey, range.start, range.end);//TODO range is not defined!!
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
                    getAlternateDatesPriceMatrix: function (searchCriteria) {
                        if (!searchCriteria.isAlternateDatesRequest()) {
                            throw new Error('Calling Alternative Dates service for non alternative dates request');
                        }
                        var advancedCalendarRequest = requestBuilderForAltDates.createRequest(searchCriteria);
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
                    , 'pointOfSaleCountry'
                , function (
                      $q
                    , InstaFlightsWebService
                    , dateFormat
                    , pointOfSaleCountry
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

                        if (_.isDefined(searchCriteria.maxStops)) {
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
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    return {
                        getItineraries: function(searchCriteria) {
                            return $q(function(resolve, reject) {
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
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return validator.validate(searchCriteria);
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
                                , currency: fareInfo.CurrencyCode
                            };
                        });
                    },
                    extractAlternateDatesPriceMatrix: function (response) {
                        return response.FareInfo
                            .map(function (fareInfo) {
                                return {
                                      departureDate: moment(fareInfo.DepartureDateTime, moment.ISO_8601)
                                    , returnDate: moment(fareInfo.ReturnDateTime, moment.ISO_8601)
                                    , price: fareInfo.LowestFare
                                    , currency: fareInfo.CurrencyCode
                                };
                            }).reduce(function (altDatePriceMatrix, travelDatesWithLeadPrice) {
                                    altDatePriceMatrix.addLeadFareForDate(travelDatesWithLeadPrice);
                                    return altDatePriceMatrix;
                            }, new AlternateDatesRoundTripPriceMatrix());
                    },
                    getBusinessErrorMessages: function (response) {
                        return response;
                    }
                };
            })
            .factory('LeadPriceCalendarDataService', [
                      '$q'
                    , '$cacheFactory'
                    , 'LeadPriceCalendarWebService'
                    , 'LeadPriceCalendarResponseParser'
                    , 'pointOfSaleCountry'
                , function (
                      $q
                    , $cacheFactory
                    , LeadPriceCalendarWebService
                    , parser
                    , pointOfSaleCountry
                ) {

                    var leadFaresCache = $cacheFactory('leadPricesCache');

                    var validator = new LeadPriceCalendarSearchCriteriaValidator();

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        var requestOptions = {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        };
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    function translateSearchCriteriaIntoAlternateDatesRequestOptions(searchCriteria) {
                        var departureDates = searchCriteria.getRequestedDepartureDates();
                        var lengthOfStays = searchCriteria.getRequestedLengthOfStayValues();
                        lengthOfStays = lengthOfStays.filter(travelInsightsEngineAcceptedLengthOfStayValues);

                        var centralDateRequestLengthOfStay = searchCriteria.getLengthOfStay();
                        var MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS = 10;
                        if (lengthOfStays.length > MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS) {
                            lengthOfStays = filterOutMostDistantLoS(lengthOfStays, centralDateRequestLengthOfStay, MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS);
                        }
                        // Note that such combining of departure dates with all length of stays is the superset of what search criteria specified
                        // (we are producing more combinations), but the interface to Lead Price Calendar does not allow specifying length of stays per departure date
                        var requestOptions = {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: departureDates.map(function (date) {
                                return date.format('YYYY-MM-DD');
                            }).join(',')
                            , lengthofstay: lengthOfStays.join(',')
                        };
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    function travelInsightsEngineAcceptedLengthOfStayValues(LoS) {
                        return (LoS <=16);
                    }

                    function filterOutMostDistantLoS(candidatesIncludingOriginal, original, maxCount) {

                        function distanceToOriginalLengthOfStay(candidate) {
                            return Math.abs(original - candidate);
                        }

                        var sorted = _.sortBy(candidatesIncludingOriginal, distanceToOriginalLengthOfStay);
                        return _.slice(sorted, 0, maxCount);
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
                            var dateKey = moment(leadFare.departureDateTime, moment.ISO_8601).format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                            var leadPrice = (maxStops === 0)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                            acc[dateKey] = leadPrice; //TSZ
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
                                            return reject(errorsStandardHandler(error));
                                        }
                                    );
                            });
                        },
                        getAlternateDatesPriceMatrix: function(searchCriteria) {
                            if (!searchCriteria.isAlternateDatesRequest()) {
                                throw new Error('Calling Alternative Dates service for non alternative dates request');
                            }
                            var webServiceRequestOptions = translateSearchCriteriaIntoAlternateDatesRequestOptions(searchCriteria);
                            return $q(function(resolve, reject) {
                                LeadPriceCalendarWebService.get(webServiceRequestOptions).$promise.then(
                                    function (response) {
                                        var alternateDatesPriceMatrix = parser.extractAlternateDatesPriceMatrix(response);
                                        resolve(alternateDatesPriceMatrix);
                                    },
                                    function (reason) {
                                        var businessErrorMessages = parser.getBusinessErrorMessages(reason.data.message);
                                        reject(businessErrorMessages);
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return validator.validate(searchCriteria);
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
                                    function (reason) {
                                        if (reason.status == 0) {
                                            return reject([HTTP_NETWORK_ERROR_MSG]);
                                        }
                                        var businessErrorMessage = reason.data.message;
                                        reject([businessErrorMessage]); //TODO data services always return arr of errors, not string.
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                        }
                    };
            }])
            .factory('LowFareHistoryDataService', [
                      '$q'
                    , 'LowFareHistoryWebService'
                , function (
                      $q
                    , LowFareHistoryWebService
                ) {

                    function translateSearchCriteriaIntoRequestParams(searchCriteria) {
                        return {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: searchCriteria.getTripDepartureDateTime().format('YYYY-MM-DD')
                            , returndate: searchCriteria.getTripReturnDateTime().format('YYYY-MM-DD')
                        };
                    }

                    function parseResponse(rs) {
                        var historicalPrices = rs.FareInfo.map(function (fareInfo) {
                           return {
                                 lowestFare: fareInfo.LowestFare
                               , lowestNonStopFare: fareInfo.LowestNonStopFare
                               , dateOfShopping: moment(fareInfo.ShopDateTime, moment.ISO_8601)
                           };
                        });
                        return {
                              origin: rs.OriginLocation
                            , destination: rs.DestinationLocation
                            , currency: rs.FareInfo[0].CurrencyCode
                            , historicalPrices: historicalPrices
                        };
                    }

                    return {
                      getLowFareHistory: function (searchCriteria) {
                          return $q(function(resolve, reject) {
                              var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                              LowFareHistoryWebService.get(requestParams).$promise.then(
                                  function (response) {
                                      var lowFareHistory = parseResponse(response);
                                      resolve(lowFareHistory);
                                  },
                                  function (reason) {
                                      if (reason.status == 0) {
                                          return reject([HTTP_NETWORK_ERROR_MSG]);
                                      }
                                      var businessErrorMessage = reason.data.message; //TODO replicate this pattern reason.data.message to all data services
                                      reject([businessErrorMessage]);
                                  }
                              );
                          });
                      },
                      validateSearchCriteria: function (searchCriteria) {
                          return travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                      }
                    };
                }]);

});
