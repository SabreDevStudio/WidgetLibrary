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
            .factory('EquipmentLookupDataService', [
                      '$q'
                    , 'EquipmentLookupWebService'
                    , 'StandardErrorHandler'
                    , '$localStorage'
                , function (
                      $q
                    , EquipmentLookupWebService
                    , StandardErrorHandler
                    , $localStorage
                ) {

                function parseEquipmentLookupServiceResponse(response) {
                    var dictionary = {};
                    response.AircraftInfo.forEach(function (item) {
                        dictionary[item.AircraftCode] = item.AircraftName;
                    });
                    return dictionary;
                }

               return {
                   getAircraftDictionary: function () {
                       return $q(function (resolve, reject) {
                           if ($localStorage.aircraftDictionary) {
                               return resolve(_.clone($localStorage.aircraftDictionary));
                           }
                           EquipmentLookupWebService.get().$promise.then(
                               function (response) {
                                   var aircraftDictionary = parseEquipmentLookupServiceResponse(response);
                                   $localStorage.aircraftDictionary = aircraftDictionary;
                                   resolve(_.clone(aircraftDictionary));
                               }
                               , function (error) {
                                   reject(StandardErrorHandler.handleError(error));
                               }
                           );
                       });
                   }
               };
            }])
            .factory('AirlineLookupDataService', [
                  '$q'
                , 'AirlineLookupWebService'
                , 'StandardErrorHandler'
                , '$localStorage'
                , function (
                    $q
                    , AirlineLookupWebService
                    , StandardErrorHandler
                    , $localStorage
                ) {

                    function correctAirlineName(airlineName) {
                        // replacing company legal form abbreviations plus patching several most common and too long names
                        return airlineName.replace(/S\.?A\.?/g, '')
                            .replace(/gmbh/gi, '')
                            .replace(/Ltd\.?/gi, '')
                            .replace(/L\.?L\.?C\.?/gi, '')
                            .replace(/Limited/gi, '')
                            .replace(/Inc\.?/gi, '')
                            .replace(/AG/gi, '')
                            .replace(/Pty/gi, '')
                            .replace(/Co\./gi, '')
                            .replace(/C\.?A\.?/gi, '')
                            .replace(/.*Lan.*Ecuador.*/g, 'Lan Ecuador')
                            .replace(/.*Lan.*Equador.*/g, 'Lan Equador')
                            .replace(/.*SWISS.*/g, 'SWISS')
                            .replace(/.*Iberia.*/g, 'Iberia')
                            .replace(/.*Air.*Berlin.*/g, 'Air Berlin')
                            .replace(/.*Malaysian.*Airline.*/g, 'Malaysian Airline')
                            .replace(/.*Ukraine.*International.*/g, 'Ukraine International Airlines')
                            .replace(/.*Virgin.*Australia.*/g, 'Virgin Australia')
                            .replace(/.*Alitalia.*/g, 'Alitalia')
                            .replace(/.*Austrian.*/g, 'Austrian Airlines');
                    }

                    return {
                        getAirlineAndAirlineCodesList: function () {
                            return $q(function (resolve, reject) {
                                if ($localStorage.airlineAndAirlineCodesList) {
                                    return resolve(_.clone($localStorage.airlineAndAirlineCodesList)); //cloning to protect from client code modifying the collection. For now shallow cloning enough
                                }
                                AirlineLookupWebService.get().$promise.then(
                                    function (response) {
                                        var airlineAndAirlineCodesList = response.AirlineInfo
                                                .map(function (item) {
                                                    return {
                                                        AirlineCode: item.AirlineCode
                                                        , AirlineName: correctAirlineName(item.AirlineName)
                                                    }
                                                });
                                        $localStorage.airlineAndAirlineCodesList = airlineAndAirlineCodesList;
                                        resolve(_.clone(airlineAndAirlineCodesList));
                                    }
                                    , function (error) {
                                        reject(StandardErrorHandler.handleError(error));
                                    }
                                )
                            });
                        },
                        getAirlinesDictionary: function () {
                            function parseAirlineLookupResponse(response) {
                                var dictionary = {};
                                response.AirlineInfo.forEach(function (item) {
                                    dictionary[item.AirlineCode] = correctAirlineName(item.AirlineName);
                                });
                                return dictionary;
                            }

                            return $q(function (resolve, reject) {
                                if ($localStorage.airlinesDictionary) {
                                    return resolve(_.clone($localStorage.airlinesDictionary));
                                }
                                AirlineLookupWebService.get().$promise.then(
                                    function (response) {
                                        var airlinesDictionary = parseAirlineLookupResponse(response)
                                        $localStorage.airlinesDictionary = airlinesDictionary;
                                        resolve(_.clone(airlinesDictionary));
                                    }
                                    , function (error) {
                                        reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        }
                    };
                }])
            .factory('AirportLookupDataService', [
                      '$q'
                    , 'ShoppingAirportsAndCitiesLookupWebService'
                    , 'StandardErrorHandler'
                    , '$localStorage'
                , function (
                      $q
                    , AirportsLookupService
                    , StandardErrorHandler
                    , $localStorage
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
                                , function (error) {
                                    reject(StandardErrorHandler.handleError(error));
                                }
                            );
                        });
                    }
                }

            }])
            .factory('PointOfSaleCountryLookupDataService', [
                    'PointOfSaleCountryLookupWebService'
                    , '$q'
                    , 'StandardErrorHandler'
                    , '$localStorage'
                , function (
                      PointOfSaleCountryLookupWebService
                    , $q
                    , StandardErrorHandler
                    , $localStorage
                ) {
                    function parsePointOfSaleCountriesResponse(response) {
                        return response.Countries.map(function (country) {
                            return {
                                  countryCode: country.CountryCode
                                , countryName: country.CountryName
                            };
                        });
                    }

                    return {
                        getPointOfSaleCountries: function () {
                            return $q(function (resolve, reject) {
                                if ($localStorage.pointOfSaleCountries) {
                                    return resolve(_.clone($localStorage.pointOfSaleCountries));
                                }
                                PointOfSaleCountryLookupWebService.get().$promise.then(
                                    function (response) {
                                        var pointOfSaleCountries = parsePointOfSaleCountriesResponse(response);
                                        $localStorage.pointOfSaleCountries = pointOfSaleCountries;
                                        resolve(_.clone(pointOfSaleCountries));
                                    }
                                    , function (error) {
                                        reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        }
                    };
                }
            ])
    });
