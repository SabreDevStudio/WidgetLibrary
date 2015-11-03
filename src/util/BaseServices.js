define([
          'moment'
        , 'angular'
        , 'datamodel/ShoppingData'
    ],
    function (
          moment
        , angular
        , ShoppingData
    ) {
        'use strict';

        return angular.module('baseServices', [])
            .service('DateService', function () {
               return {
                   now: function () {
                       return moment();
                   }
               };
            })
            .service('ShoppingOptionsCacheService', function () {
                return new ShoppingData();
            })
            .service('WidgetIdGeneratorService', function () {
                var seqNumber = 0;
                return {
                    next: function () {
                        return seqNumber++;
                    }
                };
            }).
            factory('GeoLocationService', [
                  '$q'
                , '$window'
                , 'ErrorReportingService'
            , function (
                      $q
                    , $window
                    , ErrorReportingService
                ) {
                function getCurrentPosition() {
                    var deferred = $q.defer();

                    if (!$window.navigator.geolocation) {
                        ErrorReportingService.reportError('Unable to get geo location from the browser: Geolocation not supported');
                        deferred.reject('Geolocation not supported.');
                        return deferred.promise;
                    }

                    $window.navigator.geolocation.getCurrentPosition(
                        function (position) {
                            deferred.resolve(position.coords);
                        },
                        function (err) {
                            ErrorReportingService.reportError('Error while getting geo location from the browser: ' + err);
                            deferred.reject(err);
                        });

                    return deferred.promise;
                }

                return {
                    getCurrentPosition: getCurrentPosition
                };
            }])
    });
