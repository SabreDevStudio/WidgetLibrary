define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'widgets/BaseController'
        , 'text!view-templates/widgets/DestinationPricer.tpl.html'
        , 'webservices/InspirationalServices'
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

        return angular.module('sdsWidgets')
            .controller('DestinationPricerCtrl', [
                      '$scope'
                    , 'DestinationPricerDataService'
                    , 'ValidationErrorsReportingService'
                    , 'newInspirationalSearchCriteriaEvent'
                    , 'InspirationalSearchCriteriaBroadcastingService'
                , function (
                        $scope
                      , DestinationPricerDataService
                      , validationErrorsReportingService
                      , newSearchCriteriaEvent
                      , searchCriteriaBroadcastingService
                ) {

                    var searchService = {
                          executeSearch: DestinationPricerDataService.getPricesToDestination
                        , validateSearchCriteria: function () {
                            return [];
                        }
                    };

                    BaseController.call(this, {
                          scope: $scope
                        , searchService: searchService
                        , validationErrorsReportingService: validationErrorsReportingService
                        , newSearchCriteriaEvent: newSearchCriteriaEvent
                        , searchCriteriaBroadcastingService: searchCriteriaBroadcastingService
                    });
                    this.prototype = Object.create(BaseController.prototype);
                    this.prototype.constructor = this.constructor;

                     function initializeEmptyModel() {
                         $scope.modelPricesToDestination = {};
                    }

                    initializeEmptyModel();

                    this.processSearchResults = function (pricesToDestination) {
                        $scope.modelPricesToDestination = pricesToDestination;
                    };

                    this.clearModel = function () {
                        initializeEmptyModel(); //TODO: pull this strategy into BaseController
                    };

                    this.isAnyDataToDisplayAvailable = function () {
                        return !(_.isEmpty($scope.modelPricesToDestination.FareInfo));
                    };
                }
            ])
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
                }
            });
    });
