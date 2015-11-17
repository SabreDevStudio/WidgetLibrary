define([
        'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/fareNabber/FareNabberResourceDefinitions'
        , 'webservices/fareNabber/FareNabberSubscriptionRequestBuilder'
        , 'x2js'
    ],
    function (
        angular
        , moment
        , _
        , SabreDevStudioWebServicesModule
        , FareNabberResourceDefinitions
        , FareNabberSubscriptionRequestBuilderSrc
        , X2JS
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionService', [
                  '$q'
                , 'ErrorReportingService'
                , 'businessMessagesErrorHandler'
                , 'FareNabberSubscriptionRequestBuilder'
                , 'FareNabberResponseParser'
                , 'FareNabberSubscriptionResource'
                , function (
                      $q
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                    , FareNabberSubscriptionRequestBuilder
                    , FareNabberResponseParser
                    , FareNabberSubscriptionResource
                ) {
                return   {
                    subscribe: function (fareNabberSubscription) {
                        var xmlRequest = FareNabberSubscriptionRequestBuilder.build(fareNabberSubscription);
                        return $q(function(resolve, reject) {
                            FareNabberSubscriptionResource.post(xmlRequest).then(function (successfulResponseXml) {
                                var subscriptionResponse = FareNabberResponseParser.parse(successfulResponseXml);
                                resolve(subscriptionResponse);
                            }, function (errorResponseXml) {
                                var error = FareNabberResponseParser.parseError(errorResponseXml);
                                ErrorReportingService.reportError(error);
                                businessMessagesErrorHandler.handle(reject, error);
                            });
                        })
                    }
                };
            }])
            .factory('FareNabberResponseParser', function () {
                var x2js = new X2JS();
                return {
                    parse: function (successfulResponseXml) {
                        return x2js.xml2json(successfulResponseXml);
                    },
                    parseError: function (errorResponseXml) {
                        return x2js.xml2json(errorResponseXml);
                    }
                };
            });
    });