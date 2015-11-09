define([
        'moment'
        , 'angular'
        , 'util/LodashExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
    ],
    function (
          moment
        , angular
        , __
        , angular_bootstrap
        , SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('searchFormInspirational', [
                      'InspirationalSearchCriteriaBroadcastingService'
                    , 'PointOfSaleCountryLookupDataService'
                , function (
                    InspirationalSearchCriteriaBroadcastingService
                    , PointOfSaleCountryLookupDataService
                ) {

                var noPointOfSaleCountryPreference = {
                      countryCode: undefined
                    , countryName: undefined
                };

                return {
                    replace: true,
                    templateUrl: '../widgets/view-templates/widgets/SearchFormInspirationalWidget.tpl.html',
                    link: function (scope) {
                        scope.pointOfSaleCountries = [
                            noPointOfSaleCountryPreference
                        ];
                        PointOfSaleCountryLookupDataService.getPointOfSaleCountries().then(function (pointOfSaleCountries) {
                            __.pushAll(scope.pointOfSaleCountries, pointOfSaleCountries);
                        });

                        scope.createNewSearchCriteria = function () {
                            InspirationalSearchCriteriaBroadcastingService.searchCriteria = {
                                  destination: scope.destination.airportCode
                                , pointOfSaleCountry: scope.pointOfSaleCountry
                            };
                            InspirationalSearchCriteriaBroadcastingService.broadcast();
                        };
                    }
                }
            }]);
    });
