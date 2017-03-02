define([
          'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
    ],
    function (
          angular
        , _
        , angular_bootstrap
        , SDSWidgets) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('inputAirport', ['AirportsDictionaryFetchFnFactory', function (AirportsDictionaryFetchFnFactory) {

                return {
                    replace: true,
                    require: 'ngModel',
                    scope: {
                        airport: '='
                        , selectableAirportsForThisPosOnly: '@'
                        , selectableAirportsDictionary: '@'
                        , onSelect: '&'
                    },
                    templateUrl: '../widgets/view-templates/partials/AirportInput.tpl.html',
                    link: function (scope, elm, attrs, ctrl) {

                        /*It is not like .*[A-Z]{3}.*, because typeahead filter is passing objects, not strigified objects. "
                        Also we want to make customer select from the typeahed suggestions, not type 3 letter codes - the controller expects the object from typeahead

                        In other words:
                         This validator doesn't allow user insert/past 3 letter airport codes directly.
                         We will only accept the objects, and the objects can come only from typeahead.
                         We do not support user inserting 3 letter code directly but we are enforcing them to choose from typeahead suggestions.
                         */
                        ctrl.$validators.invalidAirport = function (modelValue, viewValue) {

                            return ctrl.$isEmpty(viewValue) || angular.isObject(modelValue)
                        };

                        var airportsDictionaryFetchFn = AirportsDictionaryFetchFnFactory.selectAirportsDictionaryFetchFn(scope.selectableAirportsDictionary, scope.selectableAirportsForThisPosOnly);

                        function createAirportAndCityName(airportDescription) {
                            return (airportDescription.AirportName === airportDescription.CityName)? airportDescription.CityName: airportDescription.AirportName + ', ' + airportDescription.CityName;
                        }

                        airportsDictionaryFetchFn().then(function (dictionary) {
                            var airportsDictionary = _.map(dictionary, function (airportDescription: any, airportCode) {
                                return {
                                    fullName: createAirportAndCityName(airportDescription),
                                    airportCode: airportCode
                                };
                            });
                            scope.airports = airportsDictionary;

                            if (scope.airport && scope.airport.airportCode) {
                                var airportDescription = dictionary[scope.airport.airportCode];
                                scope.airport.fullName = createAirportAndCityName(airportDescription);
                            }
                        });
                    }
                }

            }])
    });
