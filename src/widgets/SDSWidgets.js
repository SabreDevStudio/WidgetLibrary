define([
        'angular'
      , 'util/BaseServices'
      , 'util/CommonDirectives'
      , 'util/CommonFilters'
      , 'webservices/SabreDevStudioWebServicesModule'
      , 'angular_moment'
      , 'angular-ui-select'
      , 'angular-sanitize'
      , 'util/Lookups'
      , 'angular-img-fallback'
      , 'angular-rangeslider'
      , 'angular_iso_currency'
      , 'text!view-templates/ErrorsModal.tpl.html'
      , 'text!view-templates/ErrorsMessages.tpl.html'
    ],
    function (
          NG
        , BaseServices
        , CommonDirectives
        , CommonFilters
        , SabreDevStudioWebServicesModule
        , angular_moment
        , angular_ui_select
        , angular_sanitize
        , Lookups
        , angular_img_fallback
        , angular_rangeslider
        , angular_iso_currency
        , ErrorsModalTemplate
        , ErrorMessagesTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets', [
                  'baseServices'
                , 'sabreDevStudioWebServices'
                , 'commonDirectives'
                , 'commonFilters'
                , 'angularMoment'
                , 'ui.bootstrap'
                , 'ngSanitize'
                , 'ui.select'
                , 'sDSLookups'
                , 'dcbImgFallback'
                , 'ui-rangeSlider'
                , 'isoCurrency'
            ])
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .constant('filteringCriteriaChangedEvent', 'filteringCriteriaChangedEvent')
            .constant('itinerariesStatisticsUpdateNotification', 'itinerariesStatisticsUpdateNotification')
            .constant('resetAllFiltersEvent', 'resetAllFiltersEvent')
            .constant('dateSelectedEvent', 'dateSelectedEvent')
            .constant('noResultsFoundEvent', 'noResultsFoundEvent')
            .config(['datepickerConfig', function (datepickerConfig) { //TODO make every widget a module of its own, then this config, specyfic to Form will go there
                datepickerConfig.showWeeks = false;
                datepickerConfig.startingDay = 1;
                datepickerConfig.yearRange = 2;
                datepickerConfig.showButtonBar = false;
            }])
            .config(['$compileProvider', function($compileProvider) {
                // we need debug enabled effectively to true for development, as these information is needed for the tools (Protractor, Batarang)
                // for production we will cut off the later setting to true, with requirejs pragmas, to have it effectively disabled on production
                $compileProvider.debugInfoEnabled(false);
                //>>excludeStart('appBuildExclude', pragmas.appBuildExclude);
                $compileProvider.debugInfoEnabled(true);
                //>>excludeEnd('appBuildExclude');
            }])
            .service('SearchCriteriaBroadcastingService', [
                  '$rootScope'
                , 'newSearchCriteriaEvent'
            , function ($rootScope, newSearchCriteriaEvent) {
                var service = {};
                service.searchCriteria = undefined;
                service.broadcast = function () {
                    $rootScope.$broadcast(newSearchCriteriaEvent);
                };
                return service;
            }])
            .service('DateSelectedBroadcastingService', [
                '$rootScope'
                , 'dateSelectedEvent'
                , function ($rootScope, dateSelectedEvent) {
                    var service = {};
                    service.originalDataSourceWebService = undefined;
                    service.newSearchCriteria = undefined;
                    service.broadcast = function () {
                        $rootScope.$broadcast(dateSelectedEvent);
                    };
                    return service;
            }])
            .service('NoResultsFoundBroadcastingService', [
                '$rootScope'
                , 'noResultsFoundEvent'
                , function ($rootScope, noResultsFoundEvent) {
                    var service = {};
                    service.broadcast = function () {
                        $rootScope.$broadcast(noResultsFoundEvent);
                    };
                    return service;
                }])
            .service('ItineraryStatisticsBroadcastingService', [
                '$rootScope'
                , 'itinerariesStatisticsUpdateNotification'
                , function ($rootScope, itinerariesStatisticsUpdateNotification) {
                    var service = {};
                    service.statistics = undefined;
                    service.broadcast = function () {
                        $rootScope.$broadcast(itinerariesStatisticsUpdateNotification);
                    };
                    return service;
            }])
            .service('FilteringCriteriaChangedBroadcastingService', [
                '$rootScope'
                , 'filteringCriteriaChangedEvent'
                , function ($rootScope, filteringCriteriaChangedEvent) {
                    var service = {};
                    service.filteringFunctions = undefined;
                    service.broadcast = function () {
                        $rootScope.$broadcast(filteringCriteriaChangedEvent);
                    };
                    return service;
            }])
            .factory('StatisticsGatheringRequestsRegistryService', function () { //TODO maybe move from here to other place
                var registry = [];
                return {
                    register: function (statisticDescription) {
                        registry.push(statisticDescription);
                    },
                    getAll: function () {
                        return registry;
                    }
                };
            })
            .factory('ValidationErrorsReportingService', [
                '$modal'
                , function ($modal) {
                    return {
                        reportErrors: function (errors, errorsCategory) {
                            var modalInstance = $modal.open({
                                animation: true,
                                template: ErrorsModalTemplate,
                                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                                    $scope.errorsList = errors;
                                    $scope.modalTitle = errorsCategory;

                                    $scope.ok = function () {
                                        $modalInstance.close();
                                    };
                                }]
                            });
                        }
                    };
                }])
            .directive('errorMessages', function () {
                return {
                    restrict: 'EA',
                    scope: {
                        messages: '='
                    },
                    replace: true,
                    template: ErrorMessagesTemplate
                };
            });


    });
