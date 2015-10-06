define([
          'lodash'
        , 'moment'
    ],
    function (
          _
        , moment
    ) {
        'use strict';

        function Leg() {
            this.segments = [];
        }

        Leg.prototype.addSegment = function(segment) {
            this.segments.push(segment);
        };

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

        /* returns unique list of all marketing airlines, in the order as they first appear in leg */
        Leg.prototype.getAllMarketingAirlines = function() {
            var allMktAirlines = [];
            this.segments.forEach(function (segment) {
                allMktAirlines.push(segment.marketingAirline);
            });
            return _.uniq(allMktAirlines);
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

        Leg.prototype.getConnectionTimeMillis = function(segmentIdx) {
            if (this.hasConnection() && segmentIdx < (this.segments.length - 1)) { //all segments but not the last one
                var thisFlightArrival = this.segments[segmentIdx].arrivalDateTime;
                var nextFlightDeparture = this.segments[segmentIdx + 1].departureDateTime;
                var connectionTimeMillis = nextFlightDeparture.diff(thisFlightArrival);
                return connectionTimeMillis;
            }
        };

        // returns moment.duration
        Leg.prototype.getConnectionTime = function(segmentIdx) {
            return moment.duration(this.getConnectionTimeMillis(segmentIdx));
        };

        // perf optimisation: utility func to avoid formatting in the view
        Leg.prototype.getConnectionTimeMinutes = function(segmentIdx) {
            return this.getConnectionTimeMillis(segmentIdx) / 1000 / 60;
        };

        Leg.prototype.getFlightStructure = function () {
            var that = this;
            return this.segments.map(function (segment) {
                return segment.getFlightStructure();
            }).join('||');
        };

        Leg.prototype.hasRedEyeFlight = function () {
            return this.segments.some(function (segment) {
                return segment.flightTimeCrossesMidnight();
            });
        };

        Leg.prototype.getConnectionTimeToNextFlight = function(flightIdx) {
            var thisFlight = this.segments[flightIdx];
            var nextFlight = this.segments[flightIdx + 1];
            return nextFlight.departureDateTime.diff(thisFlight.arrivalDateTime, 'minutes');
        };

        Leg.prototype.hasLongConnection = function () {
            var LONG_CONNECTION_MIN_MINUTES = 300;
            for (var flightIdx = 0; flightIdx < this.segments.length - 1; flightIdx++) {
                var connectionTime =  this.getConnectionTimeToNextFlight(flightIdx);
                if (connectionTime >=  LONG_CONNECTION_MIN_MINUTES) {
                    return true;
                }
            }
        };

        // returns indicator that warns customer that they need to hurry up at some connection airport.
        Leg.prototype.hasShortConnection = function () {
            var SHORT_CONNECTION_MIN_MINUTES = 60; //WARN: this is very dependent on airport layout, whether both gates are in the same terminal, whether visa formalities need to be done (like at US gateway), flight delays
            for (var flightIdx = 0; flightIdx < this.segments.length - 1; flightIdx++) {
                var connectionTime =  this.getConnectionTimeToNextFlight(flightIdx);
                if (connectionTime <=  SHORT_CONNECTION_MIN_MINUTES) {
                    return true;
                }
            }
        };

        Leg.prototype.hasLowSeatsRemaining = function () {
            return this.segments.some(function (segment) {
                return segment.hasLowSeatsRemaining();
            });
        };

        return Leg;
    });
