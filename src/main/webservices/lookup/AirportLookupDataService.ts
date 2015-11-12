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
        , PromiseUtilsSrc
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
                    , 'pointOfSaleCountry'
                , function (
                      $q
                    , AirportsLookupService
                    , $localStorage
                    , ErrorReportingService
                    , businessMessagesErrorHandler
                    , PromiseUtils
                    , pointOfSaleCountry
                ) {

                const GLOBAL_DICTIONARY_KEY = 'SUM_OF_ALL_DICTIONARIES';

                initializeDictionariesInLocalStorage();

                function updateDictionary(dictionary, entry) {
                    var airportCode = entry.AirportCode;
                    updateDictionaryForKey(dictionary, entry, airportCode);
                }

                function updateDictionaryForKey(dictionary, entry, key) {
                    if (!dictionary[key]) {
                        dictionary[key] = {
                            AirportName: entry.AirportName
                            , CityName: entry.CityName
                            , CountryCode: entry.CountryCode
                            , CountryName: entry.CountryName
                        };
                    }
                }

                function parseAirportLookupResponse(response) {
                    return response.OriginDestinationLocations.reduce(function (dictionary, entry) {
                        var originEntry = entry.OriginLocation;
                        updateDictionary(dictionary, originEntry);
                        var destinationEntry = entry.DestinationLocation;
                        updateDictionary(dictionary, destinationEntry);
                        return dictionary;
                    }, {});
                }

                function getAirportsDictionary(posCountry = pointOfSaleCountry) {

                    return $q(function (resolve, reject) {
                        if ($localStorage.airportsDictionary[posCountry]) {
                            return resolve($localStorage.airportsDictionary[posCountry]);
                        }
                        var requestParameters = {
                            pointofsalecountry: posCountry
                        }
                        AirportsLookupService.get(requestParameters).$promise.then(
                            function (response) {
                                var airportsDictionary = parseAirportLookupResponse(response);
                                $localStorage.airportsDictionary[posCountry] = airportsDictionary;
                                updateGlobalDictionary(airportsDictionary);
                                resolve(airportsDictionary);
                            }
                            , function (reason) {
                                ErrorReportingService.reportError('Cannot get airports dictionary');
                                businessMessagesErrorHandler.handle(reject, reason);
                            }
                        );
                    });
                }

                function initializeDictionariesInLocalStorage() {
                    if (_.isUndefined($localStorage.airportsDictionary)) {
                        $localStorage.airportsDictionary = {};
                    }

                    if (_.isUndefined($localStorage.airportsDictionary[GLOBAL_DICTIONARY_KEY])) {
                        $localStorage.airportsDictionary[GLOBAL_DICTIONARY_KEY] = {};
                    }
                }

                function updateGlobalDictionary(perPosDictionary) {
                    var globalDictionary = $localStorage.airportsDictionary[GLOBAL_DICTIONARY_KEY];
                    _.each(perPosDictionary, function (entry, key) {
                        updateDictionaryForKey(globalDictionary, entry, key);
                    })
                }

                /* returns logical sum of all entries in all per-PoS-dictionaries that were already fetched.
                  Will not return entries for PoS that have not been requested yet (by other call) - gathering these 'sum' dictionary is done by occassion, not thru separate web service call.
                */
                function getAirportsDictionaryForAllPoS() {
                    // returning promise, not value, for consistence of return types from this module functions
                    return $q.when($localStorage.airportsDictionary[GLOBAL_DICTIONARY_KEY]);
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
                      getAirportsDictionary: PromiseUtils.addResolvedObjectCloning(getAirportsDictionary)
                    , getAirportsDictionaryForAllPoS: PromiseUtils.addResolvedObjectCloning(getAirportsDictionaryForAllPoS)
                    , containsAirport: containsAirport
                    , getAirportData: PromiseUtils.addResolvedObjectCloning(getAirportData.bind(this))
                    , getAirportDataWithAirportCode: getAirportDataWithAirportCode
                };

            }])
    });
