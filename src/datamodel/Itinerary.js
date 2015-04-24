define(['lodash'], function (_) {
    "use strict";

    function Itinerary() {
        this.legs = [];

        var that = this;

        /**
         * Based on overall segment index (index of segment among all segments, from all legs), calculates leg index and segment index for this segment
         * @param segmentOverallIdx
         */
        function calculateLegAndSegmentIndices(segmentOverallIdx) {
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
        }

        Itinerary.prototype.addLeg = function(leg) {
            this.legs.push(leg);
        };

        Itinerary.prototype.setCabin = function(segmentNumber, cabin) {
            var legAndSegmentIndices = calculateLegAndSegmentIndices(segmentNumber);
            this.legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].cabin = cabin;
        };

        Itinerary.prototype.setSeatsRemaining = function(segmentNumber, seatsRemaining) {
            var legAndSegmentIndices = calculateLegAndSegmentIndices(segmentNumber);
            this.legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].seatsRemaining = seatsRemaining;
        };

        // returns departure (origin) for the whole leg: that is the departure airport of the first segment of the leg
        Itinerary.prototype.getLegDeparture = function(leg) {
            return leg.segments[0].departureAirport;
        };

        Itinerary.prototype.getLegStops = function(leg) {
            return leg.segments.length - 1;
        };

        // returns arrival (destination) airport for the whole leg: the arrival airport of the last segment of the leg
        Itinerary.prototype.getLegArrival = function(leg) {
            return leg.segments[leg.segments.length - 1].arrivalAirport;
        };

        Itinerary.prototype.getOutboundDepartureDateTime =  function() {
            return this.legs[0].segments[0].departureDateTime;
        };

        Itinerary.prototype.getInboundArrivalDateTime =  function() {
            return _.last(_.last(this.legs).segments).arrivalDateTime;
        };

        // returns maximum number of connections on all legs
        Itinerary.prototype.getNumberOfStops = function() {
            return _.max(this.legs.map(this.getLegStops));
        };

        Itinerary.prototype.getFirstMarketingAirline = function() {
            return this.legs[0].segments[0].marketingAirline;
        };

    }

    return Itinerary;
});
