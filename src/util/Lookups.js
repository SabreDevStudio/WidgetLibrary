define([
          'angular'
        , 'util/AirlineNameLookup'
        , 'util/AirportNameLookup'
    ],
    function (
          angular
        , AirlineNameLookup
        , AirportNameLookup
    ) {
        'use strict';

        var airlineNameLookup = new AirlineNameLookup();

        var airportNameLookup = new AirportNameLookup();

        return angular.module('sDSLookups', [])
            .filter('airlineFullName', function () {
                return function (code) {
                    return airlineNameLookup.getName(code);
                };
            })
            .filter('airportFullName', function () {
                return function (code) {
                    return airportNameLookup.getName(code);
                };
            })
            .service('AirlineNameLookupService', function () {
                return {
                    getName: function (code) {
                        return airlineNameLookup.getName(code);
                    },
                    getAllMappings: function () {
                        return airlineNameLookup.getAllMappings();
                    }
                };
            });
    });
