define([
          'angular'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/FareNabberWidget.tpl.html'
    ],
    function (
          angular
        , SDSWidgets
        , FareNabberWidgetTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                $scope.datepickerOptions = {
                      format: 'dd-MMM-yyyy'
                    , earliestTravelStart: new Date()
                    , earliestSubscriptionExpiry: new Date()
                };

                $scope.openDepartureDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isDepartureDatePickerOpened = true;
                };

                $scope.openSubscriptionExpiryDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isSubscriptionExpiryDatePickerOpened = true;
                };

                $scope.subscribe = function () {
                    var fareNabberSubscriptionRequest = {
                          subscriberEmail: $scope.subscriberEmail
                        , origin: $scope.origin
                        , destination: $scope.destination
                        , departureDate: $scope.departureDate
                        , adultsCount: $scope.adultsCount
                        , maximumAcceptablePrice: $scope.maximumAcceptablePrice
                        , maximumAcceptablePriceCurrency: $scope.maximumAcceptablePriceCurrency
                        , subscriptionExpiryDate: $scope.subscriptionExpiryDate
                    } ;
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
                                // TODO: how to present web service errors to the user?
                            });
                        }
                    }
                };
            }]);
    });