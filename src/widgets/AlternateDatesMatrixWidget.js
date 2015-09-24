define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/AlternateDatesMatrix.tpl.html'
        , 'datamodel/SearchCriteria'
        , 'webservices/AlternateDatesSearchStrategyFactory'
    ],
    function (
          moment
        , angular
        , _
        , angular_bootstrap
        , SDSWidgets
        , AlternateDatesMatrixTemplate
        , SearchCriteria
        , AlternateDatesSearchStrategyFactory
    ) {
        'use strict';


        return angular.module('sdsWidgets')
            .controller('AlternateDatesMatrixCtrl', [
                     '$scope'
                    , 'AlternateDatesSearchStrategyFactory'
                    , 'ValidationErrorsReportingService'
                    , 'newSearchCriteriaEvent'
                    , 'SearchCriteriaBroadcastingService'
                , function (
                      $scope
                    , AlternateDatesSearchStrategyFactory
                    , ErrorReportingService
                    , newSearchCriteriaEvent
                    , SearchCriteriaBroadcastingService
                ) {
                    var searchService = AlternateDatesSearchStrategyFactory.createSearchStrategy($scope.activeSearchWebService);

                    var requestedDates = {};

                    $scope.executeLifeSearchOnPredefinedCriteriaIfPresent = function (origin, destination, departureDateString, returnDateString, altDatesPlusMinus) {
                        if (origin && destination && departureDateString && returnDateString) {
                            var searchCriteria = SearchCriteria.prototype.buildRoundTripTravelSearchCriteriaWithDateFlexibility(origin, destination, departureDateString, returnDateString, altDatesPlusMinus);
                            $scope.processSearchCriteria(searchCriteria);
                        }
                    };

                    $scope.$on(newSearchCriteriaEvent, function () {
                        var newSearchCriteria = SearchCriteriaBroadcastingService.searchCriteria;
                        $scope.processSearchCriteria(newSearchCriteria);
                    });

                    $scope.processSearchCriteria = function (searchCriteria) {
                        var validationErrors = searchService.validateSearchCriteria(searchCriteria);
                        if (validationErrors.length > 0) {
                            ErrorReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                            return;
                        }
                        searchService.getAlternateDatesPriceMatrix(searchCriteria, _.partial(processAltDatesPriceMatrix, searchCriteria), processServiceErrorMessages);
                    };

                    function processServiceErrorMessages(businessErrorMessages) {
                        $scope.businessErrorMessages = businessErrorMessages;
                        resetModel();
                    }

                    $scope.isAnyDataToDisplayAvailable = function () {
                        return $scope.altDatesPriceMatrix && $scope.altDatesPriceMatrix.hasAtLeastOnePrice();
                    };

                    $scope.anyBusinessErrorMessagesPresent = function () {
                        return !_.isEmpty($scope.businessErrorMessages);
                    };

                    $scope.isCentralRequestedDate = function (requestedDepartureDate, requestedReturnDate) {
                        return (requestedDepartureDate.isSame(requestedDates.departureDate)
                                && (_.isUndefined(requestedReturnDate) || requestedReturnDate.isSame(requestedDates.returnDate)));
                    };

                    function processAltDatesPriceMatrix(searchCriteria, altDatesPriceMatrix) {
                        clearErrorMessages();
                        $scope.isRoundTripTravel = searchCriteria.isRoundTripTravel();
                        $scope.isOneWayTravel = searchCriteria.isOneWayTravel();

                        $scope.requestedDepartureDates = searchCriteria.getRequestedDepartureDates();
                        if (searchCriteria.isRoundTripTravel()) {
                            $scope.requestedReturnDates = searchCriteria.getRequestedReturnDates();
                        }

                        requestedDates.departureDate = searchCriteria.getTripDepartureDateTime();
                        if (searchCriteria.isRoundTripTravel()) {
                            requestedDates.returnDate = searchCriteria.getTripReturnDateTime();
                        }

                        $scope.altDatesPriceMatrix = altDatesPriceMatrix;
                        $scope.departureAirport = searchCriteria.getFirstLeg().origin;
                        $scope.arrivalAirport = searchCriteria.getFirstLeg().destination;
                    }

                    function clearErrorMessages() {
                        _.remove($scope.businessErrorMessages);
                    };

                    function resetModel() {
                        $scope.altDatesPriceMatrix = undefined;
                        $scope.departureAirport = undefined;
                        $scope.arrivalAirport = undefined;
                    }

                }
            ])
            .directive('alternateDatesMatrix', function () {
                return {
                    restrict: 'EA',
                    transclude: true,
                    scope: {
                          activeSearch: '@'
                        , activeSearchWebService: '@'
                    },
                    template: AlternateDatesMatrixTemplate,
                    controller: 'AlternateDatesMatrixCtrl',
                    link: function (scope, element) {
                        scope.executeLifeSearchOnPredefinedCriteriaIfPresent(
                              element.attr('origin')
                            , element.attr('destination')
                            , element.attr('departure-date')
                            , element.attr('return-date')
                            , element.attr('alt-dates-plus-minus')
                        );
                    }
                }
            });
    });
