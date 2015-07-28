define([
        'angular'
    ],
    function (
        angular
    ) {
        'use strict';

        return angular.module('commonFilters', [])
            .filter('startFrom', function() {
                return function(input, start) {
                    start = parseInt(start);
                    return input.slice(start);
                };
            });

    });
