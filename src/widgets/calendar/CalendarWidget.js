define([
          'moment'
        , 'angular'
        , 'util/jQueryExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/CalendarWidgetTabs.tpl.html'
        , 'text!view-templates/CalendarWidgetNavigable.tpl.html'
        , 'text!view-templates/CalendarWidgetOneMonth.tpl.html'
        , 'datamodel/SearchCriteria'
        , 'widgets/calendar/Calendar'
        , 'webservices/DaysRangeSearchStrategyFactory'
    ],
    function (
          moment
        , angular
        , $$
        , angular_bootstrap
        , SDSWidgets
        , CalendarWidgetTabsTemplate
        , CalendarWidgetNavigableTemplate
        , CalendarWidgetOneMonthTemplate
        , SearchCriteria
        , Calendar
        , DaysRangeSearchStrategyFactory
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('CalendarWidgetCtrl', [
                      '$scope'
                    , 'DaysRangeSearchStrategyFactory'
                    , 'ValidationErrorsReportingService'
                    , 'newSearchCriteriaEvent'
                    , 'SearchCriteriaBroadcastingService'
                    , 'DateSelectedBroadcastingService'
                    , 'NoResultsFoundBroadcastingService'
                , function (
                      $scope
                    , DaysRangeSearchStrategyFactory
                    , ValidationErrorsReportingService
                    , newSearchCriteriaEvent
                    , SearchCriteriaBroadcastingService
                    , DateSelectedBroadcastingService
                    , NoResultsFoundBroadcastingService
                ) {

                    var lastSearchCriteria;

                    // currentPage needed for the navigable view.
                    $scope.paginationSettings = {
                        currentPage: 1
                    };

                    var searchService = DaysRangeSearchStrategyFactory.createSearchStrategy($scope.activeSearchWebService);

                    // hash table, indexed by month start dates, with boolean values, denoting if given month is currently displayed.
                    // Needed for programmatic setting of focus (active) on the tab of the user requested month (the month of the departure travel date will have initial focus)
                    $scope.monthsDisplayStates = {};

                    $scope.executeLifeSearchOnPredefinedCriteriaIfPresent = function (origin, destination, departureDateString, returnDateString) {
                        if (origin && destination && departureDateString && returnDateString) {
                            var searchCriteria = SearchCriteria.prototype.buildRoundTripTravelSearchCriteria(origin, destination, departureDateString, returnDateString);
                            processSearchCriteria(searchCriteria);
                        }
                    };

                    $scope.$on(newSearchCriteriaEvent, function () {
                        var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;
                        processSearchCriteria(newSearchCriteria);
                    });

                     function processSearchCriteria(searchCriteria) {
                        var validationErrors = searchService.validateSearchCriteria(searchCriteria);
                        if (validationErrors.length > 0) {
                            ValidationErrorsReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                            return;
                        }
                        // there are two calls to calendar prepareDataModel and then updateWithLeadPrices. It is necessary of we have to use Calendar domain logic to construct the months to request, so that later to know which months to request from te web service.
                        resetModel();
                        $scope.calendar.prepareDataModel(searchCriteria);

                        $scope.paginationSettings.currentPage = Math.floor(($scope.calendar.requestedMonthSeqNumber + 2) / $scope.numberOfMonthsShownAtOnce); // +2, because: pages numbering start from 1, not from 0 (this is consumed from the angular-ui pager), second we need to set initially to correct page
                        searchService.getLeadPricesForRange(searchCriteria, $scope.calendar.getDisplayedRange()
                            , function (leadPrices) {
                                processLeadPrices(searchCriteria, leadPrices);
                                lastSearchCriteria = searchCriteria;
                                clearErrorMessages();
                        },
                            processServiceErrorMessages
                        );
                    };

                    function processLeadPrices(newSearchCriteria, leadPrices) {
                        var maxAvailableDate = searchService.getMaxAvailableDate(newSearchCriteria);
                        $scope.calendar.setLastDayDisplayedCap(maxAvailableDate);

                        var requestedDate = newSearchCriteria.getTripDepartureDateTime();
                        $scope.monthsDisplayStates[requestedDate] = true;

                        $scope.calendar.updateWithLeadPrices(newSearchCriteria, leadPrices);
                    }

                    function processServiceErrorMessages(businessErrorMessages) {
                        $scope.businessErrorMessages = businessErrorMessages;
                        resetModel();
                        NoResultsFoundBroadcastingService.broadcast();
                    }

                    function resetModel() {
                        // the main model object
                        $scope.calendar = new Calendar({
                            numberOfMonths: $scope.numberOfMonths
                        });
                    }

                    function clearErrorMessages() {
                        _.remove($scope.businessErrorMessages);
                    }

                    $scope.isAnyDataToDisplayAvailable = function () {
                        return $scope.calendar.hasData();
                    };

                    $scope.anyBusinessErrorMessagesPresent = function () {
                        return !_.isEmpty($scope.businessErrorMessages);
                    };

                    $scope.cellClicked = function (day) {
                        DateSelectedBroadcastingService.newSearchCriteria = lastSearchCriteria.getCopyAdjustedToOtherDepartureDate(day);
                        DateSelectedBroadcastingService.originalDataSourceWebService = searchService;
                        DateSelectedBroadcastingService.broadcast();
                    };
                }
            ])
            .directive('calendarTabs', ['$compile', function ($compile) {
                return {
                    restrict: 'EA',
                    //replace: true, with replace=true element.attr('origin') and other return undefined. Would need to writer transclude function
                    scope: {
                          numberOfMonths: '@tabsShown'
                        , activeSearchWebService: '@'
                        , doNotShowPrevNextMonthDays: '@'
                    },
                    template: CalendarWidgetTabsTemplate,
                    controller: 'CalendarWidgetCtrl',
                    link: function (scope, element) {
                        scope.numberOfMonths = parseInt(scope.numberOfMonths) | 1;
                        $compile(CalendarWidgetOneMonthTemplate); //hackish, to source external template into template cache, so that it is accessible for including for the both calendar view templates
                        scope.executeLifeSearchOnPredefinedCriteriaIfPresent(element.attr('origin'), element.attr('destination'), element.attr('departure-date'), element.attr('return-date'));
                    }
                }
            }])
            .directive('calendarNavigable', ['$compile', function ($compile) {
                return {
                    restrict: 'EA',
                    //replace: true, with replace=true element.attr('origin') and other return undefined. Would need to writer transclude function
                    scope: {
                          numberOfMonths: '@?totalNumberOfMonths'
                        , numberOfMonthsShownAtOnce: '@?'
                        , activeSearchWebService: '@'
                        , doNotShowPrevNextMonthDays: '@'
                    },
                    template: CalendarWidgetNavigableTemplate,
                    controller: 'CalendarWidgetCtrl',
                    link: function (scope, element, attrs) {
                        scope.numberOfMonthsShownAtOnce = parseInt(scope.numberOfMonthsShownAtOnce) || 1;
                        scope.numberOfMonths = parseInt(scope.numberOfMonths) || 10;
                        $compile(CalendarWidgetOneMonthTemplate);
                        scope.executeLifeSearchOnPredefinedCriteriaIfPresent(element.attr('origin'), element.attr('destination'), element.attr('departure-date'), element.attr('return-date'));
                    }
                }
            }])
            // Adds handler for mouseenter and mouseleave events to highlight the mouse entered calendar cell and all next cells within LoS
            .directive('highlightLengthOfStay', function () {
                return {
                  scope: {
                        lengthOfStayDays: '@'
                      , highlightClass: '@'
                  },
                  link: function (scope, element) {
                      var lengthOfStayDays = parseInt(scope.lengthOfStayDays) + 1; // in length of stay highlight we include both departure and return day ( that's why + 1)
                      $(element).on('mouseenter', 'td', function () {
                          var allLoSdays = $$(this).nextAllAndFirstLevelCousins(lengthOfStayDays);
                          allLoSdays.forEach(function (cell) {
                              $(cell).addClass(scope.highlightClass);
                          });
                      });

                      $(element).on('mouseleave', 'td', function () {
                          var allLoSdays = $$(this).nextAllAndFirstLevelCousins(lengthOfStayDays);
                          allLoSdays.forEach(function (cell) {
                              $(cell).removeClass(scope.highlightClass);

                          });
                      });
                  }
                };
            });
    });
