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
            .filter('unixTimeToMoment', function () {
                return function (input) {
                    return moment.unix(input);
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
