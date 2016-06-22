define([
        'angular',
        'webservices/SabreDevStudioWebServicesModule',
        'widgets/inspirational/ThemedDestinationFinderWidget.drv',
        'util/CommonGenericFilters',
        'widgets/inspirational/ThemedInspirationalSearchCriteriaBroadcastingService.srv',
        'widgets/inspirational/ThemedInspirationalSearchCompleteBroadcastingService.srv',
        'widgets/inspirational/TravelThemesSelectionBar.drv'
    ],
    function (
        angular,
        webServicesModule,
        ThemedDestinationFinderWidgetDirective,
        CommonGenericFiltersModule,
        ThemedInspirationalSearchCriteriaBroadcastingService,
        ThemedInspirationalSearchCompleteBroadcastingService,
        TravelThemesSelectionBarDirective
    ) {
        'use strict';

        return angular.module('sdsWidgets.inspirationalWidgets', ['sabreDevStudioWebServices', 'commonFilters'])
            .constant('newThemedInspirationalSearchCriteriaEvent', 'newThemedInspirationalSearchCriteriaEvent')
            .constant('themedInspirationalSearchCompleteEvent', 'themedInspirationalSearchCompleteEvent')
            .service('ThemedInspirationalSearchCriteriaBroadcastingService', ThemedInspirationalSearchCriteriaBroadcastingService)
            .service('ThemedInspirationalSearchCompleteBroadcastingService', ThemedInspirationalSearchCompleteBroadcastingService)
            .directive('themedDestinationFinder', ThemedDestinationFinderWidgetDirective)
            .directive('travelThemesSelectionBar', TravelThemesSelectionBarDirective)
    }
);