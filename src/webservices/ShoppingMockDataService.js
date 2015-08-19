define([
          'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/OTAResponseParser'
        , 'text!webservices/fixtures/SampleBFMResponse.json' //TODO test code in production code, move to integration tests
    ],
    function (
          angular
        , SabreDevStudioWebServicesModule
        , OTAResponseParser
        , SampleBFMResponse
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('ShoppingMockDateService', [
                      '$q'
                , function (
                      $q
                ) {

                    var parser = new OTAResponseParser();

                    return {
                        getItineraries: function() {
                            var itinerariesList = parser.parse(JSON.parse(SampleBFMResponse).Resource);
                            return $q.when(itinerariesList)
                        },
                        validateSearchCriteria: angular.noop
                    }
            }]);
    });
