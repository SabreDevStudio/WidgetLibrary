define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        /**
         *
         * @param origin: 3 letter airport code, case not important
         * @param destination: 3 letter airport code, case not important
         * @param departureDateTime: moment object, not String or plain Javascript Date
         * @param arrivalDateTime: moment object, not String or plain Javascript Date
         * @constructor
         */
        function SearchCriteriaLeg(origin, destination, departureDateTime, arrivalDateTime) {

            var that = this;

            var originNormalized = origin.toUpperCase();
            validateAirportRegex(originNormalized);
            this.origin = originNormalized;

            var destinationNormalized = destination.toUpperCase();
            validateAirportRegex(destinationNormalized);
            this.destination = destinationNormalized;

            var _departureDateTime;
            Object.defineProperty(this, 'departureDateTime', {
                enumerable: true,
                get: function() {
                    return _departureDateTime.clone();}, // defensive cloning to avoid many errors resulting from moment objects mutable
                set: function(departureDateTime) {
                    _departureDateTime = departureDateTime.clone();}
            });

            this.departureDateTime = departureDateTime;

            var _arrivalDateTime;
            Object.defineProperty(this, 'arrivalDateTime', {
                enumerable: true,
                get: function() {
                    if (_arrivalDateTime) {
                        return _arrivalDateTime.clone(); // defensive cloning to avoid many errors resulting from moment objects mutable
                    }
                },
                set: function(arrivalDateTime) {
                    if (arrivalDateTime) {
                        _arrivalDateTime = arrivalDateTime.clone();
                    }
                }
            });

            this.arrivalDateTime = arrivalDateTime;

            function validateAirportRegex(airportString) {
                if (_.isUndefined(airportString) || airportString.length === 0) {
                    throw new Error ("airport or city code needed");
                }
                if (!that.AIRPORT_CODE_REGEX.test(airportString)) {
                    throw new Error ("'" + airportString + "' is not a valid IATA airport or city code");
                }
            }
        }

        SearchCriteriaLeg.prototype.moveDates = function(daysOffset) {
            this.departureDateTime = this.departureDateTime.add(daysOffset, 'days');
        };

        SearchCriteriaLeg.prototype.AIRPORT_CODE_REGEX = /^[A-Z]{3}$/;

        return SearchCriteriaLeg;
    });
