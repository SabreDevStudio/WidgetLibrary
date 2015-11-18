define([
        'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/fareNabber/FareNabberResourceDefinitions'
        , 'webservices/fareNabber/FareNabberSubscriptionRequestBuilder'
    ],
    function (
        angular
        , SabreDevStudioWebServicesModule
        , FareNabberResourceDefinitions
        , FareNabberSubscriptionRequestBuilderSrc
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionService', [
                  '$q'
                , 'ErrorReportingService'
                , 'businessMessagesErrorHandler'
                , 'FareNabberSubscriptionRequestBuilder'
                , 'FareNabberSubscriptionResource'
                , function (
                      $q
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                    , FareNabberSubscriptionRequestBuilder
                    , FareNabberSubscriptionResource
                ) {
                return   {
                    subscribe: function (fareNabberFormData) {
                        var xmlRequest = FareNabberSubscriptionRequestBuilder.build(fareNabberFormData);
                        return $q(function(resolve, reject) {
                            FareNabberSubscriptionResource.save(xmlRequest).$promise.then(function (response) {
                                var subscriptionResponse = {
                                    subscriptionId: response.plainText
                                    , email: fareNabberFormData.subscriberEmail // mirroring email it in the response as it will be needed by the next handler in the workflow
                                };
                                resolve(subscriptionResponse);
                            }, function (error) {
                                ErrorReportingService.reportError('Unable to create subscription: ' + error.status + ': ' + error.statusText); // we do not use standard error handler as this service reports errors differently
                                reject(error);
                            });
                        })
                    }
                };
            }])
    });