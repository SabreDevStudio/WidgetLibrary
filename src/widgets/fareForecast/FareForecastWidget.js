define([
          'angular'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/FareForecastWidget.tpl.html'
        , 'webservices/SabreDevStudioWebServices'
    ],
    function (
          angular
        , SDSWidgets
        , FareForecastWidgetTemplate
        , SabreDevStudioWebServices
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareForecastCtrl', [
                  '$scope'
                , 'SearchCriteriaBroadcastingService'
                , 'newSearchCriteriaEvent'
                , 'FareForecastDataService'
                , function (
                      $scope
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , ShoppingDataService
                ) {

                    // only model object
                    $scope.fareForecast = {};

                    // @Controller: main controller function, acting on new search criteria sent to the widget
                    $scope.$on(newSearchCriteriaEvent, function () {
                        var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;
                        ShoppingDataService.getFareForecast(newSearchCriteria).then(function (fareForecast) {
                            $scope.fareForecast.recommendation = fareForecast.recommendation;
                        });
                    });

                    $scope.isAnyDataToDisplayAvailable = function () {
                        return ($scope.fareForecast.recommendation);
                    };

                    /**
                     * Method enforcing the business rules, defined as data attributes to the directive, whether to show wait and unknown recommendations.
                     * By default wait and unknown recommendations are not shown, unless requested by directive attributes.
                     * @returns {boolean}
                     */
                    $scope.showRecommendation = function () {
                        if ($scope.fareForecast.recommendation === 'wait') {
                            return $scope.showWaitRecommendation;
                        }
                        if ($scope.fareForecast.recommendation === 'unknown') {
                            return $scope.showUnknownRecommendation;
                        }
                        // for buy recommendation always show
                        return true;
                    };

                }])
            .directive('fareForecast', function () {
                return {
                    restrict: 'A',
                    scope: {
                          showWaitRecommendation: '@'
                        , showUnknownRecommendation: '@'
                    },
                    template: FareForecastWidgetTemplate,
                    controller: 'FareForecastCtrl'
                };
            });

    });