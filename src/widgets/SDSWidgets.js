define([
        'angular'
      , 'util/BaseServices'
      , 'util/CommonDirectives'
      , 'util/CommonFilters'
      , 'webservices/SabreDevStudioWebServices'
      , 'angular_moment'
      , 'angular_animate'
      , 'angular-ui-select'
      , 'angular-sanitize'
      , 'util/Lookups'
      , 'angular-img-fallback'
      , 'angular-rangeslider'
      , 'ngStorage'
    ],
    function (
          NG
        , BaseServices
        , CommonDirectives
        , CommonFilters
        , SabreDevStudioWebServices
        , angular_moment
        , angular_animate
        , angular_ui_select
        , angular_sanitize
        , Lookups
        , angular_img_fallback
        , angular_rangeslider
        , ngStorage
    ) {
        'use strict';

        return angular.module('sdsWidgets', ['baseServices', 'sabreDevStudioWebServices', 'commonDirectives', 'commonFilters', 'angularMoment', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ui.select', 'sDSLookups', 'dcbImgFallback', 'ui-rangeSlider', 'ngStorage'])
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .constant('filteringCriteriaChangedEvent', 'filteringCriteriaChangedEvent')
            .constant('itinerariesStatisticsUpdateNotification', 'itinerariesStatisticsUpdateNotification')
            .constant('resetAllFiltersEvent', 'resetAllFiltersEvent')
            .constant('dateSelectedEvent', 'dateSelectedEvent')
            .config(function (datepickerConfig) { //TODO make every widget a module of its own, then this config, specyfic to Form will go there
                datepickerConfig.showWeeks = false;
                datepickerConfig.startingDay = 1;
                datepickerConfig.yearRange = 2;
                datepickerConfig.showButtonBar = false;
            })
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
            });

    });
