define([
          'util/LodashExtensions'
        , 'angular'
        , 'moment'
        , 'moment_range'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'webservices/BargainFinderMaxRequestFactory'
        , 'webservices/BFMResponseParser'
        , 'webservices/BrandedBFMResponseParser'
        , 'datamodel/ItinerariesList'
        , 'util/NGPromiseUtils'
    ],
    function (
          _
        , angular
        , moment
        , moment_range
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , BargainFinderMaxRequestFactory
        , BFMResponseParser
        , BrandedBFMResponseParser
        , ItinerariesList
        , NGPromiseUtils
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('BargainFinderMaxDataService', [
                      '$q'
                    , 'BargainFinderMaxWebService'
                    , 'BargainFinderMaxAlternateDateWebService'
                , function (
                      $q
                    , bfmWebService
                    , bfmAltDatesWebService
                ) {

                    function getItineraries(searchCriteria) {
                        if (!searchCriteria.isAlternateDatesRequest()) {
                            return getDataFromService(bfmWebService, searchCriteria);
                        }
                        // alternate dates requests
                        if (searchCriteria.isAlternateDatesRequest()) { //TODO split this service into plain date search and AD search (interface segregation principle)
                            if (searchCriteria.returnAlternateDatesOnly) {
                                return getDataFromService(bfmAltDatesWebService, searchCriteria);
                            } else { // call both Alt Dates BFM and normal BFM
                                var searchCriteriaWithoutDateFlexibility = searchCriteria.getCopyWithoutDateFlexibility();
                                var bfmDataPromise = getDataFromService(bfmWebService, searchCriteriaWithoutDateFlexibility);
                                var bfmAltDatesDataPromise = getDataFromService(bfmAltDatesWebService, searchCriteria);
                                return $q.mergePromises([bfmDataPromise, bfmAltDatesDataPromise], itinerariesListMergingFn, otaResponseErrorsMergingFn);
                            }
                        }
                    }

                    var bfmBrandedRequestFactory = new BargainFinderMaxRequestFactory();
                    bfmBrandedRequestFactory.requestBrandedFares = true;
                    var brandedItinerariesParser = new BrandedBFMResponseParser();

                    function getBrandedItineraries(searchCriteria) {
                        var bfmBrandedRequest = bfmBrandedRequestFactory.createRequest(searchCriteria);
                        return $q(function(resolve, reject) {
                            bfmWebService.sendRequest(bfmBrandedRequest).then(
                                function (response) {
                                    var itinerariesList = brandedItinerariesParser.parse(response);
                                    resolve(itinerariesList);
                                },
                                function (reason) {
                                    var businessErrorMessages = brandedItinerariesParser.getBusinessErrorMessages(reason.data.message);
                                    reject(businessErrorMessages);
                                }
                            );
                        });
                    }

                    function getAlternateDatesPriceMatrix(searchCriteria) {
                        if (!searchCriteria.isAlternateDatesRequest()) {
                            throw new Error('Calling Alternative Dates service for non alternative dates request');
                        }
                        var bfmRequest = bfmRequestFactory.createRequest(searchCriteria);
                        return $q(function(resolve, reject) {
                            bfmAltDatesWebService.sendRequest(bfmRequest).then(
                                function (response) {
                                    var alternateDatesPriceMatrix = parser.extractAlternateDatesPriceMatrix(response);
                                    resolve(alternateDatesPriceMatrix);
                                },
                                function (reason) {
                                    var businessErrorMessages = parser.getBusinessErrorMessages(reason.data.message);
                                    reject(businessErrorMessages);
                                }
                            );
                        });
                    }

                    var bfmRequestFactory = new BargainFinderMaxRequestFactory();

                    var parser = new BFMResponseParser();

                    function getDataFromService(webService, searchCriteria) {
                        var bfmRequest = bfmRequestFactory.createRequest(searchCriteria);
                        return $q(function(resolve, reject) {
                            webService.sendRequest(bfmRequest).then(
                                function (response) {
                                    var itinerariesList = parser.parse(response);
                                    resolve(itinerariesList);
                                },
                                function (reason) {
                                    var businessErrorMessages = parser.getBusinessErrorMessages(reason.data.message);
                                    reject(businessErrorMessages);
                                }
                            );
                        });
                    }

                    function itinerariesListMergingFn(first, second) {
                        first = first || new ItinerariesList();
                        return first.addItinerariesListWithDedup(second);
                    }

                    function otaResponseErrorsMergingFn(first, second) {
                        first = first || [];
                        return _.unique(_.pushAll(first, second));
                    }

                    return {
                        getItineraries: getItineraries,
                        getBrandedItineraries: getBrandedItineraries,
                        getAlternateDatesPriceMatrix: getAlternateDatesPriceMatrix,
                        validateSearchCriteria: function () {}
                    };
            }]);
    });
