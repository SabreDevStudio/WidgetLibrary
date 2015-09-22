define([
          'util/LodashExtensions'
        , 'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/ItinerariesListWidget.tpl.html'
        , 'datamodel/ItinerariesList'
        , 'webservices/BargainFinderMaxWebServices'
        , 'webservices/InstaflightsDataService'
        , 'datamodel/DiversitySwapper'
        , 'widgets/ItinerariesList/ItineraryShortSummary'
        , 'widgets/ItinerariesList/ItineraryPricePerStopsPerAirlineSummary'
        , 'datamodel/ItinerariesListSummaryByAirlineAndNumberOfStops'
        , 'datamodel/SearchCriteria'
        , 'widgets/ItinerariesList/ItinerariesListSortCriteria'
        , 'webservices/OneDaySearchStrategyFactory'
        , 'util/CommonDisplayDirectives'
    ],
    function (
          _
        , moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , ItinerariesListWidgetTemplate
        , ItinerariesList
        , BargainFinderMaxWebServices
        , InstaflightsDataService
        , DiversitySwapper
        , ItineraryShortSummary
        , ItineraryPricePerStopsPerAirlineSummary
        , ItinerariesListSummaryByAirlineAndNumberOfStops
        , SearchCriteria
        , ItinerariesListSortCriteria
        , OneDaySearchStrategyFactory
        , CommonDisplayDirectives
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('ItineraryListCtrl', [
                      '$scope'
                    , 'OneDaySearchStrategyFactory'
                    , 'SearchCriteriaBroadcastingService'
                    , 'newSearchCriteriaEvent'
                    , 'StatisticsGatheringRequestsRegistryService'
                    , 'ItineraryStatisticsBroadcastingService'
                    , 'filteringCriteriaChangedEvent'
                    , 'FilteringCriteriaChangedBroadcastingService'
                    , 'DateSelectedBroadcastingService'
                    , 'dateSelectedEvent'
                    , 'ValidationErrorsReportingService'
                    , 'BargainFinderMaxDataService'
                    , 'noResultsFoundEvent'
                , function (
                      $scope
                    , searchStrategyFactory
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , StatisticsGatheringRequestsRegistryService
                    , ItineraryStatisticsBroadcastingService
                    , filteringCriteriaChangedEvent
                    , FilteringCriteriaChangedBroadcastingService
                    , DateSelectedBroadcastingService
                    , dateSelectedEvent
                    , ErrorReportingService
                    , BargainFinderMaxDataService
                    , noResultsFoundEvent
                ) {

                    $scope.sortCriteria = new ItinerariesListSortCriteria();
                    $scope.selectedFirstCriterion = { // must be object so that the scope of inputSortBy can update the parent scope object, not its copy (like when it was a scalar)
                        selected: _.first($scope.sortCriteria.availableSortCriteria)
                    };
                    $scope.paginationSettings = {};

                    resetNavigationAndSortCriteria();

                    function resetNavigationAndSortCriteria() {
                        $scope.sortCriteria.resetSortCriteria();
                        $scope.selectedFirstCriterion.selected =  _.first($scope.sortCriteria.availableSortCriteria);

                        $scope.itemsPerPage = 20;
                        // have to explicitly set the current page for pagination (startFrom filter), otherwise undefined and filter getting NaN parameter.
                        $scope.paginationSettings.currentPage = 1;
                    }

                    $scope.onSortingCriteriaChanged = function () {
                        $scope.sortCriteria.setSortCriteria($scope.selectedFirstCriterion.selected);

                        // when changing sorting criteria, which will trigger resorting of itineraries list, reset current page to 1.
                        // The customer expectation upon changing sort criteria, is to see, at the very top of the list,
                        //  the very top items according to the criteria specified.
                        // However in case customer was already on any results page other than one, then it will not be displayed at the top (we are on the other page and we would need to manually go to page 1).
                        $scope.paginationSettings.currentPage = 1;
                    };

                    function recalculateSummaries() {
                        var permittedItineraries = $scope.itineraries.getPermittedItineraries();
                        $scope.bestItinerariesSummary = {
                            cheapest: $scope.itineraries.getCheapestItinerary(),
                            best: _.last(permittedItineraries.sort(DiversitySwapper.comparator)),
                            shortest: $scope.itineraries.getShortestItinerary()
                        };
                        $scope.summaryPerStopsPerAirline = (new ItinerariesListSummaryByAirlineAndNumberOfStops(permittedItineraries)).getSummaries();
                    }

                    function processNewItineraries(newSearchCriteria, itins) {
                        $scope.businessErrorMessages = [];
                        resetNavigationAndSortCriteria();

                        $scope.itineraries = itins;

                        recalculateAndBroadcastStatistics();
                        recalculateSummaries();
                        updateSearchAirports(newSearchCriteria);
                    }

                    function updateWithNewItineraries(newSearchCriteria, itinerariesList) {
                        resetNavigationAndSortCriteria();
                        $scope.itineraries.addItinerariesListWithDedup(itinerariesList);
                        recalculateAndBroadcastStatistics();
                        recalculateSummaries();
                        updateSearchAirports(newSearchCriteria);
                    }

                    function clearModel() {
                        $scope.itineraries = undefined;
                    }

                    function processServiceErrorMessages(newSearchCriteria, businessErrorMessages) { //accepts array or just one string
                        // array holding error messages from processing of last search criteria sent.
                        // like error messages from validation of search criteria or errors returned from the last web service call
                        if (_.isString(businessErrorMessages)) {
                            businessErrorMessages = [businessErrorMessages];
                        }
                        $scope.businessErrorMessages = businessErrorMessages;
                        // clear model from previous search
                        clearModel();
                        updateSearchAirports(newSearchCriteria);
                    }

                    var searchStrategy = searchStrategyFactory.createSearchStrategy($scope.activeSearchWebService);

                    // @Controller: main controller function, acting on new search criteria sent to the widget
                    $scope.$on(newSearchCriteriaEvent, function () {
                        var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;
                        $scope.processSearchCriteria(newSearchCriteria);
                    });

                    $scope.processSearchCriteria = function(searchCriteria) {
                        if (!$scope.activeSearch) { //active search disabled
                            return;
                        }
                        var validationErrors = searchStrategy.validateSearchCriteria(searchCriteria);
                        if (validationErrors.length > 0) {
                            ErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                            return;
                        }

                        searchStrategy.search(searchCriteria,
                            _.partial(processNewItineraries, searchCriteria),
                            _.partial(processServiceErrorMessages, searchCriteria),
                            _.partial(updateWithNewItineraries, searchCriteria));
                    };

                    //TODO tmp here https://coderwall.com/p/ngisma/safe-apply-in-angular-js , move to general package
                    $scope.safeApply = function (fn) {
                        var phase = this.$root.$$phase;
                        if (phase == '$apply' || phase == '$digest') {
                            if (fn && (typeof(fn) === 'function')) {
                                fn();
                            }
                        } else {
                            this.$apply(fn);
                        }
                    };

                    // @Controller
                    $scope.$on(filteringCriteriaChangedEvent, function () {
                        var currentFilteringFunctions = FilteringCriteriaChangedBroadcastingService.filteringFunctions;
                        $scope.itineraries.applyFilters(currentFilteringFunctions);
                        recalculateSummaries();
                        // by applying filters we changed internal state of the $scope.itineraries object. NG is not watching its internal state (result of getPermittedItineraries() call in view)
                        $scope.safeApply(); //TODO this is temporary trigger to angular, as discrete values filter already trigger apply, thru some sideeffect, while rangeSliders not. Also while rest all filters is clicked apply is already in progress. Debug NG what triggers apply in case of dicreate values filters
                        // whatever filter type (range, discrete) the model itself (ItinerariesList) is updated correctly (filteredOut set) in every case.
                    });

                    // @Controller
                    $scope.$on(dateSelectedEvent, function () {
                        //TODO: when you add listener method for updating itinerary list from other widget (Adv Calendar), then also call recalculateAndBroadcastStatistics
                        var newSearchCriteria = DateSelectedBroadcastingService.newSearchCriteria;
                        // the web service which produced the data, from which the particular date was selected
                        var webService = selectItinerariesListProducingService(DateSelectedBroadcastingService.originalDataSourceWebService);

                        webService.getItineraries(newSearchCriteria).then(
                              _.partial(processNewItineraries, newSearchCriteria)
                            , _.partial(processServiceErrorMessages, newSearchCriteria)
                        );
                        $scope.safeApply();
                    });

                    /**
                     * this event may come from other widget, like Calendar, when no results were found.
                     * In such case we should clear (passive) itineraries list, to reflect that noting is found or selected.
                     * clearing is needed, when for example previously the other widget found data for some search criteria, then sent dateSelected event
                     * , so the itinerary list populated, and later there was another search in the other widget which now did not return any results (so we have to clear previous state).
                     */
                    $scope.$on(noResultsFoundEvent, function () {
                        clearModel();
                    });

                    function selectItinerariesListProducingService(originalWebService) {
                        return (isItinerariesListProducingService(originalWebService))? originalWebService : BargainFinderMaxDataService; //TODO search strategy here as well
                    }

                    function isItinerariesListProducingService(originalWebService) {
                        return _.isFunction(originalWebService.getItineraries);
                    }

                    function recalculateAndBroadcastStatistics() {
                        var requestedStatisticsDescriptions = StatisticsGatheringRequestsRegistryService.getAll();
                        var statistics = $scope.itineraries.getCurrentValuesBounds(requestedStatisticsDescriptions);
                        ItineraryStatisticsBroadcastingService.statistics = statistics;
                        ItineraryStatisticsBroadcastingService.broadcast();
                    }

                    function updateSearchAirports(newSearchCriteria) {
                        //TODO: move both airports into ItinerariesList (the airports for which the search was done)
                        $scope.searchCriteriaDepartureAirport = newSearchCriteria.getFirstLeg().origin;
                        $scope.searchCriteriaArrivalAirport = newSearchCriteria.getFirstLeg().destination;
                    }

                    $scope.anyBusinessErrorMessagesPresent = function () {
                        return !_.isEmpty($scope.businessErrorMessages);
                    };

                    $scope.isAnyDataToDisplayAvailable = function () {
                        if (_.isUndefined($scope.itineraries)) {
                            return false;
                        }
                        return ($scope.itineraries.size() > 0);
                    };

                }])
            .directive('itineraryList', function () {
                return {
                    restrict: 'EA',
                    scope: {
                        activeSearch: '@'
                        , activeSearchWebService: '@'
                    },
                    template: ItinerariesListWidgetTemplate,
                    controller: 'ItineraryListCtrl',
                    link: function (scope, element) {

                        var predefinedSearchCriteria = buildSearchCriteriaFromPredefinedParameters();
                        if (predefinedSearchCriteria) {
                            scope.processSearchCriteria(predefinedSearchCriteria);
                        }

                        function buildSearchCriteriaFromPredefinedParameters() {
                            var origin = element.attr('origin');
                            var destination = element.attr('destination');
                            var departureDateString = element.attr('departure-date');
                            var returnDateString = element.attr('return-date');

                            if (origin && destination && departureDateString && returnDateString) {
                                return SearchCriteria.prototype.buildRoundTripTravelSearchCriteria(origin, destination, departureDateString, returnDateString);
                            }
                        }
                    }

                };
            })
            .filter('sortByCriteria', ['$filter', function ($filter) {
                var orderBy = $filter('orderBy');
                return function (values, sortingCriteriaArray) {
                    var ngOrderByPredicatesArray = sortingCriteriaArray.map(function (criterion) {
                        return (criterion.reverse? '-': '+') + criterion.propertyName;
                    });
                    var orderBy2 = orderBy(values, ngOrderByPredicatesArray);
                    return orderBy2;
                };
            }]);
    });
