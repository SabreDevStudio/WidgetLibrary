define([
        'angular'
      , 'util/BaseServices'
      , 'util/CommonDirectives'
      , 'util/CommonFilters'
      , 'webservices/SabreDevStudioWebServices'
      , 'angular_nvd3'
      , 'angular_moment'
      , 'angular_animate'
      , 'angular-ui-select'
      , 'angular-sanitize'
      , 'util/Lookups'
      , 'angular-img-fallback'
    ],
    function (
          NG
        , BaseServices
        , CommonDirectives
        , CommonFilters
        , SabreDevStudioWebServices
        , angular_nvd3
        , angular_moment
        , angular_animate
        , angular_ui_select
        , angular_sanitize
        , Lookups
        , angular_img_fallback
    ) {
        'use strict';

        return angular.module('sdsWidgets', ['baseServices', 'sabreDevStudioWebServices', 'commonDirectives', 'commonFilters', 'nvd3', 'angularMoment', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ui.select', 'sDSLookups', 'dcbImgFallback'])
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
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
            }]);
    });
