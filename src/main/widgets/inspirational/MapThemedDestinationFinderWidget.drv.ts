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
        , AirportLookupDataServiceSrc
        , WidgetGlobalCallbacks
        , CommonGenericFilters
        , InspirationalSearchCriteriaFactory
    ) {
        'use strict';

        ThemedDestinationFinderWidgetDirective.$inject = [
            '$q',
            'DestinationFinderSummaryDataService',
            'GeoSearchDataService',
            'ThemedInspirationalSearchCriteriaBroadcastingService',
            'ThemedInspirationalSearchCompleteBroadcastingService',
            'AirportLookupDataService'];
        function ThemedDestinationFinderWidgetDirective(
            $q,
            DestinationFinderSummaryDataService,
            GeoSearchDataService,
            ThemedInspirationalSearchCriteriaBroadcastingService,
            ThemedInspirationalSearchCompleteBroadcastingService,
            AirportLookupDataService
        ) {
            return {
                scope: {
                    closestAirport: '@?'
                },
                templateUrl: '../widgets/view-templates/widgets/ThemedDestinationFinderWidget.tpl.html',
                link: function ($scope) {
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

                    var closestAirportPromise = (__.isDefined($scope.closestAirport))? $q.when($scope.closestAirport): GeoSearchDataService.getAPISupportedClosestAirport();
                    closestAirportPromise
                        .then(function (closestAirport) {
                            searchCriteria.origin = closestAirport;
                            return AirportLookupDataService.getAirportData(closestAirport)
                        })
                        .then(function (airportData) {
                            searchCriteria.pointofsalecountry = airportData.CountryCode;
                        });

                    WidgetGlobalCallbacks.linkComplete();
                }
            }
        }
        return ThemedDestinationFinderWidgetDirective;
});
