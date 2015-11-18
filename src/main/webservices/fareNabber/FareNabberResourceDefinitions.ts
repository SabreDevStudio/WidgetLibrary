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

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionResource', [
                      '$resource'
                    , 'fareNabberApiURL'
                , function (
                      $resource
                    , fareNabberApiURL
                ) {
                    return $resource(fareNabberApiURL, null, {
                        save: {
                              method: 'POST'
                            , headers: {
                                'Content-Type' : 'application/xml'
                            }
                            , transformResponse: function (data) { // needed becasue service returns plain text and angular resource tries to parse it into json, thus splitting number digits into separate one character properties
                                return {plainText: angular.fromJson(data)}
                            }
                            , timeout: 12000
                        }
                    });
                }])
            .factory('FareNabberSubscriptionMappingResource', [
                      '$resource'
                    , 'subscriptionMappingServiceURL'
                , function (
                      $resource
                    , subscriptionMappingServiceURL
                ) {
                    return $resource(subscriptionMappingServiceURL, null, {
                        save: {
                            method: 'POST'
                            , headers: {
                                'Content-Type' : 'application/json'
                            }
                            , timeout: 12000
                        }
                    });
                }])
    });
