define([
        'angular',
        'webservices/SabreDevStudioWebServicesModule',
        'widgets/inspirational/ThemedDestinationFinderWidget.ctr',
        'widgets/inspirational/TilesThemedDestinationFinderWidget.drv',
        'widgets/inspirational/MapThemedDestinationFinderWidget.drv',
        'util/CommonGenericFilters',
        'widgets/inspirational/ThemedInspirationalSearchCriteriaBroadcastingService.srv',
        'widgets/inspirational/ThemedInspirationalSearchCompleteBroadcastingService.srv',
        'widgets/inspirational/TravelThemesSelectionBar.drv',
        'angular_google_maps'
    ],
    function (
        angular,
        webServicesModule,
        ThemedDestinationFinderWidgetController,
        TilesThemedDestinationFinderWidgetDirective,
        MapThemedDestinationFinderWidgetDirective,
        CommonGenericFiltersModule,
        ThemedInspirationalSearchCriteriaBroadcastingService,
        ThemedInspirationalSearchCompleteBroadcastingService,
        TravelThemesSelectionBarDirective,
        angularGoogleMapsModule
    ) {
        'use strict';

        return angular.module('sdsWidgets.inspirationalWidgets', [
            'sabreDevStudioWebServices',
            'commonFilters',
            'uiGmapgoogle-maps'
        ])
            .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
                uiGmapGoogleMapApiProvider.configure({
                    v: '3' // per Google recommendations use just v3, to always get latest stable version. Do not specify specific versions line 3.23, as over time they become retired
                });
            }])
            .constant('newThemedInspirationalSearchCriteriaEvent', 'newThemedInspirationalSearchCriteriaEvent')
            .constant('themedInspirationalSearchCompleteEvent', 'themedInspirationalSearchCompleteEvent')
            .service('ThemedInspirationalSearchCriteriaBroadcastingService', ThemedInspirationalSearchCriteriaBroadcastingService)
            .service('ThemedInspirationalSearchCompleteBroadcastingService', ThemedInspirationalSearchCompleteBroadcastingService)
            .directive('travelThemesSelectionBar', TravelThemesSelectionBarDirective)
            .controller('ThemedDestinationFinderWidgetController', ThemedDestinationFinderWidgetController)
            .directive('tilesThemedDestinationFinder', TilesThemedDestinationFinderWidgetDirective)
            .directive('mapThemedDestinationFinder', MapThemedDestinationFinderWidgetDirective)
    }
);