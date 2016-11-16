define([
         'lodash'
        , 'util/LodashExtensions'
        , 'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'widgets/searchForm/AirportNameBestSuggestionComparator'
    ],
    function (
          _
        , __
        , moment
        , angular
        , angular_bootstrap
        , SDSWidgets
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
                    templateUrl: '../widgets/view-templates/partials/PreferredCabinSelect.tpl.html'
                };
            })
            .directive('selectBags', function () {
                return {
                    replace: true,
                    scope: {
                        bagsRequested: '='
                    },
                    templateUrl: '../widgets/view-templates/partials/SelectBags.tpl.html',
                    link: function (scope) {
                        scope.bagsSelection = [0, 1, 2, 3];
                        scope.bagsRequested = scope.bagsSelection[1];
                    }
                };
            })
            .filter('bags', function () {
                return function (bagsAmount) {
                    switch (bagsAmount) {
                        case 0: return 'No bags';
                        case 1: return '1 bag';
                        default: return bagsAmount + ' bags';
                    }
                }
            })
            .directive('selectAirline', [
                    'AirlineLookupDataService'
                    , '$timeout'
                , function (
                    AirlineLookupDataService
                    , $timeout
                ) {

                return {
                    scope: {
                        //Expected to be an Object
                        airline: '=',
                    },
                    templateUrl: '../widgets/view-templates/partials/SelectAirline.tpl.html',
                    link: function (scope) {

                        scope.airlineInternal = {
                            selected: {}
                        };

                        AirlineLookupDataService.getAirlineAndAirlineCodesList().then(function (airlineAndAirlineCodesList) {
                            scope.allAirlines = airlineAndAirlineCodesList;
                        });

                        scope.$watch('airlineInternal.selected', function (selected) {
                            scope.airline = selected.AirlineCode;
                        });
                    }
                };
            }])
            .directive('selectMultipleAirlines', [
                'AirlineLookupDataService'
                , '$timeout'
                , function (
                    AirlineLookupDataService
                    , $timeout
                ) {

                    return {
                        scope: {
                            //Expected to be an Array
                            airlines: '=',
                        },
                        templateUrl: '../widgets/view-templates/partials/SelectMultipleAirlines.tpl.html',
                        link: function (scope) {

                            scope.airlinesInternal = {
                                selected: []
                            };

                            AirlineLookupDataService.getAirlineAndAirlineCodesList().then(function (airlineAndAirlineCodesList) {
                                scope.allAirlines = airlineAndAirlineCodesList;
                            });

                            scope.$watchCollection('airlinesInternal.selected', function (selected) {
                                scope.airlines.selected = selected.map((obj) => obj.AirlineCode);
                            });
                        }
                    };
                }])
            .directive('inputDate', [
                function () {
                    return {
                        require: 'ngModel',
                        replace: true,
                        scope: {
                              isDisabled: '@'
                            , required: '@'
                            , dateFormat: '@'
                            , minDate: '='
                            , onDateChange: '&'
                            , ngModel: '='
                        },
                        templateUrl: '../widgets/view-templates/partials/InputDate.tpl.html',
                        link: function (scope) {
                            scope.dateFormat = scope.dateFormat || 'dd-MMM-yyyy';

                            scope.openDatePicker = function($event) {
                                $event.preventDefault();
                                $event.stopPropagation();
                                scope.isDatePickerOpened = true;
                            };
                        }
                    };
                }
            ])
            .directive('flexibleDepartureReturnDates', [
                function () {
                    return {
                        require: 'ngModel',
                        replace: true,
                        scope: {
                            required: '@'
                            , dateFormat: '@'
                            , minDate: '='
                            , onAnyDateChange: '&'
                            , ngModel: '='
                            , internalFormName: '='
                        },
                        templateUrl: '../widgets/view-templates/partials/FlexibleDepartureReturnDates.tpl.html',
                        link: function (scope, elm, attrs, ctrl) {

                            /*From Angular documentation:
                                 By default, ngModel watches the model by reference, not value. This is important to know when
                                 binding inputs to models that are objects (e.g. Date) or collections (e.g. arrays).
                                 If only properties of the object or collection change, ngModel will not be notified and so the input will not be re-rendered.
                                 The model must be assigned an entirely new object or collection before a re-rendering will occur.

                             Here we are not exactly interested in re-rendering as it will be handled by internal directives
                             used in our template, but we want Angular to automatically run validators when dates change.
                            */
                            scope.$watch("ngModel.dates", function (newVal, oldVal, scope) {
                                if(!_.isEqual(newVal, oldVal)){
                                   scope.ngModel = _.clone(scope.ngModel);
                                }
                            }, true);

                            ctrl.$validators.invalidDepartureDate = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleDepartureDate) {
                                    return true;
                                }
                                if (preferences.isFlexibleReturnDate) {
                                    result = preferences.departureDate <= preferences.flexibleReturnDate.from;
                                }
                                else {
                                    result = preferences.departureDate <= preferences.returnDate;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidReturnDate = function (modelValue, viewValue) {

                                 var result = true;
                                 var preferences = modelValue.dates;
                                 if(preferences.isFlexibleReturnDate) {
                                     return true;
                                 }
                                 if (preferences.isFlexibleDepartureDate) {

                                     result = preferences.returnDate >= preferences.flexibleDepartureDate.from;
                                 }
                                 else {

                                     result = preferences.returnDate >= preferences.departureDate;
                                 }
                                 return result;
                             };

                            ctrl.$validators.invalidDepartureDateFrom = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(!preferences.isFlexibleDepartureDate) {
                                    return true;
                                }
                                if (preferences.isFlexibleReturnDate) {

                                    result = preferences.flexibleDepartureDate.from  <= preferences.flexibleReturnDate.from;
                                }
                                else {

                                    result = preferences.flexibleDepartureDate.from <= preferences.returnDate;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidDepartureDateFromTo = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleDepartureDate) {
                                    result = preferences.flexibleDepartureDate.from  < preferences.flexibleDepartureDate.to;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidDepartureDateToFrom = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleDepartureDate) {
                                    result = preferences.flexibleDepartureDate.to > preferences.flexibleDepartureDate.from;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidDepartureDateToReturnDateTo = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleDepartureDate && preferences.isFlexibleReturnDate) {
                                    result = preferences.flexibleDepartureDate.to <= preferences.flexibleReturnDate.to ;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidReturnDateFrom = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(!preferences.isFlexibleReturnDate) {
                                    return true;
                                }
                                if (preferences.isFlexibleDepartureDate) {

                                    result = preferences.flexibleReturnDate.from >= preferences.flexibleDepartureDate.from;
                                }
                                else {

                                    result = preferences.flexibleReturnDate.from >= preferences.departureDate;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidReturnDatesFromTo = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleReturnDate) {
                                    result = preferences.flexibleReturnDate.from  < preferences.flexibleReturnDate.to;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidReturnDatesToFrom = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleReturnDate) {
                                    result = preferences.flexibleReturnDate.to > preferences.flexibleReturnDate.from;
                                }
                                return result;
                            };

                            ctrl.$validators.invalidReturnDateToDepartureDateTo = function (modelValue, viewValue) {

                                var result = true;
                                var preferences = modelValue.dates;
                                if(preferences.isFlexibleReturnDate && preferences.isFlexibleDepartureDate) {
                                    result = preferences.flexibleReturnDate.to >= preferences.flexibleDepartureDate.to;
                                }
                                return result;
                            };
                        }
                    };
                }
            ])
            .directive('selectMonths', ['$locale', function ($locale) {
                return {
                    replace: true,
                    scope: {
                        value: '='
                    },
                    transclude: true,
                    templateUrl: '../widgets/view-templates/partials/SelectMonths.tpl.html',
                    link: function (scope) {
                        scope.allMonths = _.clone($locale.DATETIME_FORMATS.MONTH);
                    }
                };
            }])
            .directive('selectDaysOfWeek', ['$locale', function ($locale) {
                return {
                    replace: true,
                    scope: {
                        daysOfWeek: '=' // here the 7 element array of booleans will be returned.

                    },
                    transclude: true,
                    templateUrl: '../widgets/view-templates/partials/SelectDaysOfWeek.tpl.html',
                    link: function (scope, element) {
                        scope.daysOfWeekSymbols = _.clone($locale.DATETIME_FORMATS.SHORTDAY); //WARN: this will print short week days according to locale. Please also mind that first day of week is also locale specific. For US it is Sunday. Next logic does not take it into account. There is no way to recognize it in NG, you could use moment.js: moment().startOf("week").day()
                        scope.daysSelected = [false, false, false, false, false, false, false];
                        scope.$watchCollection('daysSelected', function (newVal, oldVal) {
                           if (newVal !== oldVal) {
                               scope.daysOfWeek = newVal;
                           }
                        });
                    }
                };
            }])
            .directive('selectLengthsOfStay', [function () {
                return {
                    replace: true,
                    scope: {
                        lengthOfStay: '=value'
                    },
                    transclude: true,
                    templateUrl: '../widgets/view-templates/partials/SelectLengthsOfStay.tpl.html',
                    link: function (scope) {
                        scope.predefinedLengthOfStayDays = [1, 2, 7, 14];
                        scope.selectedPredefinedLengthOfStayDays = {
                            value: _.last(scope.predefinedLengthOfStayDays)
                        };

                        scope.lengthOfStay = scope.lengthOfStay || {
                              minDays: 13
                            , maxDays: 15
                        };

                        function resetMinMaxDays(los) {
                            scope.lengthOfStay.minDays = los;
                            scope.lengthOfStay.maxDays = los;
                        }

                        scope.$watch('selectedPredefinedLengthOfStayDays.value', function (predefinedLoS) {
                            if (predefinedLoS) {
                                resetMinMaxDays(predefinedLoS);
                            }
                        });

                        // if min starts exceeding max, then increase max as well
                        scope.$watch('lengthOfStay.minDays', function (minDays, oldMinDays) {
                            if (minDays === oldMinDays) {
                                return;
                            }
                            if (minDays > scope.lengthOfStay.maxDays) {
                                scope.lengthOfStay.maxDays = minDays;
                            }
                        });
                        // if max decreases below min, then decrease min as well
                        scope.$watch('lengthOfStay.maxDays', function (maxDays, oldMaxDays) {
                            if (maxDays === oldMaxDays) {
                                return;
                            }
                            if (maxDays < scope.lengthOfStay.minDays) {
                                scope.lengthOfStay.minDays = maxDays;
                            }
                        });
                    }
                };
            }])
            .directive('inputTimeRangePicker', function () { //WARN: this component to work requires full jQuery loaded (not only jqlite)
                return {
                    restrict: 'EA',
                    replace: true,
                    scope: {
                          timeMin: '='
                        , timeMax: '='
                    },
                    templateUrl: '../widgets/view-templates/partials/InputTimeRangePickerTemplate.tpl.html',
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
                    templateUrl: '../widgets/view-templates/partials/InputOnOffToggle.tpl.html',
                    link: function (scope, element) {
                        // by default the toggle is in off state
                        scope.selectedValue = scope.ngOffValue;

                        scope.$watch('value', function(value) {
                            scope.selectedValue = (value)? scope.ngOnValue: scope.ngOffValue;
                        });
                    }
                }

            })
            .directive('plusMinusDaysSelection', function () {
                return {
                    replace: true,
                    transclude: true,
                    scope: {
                          days: '='
                        , maxDays: '@'
                    },
                    templateUrl: '../widgets/view-templates/partials/PlusMinusDaysSelection.tpl.html',
                    link: function (scope) {
                        var DEFAULT_PLUS_MINUS_DAYS_MAX_DAYS = 3;
                        var maxDays = parseInt(scope.maxDays) || DEFAULT_PLUS_MINUS_DAYS_MAX_DAYS;

                        var plusMinusDaysList = [];
                        plusMinusDaysList.push('');
                        for (var i = 1; i <= maxDays; i++) {
                            plusMinusDaysList.push(i)
                        }
                        scope.plusMinusDaysList = plusMinusDaysList;

                        scope.days = scope.days || scope.plusMinusDaysList[0];
                    }
                }

            })
            .factory('timepickerState', function() {
                var pickers = [];
                return {
                    addPicker: function(picker) {
                        pickers.push(picker);
                    },
                    closeAll: function() {
                        for (var i=0; i<pickers.length; i++) {
                            pickers[i].close();
                        }
                    }
                };
            })
            /* jshint ignore:start */
            .directive("timeFormat", ['$filter', function($filter) {
                return {
                    restrict : 'A',
                    require : 'ngModel',
                    scope : {
                        showMeridian : '=',
                    },
                    link : function(scope, element, attrs, ngModel) {
                        var parseTime = function(viewValue) {

                            if (!viewValue) {
                                ngModel.$setValidity('time', true);
                                return null;
                            } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                                ngModel.$setValidity('time', true);
                                return viewValue;
                            } else if (angular.isString(viewValue)) {
                                var timeRegex = /^(0?[0-9]|1[0-2]):[0-5][0-9] ?[a|p]m$/i;
                                if (!scope.showMeridian) {
                                    timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                                }
                                if (!timeRegex.test(viewValue)) {
                                    ngModel.$setValidity('time', false);
                                    return undefined;
                                } else {
                                    ngModel.$setValidity('time', true);
                                    var date = new Date();
                                    var sp = viewValue.split(":");
                                    var apm = sp[1].match(/[a|p]m/i);
                                    if (apm) {
                                        sp[1] = sp[1].replace(/[a|p]m/i, '');
                                        if (apm[0].toLowerCase() === 'pm') {
                                            sp[0] = sp[0] + 12;
                                        }
                                    }
                                    date.setHours(sp[0], sp[1]);
                                    return date;
                                };
                            } else {
                                ngModel.$setValidity('time', false);
                                return undefined;
                            };
                        };

                        ngModel.$parsers.push(parseTime);

                        var showTime = function(data) {
                            parseTime(data);
                            var timeFormat = (!scope.showMeridian) ? "HH:mm" : "hh:mm a";
                            return $filter('date')(data, timeFormat);
                        };
                        ngModel.$formatters.push(showTime);
                        scope.$watch('showMeridian', function(value) {
                            var myTime = ngModel.$modelValue;
                            if (myTime) {
                                element.val(showTime(myTime));
                            }

                        });
                    }
                };
            }])

            .directive('timepickerPop', ['$document', 'timepickerState', function($document, timepickerState) {
                return {
                    restrict : 'E',
                    transclude : false,
                    scope : {
                        inputTime : "=",
                        showMeridian : "=",
                        minuteStep: "=",
                        disabled : "="
                    },
                    controller : ['$scope', '$element', function($scope, $element) {
                        $scope.isOpen = false;

                        $scope.disabledInt = angular.isUndefined($scope.disabled)? false : $scope.disabled;

                        $scope.toggle = function() {
                            if ($scope.isOpen) {
                                $scope.close();
                            } else {
                                $scope.open();
                            }
                        };
                    }],
                    link : function(scope, element, attrs) {
                        var picker = {
                            open : function () {
                                timepickerState.closeAll();
                                scope.isOpen = true;
                            },
                            close: function () {
                                scope.isOpen = false;
                            }

                        }
                        timepickerState.addPicker(picker);

                        scope.open = picker.open;
                        scope.close = picker.close;

                        scope.$watch("disabled", function(value) {
                            scope.disabledInt = angular.isUndefined(scope.disabled)? false : scope.disabled;
                        });

                        scope.$watch("inputTime", function(value) {
                            if (!scope.inputTime) {
                                element.addClass('has-error');
                            } else {
                                element.removeClass('has-error');
                            }

                        });

                        element.bind('click', function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });

                        $document.bind('click', function(event) {
                            scope.$apply(function() {
                                scope.isOpen = false;
                            });
                        });

                    },
                    template : "<input type='text' class='form-control input-sm' ng-model='inputTime' ng-disabled='disabledInt' time-format show-meridian='showMeridian' ng-focus='open()' />"
                    + "  <div class='input-group-btn' ng-class='{open:isOpen}'> "
                    + "    <button type='button' ng-disabled='disabledInt' class='btn btn-default input-sm' ng-class=\"{'btn-primary':isOpen}\" data-toggle='dropdown' ng-click='toggle()'> "
                    + "        <i class='glyphicon glyphicon-time'></i></button> "
                    + "          <div class='dropdown-menu pull-right'> "
                    + "            <timepicker ng-model='inputTime' show-meridian='showMeridian' minute-step='minuteStep'></timepicker>"
                    + "           </div> " + "  </div>"
                };
            }])
            /* jshint ignore:end */
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
                    if (__.isDefined(airportAndIATACode)) {
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
