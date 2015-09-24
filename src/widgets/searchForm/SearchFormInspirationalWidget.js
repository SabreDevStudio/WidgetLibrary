define([
        'moment'
        , 'angular'
        , 'util/LodashExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/SearchFormInspirationalWidget.tpl.html'
    ],
    function (
          moment
        , angular
        , __
        , angular_bootstrap
        , SDSWidgets
        , InspirationalSearchFormWidgetTemplate) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('searchFormInspirational', [
                      'InspirationalSearchCriteriaBroadcastingService'
                    , 'newInspirationalSearchCriteriaEvent'
                    , 'PointOfSaleCountryLookupDataService'
                , function (
                      SearchCriteriaBroadcastingService
                    , newInspirationalSearchCriteriaEvent
                    , PointOfSaleCountryLookupDataService
                ) {

                var noPointOfSaleCountryPreference = {
                      countryCode: undefined
                    , countryName: undefined
                };

                return {
                    replace: true,
                    template: InspirationalSearchFormWidgetTemplate,
                    link: function (scope) {
                        scope.pointOfSaleCountries = [
                            noPointOfSaleCountryPreference
                        ];
                        PointOfSaleCountryLookupDataService.getPointOfSaleCountries().then(function (pointOfSaleCountries) {
                            console.log(pointOfSaleCountries);
                            __.pushAll(scope.pointOfSaleCountries, pointOfSaleCountries);
                        });

                        scope.createNewSearchCriteria = function () {
                            SearchCriteriaBroadcastingService.searchCriteria = {
                                  destination: scope.destination.airportCode
                                , pointOfSaleCountry: scope.pointOfSaleCountry
                            };
                            SearchCriteriaBroadcastingService.broadcast();
                        };
                    }
                }
            }]);
    });
