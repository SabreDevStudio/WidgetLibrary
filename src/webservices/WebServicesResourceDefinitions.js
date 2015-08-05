define([
          'angular'
        , 'angular_resource'
        , 'Configuration'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'stache!request-templates/AdvancedCalendarRequest.json'
    ],
    function (
          angular
        , angular_resource
        , Configuration
        , SabreDevStudioWebServicesModule
        , advancedCalendarRequestTemplate

    ) {
        'use strict';

        var generalHeaders = {
            'Content-Type' : 'application/json'
        };

        return angular.module('sabreDevStudioWebServices')
            .factory('AdvancedCalendarSearchService', [ // todo dup with BFM for a time, create factory for factories, when request object for advaced is introduced, like in BFM
                      '$q'
                    , '$resource'
                    , 'apiURL'
                    , '$cacheFactory'
                , function (
                      $q
                    , $resource
                    , apiURL
                    , $cacheFactory
                ) {
                    var endpointURL = apiURL + '/v1.8.1/shop/calendar/flights';

                    var responseCache = $cacheFactory('AdvancedCalendarSearchServiceCache');

                    var resource = $resource(endpointURL, null, {
                        sendRequest: {
                              method: 'POST'
                            , headers: generalHeaders
                        }
                    });
                    return {
                        sendRequest: function (request) { //todo: more generic name

                            var cacheKey = JSON.stringify(request);

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
                                resource.sendRequest({}, request).$promise.then(
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
            .factory('BargainFinderMaxSearchService', [ // todo dup with BFM for a time, create factory for factories, when request object for advaced is introduced, like in BFM
                      '$q'
                    , '$resource'
                    , 'apiURL'
                    , '$cacheFactory'
                , function (
                      $q
                    , $resource
                    , apiURL
                    , $cacheFactory
                ) {
                    var endpointURL = apiURL + '/v1.8.6/shop/flights?mode=live';

                    var responseCache = $cacheFactory('BargainFinderMaxSearchServiceCache');

                    var resource = $resource(endpointURL, null, {
                        sendRequest: {
                              method: 'POST'
                            , headers: generalHeaders
                        }
                    });
                    return {
                        sendRequest: function (bargainFinderMaxRequest) {

                            var cacheKey = JSON.stringify(bargainFinderMaxRequest);

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
                                resource.sendRequest({}, bargainFinderMaxRequest).$promise.then(
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
            .factory('InstaFlightsWebService', [
                      '$resource'
                    , 'apiURL'
                , function (
                      $resource
                    , apiURL
                ) {
                    var endpointURL = apiURL + '/v1/shop/flights';
                    return $resource(endpointURL, {}, {
                        get: {
                            method:'GET'
                            , cache: true
                        }
                    });
             }])
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
                    var endpointURL = apiURL + '/v1/forecast/flights/fares';
                    return $resource(endpointURL, {}, {
                        get: {
                            method:'GET'
                            , cache: true
                        }
                    });
            }])
            .factory('FareRangeWebService', [
                '$resource'
                , 'apiURL'
                , function (
                    $resource
                    , apiURL
                ) {
                    var endpointURL = apiURL + '/v1/historical/flights/fares';
                    return $resource(endpointURL, {}, {
                        get: {
                            method:'GET'
                            , cache: true
                        }
                    });
             }])
            .factory('AirlineLookupWebService', [
                '$resource'
                , 'apiURL'
                , function (
                    $resource
                    , apiURL
                ) {
                    var endpointURL = apiURL + '/v1/lists/utilities/airlines/';
                    return $resource(endpointURL, {}, {
                        get: {
                              method:'GET'
                            , cache: true
                        }
                    });
                }]);


    });
