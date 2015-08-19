define([
          'util/LodashExtensions'
        , 'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/PreferredCabinSelect.tpl.html'
        , 'text!view-templates/PreferredAirlineSelect.tpl.html'
        , 'text!view-templates/AirportInput.tpl.html'
        , 'text!view-templates/InputDate.tpl.html'
        , 'text!view-templates/InputTimeRangePickerTemplate.tpl.html'
        , 'text!view-templates/InputDepartureOrArrivalSwitch.tpl.html'
        , 'util/AirportNameLookup'
        , 'AirportNameBestSuggestionComparator'
    ],
    function (
          _
        , moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , PreferredCabinSelectTemplate
        , PreferredAirlineSelectTemplate
        , AirportInputTemplate
        , InputDateTemplate
        , InputTimeRangePickerTemplate
        , InputDepartureOrArrivalSwitchTemplate
        , AirportNameLookup
        , AirportNameBestSuggestionComparator
    ) {
        'use strict';

        var MINUTES_IN_DAY = 60 * 24;
        var MINUTES_IN_HOUR = 60;

        function convertMinutesInDayToTimeOfDay(minutesInDay) {
            return {
                hours: Math.floor(minutesInDay / MINUTES_IN_HOUR)
                , minutes: minutesInDay % MINUTES_IN_HOUR
            };
        }

        return angular.module('sdsWidgets')
            .directive('selectPreferredCabin', function () {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    scope: {
                        cabinSelected: '='
                    },
                    template: PreferredCabinSelectTemplate
                }
            })
            .directive('selectPreferredAirline', [
                    'AirlineNameLookupService'
                , function (
                    AirlineNameLookupService
                ) {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    scope: {
                        preferredAirline: '='
                    },
                    template: PreferredAirlineSelectTemplate,
                    link: function (scope) {
                        scope.allAirlines = _.map(AirlineNameLookupService.getAllMappings(), function (airlineName, airlineCode) {
                            return {
                                  name: airlineName
                                , code: airlineCode
                            };
                        });
                        // add empty airline to all airlines model to denote no airline preference
                        scope.allAirlines.splice(0, 0, {
                              name: ''
                            , code: undefined
                        });
                        scope.preferredAirline = _.first(scope.allAirlines);
                    }
                }
            }])
            .directive('inputAirport', [
                    'AirlineNameLookupService'
                , function (
                    AirlineNameLookupService
                ) {
                return {
                    restrict: 'EA',
                    replace: true,
                    transclude: true,
                    scope: {
                        airport: '='
                    },
                    template: AirportInputTemplate,
                    link: function (scope) {

                        scope.airports = loadLabelsForAutocomplete();

                        /**
                         * loads all mappings of airport code into full name, into array of objects expected by jQuery Autocomplete widget: [ {label: 'Krakow (KRK)', code: 'KRK'}, {label: 'Amsterdam Schiphol (AMS)', code: 'AMS'}, .... ]
                         * We want the label to be displayed to user, while aiport code must be passed as field value.
                         */
                        function loadLabelsForAutocomplete() {
                            var airportNameLookup = new AirportNameLookup();
                            var output = [];
                            _.each(airportNameLookup.getAllMappings(), function (airportFullName, airportCode) {
                                output.push({fullName: airportFullName, airportCode: airportCode});
                            });
                            return output;
                        };
                    }
                }
            }])
            .directive('inputDate', [
                function () {
                    return {
                        restrict: 'EA',
                        replace: true,
                        scope: {
                              id: '@'
                            , name: '@'
                            , required: '@'
                            , dateFormat: '@'
                            , minDate: '@'
                            , date: '='
                            , onDateChange: '&'
                        },
                        template: InputDateTemplate,
                        link: function (scope, element) {

                            scope.dateFormat = scope.dateFormat || 'dd-MMM-yyyy';

                            element.removeAttr('id');
                            element.removeAttr('name');
                            element.removeAttr('required');
                            element.removeAttr('date');
                            element.removeAttr('on-date-change');
                            element.removeAttr('min-date'); //TODO these two are not removed
                            element.removeAttr('date-format'); //TODO these two are not removed

                            scope.openDatePicker = function($event) {
                                $event.preventDefault();
                                $event.stopPropagation();
                                scope.isDatePickerOpened = true;
                            };

                        }
                    };
                }
            ])
            .directive('inputTimeRangePicker', function () {
                return {
                    restrict: 'EA',
                    replace: true,
                    scope: {
                          timeMin: '='
                        , timeMax: '='
                    },
                    template: InputTimeRangePickerTemplate,
                    link: function (scope, element) {

                        scope.step = element.attr('stepMinutes') || MINUTES_IN_HOUR;

                        scope.currentSelection = {
                              min: 0
                            , max: MINUTES_IN_DAY
                        };

                        scope.minMaxConstraints = {
                              min: 0
                            , max: MINUTES_IN_DAY
                        };

                        scope.permittedValuesChanged = function () {
                            scope.timeMin = convertMinutesInDayToTimeOfDay(scope.currentSelection.min);
                            scope.timeMax = convertMinutesInDayToTimeOfDay(scope.currentSelection.max);
                        }
                    }
                };
            })
            .directive('inputDepartureOrArrivalSwitch', function () {
                return {
                    restrict: 'EA',
                    replace: true,
                    scope: {
                        selectedValue: '='
                    },
                    template: InputDepartureOrArrivalSwitchTemplate
                }

            })
            .filter('minutesInDayToTimeOfDay', function () {
                return function (minutesInDay, useAmPmFormat) {
                    var timeOfDay = convertMinutesInDayToTimeOfDay(minutesInDay);

                    function lpadWithZero(num) {
                        return (num < 10)? ('0' + num) : num;
                    }

                    if (useAmPmFormat) {
                        var pmAmSuffix = (timeOfDay.hours < 12)? 'am': 'pm';
                        return (timeOfDay.hours % 12)
                            + ':'
                            + lpadWithZero(timeOfDay.minutes)
                            + ' '
                            + pmAmSuffix;
                    } else {
                        return  lpadWithZero(timeOfDay.hours)
                            + ':'
                            + lpadWithZero(timeOfDay.minutes);
                    }
                }
            })
            .filter('airportNameWithIATACode', function () {
                return function (airportAndIATACode) {
                    if (_.isDefined(airportAndIATACode)) {
                        return airportAndIATACode.fullName + ' (' + airportAndIATACode.airportCode + ')';
                    }
                };
            })
            .filter('airportNameBestSuggestionComparator', function () {
                return function (allMatches, userCurrentInput) {
                    return allMatches.sort(new AirportNameBestSuggestionComparator(userCurrentInput)).reverse();
                };
            });
    });
