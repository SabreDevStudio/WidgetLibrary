define([
        'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/fareNabber/FareNabberResourceDefinitions'
    ],
    function (
        angular
        , SabreDevStudioWebServicesModule
        , FareNabberResourceDefinitions
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionMappingService', [
                  '$q'
                , 'ErrorReportingService'
                , 'businessMessagesErrorHandler'
                , 'FareNabberSubscriptionMappingResource'
                , function (
                      $q
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                    , FareNabberSubscriptionMappingResource
                ) {
                return   {
                    save: function (subscriptionMappingServiceRequest) {
                        return $q(function(resolve, reject) {
                            FareNabberSubscriptionMappingResource.save(subscriptionMappingServiceRequest).$promise.then(
                                resolve
                                , function (reason) {
                                    ErrorReportingService.reportError('Unable to save the mapping of subscriptionId into email in the subscription mapping service');
                                    businessMessagesErrorHandler.handle(reject, reason);
                                });
                        })
                    }
                };
            }])
    });