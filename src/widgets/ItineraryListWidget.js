define([
          'util/LodashExtensions'
        , 'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/ItineraryListWidget.tpl.html'
        , 'text!view-templates/ErrorsModal.tpl.html'
        , 'datamodel/ItinerariesList'
        , 'webservices/BargainFinderMaxWebServices'
        , 'webservices/SabreDevStudioWebServices'
        , 'datamodel/DiversitySwapper'
        , 'widgets/ItineraryShortSummary'
        , 'widgets/ItineraryPricePerStopsPerAirlineSummary'
        , 'datamodel/ItinerariesListSummaryByAirlineAndNumberOfStops'
    ],
    function (
          _
        , moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryListWidgetTemplate
        , ErrorsModalTemplate
        , ItinerariesList
        , BargainFinderMaxWebServices
        , SabreDevStudioWebServices
        , DiversitySwapper
        , ItineraryShortSummary
        , ItineraryPricePerStopsPerAirlineSummary
        , ItinerariesListSummaryByAirlineAndNumberOfStops
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('ItineraryListCtrl', [
                  '$scope'
                , 'BargainFinderMaxDataService'
                , 'InstaflightsDataService' //, 'ShoppingMockDateService'
                , 'SearchCriteriaBroadcastingService'
                , 'newSearchCriteriaEvent'
                , 'StatisticsGatheringRequestsRegistryService'
                , 'ItineraryStatisticsBroadcastingService'
                , 'filteringCriteriaChangedEvent'
                , 'FilteringCriteriaChangedBroadcastingService'
                , 'DateSelectedBroadcastingService'
                , 'dateSelectedEvent'
                , '$modal'
                , function ($scope
                    , BargainFinderMaxDataService
                    , InstaflightsDataService
                    , SearchCriteriaBroadcastingService
                    , newSearchCriteriaEvent
                    , StatisticsGatheringRequestsRegistryService
                    , ItineraryStatisticsBroadcastingService
                    , filteringCriteriaChangedEvent
                    , FilteringCriteriaChangedBroadcastingService
                    , DateSelectedBroadcastingService
                    , dateSelectedEvent
                    , $modal
                ) {

                    var sortingCriteriaDefinitions = {
                        byPriceAsc: {
                            label: 'Price (Lowest)',
                            propertyName: 'totalFareAmount',
                            reverse: false
                        },
                        byPriceDesc: {
                            label: 'Price (Highest)',
                            propertyName: 'totalFareAmount',
                            reverse: true
                        },
                        byDurationAsc: {
                            label: 'Duration (Shortest)',
                            propertyName: 'duration',
                            reverse: false
                        },
                        byDurationDesc: {
                            label: 'Duration (Longest)',
                            propertyName: 'duration',
                            reverse: true
                        },
                        byNumberOfStopsAsc: {
                            label: 'Stops (Lowest)',
                            propertyName: 'sumNumberOfStopsForAllLegs',
                            reverse: false
                        },
                        byNumberOfStopsDesc: {
                            label: 'Stops (Highest)',
                            propertyName: 'sumNumberOfStopsForAllLegs',
                            reverse: true
                        },
                        byDepartureTimeAsc: {
                            label: 'Departure (Earliest)',
                            propertyName: 'outboundDepartureDateTime',
                            reverse: false
                        },
                        byDepartureTimeDesc: {
                            label: 'Departure (Latest)',
                            propertyName: 'outboundDepartureDateTime',
                            reverse: true
                        },
                        byArrivalTimeAsc: {
                            label: 'Arrival (Earliest)',
                            propertyName: 'outboundArrivalDateTime',
                            reverse: false
                        },
                        byArrivalTimeDesc: {
                            label: 'Arrival (Latest)',
                            propertyName: 'outboundArrivalDateTime',
                            reverse: true
                        }
                    };

                    $scope.availableSortingCriteria = [
                          sortingCriteriaDefinitions.byPriceAsc
                        , sortingCriteriaDefinitions.byPriceDesc
                        , sortingCriteriaDefinitions.byDurationAsc
                        , sortingCriteriaDefinitions.byDurationDesc
                        , sortingCriteriaDefinitions.byNumberOfStopsAsc
                        , sortingCriteriaDefinitions.byNumberOfStopsDesc
                        , sortingCriteriaDefinitions.byDepartureTimeAsc
                        , sortingCriteriaDefinitions.byDepartureTimeDesc
                        , sortingCriteriaDefinitions.byArrivalTimeAsc
                        , sortingCriteriaDefinitions.byArrivalTimeDesc
                    ];

                    var sortCriteriaNaturalOrder = [ // business logic specific sort criteria order (next criteria are applied when application of previous one returned tie)
                          sortingCriteriaDefinitions.byPriceAsc
                        , sortingCriteriaDefinitions.byDurationAsc
                        , sortingCriteriaDefinitions.byDurationAsc
                        , sortingCriteriaDefinitions.byNumberOfStopsAsc
                        , sortingCriteriaDefinitions.byDepartureTimeAsc
                        , sortingCriteriaDefinitions.byArrivalTimeAsc
                    ];

                    $scope.setSortCriteria = function (firstCriterion) {
                        $scope.currentSortCriteria = sortCriteriaNaturalOrder.reduce(_.pushIfNotContains, [firstCriterion]);
                    };

                    resetNavigationAndSortCriteria();

                    function resetNavigationAndSortCriteria() {
                        // default sort order
                        $scope.setSortCriteria(sortingCriteriaDefinitions.byPriceAsc);

                        $scope.itemsPerPage = 20;
                        // have to explicitly set the current page for pagination (startFrom filter), otherwise undefined and filter getting NaN parameter.
                        $scope.currentPage = 1;
                    }

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
                        //TODO: will also sort criteria nad pagination reset?
                    }

                    function updateWithNewItineraries(newSearchCriteria, itinerariesList) {
                        resetNavigationAndSortCriteria();
                        $scope.itineraries.addItinerariesListWithDedup(itinerariesList);
                        recalculateAndBroadcastStatistics();
                        recalculateSummaries();
                        updateSearchAirports(newSearchCriteria);
                    }

                    function processServiceErrorMessages(newSearchCriteria, businessErrorMessages) { //accepts array or just one string
                        // array holding error messages from processing of last search criteria sent.
                        // like error messages from validation of search criteria or errors returned from the last web service call
                        if (_.isString(businessErrorMessages)) {
                            businessErrorMessages = [businessErrorMessages];
                        }
                        $scope.businessErrorMessages = businessErrorMessages;
                        // clear model from previous search
                        $scope.itineraries = undefined;
                        updateSearchAirports(newSearchCriteria);
                    }

                    var searchStrategy = createSearchStrategy($scope.activeSearchWebService);

                    function createSearchStrategy(activeSearchWebService) {
                        var activeSearchWebService = activeSearchWebService || 'instaflights';

                        function collectValidationErrors() {
                            var args = [].slice.call(arguments);
                            var searchCriteria = args.shift();
                            var webServices = args;
                            return webServices
                                .map(function (webService) {
                                        return webService.validateSearchCriteria(searchCriteria);
                                    }
                                )
                                .reduce(function (acc, curr) {
                                    return _.pushAll(acc, curr);
                                }, []);
                        }

                        switch (activeSearchWebService) {
                            case 'bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            case 'instaflights': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        InstaflightsDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService);
                                    }
                                };
                            }
                            case 'first-instaflights-on-errors-bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {
                                        InstaflightsDataService.getItineraries(searchCriteria).then(
                                            successCallback
                                            , function () {
                                                BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                            });
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            case 'instaflights-updated-with-bfm': {
                                return {
                                    search: function (searchCriteria, successCallback, failureCallback, updateCallback) {

                                        var instaflightSuccessCallback = function (value) {
                                            successCallback(value);
                                            BargainFinderMaxDataService.getItineraries(searchCriteria).then(updateCallback);
                                        };

                                        var instaflightsFailureCallback = function () {
                                            BargainFinderMaxDataService.getItineraries(searchCriteria).then(successCallback, failureCallback);
                                        };

                                        InstaflightsDataService.getItineraries(searchCriteria).then(instaflightSuccessCallback, instaflightsFailureCallback);
                                    },
                                    validateSearchCriteria: function (searchCriteria) {
                                        return collectValidationErrors(searchCriteria, InstaflightsDataService, BargainFinderMaxDataService);
                                    }
                                };
                            }
                            default: {
                                throw new Error('unrecognized search web service: ' + activeSearchWebService);
                            }
                        }
                    }

                    // @Controller: main controller function, acting on new search criteria sent to the widget
                    $scope.$on(newSearchCriteriaEvent, function () {
                        if (!$scope.activeSearch) { //active search disabled //TODO ugly if
                            return;
                        }
                        var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;

                        var validationErrors = searchStrategy.validateSearchCriteria(newSearchCriteria);
                        if (validationErrors.length > 0) {
                            openErrorsModal(validationErrors, 'Unsupported search criteria');
                            return;
                        }

                        searchStrategy.search(newSearchCriteria,
                            _.partial(processNewItineraries, newSearchCriteria),
                            _.partial(processServiceErrorMessages, newSearchCriteria),
                            _.partial(updateWithNewItineraries, newSearchCriteria));
                    });

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

                    function selectItinerariesListProducingService(originalWebService) {
                        return (isItinerariesListProducingService(originalWebService)) ? originalWebService : BargainFinderMaxDataService; //TODO search strategy here as well
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
                        $scope.searchCriteriaDepartureAirport = newSearchCriteria.getFirstLeg().origin;
                        $scope.searchCriteriaArrivalAirport = newSearchCriteria.getFirstLeg().destination;
                    }

                    function openErrorsModal(validationErrors, modalTitle) {
                        var modalInstance = $modal.open({
                            animation: true,
                            template: ErrorsModalTemplate,
                            controller: function ($scope, $modalInstance) {
                                $scope.errorsList = validationErrors ;
                                $scope.modalTitle = modalTitle;

                                $scope.ok = function () {
                                    $modalInstance.close();
                                };
                            }
                        });
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
                    template: ItineraryListWidgetTemplate,
                    controller: 'ItineraryListCtrl',
                    link: function (scope, element) { //TODO into own directive later. not only this behaviour but whole sort by criteria button

                        //// adding explicit watch to manually trigger changes to dropdown DOM. Automatic change to firstSortByCriterion (which is itself updated fine), does not change the label button (sorting criteria itself change, only the label does not)
                        //scope.$watch('firstSortByCriterion', function (val) {
                        //    scope.setSelectDropdownValue(val.label, scope.availableSortingCriteria.indexOf(val));
                        //});

                        scope.setSelectDropdownValue = function(selectedValueLabel, selectedValueIdx) {
                            var buttonLabelText = "button span.SDSDropdownLabelText";
                            $(buttonLabelText).text(selectedValueLabel);
                            $(buttonLabelText).val(selectedValueLabel);

                            var buttonScope = angular.element($(buttonLabelText)).scope();
                            buttonScope.$apply(function () {
                                scope.setSortCriteria(scope.availableSortingCriteria[selectedValueIdx]);

                                // when changing sorting criteria, which will trigger resorting of itineraries list, reset current page to 1.
                                // The customer expectation upon changing sort criteria, is to see, at the very top of the list,
                                //  the very top items according to the criteria specified.
                                // However in case customer was already on any results page other than one, then it will not be displayed at the top (we are on the other page and we would need to manually go to page 1).
                                scope.currentPage = 1;
                                // cannot put it inside setSortCriteria as it has other scope and it does not work
                            });
                        };

                        angular.element(element).on('click', '.dropdown-menu li a', function () {
                            var selectedValueLabel = $(this).text();
                            var selectedValueIdx = $(this).data('criterion-index');
                            scope.setSelectDropdownValue(selectedValueLabel, selectedValueIdx);
                        });
                    }

                };
            })
            .filter('sortByCriteria', function ($filter) {
                var orderBy = $filter('orderBy');
                return function (values, sortingCriteriaArray) {
                    var ngOrderByPredicatesArray = sortingCriteriaArray.map(function (criterion) {
                        return (criterion.reverse? '-': '+') + criterion.propertyName;
                    });
                    return orderBy(values, ngOrderByPredicatesArray);
                };
            });
    });
