define([
          'moment'
        , 'moment_range'
        , 'util/LodashExtensions'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/FareRangeWidget.tpl.html'
        , 'datamodel/SearchCriteria'
    ],
    function (
          moment
        , moment_range
        , _
        , angular
        , angular_bootstrap
        , SDSWidgets
        , FareRangeWidgetTemplate
        , SearchCriteria
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareRangeCtrl', [
                     '$scope'
                    , 'DateService'
                    , 'FareRangeDataService'
                    , 'FareRangeSummaryService'
                    , 'newSearchCriteriaEvent'
                    , 'SearchCriteriaBroadcastingService'
                    , 'ValidationErrorsReportingService'
                , function (
                      $scope
                    , DateService
                    , FareRangeDataService
                    , FareRangeSummaryService
                    , newSearchCriteriaEvent
                    , searchCriteriaBroadcastingService
                    , validationErrorsReportingService
                ) {

                    var rangeDays = $scope.rangeDays | 15;

                    // main model object
                    $scope.fareRangeSummary = {};

                    if ($scope.origin && $scope.destination && $scope.departureDate && $scope.returnDate) {
                        var searchCriteria = SearchCriteria.prototype.buildRoundTripTravelSearchCriteria($scope.origin, $scope.destination, $scope.departureDate, $scope.returnDate);
                        processSearchCriteria(searchCriteria);
                    }

                    function processSearchCriteria(searchCriteria) {
                        var validationErrors = FareRangeDataService.validateSearchCriteria(searchCriteria);
                        if (validationErrors.length > 0) {
                            validationErrorsReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                            return;
                        }

                        var requestedRange = calculateRequestedDepartureDateRanges(searchCriteria.getTripDepartureDateTime(), rangeDays);
                        FareRangeDataService.getFareRange(searchCriteria, requestedRange).then(
                            function (response) {
                                $scope.fareRangeSummary = FareRangeSummaryService.getSummary(response, searchCriteria.getFirstLeg().departureDateTime, searchCriteria.getSecondLeg().departureDateTime);
                                $scope.requestedRange = requestedRange;
                                clearErrorMessages();
                            },
                            function (errors) {
                                $scope.businessErrorMessages = errors;
                                clearModel();
                            }
                        );
                    }

                    $scope.$on(newSearchCriteriaEvent, function () {
                        var newSearchCriteria = searchCriteriaBroadcastingService.searchCriteria;
                        $scope.currentLowestFare = undefined;
                        $scope.currentLowestFareCurrency = undefined;
                        processSearchCriteria(newSearchCriteria);
                    });

                    $scope.anyBusinessErrorMessagesPresent = function () {
                        return !_.isEmpty($scope.businessErrorMessages);
                    };

                    function clearErrorMessages() {
                        _.remove($scope.businessErrorMessages);
                    }

                    function clearModel() {
                        $scope.fareRangeSummary = {};
                    }

                    function calculateRequestedDepartureDateRanges(departureDateTime, rangeDays) {
                        // try to evenly distribute the range across the departure data, make provision for the maximum days from now till the requested date
                        var advancePurchase = departureDateTime.diff(DateService.now(), 'days');
                        var daysToAddBeforeRequestedDate = Math.min(advancePurchase, Math.floor(rangeDays / 2));

                        var daysToAddAfterRequestedDate = rangeDays - daysToAddBeforeRequestedDate - 1; // -1 stands for the requested day itself

                        var rangeStart = departureDateTime.clone().subtract(daysToAddBeforeRequestedDate, 'days').format('YYYY-MM-DD');
                        var rangeEnd = departureDateTime.clone().add(daysToAddAfterRequestedDate, 'days').format('YYYY-MM-DD');

                        return moment.range(rangeStart, rangeEnd);
                    }

                    $scope.isAnyDataToDisplayAvailable = function () {
                        return !_.isEmpty($scope.fareRangeSummary);
                    };

                    /**
                     * This function implements sample customer specific logic whether to show fare range to customer at all.
                     */
                    $scope.showFareRangeToCustomer = function () {
                        if (!_.has($scope.fareRangeSummary, 'fareDataForRequestedDates', 'MedianFare')) { // no data from web service to execute business rules, exit
                            return false;
                        }
                        if (_.isUndefined($scope.currentLowestFare)) { // customer did not define any lowest fare (the cutoff), then always show
                            return true;
                        }
                        if (medianFareLowerThanCurrentLowestFare()) {
                            return true;
                        }
                        return false;
                    };

                    function medianFareLowerThanCurrentLowestFare() {
                        return ($scope.currentLowestFare < $scope.fareRangeSummary.fareDataForRequestedDates.MedianFare) && ($scope.currentLowestFareCurrency ===  $scope.fareRangeSummary.fareDataForRequestedDates.CurrencyCode)
                    }

                }])
            .directive('fareRange', function () {
                return {
                    restrict: 'AE',
                    scope: {
                          origin: '@'
                        , destination: '@'
                        , departureDate: '@'
                        , returnDate: '@'
                        , currentLowestFare: '@'
                        , currentLowestFareCurrency: '@'
                        , rangeDays: '@'
                    },
                    template: FareRangeWidgetTemplate,
                    controller: 'FareRangeCtrl'
                };
            })
            .factory('FareRangeSummaryService', function () { // provides summary recommendation whether to buy now or not, based on Fare Range service (based on what the others paid). Implements specific business recommendation logic.

                function getFareDataForRequestedDates(fareDataArr, requestedDepartureDate, requestedReturnDate) {
                    return _.find(fareDataArr, function (fareData) {
                        return (moment(fareData.DepartureDateTime, moment.ISO_8601).isSame(requestedDepartureDate)
                            && moment(fareData.ReturnDateTime, moment.ISO_8601).isSame(requestedReturnDate));
                    });
                }

                return {
                    getSummary: function (fareRangeWebServiceResponse, requestedDepartureDate, requestedReturnDate) {
                        var fareDataForRequestedDates = getFareDataForRequestedDates(fareRangeWebServiceResponse.FareData, requestedDepartureDate, requestedReturnDate);
                        var medianOfAllMedianFares = _.median(_.pluck(fareRangeWebServiceResponse.FareData, 'MedianFare'));
                        var maximumOfAllMaximumFare = _.max(_.pluck(fareRangeWebServiceResponse.FareData, 'MaximumFare'));
                        var fareCurrencyCodes = _.uniq(_.pluck(fareRangeWebServiceResponse.FareData, 'CurrencyCode'));
                        if (fareCurrencyCodes.length > 1) {
                            throw new Error('Cannot calculate median and max fares for fares in different currencies');
                        }
                        return {
                              overallMedianFare: medianOfAllMedianFares
                            , overallMaximumFare: maximumOfAllMaximumFare
                            , currency: _.first(fareCurrencyCodes)
                            , fareDataForRequestedDates: fareDataForRequestedDates
                        };
                    }
                };
            });
    });