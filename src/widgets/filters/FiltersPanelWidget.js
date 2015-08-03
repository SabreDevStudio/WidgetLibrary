define([
          'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/FiltersPanelWidget.tpl.html'
    ],
    function (
          moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , FiltersPanelWidgetTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FiltersPanelCtrl', [
                      '$scope'
                    , 'FilteringCriteriaChangedBroadcastingService'
                    , 'resetAllFiltersEvent'
                , function(
                      $scope
                    , FilteringCriteriaChangedBroadcastingService
                    , resetAllFiltersEvent
                ) {

                    // stores all current filtering function, as a mapping of unique filterId to its filtering function
                    // is updated per filter, on filter change
                    // the values of this map are all current filtering functions
                    var currentFilteringFunctions = {};

                    this.updateFilteringFunction = function (filterId, newFilteringFunction) {
                        currentFilteringFunctions[filterId] = newFilteringFunction;
                        FilteringCriteriaChangedBroadcastingService.filteringFunctions = _.values(currentFilteringFunctions);
                        FilteringCriteriaChangedBroadcastingService.broadcast();
                    };

                    $scope.resetAllFilters = function () {
                        $scope.$broadcast(resetAllFiltersEvent);
                    };

                }
            ])
            .directive('filtersPanel', function () {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    scope: true,
                    template: FiltersPanelWidgetTemplate,
                    controller: 'FiltersPanelCtrl'
                }
            });
    });
