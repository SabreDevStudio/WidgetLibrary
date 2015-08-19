define([
          'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'widgets/BaseController'
        , 'text!view-templates/LowFareHistory.tpl.html'
        , 'widgets/GlobalChartsConfiguration'
        , 'chartjs'
    ],
    function (
          moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , BaseController
        , LowFareHistoryTemplate
        , GlobalChartsConfiguration
        , Chart
    ) {
        'use strict';

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
                        , validateSearchCriteria: function (searchCriteria) {
                            return LowFareHistoryDataService.validateSearchCriteria(searchCriteria);
                        }
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
                        $scope.chartData = {
                            labels: [],
                            datasets: [{
                                  fillColor: globalChartStyleConfiguration.fillColor
                                , data: []
                            }]
                        };
                    }

                    initializeEmptyModel();

                    this.processSearchResults = function (lowFareHistory) {
                        $scope.chartData.labels = _.pluck(lowFareHistory.historicalPrices, 'dateOfShopping').map(customToStringFunction.toString).reverse();
                        $scope.chartData.datasets[0].data = _.pluck(lowFareHistory.historicalPrices, 'lowestFare').reverse();
                        $scope.chartInstance.initialize($scope.chartData);
                    };

                    this.clearModel = function () {
                        _.remove($scope.chartData.labels);
                        $scope.chartData.datasets.forEach(function (dataset) {
                            _.remove(dataset.data);
                        });
                        $scope.chartInstance.initialize($scope.chartData);
                    };

                    this.updateModelWithSearchCriteria = function (searchCriteria) {
                        this.departureAirport = searchCriteria.getFirstLeg().origin;
                        this.arrivalAirport = searchCriteria.getFirstLeg().destination;
                    };

                    this.isAnyDataToDisplayAvailable = function () {
                        return !(_.isEmpty($scope.chartData.datasets[0].data));
                    };

                }
            ])
            .directive('lowFareHistory', [
                      '$timeout'
                    , 'globalChartStyleConfiguration'
                    , 'globalBarChartConfiguration'
                , function (
                      $timeout
                    , globalChartStyleConfiguration
                    , globalBarChartConfiguration
                ) {
                return {
                    restrict: 'EA',
                    scope: true,
                    replace: false,
                    template: LowFareHistoryTemplate,
                    controller: 'LowFareHistoryCtrl',
                    controllerAs: 'ctrl',
                    link: function (scope, element) {

                        prepareChartInstance();

                        scope.executeLifeSearchOnPredefinedCriteriaIfPresent(element.attr('origin'), element.attr('destination'), element.attr('departure-date'), element.attr('return-date'));

                        //TODO next 2 methods are dup with lead fare calendar
                        function prepareChartInstance() {
                            var canvas = angular.element(element).find('canvas');
                            var ctx = canvas.get(0).getContext("2d");

                            adjustCanvasCSSStyleToMatchParent(canvas);

                            scope.chartInstance = new Chart(ctx).Bar(scope.chartData, globalBarChartConfiguration);
                        }

                        /** Need to dynamically adjust width of canvas to match the parent element width.
                         * Left padding is also added for better look.
                         * @param canvas
                         */
                        function adjustCanvasCSSStyleToMatchParent(canvas) {
                            var parentWidth = parseInt(canvas.parent().width());
                            var leftPadding = globalChartStyleConfiguration.leftPadding;
                            canvas.css('max-width', (parentWidth - leftPadding) + 'px'); //setting max-width, as width is them overwritten
                            canvas.css('padding-left', leftPadding + 'px');
                        }
                    }
                }
            }]);
    });
