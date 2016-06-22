define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'util/LodashExtensions'
        , 'widgets/SDSWidgets'
        , 'widgets/BaseController'
        , 'webservices/lookup/TravelThemeLookupDataService'
        , 'webservices/inspirational/DestinationFinderSummaryDataService'
        , 'util/BaseServices'
        , 'webservices/utility/GeoSearchDataService'
        , 'webservices/utility/GeoCodeDataService'
        , 'webservices/lookup/AirportLookupDataService'
        , 'widgets/WidgetGlobalCallbacks'
        , 'util/CommonGenericFilters'
        , 'datamodel/inspirationalSearch/InspirationalSearchCriteriaFactory'
    ],
    function (
          moment
        , angular
        , _
        , __
        , SDSWidgets
        , BaseController
        , DestinationFinderDataService
        , DestinationFinderSummaryDataServiceSrc
        , BaseServices
        , GeoSearchDataServiceSrc
        , GeoCodeDataServiceSrc
        , AirportLookupDataServiceSrc
        , WidgetGlobalCallbacks
        , CommonGenericFilters
        , InspirationalSearchCriteriaFactory
    ) {
        'use strict';

        TilesThemedDestinationFinderWidgetCtr.$inject = [
            '$scope',
            '$q',
            'DestinationFinderSummaryDataService',
            'GeoSearchDataService',
            'ThemedInspirationalSearchCriteriaBroadcastingService',
            'ThemedInspirationalSearchCompleteBroadcastingService',
            'AirportLookupDataService',
            'GeoCodeDataService'];
        function TilesThemedDestinationFinderWidgetCtr(
            $scope,
            $q,
            DestinationFinderSummaryDataService,
            GeoSearchDataService,
            ThemedInspirationalSearchCriteriaBroadcastingService,
            ThemedInspirationalSearchCompleteBroadcastingService,
            AirportLookupDataService,
            GeoCodeDataService
        ) {
            var searchCriteria = InspirationalSearchCriteriaFactory.create();

            $scope.model = {
                originForPricesForDestinations: undefined,
                pricesForDestinationsGrouped: []
            };

            $scope.isAnyDataToDisplayAvailable = () => {
                return !(_.isEmpty($scope.model.pricesForDestinationsGrouped));
            };

            $scope.$on('newThemedInspirationalSearchCriteriaEvent', function () {
                var themeSearched = ThemedInspirationalSearchCriteriaBroadcastingService.searchCriteria.theme;
                var searchCompleteCallback = () => {
                    ThemedInspirationalSearchCompleteBroadcastingService.themeSearched = themeSearched;
                    ThemedInspirationalSearchCompleteBroadcastingService.broadcast();
                };
                searchDestinationsForTheme(themeSearched, searchCompleteCallback);
            });

            function searchDestinationsForTheme(theme, searchCompleteCallback) {
                var themedSearchCriteria = _.extend(searchCriteria, {
                    theme: theme
                });
                DestinationFinderSummaryDataService
                    .getOffersOrderedSummary(themedSearchCriteria)
                    .then(function (orderedSummary) {
                        $scope.model.pricesForDestinationsGrouped = orderedSummary.pricesForDestinationsGrouped;
                        $scope.model.originForPricesForDestinations = orderedSummary.originForPricesForDestinations;
                        if ($scope.controllerOptions && $scope.controllerOptions.lookupDestinationsGeoCoordinates) {
                            attachDestinationsGeoCoordinates($scope.model.pricesForDestinationsGrouped);
                        }
                    })
                    .finally(searchCompleteCallback);
            }

            //TODO modifying arg
            function attachDestinationsGeoCoordinates(pricesForDestinationsGrouped) { //TODO: allSettled and similar
                _.each(pricesForDestinationsGrouped, function (item) {
                    GeoCodeDataService.getAirportGeoCoordinates(item.destination)
                        .then((geoCoordinates) => {
                            item.geoCoordinates = geoCoordinates;
                        });
                });
            }

            var closestAirportPromise = (__.isDefined($scope.closestAirport))? $q.when($scope.closestAirport): GeoSearchDataService.getAPISupportedClosestAirport();
            closestAirportPromise
                .then(function (closestAirport) {
                    searchCriteria.origin = closestAirport;
                    return AirportLookupDataService.getAirportData(closestAirport)
                })
                .then(function (airportData) {
                    searchCriteria.pointofsalecountry = airportData.CountryCode;
                });
        }
        return TilesThemedDestinationFinderWidgetCtr;
});
