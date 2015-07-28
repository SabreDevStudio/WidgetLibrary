define([
          'moment'
        , 'moment_range'
        , 'lodash'
        , 'angular'
        , 'angular_moment'
        , 'widgets/SDSWidgets'
        , 'widgets/fareTrendChart/ChartConfiguration'
        , 'text!view-templates/FareTrendChartWidget.tpl.html'
        , 'datamodel/ShoppingData'
        , 'webservices/SabreDevStudioWebServices'
    ],
    function (
          moment
        , moment_range
        , _
        , angular
        , angular_moment
        , SDSWidgets
        , ChartConfiguration
        , FareTrendChartWidgetTemplate
        , ShoppingData
        , SabreDevStudioWebServices
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareTrendChartCtrl', [
                      '$scope'
                    , 'DateService'
                    , 'SearchCriteriaBroadcastingService'
                    , 'newSearchCriteriaEvent'
                    , 'AdvancedCalendarDataService'
                    //, 'LeadPriceCalendarDataService'
                    , 'chartConfigurationOptions'
                , function ( //controller exposed globally to angular for unit testing
                      $scope
                    , $DateService
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , ShoppingDataService
                    , chartConfigurationOptions) {

                var DEFAULT_NUMBER_OF_WEEKS_TO_DISPLAY = 2;

                var numberOfWeeksToDisplay = $scope.numberOfWeeksToDisplay || DEFAULT_NUMBER_OF_WEEKS_TO_DISPLAY;

                var firstDayDisplayedCap = $DateService.now().startOf('day');

                var lastDayDisplayedCap;

                var currentSearchCriteria;

                initializeModel();

                updateStateOfNavigationLinks();

                function initializeModel() {
                    // main model object, storing prices used by the charting library (directive) to draw the fare trend chart
                    $scope.prices = [{
                        key: "",
                        values: []
                    }];
                    $scope.graphOptions = {
                        chart: chartConfigurationOptions
                    };

                    $scope.lastSearchCriteria = {};

                    var firstDayDisplayed = firstDayDisplayedCap.clone();
                    var lastDayDisplayed = calculateLastDayDisplayed(firstDayDisplayed);
                    $scope.displayedRange = moment.range(firstDayDisplayed, lastDayDisplayed);
                }

                function calculateLastDayDisplayed(firstDayDisplayed) {
                    return firstDayDisplayed.clone().add(numberOfWeeksToDisplay, 'weeks').subtract(1, 'day');
                }


                // @Controller: main controller function, acting on new search criteria sent to the widget
                $scope.$on(newSearchCriteriaEvent, function () {
                    var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;
                    ShoppingDataService.getLeadPricesForRange(newSearchCriteria, $scope.displayedRange).then(function (leadPrices) {
                        currentSearchCriteria = newSearchCriteria;
                        $scope.minDateAndPricePair = ShoppingDataService.getMinDateAndPricePair(newSearchCriteria);

                        $scope.departureAirport = newSearchCriteria.getFirstLeg().origin;
                        $scope.arrivalAirport = newSearchCriteria.getFirstLeg().destination;//TSZ

                        lastDayDisplayedCap = ShoppingDataService.getMaxAvailableDate(newSearchCriteria);

                        updateModelWithLeadPrices(leadPrices);
                    });
                });

                $scope.isAnyDataToDisplayAvailable = function () {
                    var firstDataSeries = _.first($scope.prices).values;
                    return !_.isEmpty(firstDataSeries);
                };

                // @Controller: event handler when earlier days are requested
                $scope.onEarlierRequested = function () {
                    shiftRangePresented(-numberOfWeeksToDisplay);
                };

                // @Controller: event handler when later days are requested
                $scope.onLaterRequested = function () {
                    shiftRangePresented(numberOfWeeksToDisplay);
                };

                function shiftRangePresented (requestedWeeksOffset) {
                    var requestedDaysOffset = requestedWeeksOffset * 7;
                    requestedDaysOffset = trimOffsetToObeyLastDayDisplayedCap(requestedDaysOffset);
                    $scope.displayedRange.start.add(requestedDaysOffset, 'days');
                    $scope.displayedRange.end = calculateLastDayDisplayed($scope.displayedRange.start);
                    ShoppingDataService.getLeadPricesForRange(currentSearchCriteria, $scope.displayedRange).then(function(leadPrices) {
                        updateModelWithLeadPrices(leadPrices);
                    });
                }

                function trimOffsetToObeyLastDayDisplayedCap(requestedDaysOffset) {
                    if (requestedDaysOffset > 0) {
                        var numberOfLaterDaysLeftToPresent = lastDayDisplayedCap.diff($scope.displayedRange.end, 'days');
                        return (numberOfLaterDaysLeftToPresent < requestedDaysOffset)? numberOfLaterDaysLeftToPresent : requestedDaysOffset;
                    }
                    if (requestedDaysOffset < 0) {
                        var numberOfEarlierDaysLeftToPresent = $scope.displayedRange.start.diff(firstDayDisplayedCap, 'days');
                        return (numberOfEarlierDaysLeftToPresent < Math.abs(requestedDaysOffset))? -numberOfEarlierDaysLeftToPresent: requestedDaysOffset; // requestedDaysOffset is negative (moving to past) so the returned numberOfEarlierDaysLeftToPresent must be also negative if returned as offset value
                    }
                }

                function updateModelWithLeadPrices(leadPrices) {
                    // function transforming strings representing departure dates into Date objects. Date objects are needed for the charting library
                    var parseDepartureDateStrings = function (dataPoint) {
                        var dateAsString = dataPoint[0];
                        var date = moment(dateAsString, ShoppingData.DATE_FORMAT_FOR_KEYS).toDate();
                        return [date, dataPoint[1]];
                    };
                    _.first($scope.prices).values = _.pairs(leadPrices).map(parseDepartureDateStrings);

                    updateStateOfNavigationLinks();
                }

                function updateStateOfNavigationLinks() {
                    $scope.prevLinkActive = $scope.displayedRange.start.isAfter(firstDayDisplayedCap);
                    $scope.nextLinkActive = $scope.displayedRange.end.isBefore(lastDayDisplayedCap);
                }

                }])
            .directive('fareTrendChart', function () {
                return {
                    restrict: 'A',
                    scope: {
                        numberOfWeeksToDisplay: '@'
                    },
                    template: FareTrendChartWidgetTemplate,
                    controller: 'FareTrendChartCtrl'
                };
            });

});