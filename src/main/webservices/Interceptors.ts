import _ = require('lodash')
import angular = require('angular')

function Interceptor () {

    function isAPIrequest(currentURL, apiURL) {
        return _.startsWith(currentURL, apiURL);
    }

    return angular.module('sabreDevStudioWebServices')
        .factory('NetworkConnectivityErrorInterceptor', ['$q', 'NetworkErrorReportingService', 'selectedCountryConfigs', function ($q, ErrorReportingService, selectedCountryConfigs) {
            var COMMUNICATION_GENERIC_ERROR_MSG = _.template('Unable to communicate with <%= endpoint %>');
            var COMMUNICATION_TIMEOUT_ERROR_MSG = _.template('Timeout calling <%= endpoint %>'); //

            function translateKnownEndpoints(endpoint) {
                return (endpoint.indexOf(selectedCountryConfigs.apiURL) > -1)? 'Sabre Dev Studio': endpoint;
            }

            var minimalCommunicationTimeMillisToDetectTimeout = 300;
            return {
                responseError: function (reason) {
                    if (!isAPIrequest(reason.config.url, selectedCountryConfigs.apiURL)) {
                        return $q.reject(reason);
                    }
                    if (reason.status !== 0) {
                        return $q.reject(reason);
                    }
                    var errorMessageElements = {
                        endpoint: translateKnownEndpoints(reason.config.url)
                    };
                    if (reason.config.timeout && reason.config.timeoutClockStart) {
                        var httpCallDuration = Math.round(performance.now() - reason.config.timeoutClockStart);
                        if ((httpCallDuration > minimalCommunicationTimeMillisToDetectTimeout) && (httpCallDuration >= reason.config.timeout)) {
                            ErrorReportingService.reportError(COMMUNICATION_TIMEOUT_ERROR_MSG(errorMessageElements));
                            return $q.reject(reason);
                        }
                    }
                    ErrorReportingService.reportError(COMMUNICATION_GENERIC_ERROR_MSG(errorMessageElements));
                    return $q.reject(reason);
                }
            }
        }])
        .factory('ResponseTimeLoggerHttpInterceptor', ['$q', '$log', 'selectedCountryConfigs', function ($q, $log, selectedCountryConfigs) {
            function logHttpCallTime(config) {
                if (isAPIrequest(config.url, selectedCountryConfigs.apiURL) && config.timeStart) {
                    var timeEnd = performance.now();
                    var duration = Math.round(timeEnd - config.timeStart);
                    $log.debug("http call time: " + duration + " millis");
                }
            }

            return {
                request: function (config) {
                    if (isAPIrequest(config.url, selectedCountryConfigs.apiURL)) {
                        config.timeStart = performance.now();
                    }
                    return config;
                },
                response: function (response) {
                    logHttpCallTime(response.config);
                    return response;
                },
                responseError: function (reason) {
                    logHttpCallTime(reason.config);
                    return $q.reject(reason);
                }
            };
            }])
        .constant('defaultTimeoutMillis', 5000)
        .factory('AddTimeoutOnHttpCommunicationInterceptor', ['defaultTimeoutMillis', 'selectedCountryConfigs', function (defaultTimeoutMillis, selectedCountryConfigs) {
            return {
                request: function(config) {
                    if (isAPIrequest(config.url, selectedCountryConfigs.apiURL)) {
                        config.timeout = config.timeout || defaultTimeoutMillis;
                        config.timeoutClockStart = performance.now();
                    }
                    return config;
                }
            }
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(
                  'ResponseTimeLoggerHttpInterceptor'
                , 'NetworkConnectivityErrorInterceptor'
                , 'AddTimeoutOnHttpCommunicationInterceptor'
            );
        }]);
}

export = Interceptor;
