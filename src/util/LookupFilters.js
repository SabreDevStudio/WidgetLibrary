define([
          'angular'
        , 'lodash'
        , 'webservices/lookup/AirlineLookupDataService'
        , 'webservices/lookup/AirportLookupDataService'
        , 'webservices/lookup/EquipmentLookupDataService'
        , 'webservices/lookup/PointOfSaleCountryLookupDataService'
    ],
    function (
          angular
        , _
        , AirlineLookupDataService
        , AirportLookupDataService
        , EquipmentLookupDataService
        , PointOfSaleCountryLookupDataService
    ) {
        'use strict';

        /**
         * Utility factory that builds a filter that depends in asynchronous response from other service.
         * The filter lazy-loads the web service response. If response is not yet available then it schedules its loading.
         * Till response from asynchronous service is not available, it just returns the provided value (pass thru).
         */
        function buildFilter(getDictionaryFromWebServicePromise) {
            var dictionary = null;
            var dictionaryLoadingAlreadyScheduled = false;
            var filter = function (valueToBeLookedUp) {
                if (dictionary === null) {
                    if (!dictionaryLoadingAlreadyScheduled) {
                        dictionaryLoadingAlreadyScheduled = true;
                        getDictionaryFromWebServicePromise.then(function (dictionaryFromWebService) {
                            dictionary = dictionaryFromWebService;
                        });
                    }
                    return valueToBeLookedUp; // if dictionary is not loaded yet, then just pass thru the value to be filtered.
                }
                var entryFound = dictionary[valueToBeLookedUp];
                return (entryFound)? entryFound: valueToBeLookedUp;
            };
            filter.$stateful = true; // this is stateful filter so we have to let NG know that it needs to keep executing it on every digest cycle. (Normally filters are executed only if the filtered value changes).
            return filter;
        }

        return angular.module('sDSLookups', ['sabreDevStudioWebServices'])
            /**
             * given airline IATA code, like 'AA', returns airline full name: like 'American Airlines'
             */
            .filter('airlineFullName', ['AirlineLookupDataService', function (AirlineLookupDataService) {
                return buildFilter(AirlineLookupDataService.getAirlinesDictionary());
            }])
            /**
             * Accepts IATA airport or city code, for example 'LON'.
             * If the value passed is airport and the airport name is different than the city it is located in, then returns bot airport name and city name (comma separated). If they are same returns just one.
             */
            .filter('cityFullName', ['AirportLookupDataService', function (AirportLookupDataService) {
                var filterFromBuilder = buildFilter(AirportLookupDataService.getAirportsDictionary());
                var cityFullNameDecorator = function (airportCode) {
                    var entryFound = filterFromBuilder(airportCode);
                    return (entryFound.cityName)? entryFound.cityName: entryFound;
                }
                cityFullNameDecorator.$stateful = true;
                return cityFullNameDecorator;
            }])
            .filter('cityAndAirportFullName', ['AirportLookupDataService', function (AirportLookupDataService) {
                var filterFromBuilder = buildFilter(AirportLookupDataService.getAirportsDictionary());

                var createCityAndAirportNameFilterDecorator = function (airportCode) {
                    var entryFound = filterFromBuilder(airportCode);
                    if (entryFound === airportCode) {
                        return entryFound;
                    }
                    if (entryFound.airportName !== entryFound.cityName) {
                        return entryFound.airportName + ', ' + entryFound.cityName;
                    } else {
                        return entryFound.airportName;
                    }
                };
                createCityAndAirportNameFilterDecorator.$stateful = filterFromBuilder.$stateful;
                return createCityAndAirportNameFilterDecorator;
            }])
            /**
             * Given airport/city code, returns the country name (for example Germany) this airport/city is located.
             */
            .filter('airportCountry', ['AirportLookupDataService', function (AirportLookupDataService) {
                var filterFromBuilder = buildFilter(AirportLookupDataService.getAirportsDictionary());

                var getCountryNameFilterDecorator = function (airportCode) {
                    var entryFound = filterFromBuilder(airportCode);
                    if (entryFound === airportCode) {
                        return entryFound;
                    }
                    return entryFound.countryName
                };
                getCountryNameFilterDecorator.$stateful = filterFromBuilder.$stateful;
                return getCountryNameFilterDecorator;
            }])
            /**
             * Given aircraft code, returns full aircraft full name
             */
            .filter('aircraftName', ['EquipmentLookupDataService', function (EquipmentLookupService) {
                return buildFilter(EquipmentLookupService.getAircraftDictionary());
            }]);
    });
