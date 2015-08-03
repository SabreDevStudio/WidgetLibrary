define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        function Leg() {
            this.segments = [];
        }

        // returns departure (origin) for the whole leg: that is the departure airport of the first segment of the leg
        Leg.prototype.getLegDepartureAirport = function() {
            return _.first(this.segments).departureAirport;
        };

        // returns arrival (destination) airport for the whole leg: the arrival airport of the last segment of the leg
        Leg.prototype.getLegArrivalAirport = function() {
            return _.last(this.segments).arrivalAirport;
        };

        Leg.prototype.getLegDepartureDateTime = function () {
            return _.first(this.segments).departureDateTime;
        };

        Leg.prototype.getLegArrivalDateTime = function () {
            return _.last(this.segments).arrivalDateTime;
        };

        Leg.prototype.getNumberOfStops = function() {
            return this.segments.length - 1;
        };

        // returns leg duration, that is the duration from the leg's first flight departure time till its last flight arrival time (so all flight times plus all connection times)
        // returned value is in minutes
        Leg.prototype.getDuration = function () {
            return this.duration;
        };

        Leg.prototype.getFirstFlightMarketingAirline = function () {
            return _.first(this.segments).marketingAirline;
        };

        Leg.prototype.hasConnection = function () {
          return this.segments.length > 1;
        };

        Leg.prototype.getConnectionAirports = function () {
            if (!this.hasConnection()) {
                return [];
            }

            // as we will consider arrival airport for every flight, we skip the arrival of the last flight within the leg, as it is not connection but end of leg (stopover)
            var allFlightsWithoutLastOne = _.initial(this.segments);

            return allFlightsWithoutLastOne.map(function (flight) {
                return flight.arrivalAirport;
            });
        };

        return Leg;
    });
