define([
        'angular',
        'angular_bootstrap',
        'widgets/filters/FiltersPanel.ctr',
        'widgets/filters/FiltersPanel.drv',
        'widgets/filters/ValuesFilterDirective'
    ],
    function (
        angular,
        angular_bootstrap,
        FiltersPanelCtrl,
        FiltersPanelDirective,
        ValuesFilterDirective
) {
        'use strict';

        return angular.module('sdsWidgets.filterPanel', [])
            .service('FilterIdGeneratorService', function () {
                var seqNumber = 0;
                return {
                    next: function () {
                        return seqNumber++;
                    }
                };
            })
            .controller('FiltersPanelCtrl', [
                '$scope',
                'FilteringCriteriaChangedBroadcastingService',
                'resetAllFiltersEvent',
                FiltersPanelCtrl
            ])
            .directive('filterPanel', FiltersPanelDirective)
            .directive('valuesFilter', [
                'StatisticsGatheringRequestsRegistryService',
                'itinerariesStatisticsUpdateNotification',
                'ItineraryStatisticsBroadcastingService',
                'FilterIdGeneratorService',
                'resetAllFiltersEvent',
                ValuesFilterDirective])
    }
);