define([
          'angular'
        , 'moment'
        , 'widgets/SDSWidgets'
        , 'webservices/fareNabber/FareNabberSubscriptionService'
        , 'widgets/searchForm/InputTimeOfDayRange'
    ],
    function (
          angular
        , moment
        , SDSWidgets
        , FareNabberSubscriptionServiceSrc
        , InputTimeOfDayRange
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareNabberModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

                $scope.defaultOptions = {
                      earliestTravelStart: new Date()
                    , earliestSubscriptionExpiry: moment().add(1, 'years').toDate()
                    , allowInterline: true
                };
                $scope.subscriptionExpiryDate = $scope.defaultOptions.earliestSubscriptionExpiry;

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

                $scope.subscribe = function () {

                    var allProps = [
                          'subscriberEmail'
                        , 'origin'
                        , 'destination'
                        , 'departureDate'
                        , 'returnDate'
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
                        if ($scope[curr]) {
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
            .directive('fareNabber', ['$modal', 'FareNabberSubscriptionService', function ($modal, FareNabberSubscriptionService) {
                return {
                    restrict: 'A',
                    scope: {
                          origin: '@'
                        , destination: '@'
                        , predefinedDepartureDate: '@departureDate'
                        , predefinedReturnDate: '@returnDate'
                        , passengerType: '@'
                        , passengerCount: '@'
                        , maximumAcceptablePrice: '@'
                        , maximumAcceptablePriceCurrency: '@'
                    },
                    templateUrl: '../widgets/view-templates/widgets/FareNabberWidget.tpl.html',
                    transclude: true,
                    link: function (scope, element) {

                        parseDirectiveAttributes();

                        element.on('click', showSubscriptionForm);

                        function parseDirectiveAttributes() {
                            const directiveAttributesDateFormat = moment.ISO_8601;
                            scope.departureDate = moment(scope.predefinedDepartureDate, directiveAttributesDateFormat).toDate();
                            scope.returnDate = moment(scope.predefinedReturnDate, directiveAttributesDateFormat).toDate();
                        }

                        function showSubscriptionForm () {
                            var modalInstance = $modal.open({
                                  animation: true
                                , templateUrl: 'FareNabberSubscriptionFormModal.html.tpl'
                                , controller: 'FareNabberModalInstanceCtrl'
                                , size: 'lg'
                                , scope: scope
                            });

                            modalInstance.result
                                .then(FareNabberSubscriptionService.subscribe)
                                //.then(function (successResult) {
                                //    // 1. call the other REST service to register email and subscription id
                                //    // 2. present other popup to user on successfully subscribed
                                //});
                                .then(function (formSubscriptionData) {
                                })
                        }
                    }
                };
            }]);
    });