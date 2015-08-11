define([
          'moment'
        , 'moment_range'
        , 'lodash'
        , 'angular'
        , 'angular_moment'
        , 'widgets/SDSWidgets'
        , 'widgets/GlobalChartsConfiguration'
        , 'text!view-templates/LeadPriceChartWidget.tpl.html'
        , 'datamodel/ShoppingData'
        , 'webservices/SabreDevStudioWebServices'
        , 'datamodel/SearchCriteria'
        , 'chartjs'
    ],
    function (
          moment
        , moment_range
        , _
        , angular
        , angular_moment
        , SDSWidgets
        , GlobalChartsConfiguration
        , LeadPriceChartWidgetTemplate
        , ShoppingData
        , SabreDevStudioWebServices
        , SearchCriteria
        , Chart
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('leadPriceChart', [
                      'DateService'
                    , 'SearchCriteriaBroadcastingService'
                    , 'newSearchCriteriaEvent'
                    , 'AdvancedCalendarDataService'
                    , 'LeadPriceCalendarDataService'
                    , '$timeout'
                    , 'globalBarChartConfiguration'
                    , 'globalChartStyleConfiguration'
                    , 'DateSelectedBroadcastingService'
                    , 'ErrorReportingService'
                , function (
                      DateService
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , AdvancedCalendarDataService
                    , LeadPriceCalendarDataService
                    , $timeout
                    , globalBarChartConfiguration
                    , globalChartStyleConfiguration
                    , DateSelectedBroadcastingService
                    , ErrorReportingService
        ) {
                return {
                    restrict: 'AE',
                    scope: true,
                    replace: false, //TODO: cannot select canvas from template when true
                    template: LeadPriceChartWidgetTemplate,
                    link: function(scope, element, attrs) {

                        var CHART_X_AXIS_DATE_VALUES_FORMAT = 'D MMM'; // for example: 17 Aug

                        var numberOfWeeksToDisplay = attrs.numberOfWeeksToDisplay || 2;

                        var firstDayDisplayedCap = DateService.now().startOf('day');

                        var lastDayDisplayedCap;

                        var chartInstance;

                        var lastSearchCriteria = {};

                        var ShoppingDataService = selectShoppingService(attrs.activeSearchWebService);

                        initializeModel();

                        createChartInstance();

                        updateStateOfNavigationLinks();

                        function selectShoppingService(webService) {
                            var webService = webService || 'leadPriceCalendar';
                            switch (webService) {
                                case 'advancedCalendar':
                                    return AdvancedCalendarDataService;
                                case 'leadPriceCalendar':
                                    return LeadPriceCalendarDataService;
                                default:
                                    throw new Error('unrecognized web service: ' + webService);
                            }
                        }

                        function initializeModel() {
                            // main model object, storing prices used by the charting library (directive) to draw the lead price chart
                            scope.data = {
                                labels: [],
                                datasets: [{
                                      fillColor: globalChartStyleConfiguration.fillColor
                                    , data: []
                                }]
                            };

                            var firstDayDisplayed = firstDayDisplayedCap.clone();
                            var lastDayDisplayed = calculateLastDayDisplayed(firstDayDisplayed);
                            scope.displayedRange = moment.range(firstDayDisplayed, lastDayDisplayed);
                        }

                        function createChartInstance() {
                            $timeout(function() { //template dom not ready yet, has to wait for all digests to complete
                                var canvas = angular.element(element).find('canvas');
                                var ctx = canvas.get(0).getContext("2d");

                                adjustCanvasCSSStyleToMatchParent(canvas);

                                chartInstance = new Chart(ctx).Bar(scope.data, globalBarChartConfiguration);

                                addOnBarClickedHandler(angular.element(element));
                                
                            }, 0);
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

                        function addOnBarClickedHandler(element) {
                            element.on('click', 'canvas', function (ev) {
                                var barClicked = chartInstance.getBarsAtEvent(ev)[0];
                                if (_.isUndefined(barClicked)) { // click was done not on particular bar, but somewhere outside bars
                                    return;
                                }
                                var date = barClicked.label;
                                DateSelectedBroadcastingService.newSearchCriteria = lastSearchCriteria.getCopyAdjustedToOtherDepartureDate(date);
                                DateSelectedBroadcastingService.originalDataSourceWebService = ShoppingDataService;
                                DateSelectedBroadcastingService.broadcast();
                            });
                        }
                        
                        
                        function calculateLastDayDisplayed(firstDayDisplayed) {
                            return firstDayDisplayed.clone().add(numberOfWeeksToDisplay, 'weeks').subtract(1, 'day');
                        }


                        // @Controller: main controller function, acting on new search criteria sent to the widget
                        scope.$on(newSearchCriteriaEvent, function () {
                            var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;

                            var validationErrors = ShoppingDataService.validateSearchCriteria(newSearchCriteria);
                            if (validationErrors.length > 0) {
                                ErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                                return;
                            }

                            ShoppingDataService.getLeadPricesForRange(newSearchCriteria, scope.displayedRange).then(function (leadPrices) {
                                lastSearchCriteria = newSearchCriteria;
                                scope.minDateAndPricePair = ShoppingDataService.getMinDateAndPricePair(newSearchCriteria);

                                scope.departureAirport = newSearchCriteria.getFirstLeg().origin;
                                scope.arrivalAirport = newSearchCriteria.getFirstLeg().destination;

                                lastDayDisplayedCap = ShoppingDataService.getMaxAvailableDate(newSearchCriteria);

                                updateModelWithLeadPrices(leadPrices);
                            });
                        });

                        scope.isAnyDataToDisplayAvailable = function () {
                            //var firstDataSeries = _.first(scope.data.datasets).data; //TODO
                            //return !_.isEmpty(firstDataSeries);
                            return true;
                        };

                        // @Controller: event handler when earlier days are requested
                        scope.onEarlierRequested = function () {
                            shiftRangePresented(-numberOfWeeksToDisplay);
                        };

                        // @Controller: event handler when later days are requested
                        scope.onLaterRequested = function () {
                            shiftRangePresented(numberOfWeeksToDisplay);
                        };

                        function shiftRangePresented (requestedWeeksOffset) {
                            var requestedDaysOffset = requestedWeeksOffset * 7;
                            requestedDaysOffset = trimOffsetToObeyLastDayDisplayedCap(requestedDaysOffset);
                            scope.displayedRange.start.add(requestedDaysOffset, 'days');
                            scope.displayedRange.end = calculateLastDayDisplayed(scope.displayedRange.start);
                            ShoppingDataService.getLeadPricesForRange(lastSearchCriteria, scope.displayedRange).then(function(leadPrices) {
                                updateModelWithLeadPrices(leadPrices);
                            });
                        }

                        function trimOffsetToObeyLastDayDisplayedCap(requestedDaysOffset) {
                            if (requestedDaysOffset > 0) {
                                var numberOfLaterDaysLeftToPresent = lastDayDisplayedCap.diff(scope.displayedRange.end, 'days');
                                return (numberOfLaterDaysLeftToPresent < requestedDaysOffset)? numberOfLaterDaysLeftToPresent : requestedDaysOffset;
                            }
                            if (requestedDaysOffset < 0) {
                                var numberOfEarlierDaysLeftToPresent = scope.displayedRange.start.diff(firstDayDisplayedCap, 'days');
                                return (numberOfEarlierDaysLeftToPresent < Math.abs(requestedDaysOffset))? -numberOfEarlierDaysLeftToPresent: requestedDaysOffset; // requestedDaysOffset is negative (moving to past) so the returned numberOfEarlierDaysLeftToPresent must be also negative if returned as offset value
                            }
                        }

                        function updateModelWithLeadPrices(leadPricesAndDateStrings) {

                            // leadPricesAndDateStrings is a map of dateStrings into lead prices.
                            // Before we iterate this map to transform to required arrays format, we have to explicitly sort it,
                            // because iteration order of Object.keys, _.map and similar methods iterating object properties is not guaranteed.
                            var leadPricesAndDatesSorted = _.sortBy(_.pairs(leadPricesAndDateStrings), function (dateAndPricePair) {
                                var date = moment(dateAndPricePair[0]);
                                return date;
                            });
                            var leadPricesAndDates = _.map(leadPricesAndDatesSorted, function (dateAndPricePair) {
                                var dateString = dateAndPricePair[0];
                                var leadPrice = dateAndPricePair[1];
                                return {
                                      date: moment(dateString, ShoppingData.DATE_FORMAT_FOR_KEYS)
                                    , leadPrice: leadPrice
                                }
                            });

                            scope.data.labels = _.pluck(leadPricesAndDates, 'date').map(addCustomToStringFunction);

                            // returns copy of original date, with the toString method overwritten.
                            // custom toString is needed to the Chart.js library to display label in the format we wish.
                            // Otherwise the default toString method would be used, which prints too much information (whole date time).
                            // Other solution would be to pass as label the already formatted date string, but then, in the click event handler,
                            // we would get just string from the helper getBarsAtEvent method (and would need to parse this back string into date object).
                            function addCustomToStringFunction(date) {
                                var copy = date.clone();
                                copy.toString = function () {
                                    return this.format(CHART_X_AXIS_DATE_VALUES_FORMAT);
                                }
                                return copy;
                            }

                            scope.data.datasets[0].data = _.pluck(leadPricesAndDates, 'leadPrice');

                            chartInstance.initialize(scope.data);

                            updateStateOfNavigationLinks();
                        }

                        function updateStateOfNavigationLinks() {
                            scope.prevLinkActive = scope.displayedRange.start.isAfter(firstDayDisplayedCap);
                            scope.nextLinkActive = scope.displayedRange.end.isBefore(lastDayDisplayedCap);
                        }
                    }
                };
            }]);

});