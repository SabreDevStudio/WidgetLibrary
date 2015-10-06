define([
          'lodash'
        , 'moment'
        , 'angular'
    ],
    function (
          _
        , moment
        , angular
    ) {
        'use strict';

        return angular.module('commonFilters', [])
            .filter('startFrom', function() {
                return function(input, start) {
                    start = parseInt(start);
                    return input.slice(start);
                };
            })
            .filter('moment', function () {
                return function (input, format) {
                    return moment(input, format);
                };
            })
            .filter('stringJoiner', function () {
                return function (input, delimiter, prefix, suffix) {
                    return prefix + (input || []).join(delimiter || ',') + suffix;
                };
            })
            .filter('humanizeNumberOfStops', function () {
                return function (numberOfStops) {
                    switch (numberOfStops) {
                        case 0:
                            return 'Non-stop';
                        case 1:
                            return 'One stop';
                        default:
                            return 'Two+ stops';
                    }
                };
            })
            .filter('humanizeDurationDays', function () {
                return function (days) {
                    if (days === 1) {
                        return '1 day';
                    }
                    if (days > 1 && days < 7) {
                        return days + ' days';
                    }
                    if (days === 7) {
                        return '1 week';
                    }
                    if (days === 14) {
                        return '2 weeks';
                    } else {
                        return days + ' days';
                    }
                };
            })
            .filter('humanizeMinutes', function () {
                return function(minutes) {
                    var hours = Math.floor(minutes / 60);
                    var minutesOverFullHours = minutes % 60;
                    if (hours === 0) {
                        return minutes + ' min.';
                    }
                    if (hours === 1) {
                        return hours + ' hour, ' + minutesOverFullHours + ' min.';
                    }
                    if (hours > 1) {
                        return hours + ' hour, ' + minutesOverFullHours + ' min.';
                    }
                };
            })
            .filter('unixTimeToMoment', function () {
                return function (input) {
                    return moment.unix(input);
                };
            })
            .filter('momentDateFormat', function () {
                return function (value, momentFormat) {
                    if (_.isUndefined(value) || value === null) {
                        return '';
                    }
                    return value.format(momentFormat);
                };
            })
            .filter('makeMomentAndFormat', function () {
                return function (value, momentFormat) {
                    if (_.isUndefined(value) || value === null) {
                        return '';
                    }
                    return moment(value).format(momentFormat);
                };
            })
            .filter('makeMomentDurationAndFormat', function () {
                return function (value, momentFormat, suffix) {
                    if (_.isUndefined(value) || value === null) {
                        return '';
                    }
                    return moment.duration(value, momentFormat).humanize(suffix);
                };
            })
            .filter('passAllFilter', function () {
                return function (input) {
                    return input;
                };
            })
            .filter('applyFilter', ['$filter', function($filter) { // http://stackoverflow.com/questions/21491747/apply-formatting-filter-dynamically-in-a-ng-repeat
                return function() {
                    // arguments are: [value, filterName, filter_1st_arg, filter_2nd_arg, ....]
                    var args = Array.prototype.slice.call(arguments);
                    var value = args.shift();
                    var filterName = args.shift();
                    // if undefined is passed to this factory then it would create a passAllFilter
                    if (_.isUndefined(filterName )) {
                        filterName = 'passAllFilter';
                    }
                    var filter = $filter(filterName);
                    args.unshift(value);

                    return filter.apply(null, args);
                };
            }]);

    });
