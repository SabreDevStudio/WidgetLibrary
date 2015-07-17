define([
          'angular'
        , 'angular_resource'
        , 'util/LodashExtensions'
        , 'moment'
        , 'stache!request-templates/AdvancedCalendarRequest.json'
        , 'Configuration'
        , 'webservices/advancedCalendar/AdvancedCalendarResponseParser'
        , 'util/BaseServices'
        , 'webservices/AuthenticationService'
        , 'webservices/SabreDevStudioWebServicesModule'
    ],
    function (
          angular
        , angular_resource
        , _
        , moment
        , requestTemplate
        , ConfigurationDummy
        , AdvancedCalendarResponseParser
        , BaseServices
        , AuthenticationService
        , SabreDevStudioWebServicesModule
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
                , 'AuthenticationService'
            , function ($q, $resource, credentials, $cacheFactory, AuthenticationService) {
                var endpointURL = credentials.apiURL + '/v1.8.1/shop/calendar/flights';

                var responseCache = $cacheFactory('AdvancedCalendarSearchServiceCache');

                var resource = $resource(endpointURL, null, {
                    sendRequest: {method: 'POST', headers: generalHeaders
                        ,transformRequest: function (webServiceRequestOptions, headersGetter) {
                            webServiceRequestOptions.fromDate = webServiceRequestOptions.requestStartDate.format('YYYY-MM-DD');
                            webServiceRequestOptions.toDate = webServiceRequestOptions.requestEndDate.format('YYYY-MM-DD');
                            var webServiceRequestPayload = requestTemplate(webServiceRequestOptions); //todo remove mustache request template, must be domain object, but how to wrap it into NG?
                            angular.extend(headersGetter(), {'Authorization': 'Bearer ' + webServiceRequestOptions.token}); //TODO ugly, but also cannot pass custom header in $resource call
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
                            AuthenticationService.getToken().then(function (token) {
                                var requestOptions = angular.extend({}, webServiceRequestOptions, {
                                    token: token
                                });
                                resource.sendRequest({}, requestOptions).$promise.then(
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
                            })
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
                    getLeadPricesForRange: function (searchCriteria, rangeStartDate, rangeEndDate) {
                        return $q(function(resolve, reject) {
                            var cacheKey = createCacheKey(searchCriteria);
                            var optionsFromCache = ShoppingOptionsCacheService.getLeadPricesForRange(cacheKey, rangeStartDate, rangeEndDate);
                            if (_.size(optionsFromCache) > 0) {
                                return resolve(optionsFromCache);
                            }
                            var webServiceRequestOptions = searchCriteriaTransformer.translateSearchCriteriaIntoRequestOptions(searchCriteria);
                            AdvancedCalendarSearchService.sendRequest(webServiceRequestOptions).then(
                                function (shoppingData) {
                                    var shoppingData = responseParser.parseResponse(shoppingData, rangeStartDate, rangeEndDate, cacheKey); //todo parser should not know of request dates or cache key: add one more transformation. parser should only create itineraries list
                                    ShoppingOptionsCacheService.addUpdate(shoppingData);
                                    var leadPricesForRange = shoppingData.getLeadPricesForRange(cacheKey, rangeStartDate, rangeEndDate);
                                    console.log(leadPricesForRange);
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
                        return response;
                    }
                };
            })
            .factory('LeadPriceCalendarDataService', [
                      '$q'
                    , 'LeadPriceCalendarWebService'
                    , 'LeadPriceCalendarResponseParser'
                , function (
                      $q
                    , LeadPriceCalendarWebService
                    , parser
                ) {

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        return {
                              origin: searchCriteria.origin
                            , destination: searchCriteria.destination
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        }
                    }

                    function sliceLeadPrices(leadPrices, range) { //TODO into data model object: LeadPrices
                        var leadPrices = {};
                        leadPrices.forEach(function (price, dayString) {
                            var date = moment(dayString, moment.ISO_8601);
                            if (range.contains(date)) {
                                _.extend(leadPrices, {dayString: price});
                            }
                        });
                        return leadPrices;
                    }

                    return {
                        getLeadPricesForRange: function (searchCriteria, range) {
                            return $q(function(resolve, reject) {
                                var webServiceRequestOptions = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                    LeadPriceCalendarWebService.sendRequest(webServiceRequestOptions).then(
                                        function(response) {
                                            var leadPrices = parser.parse(response);
                                            var leadPricesForRange = sliceLeadPrices(leadPrices, range);
                                            return resolve(leadPricesForRange);
                                        },
                                        function(error) {
                                            return reject(error);
                                        }
                                    );
                            });
                        }
                    };
                }
            ])
            .factory('LeadPriceCalendarWebService', [
                      '$q'
                    , '$resource'
                    , 'credentials'
                    , 'AuthenticationService'
                , function (
                      $q
                    , $resource
                    , credentials
                    , AuthenticationService
                ) {
                var endpointURL = credentials.apiURL + '/v1/shop/flights/fares';
                var resource = $resource(endpointURL, {}, {
                    get: {
                          method:'GET'
                        , cache: true
                        , headers: {
                            'Authorization': 'Bearer ' + requestOptions.token
                        }
                        //, transformRequest: function (requestOptions, headersGetter) {
                        //    angular.extend(headersGetter(), {'Authorization': 'Bearer ' + requestOptions.token});
                        //    return requestOptions;
                        //}
                    }
                });
                return {
                    sendRequest: function (webServiceRequestOptions) {
                        return $q(function (resolve, reject) {
                            AuthenticationService.getToken().then(function (token) {
                                var requestOptionsWithToken = angular.extend({}, webServiceRequestOptions, {
                                    token: token
                                });
                                resource.get(requestOptionsWithToken).$promise.then(
                                    function (response) {
                                        resolve(response);
                                    },
                                    function (error) {
                                        reject(error);
                                    }
                                );
                            });
                        });
                    }
                };
            }]);

        //.factory('FareForecastWebService', ['$resource', 'credentials', function ($resource, credentials) {
            //    var endpointURL = credentials.apiURL + '/v1/forecast/flights/fares';
            //    var resource =  $resource(endpointURL, null, {
            //        sendRequest: {method: 'GET', headers: generalHeaders} //TODO transformRequest here and here request building from skeleton!
            //    });
            //}]);
});
