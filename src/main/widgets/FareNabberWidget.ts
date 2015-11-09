define([
          'angular'
        , 'widgets/SDSWidgets'
    ],
    function (
          angular
        , SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('FareNabberModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

                $scope.defaultOptions = {
                      earliestTravelStart: new Date()
                    , earliestSubscriptionExpiry: new Date()
                    , allowInterline: true
                };
                $scope.subscriptionExpiryDate = $scope.defaultOptions.earliestSubscriptionExpiry;

                $scope.outboundTravelTimeRange = {
                    isDepartureOrArrival: 'departure'
                };
                $scope.inboundTravelTimeRange = {
                    isDepartureOrArrival: 'departure'
                };

                $scope.subscribe = function () {
                    var allProps = [
                          'subscriberEmail'
                        , 'origin'
                        , 'destination'
                        , 'departureDate'
                        , 'returnDate'
                        , 'adultsCount'
                        , 'directFlightsOnly'
                        , 'allowInterline'
                        , 'maximumAcceptablePrice'
                        , 'maximumAcceptablePriceCurrency'
                        , 'subscriptionExpiryDate'
                        , 'outboundTravelTimeRange'
                        , 'outboundDepartureOrArrivalTimeRange'
                        , 'inboundTravelTimeRange'
                        , 'inboundDepartureOrArrivalTimeRange'
                        , 'tmp'
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
            .directive('fareNabber', ['$modal', function ($modal) {
                return {
                    restrict: 'A',
                    scope: {
                          origin: '@'
                        , destination: '@'
                        , departureDate: '@'
                        , returnDate: '@'
                        , adultsCount: '@'
                        , maximumAcceptablePrice: '@'
                        , maximumAcceptablePriceCurrency: '@'
                    },
                    templateUrl: '../widgets/view-templates/widgets/FareNabberWidget.tpl.html',
                    transclude: true,
                    link: function (scope, element) {

                        element.on('click', showSubscriptionForm);

                        function showSubscriptionForm () {
                            var modalInstance = $modal.open({
                                  animation: true
                                , templateUrl: 'FareNabberSubscriptionFormModal.html.tpl'
                                , controller: 'FareNabberModalInstanceCtrl'
                                , size: 'lg'
                                , scope: scope
                            });

                            modalInstance.result.then(function (fareNabberSubscriptionRequest) {
                                console.log(fareNabberSubscriptionRequest); // here do fare nabber web service call with this data
                            });
                        }
                    }
                };
            }]);
    });