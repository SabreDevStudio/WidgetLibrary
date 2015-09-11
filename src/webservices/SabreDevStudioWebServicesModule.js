define([
          'lodash'
        , 'angular'
        , 'angular_resource'
        , 'ngPromiseExtras'
    ],
    function (
          _
        , angular
        , angular_resource
        , ngPromiseExtras
    ) {
        'use strict';

        function isNonGetAuthTokenCallToRestAPI(currentURL, apiURL) {
            return (_.startsWith(currentURL, apiURL) && !_.startsWith(currentURL, 'https://api.test.sabre.com/v1/auth/token')); //todo tmp hardcode
        }

        return angular.module('sabreDevStudioWebServices', ['ngResource', 'configuration', 'NGPromiseUtils'])
            .constant('dateTimeFormat', 'YYYY-MM-DDTHH:mm:ss') // //"2015-04-11T00:00:00",
            .constant('dateFormat', 'YYYY-MM-DD') // //"2015-04-11T00:00:00",
            .factory('StandardErrorHandler', function () {
                return {
                    handleError: function (reason) {
                        var HTTP_NETWORK_ERROR_MSG = 'Unable to communicate with the Sabre Dev Studio';
                        if (reason.status == 0) {
                            return [HTTP_NETWORK_ERROR_MSG];
                        }
                        var businessErrorMessage = reason.data.message; //TODO replicate this pattern reason.data.message to all data services
                        return [businessErrorMessage];
                    }
                }
            })
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
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('ResponseTimeLoggerHttpInterceptor');
            }]);
    });
