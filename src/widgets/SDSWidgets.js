define([
        'angular'
      , 'util/BaseServices'
      , 'util/CommonDirectives'
      , 'util/CommonGenericFilters'
      , 'util/CommonDisplayFilters'
      , 'webservices/SabreDevStudioWebServicesModule'
      , 'webservices/Interceptors'
      , 'angular-ui-select'
      , 'angular-sanitize'
      , 'util/Lookups'
      , 'angular-img-fallback'
      , 'angular-rangeslider'
      , 'angular_iso_currency'
    ],
    function (
          NG
        , BaseServices
        , CommonDirectives
        , CommonGenericFilters
        , CommonDisplayFilters
        , SabreDevStudioWebServicesModule
        , Interceptors
        , angular_ui_select
        , angular_sanitize
        , Lookups
        , angular_img_fallback
        , angular_rangeslider
        , angular_iso_currency
    ) {
        'use strict';

        return angular.module('sdsWidgets', [
                  'baseServices'
                , 'sabreDevStudioWebServices'
                , 'commonDirectives'
                , 'commonFilters'
                , 'ui.bootstrap'
                , 'ngSanitize'
                , 'ui.select'
                , 'sDSLookups'
                , 'dcbImgFallback'
                , 'ui-rangeSlider'
                , 'isoCurrency'
            ])
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .constant('newInspirationalSearchCriteriaEvent', 'newInspirationalSearchCriteriaEvent')
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
            .service('InspirationalSearchCriteriaBroadcastingService', [
                '$rootScope'
                , 'newInspirationalSearchCriteriaEvent'
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
            .factory('StatisticsGatheringRequestsRegistryService', function () {
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
    });
