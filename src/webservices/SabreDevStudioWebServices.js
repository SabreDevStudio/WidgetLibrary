define([
          'angular'
        , 'angular_resource'
        , 'util/LodashExtensions'
        , 'moment'
        , 'moment_range'
        , 'stache!request-templates/AdvancedCalendarRequest.json'
        , 'Configuration'
        , 'webservices/advancedCalendar/AdvancedCalendarResponseParser'
        , 'util/BaseServices'
        , 'webservices/AuthenticationService' // TODO: seems not needed here but without it and with interceptor modules not not load
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'datamodel/FareForecast'
    ],
    function (
          angular
        , angular_resource
        , _
        , moment
        , moment_range
        , requestTemplate
        , ConfigurationDummy
        , AdvancedCalendarResponseParser
        , BaseServices
        , AuthenticationService
        , SabreDevStudioWebServicesModule
        , FareForecast
    ) {
        'use strict';

        var generalHeaders = {
            'Content-Type' : 'application/json'
        };

        return angular.module('sabreDevStudioWebServices')
            .factory('AdvancedCalendarSearchRequestOptionsTransformerFactory', function () {
                /* factory method which builds objects that perform translation of user search criteria (origin, destination, travel dates) into Advanced Calendar web service request options (first day to search, last day to search, calculate length of stay)
                   So this is the business logic what to present to customer upon their search criteria (what date ranges to present in particular).
                  */
                return {
                    build: function(options) {
                        var options = options || {};
                        var OPTIONS_DEFAULT_DATE_FORMAT = 'YYYY-M-D'; //todo constant
                        var MAX_ADVANCE_PURCHASE_DAYS_FROM_NOW = 192;
                        var dateFormat = options.dateFormat || OPTIONS_DEFAULT_DATE_FORMAT;
                        var currentDate = (options.currentDate)? moment(options.currentDate, dateFormat) : moment(); // for (unit) testing: exposing dependency on current time, which is used to determine start and end dates for call to the web service. See lastTravelDateAvailableInWebService//TODO: how to pass params initializing the service? the options?
                        var lastTravelDateAvailableInWebService = currentDate.clone().add(MAX_ADVANCE_PURCHASE_DAYS_FROM_NOW, 'days');

                        return {
                            translateSearchCriteriaIntoRequestOptions: function (searchCriteria) {
                                return {
                                      origin: searchCriteria.origin
                                    , destination: searchCriteria.destination
                                    , requestStartDate: currentDate
                                    , requestEndDate: lastTravelDateAvailableInWebService
                                    , lengthOfStay: searchCriteria.getLengthOfStay()
                                    , optionsPerDay: searchCriteria.optionsPerDay || 1
                                };
                            }
                        };
                    }
                };
            })
            .factory('AdvancedCalendarSearchService', [
                  '$q'
                , '$resource'
                , 'credentials'
                , '$cacheFactory'
            , function ($q, $resource, credentials, $cacheFactory) {
                var endpointURL = credentials.apiURL + '/v1.8.1/shop/calendar/flights';

                var responseCache = $cacheFactory('AdvancedCalendarSearchServiceCache');

                var resource = $resource(endpointURL, null, {
                    sendRequest: {method: 'POST', headers: generalHeaders
                        , transformRequest: function (webServiceRequestOptions, headersGetter) {
                            webServiceRequestOptions.fromDate = webServiceRequestOptions.requestStartDate.format('YYYY-MM-DD');
                            webServiceRequestOptions.toDate = webServiceRequestOptions.requestEndDate.format('YYYY-MM-DD');
                            var webServiceRequestPayload = requestTemplate(webServiceRequestOptions); //todo remove mustache request template, must be domain object, but how to wrap it into NG?
                            return webServiceRequestPayload;
                        }
                    }
                });
                return {
                    sendRequest: function (webServiceRequestOptions) { //todo: more generic name

                        var cacheKey = _.values(webServiceRequestOptions).toString();

                        var isErrorResponseCacheable = function (code) {
                           // do not cache responses for any other HTTP errors (on next search request will go to web service)
                           return (code === 404);
                        };

                        return $q(function(resolve, reject) {
                            // need to handle cache get and put manually, as NG handles automatically only for GET method (then provide cache property while defining resource)
                            var cached = responseCache.get(cacheKey);
                            if (cached) {
                                return resolve(cached);
                            }
                            resource.sendRequest({}, webServiceRequestOptions).$promise.then(
                                function (response) {
                                    responseCache.put(cacheKey, response);
                                    return resolve(response);
                                },
                                function (error) {
                                    if (isErrorResponseCacheable(error.status)) {
                                        responseCache.put(cacheKey, error);
                                    }
                                    return reject(error);
                                }
                            );
                        });
                    }
                };
            }])
            .factory('AdvancedCalendarDataService', [
                    '$q'
                  , 'AdvancedCalendarSearchRequestOptionsTransformerFactory'
                  , 'AdvancedCalendarSearchService'
                  , 'ShoppingOptionsCacheService'
                , function (
                      $q
                    , AdvancedCalendarSearchRequestOptionsTransformerFactory
                    , AdvancedCalendarSearchService
                    , ShoppingOptionsCacheService
                ) {
                var searchCriteriaTransformer = AdvancedCalendarSearchRequestOptionsTransformerFactory.build();
                var responseParser = new AdvancedCalendarResponseParser();

                function createCacheKey(searchCriteria) {
                    return searchCriteria.origin + '-' + searchCriteria.destination + '-' + searchCriteria.getLengthOfStay();
                }

                return {
                    getLeadPricesForRange: function (searchCriteria, range) {
                        return $q(function(resolve, reject) {
                            var cacheKey = createCacheKey(searchCriteria);
                            var optionsFromCache = ShoppingOptionsCacheService.getLeadPricesForRange(cacheKey, range.start, range.end); //TODO
                            if (_.size(optionsFromCache) > 0) {
                                return resolve(optionsFromCache);
                            }
                            var webServiceRequestOptions = searchCriteriaTransformer.translateSearchCriteriaIntoRequestOptions(searchCriteria);
                            AdvancedCalendarSearchService.sendRequest(webServiceRequestOptions).then(
                                function (shoppingData) {
                                    var shoppingData = responseParser.parseResponse(shoppingData, range.start, range.end, cacheKey); //todo parser should not know of request dates or cache key: add one more transformation. parser should only create itineraries list
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
                              origin: searchCriteria.origin
                            , destination: searchCriteria.destination
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        }
                    }

                    function sliceLeadFares(leadFares, range) { //TODO into data model object: LeadPrices
                        return leadFares.filter(function (leadFare) {
                            var date = moment(leadFare.departureDateTime, moment.ISO_8601);
                            return range.contains(date);
                        });
                    }

                    function getMinDateAndPricePair(leadFares, directFlightsOnly) {
                        var minLeadFare = _.min(leadFares, function (leadFare) {
                            return (directFlightsOnly)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                        });
                        return { //todo into model
                              totalFareAmount: (directFlightsOnly)? minLeadFare.lowestNonStopFare: minLeadFare.lowestFare
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

                    function buildLeadPrices(leadFaresForRange, directFlightsOnly) {
                        return leadFaresForRange.reduce(function (acc, leadFare) {
                            var dateKey = moment(leadFare.departureDateTime, moment.ISO_8601).toString();
                            var leadPrice = (directFlightsOnly)? leadFare.lowestNonStopFare: leadFare.lowestFare;
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
                                    var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.directFlightsOnly);
                                    return resolve(leadPrices);
                                }
                                var webServiceRequestOptions = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                    LeadPriceCalendarWebService.get(webServiceRequestOptions).$promise.then(
                                        function(response) {
                                            var leadFares = parser.parse(response); //TODO variables naming
                                            leadFaresCache.put(searchCriteria, leadFares);
                                            var leadFaresForRange = sliceLeadFares(leadFares, range);
                                            var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.directFlightsOnly);
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
                            return getMinDateAndPricePair(dataFromCache, searchCriteria.directFlightsOnly);
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
            .factory('LeadPriceCalendarWebService', [
                      '$resource'
                    , 'apiURL'
                , function (
                      $resource
                    , apiURL
                ) {
                var endpointURL = apiURL + '/v1/shop/flights/fares';
                return $resource(endpointURL, {}, {
                    get: {
                          method:'GET'
                        , cache: true
                    }
                });
            }])
            .factory('FareForecastWebService', [
                      '$resource'
                    , 'apiURL'
                , function (
                      $resource
                    , apiURL
                ) {
                var endpointURL = apiURL + '/v1/forecast/flights/fares'; //TODO dup
                return $resource(endpointURL, {}, {
                    get: {
                        method:'GET'
                        , cache: true
                    }
                });
             }])
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
                          origin: searchCriteria.origin
                        , destination: searchCriteria.destination
                        , departuredate: moment(searchCriteria.departureDate).format('YYYY-MM-DD')
                        , returndate: moment(searchCriteria.returnDate).format('YYYY-MM-DD')
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
            }]);
});
