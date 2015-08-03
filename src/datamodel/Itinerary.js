define(['lodash'], function (_) {
    "use strict";

    function Itinerary() {
        this.legs = [];

        var that = this;

        /**
         * Based on overall segment index (index of segment among all segments, from all legs), calculates leg index and segment index for this segment
         * @param segmentOverallIdx
         */
        this.calculateLegAndSegmentIndices = function(segmentOverallIdx) {
            var cnt = 0;
            var retLegIdx;
            var retSegmentIdx;
            that.legs.some(function (leg, legIdx) {
                return leg.segments.some(function (segment, segmentIdx) {
                    if (cnt++ === segmentOverallIdx) {
                        retLegIdx = legIdx;
                        retSegmentIdx = segmentIdx;
                        return true;
                    }
                });
            });
            return {
                legIdx: retLegIdx,
                segmentIdx: retSegmentIdx
            }
        };

        // convenience property-style getters, needed for angular sorting of itineraries list

        // returns the sum of trip durations for all legs, in minutes
        // This includes connection times on all legs (but does not include stopovers, in particular the stopover in the turnaround point at destination of round trip travel)
        Object.defineProperty(this, 'duration', {
            get: function() {
                return this.legs.reduce(function (total, leg) {
                    return total + leg.getDuration();
                }, 0);
            }
        });

        Object.defineProperty(this, 'outboundLegDuration', {
            get: function() {
                return _.first(this.legs).getDuration();
            }
        });


        Object.defineProperty(this, 'outboundDepartureDateTime', {
            get: function() {
                return this.getOutboundDepartureDateTime();
            }
        });

        Object.defineProperty(this, 'outboundArrivalDateTime', {
            get: function() {
                return this.getOutboundArrivalDateTime();
            }
        });

        Object.defineProperty(this, 'numberOfStops', {
            get: function() {
                return this.getNumberOfStops();
            }
        });

        Object.defineProperty(this, 'sumNumberOfStopsForAllLegs', {
            get: function() {
                return this.getSumNumberOfStopsForAllLegs();
            }
        });

    }

    Itinerary.prototype.addLeg = function(leg) {
        this.legs.push(leg);
    };

    Itinerary.prototype.setCabin = function(segmentNumber, cabin) {
        var legAndSegmentIndices = this.calculateLegAndSegmentIndices(segmentNumber);
        this.legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].cabin = cabin;
    };

    Itinerary.prototype.setSeatsRemaining = function(segmentNumber, seatsRemaining) {
        var legAndSegmentIndices = this.calculateLegAndSegmentIndices(segmentNumber);
        this.legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].seatsRemaining = seatsRemaining;
    };

    Itinerary.prototype.getOutboundDepartureDateTime =  function() {
        var outboundLeg = _.first(this.legs);
        return _.first(outboundLeg.segments).departureDateTime;
    };

    Itinerary.prototype.getOutboundArrivalDateTime =  function() {
        var outboundLeg = _.first(this.legs);
        return _.last(outboundLeg.segments).arrivalDateTime;
    };

    Itinerary.prototype.getInboundDepartureDateTime =  function() {
        var inboundLeg = _.last(this.legs);
        return _.first(inboundLeg.segments).arrivalDateTime;
    };

    Itinerary.prototype.getInboundArrivalDateTime =  function() {
        var inboundLeg = _.last(this.legs);
        return _.last(inboundLeg.segments).arrivalDateTime;
    };

    // returns maximum number of connections on all legs
    Itinerary.prototype.getNumberOfStops = function() {
        return _.max(this.legs.map(function (leg) {
            return leg.getNumberOfStops();
        }));
    };

    Itinerary.prototype.getSumNumberOfStopsForAllLegs = function () {
        return this.legs.reduce(function (total, leg) {
            return total + leg.getNumberOfStops();
        }, 0);
    };

    Itinerary.prototype.getFirstLeg = function () {
      return _.first(this.legs);
    };

    Itinerary.prototype.getFirstMarketingAirline = function() {
        return this.legs[0].segments[0].marketingAirline;
    };

    Itinerary.prototype.getConnectionAirports = function () {
        var legsConnectionAirportsLists = this.legs.map(function (leg) {
            return leg.getConnectionAirports();
        });
        return _.union(_.flatten(legsConnectionAirportsLists));
    };

    Itinerary.prototype.getTripDepartureAirport = function () {
        return _.first(this.legs).getLegDepartureAirport();
    };

    Itinerary.prototype.getTripArrivalAirport= function () {
        return _.last(this.legs).getLegArrivalAirport();
    };

    Itinerary.prototype.getFirstLegArrivalAirport = function () {
        return _.first(this.legs).getLegArrivalAirport();
    };

    Itinerary.prototype.isDepartureAndReturnSameAirport = function () {
        return this.getTripDepartureAirport() === this.getTripArrivalAirport();
    };

    return Itinerary;
});
