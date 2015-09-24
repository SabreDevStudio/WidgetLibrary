define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'widgets/BaseController'
        , 'text!view-templates/widgets/LowFareHistory.tpl.html'
        , 'widgets/GlobalChartsConfiguration'
    ],
    function (
          moment
        , angular
        , _
        , angular_bootstrap
        , SDSWidgets
        , BaseController
        , LowFareHistoryTemplate
        , GlobalChartsConfiguration
    ) {
        'use strict';

        var chartInstance;

        var chartData;

        return angular.module('sdsWidgets')
            .controller('LowFareHistoryCtrl', [
                      '$scope'
                    , 'LowFareHistoryDataService'
                    , 'ValidationErrorsReportingService'
                    , 'newSearchCriteriaEvent'
                    , 'SearchCriteriaBroadcastingService'
                    , 'globalChartStyleConfiguration'
                    , 'customToStringFunction'
                , function (
                        $scope
                      , LowFareHistoryDataService
                      , validationErrorsReportingService
                      , newSearchCriteriaEvent
                      , searchCriteriaBroadcastingService
                      , globalChartStyleConfiguration
                      , customToStringFunction
                ) {
                    var searchService = {
                          executeSearch: LowFareHistoryDataService.getLowFareHistory
                        , validateSearchCriteria: LowFareHistoryDataService.validateSearchCriteria
                    };

                    BaseController.call(this, {
                          scope: $scope
                        , searchService: searchService
                        , validationErrorsReportingService: validationErrorsReportingService
                        , newSearchCriteriaEvent: newSearchCriteriaEvent
                        , searchCriteriaBroadcastingService: searchCriteriaBroadcastingService
                    });
                    this.prototype = Object.create(BaseController.prototype);
                    this.prototype.constructor = this.constructor;

                     function initializeEmptyModel() {
                        chartData = {
                            labels: [],
                            datasets: [{
                                  fillColor: globalChartStyleConfiguration.fillColor // Data mixed with the view because it is the only way to specify fill color (and stroke color) in Chart.js, see http://stackoverflow.com/questions/17155072/default-visual-style-in-chart-js-bar-chart
                                , data: []
                            }]
                        };
                    }

                    initializeEmptyModel();

                    this.processSearchResults = function (lowFareHistory) {
                        chartData.labels = _.pluck(lowFareHistory.historicalPrices, 'dateOfShopping').map(customToStringFunction.toString).reverse();
                        chartData.datasets[0].data = _.pluck(lowFareHistory.historicalPrices, 'lowestFare').reverse();
                        chartInstance.initialize(chartData);
                    };

                    this.clearModel = function () {
                        _.remove(chartData.labels);
                        chartData.datasets.forEach(function (dataset) {
                            _.remove(dataset.data);
                        });
                        chartInstance.initialize(chartData);
                    };

                    this.isAnyDataToDisplayAvailable = function () {
                        return !(_.isEmpty(chartData.datasets[0].data));
                    };

                }
            ])
            .directive('lowFareHistory', [
                    'ChartsFactory'
                , function (
                    chartsFactory
                ) {
                return {
                    restrict: 'EA',
                    scope: true,
                    replace: false,
                    template: LowFareHistoryTemplate,
                    controller: 'LowFareHistoryCtrl',
                    controllerAs: 'ctrl',
                    link: function (scope, element, attrs) {

                        chartInstance = chartsFactory.createBarChart(element, chartData);

                        scope.executeLifeSearchOnPredefinedCriteriaIfPresent(attrs.origin, attrs.destination, attrs.departureDate, attrs.returnDate);
                    }
                }
            }]);
    });
