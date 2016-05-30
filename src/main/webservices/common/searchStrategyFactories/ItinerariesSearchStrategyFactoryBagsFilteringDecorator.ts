define([
         'angular'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/common/searchStrategyFactories/ItinerariesSearchStrategyFactory'
        , 'datamodel/ItinerariesList'
    ],
    function (
         angular
        , _
        , SDSWebServices
        , delegateFactory
        , ItinerariesList
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('ItinerariesSearchStrategyFactoryBagsFilteringDecorator', [
                  'ItinerariesSearchStrategyFactory'
                , 'ErrorReportingService'
            , function (
                    delegate
                    , ErrorReportingService
            ) {
                return {
                    createSearchStrategy: function (activeSearchWebService) {
                        var delegateStrategy = delegate.createSearchStrategy(activeSearchWebService);
                        return {
                            search: function (searchCriteria, successCallback, failureCallback) {
                                if (_.isUndefined(searchCriteria.bagsRequested)) {
                                    return delegateStrategy.search(searchCriteria, successCallback, failureCallback);
                                }
                                return delegateStrategy.search(searchCriteria, function (originalItineraryList) {
                                    var filteredItins = originalItineraryList.itineraries
                                        .filter(function (itin) {
                                            return itin.getMinBaggageAllowance() === searchCriteria.bagsRequested;
                                        });
                                    var filteredItinList = new ItinerariesList();
                                    filteredItinList.addAll(filteredItins);
                                    if (filteredItinList.size() === 0) {
                                        ErrorReportingService.reportError(`Could not find itineraries with ${searchCriteria.bagsRequested} bags requested`, searchCriteria);
                                        failureCallback();
                                    } else {
                                        successCallback(filteredItinList);
                                    }
                                }, failureCallback);
                            }
                        };
                    }
                };
            }
        ]);

    });
