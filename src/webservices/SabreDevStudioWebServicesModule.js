define([
          'lodash'
        , 'angular'
        , 'angular_resource'
        , 'ngPromiseExtras'
        , 'ngStorage'
        , 'text!view-templates/partials/ErrorsModal.tpl.html'
    ],
    function (
          _
        , angular
        , angular_resource
        , ngPromiseExtras
        , ngStorage
        , ErrorsModalTemplate
    ) {
        'use strict';

        function isAPIrequest(currentURL, apiURL) {
            return _.startsWith(currentURL, apiURL);
        }

        return angular.module('sabreDevStudioWebServices', ['ngResource', 'configuration', 'NGPromiseUtils', 'ngStorage'])
            .constant('dateTimeFormat', 'YYYY-MM-DDTHH:mm:ss')
            .constant('dateFormat', 'YYYY-MM-DD')
            .constant('errorEvent', 'errorEvent')
            .factory('businessMessagesErrorHandler', ['ErrorReportingService', function (ErrorReportingService) {
                function identityAsArray(arg) {
                    return [arg];
                }
                return {
                    handle: function(reject, reason, errorParsingFn) {
                        errorParsingFn = errorParsingFn || identityAsArray;
                        if (reason.data !== null) {
                            var businessErrorMessages = errorParsingFn(reason.data.message);
                            ErrorReportingService.reportErrors(businessErrorMessages);
                        }
                        return reject(businessErrorMessages);
                    }
                }
            }])
            .service('ErrorReportingService', ['$rootScope', 'errorEvent', function ($rootScope, errorEvent) {
                return {
                    reportError: function (error, searchCriteria) {
                        $rootScope.$broadcast(errorEvent, [error], searchCriteria);
                    },
                    reportErrors: function (errorsArray, searchCriteria) {
                        $rootScope.$broadcast(errorEvent, errorsArray, searchCriteria);
                    }
                };
            }])
            .factory('ValidationErrorReportingService', [
                '$modal'
                , function ($modal) {
                    return {
                        reportErrors: function (errors, errorsCategory) {
                            $modal.open({
                                animation: true,
                                template: ErrorsModalTemplate,
                                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                                    $scope.errorsList = errors;
                                    $scope.modalTitle = errorsCategory;

                                    $scope.ok = function () {
                                        $modalInstance.close();
                                    };
                                }]
                            });
                        }
                    };
                }])
            .factory('NetworkConnectivityErrorInterceptor', ['$q', 'ErrorReportingService', function ($q, ErrorReportingService) {
                var COMMUNICATION_GENERIC_ERROR_MSG = 'Unable to communicate with the Sabre Dev Studio';
                var COMMUNICATION_TIMEOUT_ERROR_MSG = 'Timeout calling Sabre Dev Studio';
                var minimalCommunicationTimeMillisToDetectTimeout = 300;
                return {
                    responseError: function (reason) {
                        if (reason.status !== 0) {
                            return $q.reject(reason);
                        }
                        if (reason.config.timeout && reason.config.timeoutClockStart) {
                            var httpCallDuration = Math.round(performance.now() - reason.config.timeoutClockStart);
                            if ((httpCallDuration > minimalCommunicationTimeMillisToDetectTimeout) && (httpCallDuration >= reason.config.timeout)) {
                                ErrorReportingService.reportError(COMMUNICATION_TIMEOUT_ERROR_MSG);
                                return $q.reject(reason);
                            }
                        }
                        ErrorReportingService.reportError(COMMUNICATION_GENERIC_ERROR_MSG);
                        return $q.reject(reason);
                    }
                }
            }])
            .factory('ResponseTimeLoggerHttpInterceptor', ['$q', '$log', 'apiURL', function ($q, $log, apiURL) {
                function logHttpCallTime(config) {
                    if (isAPIrequest(config.url, apiURL) && config.timeStart) {
                        var timeEnd = performance.now();
                        var duration = Math.round(timeEnd - config.timeStart);
                        $log.debug("http call time: " + duration + " millis");
                    }
                }

                return {
                    request: function (config) {
                        if (isAPIrequest(config.url, apiURL)) {
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
            .factory('AddTimeoutOnHttpCommunicationInterceptor', ['defaultTimeoutMillis', function (defaultTimeoutMillis) {
                return {
                    request: function(config) {
                        config.timeout = config.timeout || defaultTimeoutMillis;
                        config.timeoutClockStart = performance.now();
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
    });
