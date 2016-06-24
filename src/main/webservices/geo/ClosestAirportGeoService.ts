define([
        'angular',
        'lodash',
        'util/LodashExtensions',
        'webservices/SabreDevStudioWebServicesModule',
        'webservices/geo/GeoSearchDataService',
        'webservices/lookup/AirportLookupDataService',
        'webservices/geo/AirportGeoData'
    ],
    function (
        angular,
        _,
        __,
        SabreDevStudioWebServicesModule,
        GeoSearchDataServiceSrc,
        AirportLookupDataServiceSrc,
        airportGeoData
    ) {
        'use strict';


        return angular.module('sabreDevStudioWebServices')
            .factory('ClosestAirportGeoService', [
                '$q',
                'GeoSearchDataService',
                'AirportLookupDataService',
                function (
                $q,
                GeoSearchDataService,
                AirportLookupDataService
                ) {

                    function getClosestAirportGeoData(closestAirportOverride) {
                        return $q(function (resolve, reject) {
                            var closestAirportPromise = (__.isDefined(closestAirportOverride))? $q.when(closestAirportOverride): GeoSearchDataService.getAPISupportedClosestAirport();
                            var closestAirportGeoData = {
                                airportCode: undefined,
                                countryCode: undefined,
                                geoCoordinates: undefined
                            };
                            closestAirportPromise
                                .then(function (closestAirport) {
                                    closestAirportGeoData.airportCode = closestAirport;
                                    return AirportLookupDataService.getAirportData(closestAirport)
                                }, reject)
                                .then(function (airportData) {
                                    closestAirportGeoData.countryCode = airportData.CountryCode;
                                    resolve(closestAirportGeoData);
                                }, reject);
                        });
                    }

                    return {
                        getClosestAirportGeoData: getClosestAirportGeoData
                    };
                }
            ]);
    });

