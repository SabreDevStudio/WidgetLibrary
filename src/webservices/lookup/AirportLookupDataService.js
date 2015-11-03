define([
          'angular'
        , 'lodash'
        , 'util/LodashExtensions'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/common/PromiseUtils'
    ],
    function (
          angular
        , _
        , __
        , SabreDevStudioWebServicesModule
        , PromiseUtils
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AirportLookupDataService', [
                      '$q'
                    , 'ShoppingAirportsAndCitiesLookupWebService'
                    , '$localStorage'
                    , 'ErrorReportingService'
                    , 'businessMessagesErrorHandler'
                    , 'PromiseUtils'
                , function (
                      $q
                    , AirportsLookupService
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                    , PromiseUtils
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

                function getAirportsDictionary() {
                    return $q(function (resolve, reject) {
                        if ($localStorage.airportsDictionary) {
                            return resolve($localStorage.airportsDictionary);
                        }
                        AirportsLookupService.get().$promise.then(
                            function (response) {
                                var airportsDictionary = parseAirportLookupResponse(response);
                                $localStorage.airportsDictionary = airportsDictionary;
                                resolve(airportsDictionary);
                            }
                            , function (reason) {
                                ErrorReportingService.reportError('Cannot get airports dictionary');
                                businessMessagesErrorHandler.handle(reject, reason);
                            }
                        );
                    });
                }

                function containsAirport(airportCode) {
                    return $q(function (resolve, reject) {
                        getAirportData(airportCode).then(function (airportData) {
                            resolve(__.isDefined(airportData));
                        }, function (reason) {
                            ErrorReportingService.reportError('Cannot determine if airport dictionary contains airport' + reason);
                            businessMessagesErrorHandler.handle(reject, reason);
                        });
                    });
                }

                function getAirportData(airportCode) {
                    return $q(function (resolve, reject) {
                        getAirportsDictionary().then(function (dictionary) {
                            resolve(dictionary[airportCode]);
                        }, reject);
                    });
                }

                function getAirportDataWithAirportCode(airportCode) {
                    return $q(function (resolve, reject) {
                        getAirportData(airportCode).then(function (airportData) {
                            airportData = _.clone(airportData);
                            resolve(_.extend(airportData, {airportCode: airportCode}));
                        }, reject);
                    });
                }

                /*  Performance optimisation: all private functions in this package return the very result object (not its clone, so in particular they return the very local storage object.
                    Public functions always return clone.
                    We could also return clone directly from all private functions (as in all other methods in code that read from local storage),
                    but we want to avoid excessive cloning big objects within invocations local to this package.
                */
                return {
                      getAirportsDictionary: PromiseUtils.addResolvedObjectCloning(getAirportsDictionary.bind(this))
                    , containsAirport: containsAirport
                    , getAirportData: PromiseUtils.addResolvedObjectCloning(getAirportData.bind(this))
                    , getAirportDataWithAirportCode: getAirportDataWithAirportCode
                };

            }])
    });
