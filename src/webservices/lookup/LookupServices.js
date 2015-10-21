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
                    , '$localStorage'
                    , 'ErrorReportingService'
                    , 'businessMessagesErrorHandler'
                , function (
                      $q
                    , EquipmentLookupWebService
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
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
                               , function (reason) {
                                   ErrorReportingService.reportError('Cannot get aircraft dictionary');
                                   businessMessagesErrorHandler.handle(reject, reason);
                               }
                           );
                       });
                   }
               };
            }])
            .factory('AirlineLookupDataService', [
                  '$q'
                , 'AirlineLookupWebService'
                , '$localStorage'
                , 'ErrorReportingService'
                , 'businessMessagesErrorHandler'
                , function (
                    $q
                    , AirlineLookupWebService
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                ) {

                    function correctAirlineName(airlineName) {
                        // removing company legal organization form abbreviations, plus patching several most common and too long airlines names
                        return airlineName.replace(/S\.?A\.?/g, '')
                            .replace(/gmbh/gi, '')
                            .replace(/Ltd\.?/gi, '')
                            .replace(/L\.?L\.?C\.?/gi, '')
                            .replace(/Limited/gi, '')
                            .replace(/Inc\.?/gi, '')
                            .replace(/AG/gi, '')
                            .replace(/Pty/gi, '')
                            .replace(/Co\./gi, '')
                            .replace(/C\.?A\.?/g, '')//WARN Air Canada, American Airlines
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
                                                    };
                                                });
                                        $localStorage.airlineAndAirlineCodesList = airlineAndAirlineCodesList;
                                        resolve(_.clone(airlineAndAirlineCodesList));
                                    }
                                    , function (reason) {
                                        ErrorReportingService.reportError('Cannot get airlines and airline codes dictionary');
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
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
                                        var airlinesDictionary = parseAirlineLookupResponse(response);
                                        $localStorage.airlinesDictionary = airlinesDictionary;
                                        resolve(_.clone(airlinesDictionary));
                                    }
                                    , function (reason) {
                                        ErrorReportingService.reportError('Cannot get airlines dictionary');
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
                            });
                        }
                    };
                }])
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
            .factory('PointOfSaleCountryLookupDataService', [
                    'PointOfSaleCountryLookupWebService'
                    , '$q'
                    , '$localStorage'
                    , 'ErrorReportingService'
                    , 'businessMessagesErrorHandler'
                , function (
                      PointOfSaleCountryLookupWebService
                    , $q
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
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
                                    , function (reason) {
                                        ErrorReportingService.reportError('Cannot get point of sales dictionary');
                                        businessMessagesErrorHandler.handle(reject, reason);
                                    }
                                );
                            });
                        }
                    };
                }
            ]);
    });
