define([
          'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
    ],
    function (
          angular
        , moment
        , _
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('DestinationPricerDataService', [
                  '$q'
                , 'DestinationPricerWebService'
                , 'StandardErrorHandler'
                , 'pointOfSaleCountry'
                , function (
                      $q
                    , DestinationPricerWebService
                    , StandardErrorHandler
                    , pointOfSaleCountry
                ) {
                    function translateSearchCriteriaIntoRequestParams(searchCriteria) {
                        var requestedPointOfSaleCountry = (searchCriteria.pointOfSaleCountry) && searchCriteria.pointOfSaleCountry || (pointOfSaleCountry.length > 0) && pointOfSaleCountry;
                        var requestOptions = {
                            destination: searchCriteria.destination
                        };
                        if (requestedPointOfSaleCountry) {
                            _.extend(requestOptions, {
                                pointofsalecountry: requestedPointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    return {
                        getPricesToDestination: function (searchCriteria) {
                            return $q(function(resolve, reject) {
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                                DestinationPricerWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        resolve(response);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        }
                    };
                }])

    });