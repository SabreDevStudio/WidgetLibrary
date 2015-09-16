define([
          'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'datamodel/FareForecast'
        , 'webservices/TravelInsightEngineSearchCriteriaValidator'
    ],
    function (
          angular
        , moment
        , _
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , FareForecast
        , TravelInsightEngineSearchCriteriaValidator
    ) {
        'use strict';

        var travelInsightEngineSearchCriteriaValidator = new TravelInsightEngineSearchCriteriaValidator();

        return angular.module('sabreDevStudioWebServices')
            .factory('FareForecastResponseParser', function () {
                return {
                    parse: function (response) {
                        var recommendation = response.Recommendation;
                        return new FareForecast(recommendation);
                    }
                };
            })
            .factory('FareForecastDataService', [
                  '$q'
                , 'FareForecastWebService'
                , 'FareForecastResponseParser'
                , 'StandardErrorHandler'
                , function (
                      $q
                    , FareForecastWebService
                    , FareForecastResponseParser
                    , StandardErrorHandler) {

                    function translateSearchCriteriaIntoRequestParams(searchCriteria) {
                        return {
                            origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: searchCriteria.getFirstLeg().departureDateTime.format('YYYY-MM-DD')
                            , returndate: searchCriteria.getSecondLeg().departureDateTime.format('YYYY-MM-DD')
                        };
                    }

                    return {
                        getFareForecast: function (searchCriteria) {
                            return $q(function(resolve, reject) {
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                                FareForecastWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        var fareForecast = FareForecastResponseParser.parse(response);
                                        resolve(fareForecast);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        }
                    };
                }])
            .factory('FareRangeDataService', [
                  '$q'
                , 'FareRangeWebService'
                , 'StandardErrorHandler'
                , function (
                      $q
                    , FareRangeWebService
                    , StandardErrorHandler
                ) {
                    function translateSearchCriteriaIntoRequestParams(searchCriteria, departureDateRangeRange) {
                        return {
                            origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , earliestdeparturedate: departureDateRangeRange.start.format('YYYY-MM-DD')
                            , latestdeparturedate: departureDateRangeRange.end.format('YYYY-MM-DD')
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        };
                    }

                    return {
                        getFareRange: function (searchCriteria, departureDateRangeRange) {
                            return $q(function(resolve, reject) {
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria, departureDateRangeRange);
                                FareRangeWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        resolve(response);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                        }
                    };
                }])
            .factory('LowFareHistoryDataService', [
                  '$q'
                , 'LowFareHistoryWebService'
                , 'StandardErrorHandler'
                , 'pointOfSaleCountry'
                , function (
                      $q
                    , LowFareHistoryWebService
                    , StandardErrorHandler
                    , pointOfSaleCountry
                ) {

                    function translateSearchCriteriaIntoRequestParams(searchCriteria) {
                        var requestOptions = {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: searchCriteria.getTripDepartureDateTime().format('YYYY-MM-DD')
                            , returndate: searchCriteria.getTripReturnDateTime().format('YYYY-MM-DD')
                        };
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    function parseResponse(rs) {
                        var historicalPrices = rs.FareInfo.map(function (fareInfo) {
                            return {
                                lowestFare: fareInfo.LowestFare
                                , lowestNonStopFare: fareInfo.LowestNonStopFare
                                , dateOfShopping: moment(fareInfo.ShopDateTime, moment.ISO_8601)
                            };
                        });
                        return {
                            origin: rs.OriginLocation
                            , destination: rs.DestinationLocation
                            , currency: rs.FareInfo[0].CurrencyCode
                            , historicalPrices: historicalPrices
                        };
                    }

                    return {
                        getLowFareHistory: function (searchCriteria) {
                            return $q(function(resolve, reject) {
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                                LowFareHistoryWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        var lowFareHistory = parseResponse(response);
                                        resolve(lowFareHistory);
                                    },
                                    function (error) {
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                        }
                    };
                }]);

    });