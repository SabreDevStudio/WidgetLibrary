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
            .factory('AirportLookupDataService', [
                      '$q'
                    , 'ShoppingAirportsAndCitiesLookupWebService'
                    , '$localStorage'
                    , 'ErrorReportingService'
                    , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , AirportsLookupService
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                ) {

                function parseAirportLookupResponse(response) {

                    function updateDictionary(dictionary, entry) {
                        var airportCode = entry.AirportCode;
                        if (!dictionary[airportCode]) {
                            dictionary[airportCode] = {
                                  airportName: entry.AirportName
                                , cityName: entry.CityName
                                , countryCode: entry.CountryCode
                                , countryName: entry.CountryName
                            };
                        }
                    }

                    return response.OriginDestinationLocations.reduce(function (dictionary, entry) {
                        var originEntry = entry.OriginLocation;
                        updateDictionary(dictionary, originEntry);
                        var destinationEntry = entry.DestinationLocation;
                        updateDictionary(dictionary, destinationEntry);
                        return dictionary;
                    }, {});
                }

                return {
                    getAirportsDictionary: function () {
                        return $q(function (resolve, reject) {
                            if ($localStorage.airportsDictionary) {
                                return resolve(_.clone($localStorage.airportsDictionary));
                            }
                            AirportsLookupService.get().$promise.then(
                                function (response) {
                                    var airportsDictionary = parseAirportLookupResponse(response);
                                    $localStorage.airportsDictionary = airportsDictionary;
                                    resolve(_.clone(airportsDictionary));
                                }
                                , function (reason) {
                                    ErrorReportingService.reportError('Cannot get airports dictionary');
                                    businessMessagesErrorHandler.handle(reject, reason);
                                }
                            );
                        });
                    }
                };

            }])
    });
