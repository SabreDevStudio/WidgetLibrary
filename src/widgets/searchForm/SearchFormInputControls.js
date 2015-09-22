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
        , 'text!view-templates/InputOnOffToggle.tpl.html'
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
        , InputOnOffToggleTemplate
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
                    replace: true,
                    scope: {
                        cabinSelected: '='
                    },
                    template: PreferredCabinSelectTemplate
                }
            })
            .directive('selectPreferredAirline', [
                    'AirlineLookupDataService'
                , function (
                    AirlineLookupDataService
                ) {

                return {
                    scope: {
                        preferredAirline: '='
                    },
                    template: PreferredAirlineSelectTemplate,
                    link: function (scope) {
                        AirlineLookupDataService.getAirlineAndAirlineCodesList().then(function (airlineAndAirlineCodesList) {
                            // add empty airline to all airlines model to denote no airline preference
                            airlineAndAirlineCodesList.splice(0, 0, {
                                AirlineName: 'No airline preference'
                                , AirlineCode: undefined
                            });
                            scope.preferredAirline.selected = _.first(airlineAndAirlineCodesList);
                            scope.allAirlines = airlineAndAirlineCodesList;
                        });
                    }
                };
            }])
            .directive('inputAirport', ['AirportLookupDataService', function (AirportLookupDataService) {
                var globalAirportsDictionary = null;

                return {
                    replace: true,
                    scope: {
                        airport: '='
                    },
                    template: AirportInputTemplate,
                    link: function (scope) {
                        if (globalAirportsDictionary) {
                            scope.airports = globalAirportsDictionary;
                            return;
                        }
                        AirportLookupDataService.getAirportsDictionary().then(function (dictionary) {
                            globalAirportsDictionary = _.map(dictionary, function (airportDescription, airportCode) {
                                var airportAndCityName = (airportDescription.airportName === airportDescription.cityName)? airportDescription.cityName: airportDescription.airportName + ', ' + airportDescription.cityName;
                                return {
                                      fullName: airportAndCityName
                                    , airportCode: airportCode
                                };
                            });
                            scope.airports = globalAirportsDictionary;
                        });
                    }
                }
            }])
            .directive('inputDate', [
                function () {
                    return {
                        restrict: 'EA',
                        replace: true,
                        scope: {
                             required: '@'
                            , dateFormat: '@'
                            , minDate: '@'
                            , date: '='
                            , onDateChange: '&'
                        },
                        template: InputDateTemplate,
                        link: function (scope, element) {

                            scope.dateFormat = scope.dateFormat || 'dd-MMM-yyyy';

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
            .directive('inputOnOffToggle', function () {
                return {
                    restrict: 'EA',
                    replace: true,
                    scope: {
                          selectedValue: '='
                        , switchOnText: '@'
                        , switchOffText: '@'
                        , ngOnValue: '@'
                        , ngOffValue: '@'
                    },
                    template: InputOnOffToggleTemplate,
                    link: function (scope, element) {
                        // by default the toggle is in off state
                        scope.selectedValue = scope.ngOffValue;

                        scope.$watch('value', function(value) {
                            scope.selectedValue = (value)? scope.ngOnValue: scope.ngOffValue;
                        });
                    }
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
