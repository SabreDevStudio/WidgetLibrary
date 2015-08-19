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
        , 'webservices/DaysRangeSearchStrategyFactory'
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
        , DaysRangeSearchStrategyFactory
        , SearchCriteria
        , Chart
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('leadPriceChart', [
                      'DateService'
                    , 'SearchCriteriaBroadcastingService'
                    , 'newSearchCriteriaEvent'
                    , '$timeout'
                    , 'globalBarChartConfiguration'
                    , 'customToStringFunction'
                    , 'globalChartStyleConfiguration'
                    , 'DateSelectedBroadcastingService'
                    , 'ValidationErrorsReportingService'
                    , 'DaysRangeSearchStrategyFactory'
                    , 'NoResultsFoundBroadcastingService'
                , function (
                      DateService
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , $timeout
                    , globalBarChartConfiguration
                    , customToStringFunction
                    , globalChartStyleConfiguration
                    , DateSelectedBroadcastingService
                    , ErrorReportingService
                    , DaysRangeSearchStrategyFactory
                    , NoResultsFoundBroadcastingService
        ) {
                return {
                    restrict: 'AE',
                    scope: true,
                    replace: false, //TODO: cannot select canvas from template when true
                    template: LeadPriceChartWidgetTemplate,
                    link: function(scope, element, attrs) {

                        var numberOfWeeksToDisplay = attrs.numberOfWeeksToDisplay || 2;

                        var firstDayDisplayedCap = DateService.now().startOf('day');

                        var lastDayDisplayedCap;

                        var chartInstance;

                        var lastSearchCriteria = {};

                        var searchService = DaysRangeSearchStrategyFactory.createSearchStrategy(attrs.activeSearchWebService);

                        resetModel();

                        createChartInstance();

                        updateStateOfNavigationLinks();

                        function resetModel() {
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
                                DateSelectedBroadcastingService.originalDataSourceWebService = searchService;
                                DateSelectedBroadcastingService.broadcast();
                            });
                        }
                        
                        
                        function calculateLastDayDisplayed(firstDayDisplayed) {
                            return firstDayDisplayed.clone().add(numberOfWeeksToDisplay, 'weeks').subtract(1, 'day');
                        }

                        function processLeadPrices(newSearchCriteria, leadPrices) {
                            lastSearchCriteria = newSearchCriteria;
                            scope.minDateAndPricePair = searchService.getMinDateAndPricePair(newSearchCriteria);

                            lastDayDisplayedCap = searchService.getMaxAvailableDate(newSearchCriteria);

                            updateModelWithLeadPrices(leadPrices);
                            clearErrorMessages();
                        }

                        function processServiceErrorMessages(businessErrorMessages) {
                            scope.businessErrorMessages = businessErrorMessages;
                            resetModel();
                            NoResultsFoundBroadcastingService.broadcast();
                        }

                        // @Controller: main controller function, acting on new search criteria sent to the widget
                        scope.$on(newSearchCriteriaEvent, function () {
                            var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;

                            var validationErrors = searchService.validateSearchCriteria(newSearchCriteria);
                            if (validationErrors.length > 0) {
                                ErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                                return;
                            }

                            searchService.getLeadPricesForRange(newSearchCriteria, scope.displayedRange,
                                function (leadPrices) {
                                    processLeadPrices(newSearchCriteria, leadPrices);
                                    scope.departureAirport = newSearchCriteria.getFirstLeg().origin;
                                    scope.arrivalAirport = newSearchCriteria.getFirstLeg().destination;
                                }, function (businessErrorMessages) {
                                    processServiceErrorMessages(businessErrorMessages);
                                    //scope.departureAirport = newSearchCriteria.getFirstLeg().origin;
                                    //scope.arrivalAirport = newSearchCriteria.getFirstLeg().destination; //TODO
                                }
                            );
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

                        function clearErrorMessages() {
                            _.remove(scope.businessErrorMessages);
                        }

                        scope.anyBusinessErrorMessagesPresent = function () {
                            return !_.isEmpty(scope.businessErrorMessages);
                        };

                        function shiftRangePresented (requestedWeeksOffset) {
                            var requestedDaysOffset = requestedWeeksOffset * 7;
                            requestedDaysOffset = trimOffsetToObeyLastDayDisplayedCap(requestedDaysOffset);
                            scope.displayedRange.start.add(requestedDaysOffset, 'days');
                            scope.displayedRange.end = calculateLastDayDisplayed(scope.displayedRange.start);
                            searchService.getLeadPricesForRange(lastSearchCriteria, scope.displayedRange, updateModelWithLeadPrices);
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
                                var date = moment(dateAndPricePair[0], ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                                return date;
                            });
                            var leadPricesAndDates = _.map(leadPricesAndDatesSorted, function (dateAndPricePair) {
                                var dateString = dateAndPricePair[0];
                                var leadPrice = dateAndPricePair[1];
                                return {
                                      date: moment(dateString, ShoppingData.prototype.DATE_FORMAT_FOR_KEYS)
                                    , leadPrice: leadPrice
                                }
                            });

                            scope.data.labels = _.pluck(leadPricesAndDates, 'date').map(customToStringFunction.toString);

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