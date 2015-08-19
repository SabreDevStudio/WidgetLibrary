define([
          'lodash'
        , 'angular'
        , 'angular_resource'
        , 'webservices/AuthenticationService'
        , 'ngPromiseExtras'
    ],
    function (
          _
        , angular
        , angular_resource
        , AuthenticationService
        , ngPromiseExtras
    ) {
        'use strict';

        function isNonGetAuthTokenCallToRestAPI(currentURL, apiURL) {
            return (_.startsWith(currentURL, apiURL) && !_.startsWith(currentURL, 'https://api.test.sabre.com/v1/auth/token')); //todo tmp hardcode
        }

        return angular.module('sabreDevStudioWebServices', ['ngResource', 'configuration', 'NGPromiseUtils'])
            .constant('dateTimeFormat', 'YYYY-MM-DDTHH:mm:ss') // //"2015-04-11T00:00:00",
            .constant('dateFormat', 'YYYY-MM-DD') // //"2015-04-11T00:00:00",
            .factory('AuthTokenDecoratorHttpInterceptor', [
                      '$q'
                    , '$injector'
                    , 'apiURL'
                , function (
                      $q
                    , $injector
                    , apiURL
                ) {
                return {
                    request: function (config) {
                        //injected manually to get around circular dependency problem.
                        var AuthenticationService = $injector.get('AuthenticationService');
                        if (isNonGetAuthTokenCallToRestAPI(config.url, apiURL)) {
                            return $q(function(resolve) {
                                AuthenticationService.getToken().then(function (token) {
                                    config.headers['Authorization'] = "Bearer " + token;
                                    resolve(config);
                                });
                            });
                        }
                        return config;
                    }
                };
            }])
            .factory('ResponseTimeLoggerHttpInterceptor', ['$log', 'apiURL', function ($log, apiURL) {
                    var timeStart, timeEnd;//todo: what is we have 2 concurrent http requests?
                    return {
                        request: function (config) {
                            if (isNonGetAuthTokenCallToRestAPI(config.url, apiURL)) {
                                timeStart = performance.now();
                            }
                            return config;
                        },
                        response: function (response) {
                            if (isNonGetAuthTokenCallToRestAPI(response.config.url, apiURL)) {
                                timeEnd = performance.now();
                                var duration = Math.round(timeEnd - timeStart);
                                $log.debug("http call time: " + duration + " millis");
                            }
                            return response;
                        }
                    };
                }])
            .config(function ($httpProvider) {
                //$httpProvider.interceptors.push('AuthTokenDecoratorHttpInterceptor');
                $httpProvider.interceptors.push('ResponseTimeLoggerHttpInterceptor');
            });
    });
