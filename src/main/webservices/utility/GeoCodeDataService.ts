define([
          'angular'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
    ],
    function (
          angular
        , _
        , SabreDevStudioWebServicesModule
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('GeoCodeDataServiceRequestFactory', function () {
                return {
                    buildRequest: function (aiportCode) {
                        var request = [{
                            "GeoCodeRQ":{
                                "PlaceById":{
                                    "Id":aiportCode,
                                    "BrowseCategory": {
                                        "name": "AIR"
                                    }
                                }
                            }
                        }];
                        return request;
                    }
                }
            })
            .factory('GeoCodeDataService', [
                      '$q'
                    , 'GeoCodeWebService'
                    , 'GeoCodeDataServiceRequestFactory'
                    , '$localStorage'
                    , 'ErrorReportingService'
                    , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , GeoCodeWebService
                    , GeoCodeDataServiceRequestFactory
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                ) {

                function parseWebServiceResponse(response) {
                    var locationGeoData = response.Results[0].GeoCodeRS.Place[0];
                    return {
                        latitude: locationGeoData.latitude,
                        longitude: locationGeoData.longitude
                    };
                }

                function getAirportGeoCoordinates(airportCode) {
                    return $q(function (resolve, reject) {
                        var foundInLocalStorage = getFromLocalStorage(airportCode);
                        if (foundInLocalStorage) {
                            return resolve(_.clone(foundInLocalStorage));
                        }
                        var request = GeoCodeDataServiceRequestFactory.buildRequest(airportCode);
                        GeoCodeWebService.sendRequest(request).then(
                            function (response) {
                                var geoCoordinates = parseWebServiceResponse(response);
                                persistInLocalStorage(airportCode, geoCoordinates);
                                resolve(geoCoordinates);
                            }
                            , function (reason) {
                                ErrorReportingService.reportError('Cannot get geo coordinates for airport', airportCode);
                                businessMessagesErrorHandler.handle(reject, reason);
                            }
                        );
                    });
                }

                function getFromLocalStorage(airportCode) {
                    var geoCoordinatesFound = $localStorage.airportsGeoCoordinates && $localStorage.airportsGeoCoordinates[airportCode];
                    if (geoCoordinatesFound) {
                        return {
                            latitude: geoCoordinatesFound[0],
                            longitude: geoCoordinatesFound[1]
                        };
                    }
                }

                function persistInLocalStorage(airportCode, geoCoordinates) {
                    if (_.isUndefined($localStorage.airportsGeoCoordinates)) {
                        $localStorage.airportsGeoCoordinates = {};
                    }
                    $localStorage.airportsGeoCoordinates[airportCode] = [geoCoordinates.latitude, geoCoordinates.longitude];
                }

                return {
                    getAirportGeoCoordinates: getAirportGeoCoordinates
                };
            }])
    });
