define([
          'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'datamodel/FareForecast'
        , 'webservices/common/validators/TravelInsightEngineSearchCriteriaValidator'
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
                , 'ErrorReportingService'
                , 'ValidationErrorReportingService'
                , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , FareForecastWebService
                    , FareForecastResponseParser
                    , ErrorReportingService
                    , ValidationErrorReportingService
                    , businessMessagesErrorHandler
                ) {

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
                                var validationErrors = travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                                if (validationErrors.length > 0) {
                                    ValidationErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                                    return reject(validationErrors);
                                }
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                                FareForecastWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        var fareForecast = FareForecastResponseParser.parse(response);
                                        resolve(fareForecast);
                                    },
                                    function (reason) {
                                        ErrorReportingService.reportError('Could not get fare forecast', searchCriteria);
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
                            });
                        }
                    };
                }])
            .factory('FareRangeDataService', [
                  '$q'
                , 'FareRangeWebService'
                , 'ErrorReportingService'
                , 'ValidationErrorReportingService'
                , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , FareRangeWebService
                    , ErrorReportingService
                    , ValidationErrorReportingService
                    , businessMessagesErrorHandler
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
                                var validationErrors = travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                                if (validationErrors.length > 0) {
                                    ValidationErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                                    return reject(validationErrors);
                                }
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria, departureDateRangeRange);
                                FareRangeWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        resolve(response);
                                    },
                                    function (reason) {
                                        ErrorReportingService.reportError('Could not get fare range', searchCriteria);
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
                            });
                        }
                    };
                }])
            .factory('LowFareHistoryDataService', [
                  '$q'
                , 'LowFareHistoryWebService'
                , 'pointOfSaleCountry'
                , 'ErrorReportingService'
                , 'ValidationErrorReportingService'
                , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , LowFareHistoryWebService
                    , pointOfSaleCountry
                    , ErrorReportingService
                    , ValidationErrorReportingService
                    , businessMessagesErrorHandler
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
                                var validationErrors = travelInsightEngineSearchCriteriaValidator.validate(searchCriteria);
                                if (validationErrors.length > 0) {
                                    ValidationErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                                    return reject(validationErrors);
                                }
                                var requestParams = translateSearchCriteriaIntoRequestParams(searchCriteria);
                                LowFareHistoryWebService.get(requestParams).$promise.then(
                                    function (response) {
                                        var lowFareHistory = parseResponse(response);
                                        resolve(lowFareHistory);
                                    },
                                    function (reason) {
                                        ErrorReportingService.reportError('Could not get low fare history', searchCriteria);
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
                            });
                        }
                    };
                }]);

    });