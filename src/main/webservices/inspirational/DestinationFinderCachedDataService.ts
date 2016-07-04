define([
        'angular'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/inspirational/DestinationFinderDataService'
    ],
    function (
        angular
        , _
        , SabreDevStudioWebServicesModule
        , DestinationFinderDataServiceSrc
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('DestinationFinderCachedDataService', [
                'DestinationFinderDataService'
                , function (
                    DestinationFinderDataService
                ) {
                    const cachedDataServiceFn = _.memoize(DestinationFinderDataService.getPricesForDestinations, JSON.stringify);

                    return {
                        getPricesForDestinations: function (searchCriteria) {
                            return cachedDataServiceFn(searchCriteria);
                        }
                    };
                }]);

    });