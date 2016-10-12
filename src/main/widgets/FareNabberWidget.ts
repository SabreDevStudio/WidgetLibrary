define([
        'angular'
        , 'moment'
        , 'util/LodashExtensions'
        , 'widgets/SDSWidgets'
        , 'webservices/fareNabber/FareNabberSubscriptionService'
        , 'widgets/searchForm/InputTimeOfDayRange'
        , 'widgets/WidgetGlobalCallbacks'
    ],
    function (
          angular
        , moment
        , __
        , SDSWidgets
        , FareNabberSubscriptionServiceSrc
        , InputTimeOfDayRange
        , WidgetGlobalCallbacks
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareNabberFormModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

                $scope.defaultOptions = {
                      earliestTravelStart: new Date()
                    , subscriptionExpiry: moment().add(1, 'years').toDate()
                    , allowInterline: true
                };
                $scope.subscriptionExpiryDate = $scope.defaultOptions.subscriptionExpiry;

                $scope.outboundTravelTimeRange = {
                    departure: undefined,
                    arrival: undefined
                };
                $scope.inboundTravelTimeRange = {
                    departure: undefined,
                    arrival: undefined
                };

                $scope.daysOfTravelPreference = {
                    outbound: undefined,
                    inbound: undefined
                };

                $scope.preferredAirlines = {
                    selected: []
                };

                $scope.flexibleDepartureDate = false;
                $scope.flexibleReturnDate = false;

                $scope.subscribe = function () {

                    var allProps = [
                          'subscriberEmail'
                        , 'origin'
                        , 'destination'
                        , 'flexibleDepartureDate'
                        , 'departureDate'
                        , 'departureDateFrom'
                        , 'departureDateTo'
                        , 'flexibleReturnDate'
                        , 'returnDate'
                        , 'returnDateFrom'
                        , 'returnDateTo'
                        , 'passengerType'
                        , 'passengerCount'
                        , 'directFlightsOnly'
                        , 'allowInterline'
                        , 'maximumAcceptablePrice'
                        , 'maximumAcceptablePriceCurrency'
                        , 'subscriptionExpiryDate'
                        , 'outboundTravelTimeRange'
                        , 'inboundTravelTimeRange'
                        , 'daysOfTravelPreference'
                        , 'preferredAirlines'
                    ];
                    var fareNabberSubscriptionRequest = allProps.reduce(function (acc, curr) {
                        if (__.isDefined($scope[curr])) {
                            acc[curr] = $scope[curr];
                        }
                        return acc;
                    }, {});

                    $modalInstance.close(fareNabberSubscriptionRequest);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancelled');
                };

            }])
            .directive('fareNabber', [
                      '$modal'
                    , 'FareNabberSubscriptionService'
                    , 'resetErrorsEvent'
                    , '$rootScope'
                , function (
                      $modal
                    , FareNabberSubscriptionService
                    , resetErrorsEvent
                    , $rootScope
                ) {
                return {
                    restrict: 'AE',
                    scope: {
                          origin: '@'
                        , destination: '@'
                        , predefinedDepartureDate: '@departureDate'
                        , predefinedReturnDate: '@returnDate'
                        , passengerType: '@'
                        , passengerCount: '@'
                        , maximumAcceptablePrice: '@'
                        , maximumAcceptablePriceCurrency: '@'
                        , showEmailField: '@?'
                    },
                    templateUrl: '../widgets/view-templates/widgets/FareNabberWidget.tpl.html',
                    transclude: true,
                    link: function (scope, element) {

                        parseDirectiveAttributes();

                        element.on('click', function () {
                            runSubscriptionWorkflow();
                            $rootScope.$broadcast(resetErrorsEvent); // reset previous errors (from previous tries).
                        });

                        function parseDirectiveAttributes() {
                            const directiveAttributesDateFormat = moment.ISO_8601;
                            scope.departureDate = moment(scope.predefinedDepartureDate, directiveAttributesDateFormat).toDate();
                            scope.departureDateFrom = moment(scope.predefinedDepartureDate, directiveAttributesDateFormat).subtract(1, 'M').toDate();
                            scope.departureDateTo = moment(scope.predefinedDepartureDate, directiveAttributesDateFormat).add(1, 'M').toDate();
                            scope.returnDate = moment(scope.predefinedReturnDate, directiveAttributesDateFormat).toDate();
                            scope.returnDateFrom = moment(scope.predefinedReturnDate, directiveAttributesDateFormat).subtract(1, 'M').toDate();
                            scope.returnDateTo = moment(scope.predefinedReturnDate, directiveAttributesDateFormat).add(1, 'M').toDate();
                        }

                        function runSubscriptionWorkflow() {
                            showSubscriptionForm()
                                .then(createSubscription)
                                .then(showSuccessfulSubscriptionMessage)
                        }

                        function showSubscriptionForm () {
                            var modalInstance = $modal.open({
                                animation: true
                                , templateUrl: 'FareNabberSubscriptionFormModal.html.tpl'
                                , controller: 'FareNabberFormModalInstanceCtrl'
                                , size: 'lg'
                                , scope: scope
                            });

                            return modalInstance.result;
                        }

                        function createSubscription(fareNabberFormData: any) {
                            return FareNabberSubscriptionService.subscribe(fareNabberFormData);
                        }

                        function showSuccessfulSubscriptionMessage() {
                            $modal.open({
                                animation: true
                                , templateUrl: 'FareNabberSubscriptionSuccessful.html.tpl'
                                , controller: ['$scope', '$modalInstance', function (modalInstanceScope, $modalInstance) {
                                    modalInstanceScope.ok = function () {
                                        $modalInstance.close();
                                    };
                                }]
                                , size: 'md'
                                , scope: scope
                            });
                        }


                        WidgetGlobalCallbacks.linkComplete(scope, element);

                        scope.$on('$destroy', function() {
                            element.off('click');
                        });
                    }
                };
            }]);
    });