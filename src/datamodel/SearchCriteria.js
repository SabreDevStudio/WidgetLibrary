define([
          'lodash'
        , 'moment'
    ], function (
          _
        , moment
    ) {
    "use strict";

    function SearchCriteria() {

        var _origin;
        var _destination;

        var that = this;

        function validateAirportRegex(airportString) {
            if (_.isUndefined(airportString) || airportString.length === 0) {
                throw new Error ("airport or city code needed");
            }
            if (!that.AIRPORT_CODE_REGEX.test(airportString)) {
                throw new Error ("'" + airportString + "' is not a valid IATA airport or city code");
            }
        }

        Object.defineProperty(this, 'origin', {
            enumerable: true,
            get: function() { return _origin},
            set: function(origin) {
                var originNormalized = origin.toUpperCase();
                validateAirportRegex(originNormalized);
                _origin = originNormalized;
            }
        });

        Object.defineProperty(this, 'destination', {
            enumerable: true,
            get: function() { return _destination},
            set: function(destination) {
                var destinationNormalized = destination.toUpperCase();
                validateAirportRegex(destinationNormalized);
                _destination = destinationNormalized;
            }
        });

    }

    SearchCriteria.prototype.AIRPORT_CODE_REGEX = /^[A-Z]{3}$/;

    SearchCriteria.prototype.getLengthOfStay = function () {
        return this.lengthOfStay || moment(this.returnDate).diff(moment(this.departureDate), 'days');
    };

    SearchCriteria.prototype.TripTypeEnum = Object.freeze({
        'OneWay': 'OneWay',
        'RoundTrip': 'RoundTrip',
        'MultiStop': 'MultiStop'
    });

    SearchCriteria.prototype.CabinEnum = Object.freeze({
        'Economy': 'Economy',
        'Business': 'Business',
        'First': 'First'
    });

    return SearchCriteria;
});
