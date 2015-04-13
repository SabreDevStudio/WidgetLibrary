define(function () {
    "use strict";

    function Itinerary() {
        var legs = [];

        /**
         * Based on overall segment index (index of segment among all segments, from all legs), calculates leg index and segment index for this segment
         * @param segmentOverallIdx
         */
        function calculateLegAndSegmentIndices(segmentOverallIdx) {
            var cnt = 0;
            var retLegIdx;
            var retSegmentIdx;
            legs.some(function (leg, legIdx) {
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
            legs.push(leg);
        };

        Itinerary.prototype.setCabin = function(segmentNumber, cabin) {
            var legAndSegmentIndices = calculateLegAndSegmentIndices(segmentNumber);
            legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].cabin = cabin;
        };

        Itinerary.prototype.setSeatsRemaining = function(segmentNumber, seatsRemaining) {
            var legAndSegmentIndices = calculateLegAndSegmentIndices(segmentNumber);
            legs[legAndSegmentIndices.legIdx].segments[legAndSegmentIndices.segmentIdx].seatsRemaining = seatsRemaining;
        };

        // returns departure (origin) for the whole leg: that is the departure airport of the first segment of the leg
        Itinerary.prototype.getLegDeparture = function(leg) {
            return leg.segments[0].departureAirport;
        };

        // returns arrival (destination) airport for the whole leg: the arrival airport of the last segment of the leg
        Itinerary.prototype.getLegArrival = function(leg) {
            return leg.segments[leg.segments.length - 1].arrivalAirport;
        };

        // returns travel date: the start of the whole journey (the departure of the first leg (first segment)), in human friendly format
        Itinerary.prototype.getTravelDateShort = function() {
            return legs[0].segments[0].departureTime.format('ddd, DD MMM'); // Sun, 05 Dec
        };

        Itinerary.prototype.getTravelDate =  function() {
            return legs[0].segments[0].departureTime;
        };

        Itinerary.prototype.getLegDepartureTime = function() {
            return this.getTravelDate().format('ddd, DD MMM'); // Sun, 05 Dec
        };

    }

    return Itinerary;
});
