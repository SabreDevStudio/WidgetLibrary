define([
        'lodash'
        , 'angular'
        , 'angular_resource'
        , 'Configuration'
        , 'webservices/SabreDevStudioWebServicesModule'
    ],
    function (
        _
        , angular
        , angular_resource
        , Configuration
        , SabreDevStudioWebServicesModule

    ) {
        'use strict';

        var generalHeaders = {
            'Content-Type' : 'application/XML'
        };

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionResource', [
                '$resource'
                , 'fareNabberApiURL'
                , function (
                    $resource
                    , fareNabberApiURL
                ) {
                    var endpointURL = fareNabberApiURL;

                    return $resource(endpointURL, null, {
                        post: {
                              method: 'POST'
                            , headers: generalHeaders
                            , timeout: 30000
                        }
                    });
                }])
    });
