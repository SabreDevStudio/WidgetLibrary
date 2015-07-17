define([
        'angular'
      , 'util/BaseServices'
      , 'webservices/SabreDevStudioWebServices'
      , 'angular_nvd3'
      , 'angular_moment'
      , 'angular_animate'
    ],
    function (
          NG
        , BaseServices
        , SabreDevStudioWebServices
        , angular_nvd3
        , angular_moment
        , angular_animate
    ) {
        'use strict';

        return angular.module('sdsWidgets', ['baseServices', 'sabreDevStudioWebServices', 'nvd3', 'angularMoment', 'ui.bootstrap', 'ngAnimate'])
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
