define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'util/LodashExtensions'
        , 'widgets/SDSWidgets'
        , 'util/BaseServices'
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
        , BaseServices
        , WidgetGlobalCallbacks
        , CommonGenericFilters
        , InspirationalSearchCriteriaFactory
    ) {
        'use strict';

        function TilesThemedDestinationFinderWidgetCtr(
            $scope,
            ClosestAirportGeoService,
            DestinationFinderSummaryDataService,
            ThemedInspirationalSearchCriteriaBroadcastingService,
            ThemedInspirationalSearchCompleteBroadcastingService
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
                    })
                    .finally(searchCompleteCallback);
            }

            ClosestAirportGeoService.getClosestAirportGeoData($scope.closestAirport)
                .then((closestAirportGeoData) => {
                    searchCriteria.origin = closestAirportGeoData.airportCode;
                    searchCriteria.pointofsalecountry = closestAirportGeoData.countryCode;
                });
        }
        return TilesThemedDestinationFinderWidgetCtr;
});
