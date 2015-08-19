define([
          'angular'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/OTAResponseParser'
        //, 'text!webservices/fixtures/SampleBFMAltDatesResponse.json' //TODO test code in production code, move to integration tests
        //, 'text!webservices/fixtures/BFMAltDatesResponse_NotAllCellsFilled.json' TODO commented because not served on IIS server
    ],
    function (
          angular
        , SabreDevStudioWebServicesModule
        , OTAResponseParser
      //  , SampleBFMAltDatesResponse
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AltDatesMockDateService', [
                      '$q'
                , function (
                      $q
                ) {

                    var parser = new OTAResponseParser();

                    return {
                        getAlternateDatesPriceMatrix: function() {
                            var altDatesPriceMatrix = parser.extractAlternateDatesPriceMatrix(JSON.parse(SampleBFMAltDatesResponse).Resource);
                            return $q.when(altDatesPriceMatrix);
                        },
                        validateSearchCriteria: angular.noop
                    };
            }]);
    });
