define([
          'angular'
        , 'lodash'
        , 'webservices/LookupServices'
    ],
    function (
          angular
        , _
        , LookupServices
    ) {
        'use strict';

        return angular.module('sDSLookups', ['sabreDevStudioWebServices'])
            .filter('airlineFullName', ['AirlineLookupDataService', function (AirlineLookupDataService) {
                /* this filter depends on asynchronous response from other service.
                 It lazy-loads the web service response. If response is not yet available then it schedules its loading
                 Till response from asynchronous service is not available, it just returns the provided value (pass thru).
                 */
                var dictionary = null;
                var dictionaryLoadingAlreadyScheduled = false;
                var filter = function (airlineCode) {
                    if (dictionary === null) {
                        if (!dictionaryLoadingAlreadyScheduled) {
                            dictionaryLoadingAlreadyScheduled = true;
                            AirlineLookupDataService.getAirlinesDictionary().then(function (dictionaryFromWebService) {
                                dictionary = dictionaryFromWebService;
                            });
                        }
                        return airlineCode; // if dictionary is not loaded yet, then just pass thru the value to be filtered.
                    }
                    return dictionary[airlineCode];
                };
                filter.$stateful = true; // this is stateful filter so we have to let NG know that it needs to keep executing it on every digest cycle. (Normally filters are executed only if the filtered value changes).
                return filter;
            }])
            .filter('cityAndAirportFullName', ['AirportLookupDataService', function (AirportLookupDataService) {
                /* this filter depends on asynchronous response from other service.
                 It lazy-loads the web service response. If response is not yet available then it schedules its loading
                 Till response from asynchronous service is not available, it just returns the provided value (pass thru).
                 */
                var dictionary = null;
                var dictionaryLoadingAlreadyScheduled = false;
                var filter = function (airportCode) {
                    if (dictionary === null) {
                        if (!dictionaryLoadingAlreadyScheduled) {
                            dictionaryLoadingAlreadyScheduled = true;
                            AirportLookupDataService.getAirportsDictionary().then(function (dictionaryFromWebService) {
                                dictionary = dictionaryFromWebService;
                            });
                        }
                        return airportCode; // if dictionary is not loaded yet, then just pass thru the value to be filtered.
                    }
                    var entryFound = dictionary[airportCode];
                    if (_.isUndefined(entryFound)) {
                        return airportCode;
                    }
                    if (entryFound.airportName !== entryFound.cityName) {
                        return entryFound.airportName + ', ' + entryFound.cityName;
                    } else {
                        return entryFound.airportName
                    }
                };
                filter.$stateful = true; // this is stateful filter so we have to let NG know that it needs to keep executing it on every digest cycle. (Normally filters are executed only if the filtered value changes).
                return filter;
            }])
            .filter('airportCountry', ['AirportLookupDataService', function (AirportLookupDataService) { //TODO DRY!!!
                /* this filter depends on asynchronous response from other service.
                 It lazy-loads the web service response. If response is not yet available then it schedules its loading
                 Till response from asynchronous service is not available, it just returns the provided value (pass thru).
                 */
                var dictionary = null;
                var dictionaryLoadingAlreadyScheduled = false;
                var filter = function (airportCode) {
                    if (dictionary === null) {
                        if (!dictionaryLoadingAlreadyScheduled) {
                            dictionaryLoadingAlreadyScheduled = true;
                            AirportLookupDataService.getAirportsDictionary().then(function (dictionaryFromWebService) {
                                dictionary = dictionaryFromWebService;
                            });
                        }
                        return airportCode; // if dictionary is not loaded yet, then just pass thru the value to be filtered.
                    }
                    var entryFound = dictionary[airportCode];
                    return (entryFound)? entryFound.countryName: airportCode;
                };
                filter.$stateful = true; // this is stateful filter so we have to let NG know that it needs to keep executing it on every digest cycle. (Normally filters are executed only if the filtered value changes).
                return filter;
            }])
            .filter('aircraftName', ['EquipmentLookupDataService', function (EquipmentLookupService) {
                /* this filter depends on asynchronous response from other service.
                    It lazy-loads the web service response. If response is not yet available then it schedules its loading
                    Till response from asynchronous service is not available, it just returns the provided value (pass thru).
                 */
                var dictionary = null;
                var dictionaryLoadingAlreadyScheduled = false;
                var filter = function (aircraftCode) {
                    if (dictionary === null) {
                        if (!dictionaryLoadingAlreadyScheduled) {
                            dictionaryLoadingAlreadyScheduled = true;
                            EquipmentLookupService.getAircraftDictionary().then(function (dictionaryFromWebService) {
                                dictionary = dictionaryFromWebService;
                            });
                        }
                        return aircraftCode; // if dictionary is not loaded yet, then just pass thru the value to be filtered.
                    }
                    return dictionary[aircraftCode];
                };
                filter.$stateful = true; // this is stateful filter so we have to let NG know that it needs to keep executing it on every digest cycle. (Normally filters are executed only if the filtered value changes).
                return filter;
            }])
    });
