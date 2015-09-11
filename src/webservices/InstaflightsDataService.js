define([
          'angular'
        , 'util/LodashExtensions'
        , 'moment'
        , 'moment_range'
        , 'webservices/InstaflightResponseParser'
        , 'webservices/OTAResponseParser'
        , 'util/BaseServices'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'webservices/InstaflightSearchCriteriaValidator'
    ],
    function (
          angular
        , _
        , moment
        , moment_range
        , InstaflightsResponseParser
        , OTAResponseParser
        , BaseServices
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , InstaflightSearchCriteriaValidator
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('InstaflightsDataService', [
                      '$q'
                    , 'InstaFlightsWebService'
                    , 'dateFormat'
                    , 'pointOfSaleCountry'
                , function (
                      $q
                    , InstaFlightsWebService
                    , dateFormat
                    , pointOfSaleCountry
                ) {
                    var parser = new InstaflightsResponseParser();

                    var validator = new InstaflightSearchCriteriaValidator();

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        var requestOptions = {
                              origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: searchCriteria.getFirstLeg().departureDateTime.format(dateFormat)
                            , returndate: searchCriteria.getSecondLeg().departureDateTime.format(dateFormat)
                        };
                        if (searchCriteria.preferredAirlines.length > 0) {
                            _.extend(requestOptions, {
                                includedcarriers: searchCriteria.preferredAirlines.join()
                            });
                        }

                        if (_.isDefined(searchCriteria.maxStops)) {
                            _.extend(requestOptions, {
                                  outboundflightstops: searchCriteria.maxStops
                                , inboundflightstops: searchCriteria.maxStops
                            });
                        }
                        if (searchCriteria.optionsPerDay) {
                            _.extend(requestOptions, {
                                limit: searchCriteria.optionsPerDay
                            });
                        }
                        if (searchCriteria.passengerSpecifications.length > 0) {
                            _.extend(requestOptions, {
                                passengercount: searchCriteria.getTotalPassengerCount()
                            });
                        }
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    return {
                        getItineraries: function(searchCriteria) {
                            return $q(function(resolve, reject) {
                                var webServiceRequest = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                InstaFlightsWebService.get(webServiceRequest).$promise.then(
                                    function (response) {
                                        var itinerariesList = parser.parse(response);
                                        resolve(itinerariesList);
                                    },
                                    function (reason) {
                                        var businessErrorMessage = reason.data.message;
                                        reject(businessErrorMessage);
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return validator.validate(searchCriteria);
                        }
                    };

                }])
});
