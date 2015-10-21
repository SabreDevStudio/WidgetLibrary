define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'widgets/BaseController'
        , 'text!view-templates/widgets/DestinationPricer.tpl.html'
        , 'webservices/inspirational/InspirationalServices'
    ],
    function (
          moment
        , angular
        , _
        , angular_bootstrap
        , SDSWidgets
        , BaseController
        , DestinationPricerTemplate
        , InspirationalServices
    ) {
        'use strict';

        function DestinationPricesController(
            $scope
            , DestinationPricerDataService
            , newSearchCriteriaEvent
            , searchCriteriaBroadcastingService
        ) {

            var searchService = {
                executeSearch: DestinationPricerDataService.getPricesToDestination
            };

            BaseController.call(this, {
                scope: $scope
                , searchService: searchService
                , newSearchCriteriaEvent: newSearchCriteriaEvent
                , searchCriteriaBroadcastingService: searchCriteriaBroadcastingService
            });

            this.processSearchResults = function (pricesToDestination) {
                this.modelPricesToDestination = pricesToDestination;
            };

            this.clearModel = function () {
                this.modelPricesToDestination = {}; //TODO: pull this strategy into BaseController
            };

            this.isAnyDataToDisplayAvailable = function () {
                return !(_.isEmpty(this.modelPricesToDestination.FareInfo));
            };

            this.clearModel();

            return this
        }
        DestinationPricesController.prototype = Object.create(BaseController.prototype);
        DestinationPricesController.prototype.constructor = DestinationPricesController;

        return angular.module('sdsWidgets')
            .controller('DestinationPricerCtrl', [
                      '$scope'
                    , 'DestinationPricerDataService'
                    , 'newInspirationalSearchCriteriaEvent'
                    , 'InspirationalSearchCriteriaBroadcastingService'
                , DestinationPricesController])
            .directive('destinationPricer', function (
                ) {
                return {
                    restrict: 'EA',
                    scope: true,
                    template: DestinationPricerTemplate,
                    controller: 'DestinationPricerCtrl',
                    controllerAs: 'ctrl',
                    link: function (scope, element, attrs, controller) {
                        executeLifeSearchOnPredefinedCriteriaIfPresent(attrs.destination, attrs.pointofsalecountry);

                        function executeLifeSearchOnPredefinedCriteriaIfPresent(destination, pointOfSaleCountry) {
                            if (destination) {
                                var searchCriteria = {
                                      destination: destination
                                };
                                if (pointOfSaleCountry) {
                                    _.extend(searchCriteria, {
                                        pointOfSaleCountry: pointOfSaleCountry
                                    });
                                }
                                controller.processSearchCriteria(searchCriteria);
                            }
                        }

                    }
                };
            });
    });
