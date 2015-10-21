define([
          'angular'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/FareNabberWidget.tpl.html'
    ],
    function (
          angular
        , SDSWidgets
        , FareNabberWidgetTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

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
                    template: FareNabberWidgetTemplate,
                    transclude: true,
                    link: function (scope, element) {

                        element.on('click', showSubscriptionForm);

                        function showSubscriptionForm () {
                            var modalInstance = $modal.open({
                                  animation: true
                                , templateUrl: 'FareNabberSubscriptionFormModal.html.tpl'
                                , controller: 'ModalInstanceCtrl'
                                , size: 'lg'
                                , scope: scope
                                //, resolve: { //TODO: reconsider later (like resolve in routes)
                                //    items: function () {
                                //        return scope.items;
                                //    }
                                //}
                            });

                            modalInstance.result.then(function (fareNabberSubscriptionRequest) {
                                console.log(fareNabberSubscriptionRequest); // here do fare nabber web service call with this data
                                // TODO: present also web service errors to the user
                            });
                        }
                    }
                };
            }]);
    });