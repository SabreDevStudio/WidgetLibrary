define([
        'angular'
      , 'util/BaseServices'
      , 'util/CommonDirectives'
      , 'util/CommonGenericFilters'
      , 'util/CommonDisplayFilters'
      , 'widgets/inspirational/InspirationalWidgets.mod'
      , 'widgets/basicSearch/basicSearch.mod'
      , 'widgets/searchForm/searchForm.mod'
      , 'webservices/Interceptors'
      , 'angular-ui-select'
      , 'angular-sanitize'
      , 'util/LookupFilters'
      , 'util/SerializationServices'
      , 'angular-img-fallback'
      , 'angular-rangeslider'
      , 'angular_iso_currency'
      , 'angular-touch'
      , 'nsPopover'
      , 'WidgetsFilterPanel'
      , 'usSpinnerService'
    ],
    function (
          angular
        , BaseServices
        , CommonDirectives
        , CommonGenericFilters
        , CommonDisplayFilters
        , InspirationalWidgetsModule
        , BasicSearchModule
        , TimePickerPopModule
        , Interceptors
        , angular_ui_select
        , angular_sanitize
        , LookupFilters
        , SerializationServices
        , angular_img_fallback
        , angular_rangeslider
        , angular_iso_currency
        , angular_touch
        , nsPopover
        , WidgetsFilterPanelModule
        , usSpinnerServiceModule

    ) {
        'use strict';

        return angular.module('sdsWidgets', [
                  'baseServices'
                , 'sabreDevStudioWebServices'
                , 'sdsWidgets.inspirationalWidgets'
                , 'sdsWidgets.errorDisplays'
                , 'sdsWidgets.basicSearch'
                , 'sdsWidgets.searchForm'
                , 'commonDirectives'
                , 'commonFilters'
                , 'ui.bootstrap'
                , 'ngSanitize'
                , 'ui.select'
                , 'sDSLookups'
                , 'SDSWidgets.SerializationServices'
                , 'dcbImgFallback'
                , 'ui-rangeSlider'
                , 'isoCurrency'
                , 'ngTouch'
                , 'nsPopover'
                , 'WidgetsFilterPanel'
                , 'angularSpinner'
            ])
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .constant('newInspirationalSearchCriteriaEvent', 'newInspirationalSearchCriteriaEvent')
            .constant('resetAllFiltersEvent', 'resetAllFiltersEvent')
            .constant('dateSelectedEvent', 'dateSelectedEvent')
            .constant('noResultsFoundEvent', 'noResultsFoundEvent')
            .config(['uibDatepickerConfig', function (uibDatepickerConfig) {
                uibDatepickerConfig.showWeeks = false;
                uibDatepickerConfig.startingDay = 1;
                uibDatepickerConfig.yearRange = 2;
                uibDatepickerConfig.showButtonBar = false;
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
                var service  = {
                    searchCriteria: undefined,
                    broadcast: function () {
                        $rootScope.$broadcast(newSearchCriteriaEvent);
                    }
                };
                return service;
            }])
            .service('InspirationalSearchCriteriaBroadcastingService', [
                '$rootScope'
                , 'newInspirationalSearchCriteriaEvent'
                , function ($rootScope, newInspirationalSearchCriteriaEvent) {
                    var service = {
                        searchCriteria: undefined,
                        broadcast: function () {
                            $rootScope.$broadcast(newInspirationalSearchCriteriaEvent);
                        }
                    };
                    return service;
                }])

            .service('DateSelectedBroadcastingService', [
                '$rootScope'
                , 'dateSelectedEvent'
                , function ($rootScope, dateSelectedEvent) {
                    var service = {
                          originalDataSourceWebService: undefined
                        , newSearchCriteria: undefined
                        , broadcast: function () {
                            $rootScope.$broadcast(dateSelectedEvent);
                        }
                    };
                    return service;
            }])
            .service('NoResultsFoundBroadcastingService', [
                '$rootScope'
                , 'noResultsFoundEvent'
                , function ($rootScope, noResultsFoundEvent) {
                    var service = {
                        broadcast: function () {
                            $rootScope.$broadcast(noResultsFoundEvent);
                        }
                    };
                    return service;
                }])
    });
