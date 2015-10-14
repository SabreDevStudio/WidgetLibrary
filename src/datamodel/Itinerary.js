define([
    'lodash'
    , 'util/LodashExtensions'
], function (
    _
    , __
) {
    "use strict";

    function Itinerary() {
        this.legs = [];

        var that = this;

        this.itineraryPricingInfo = undefined;

        // convenience property-style getters, needed for angular sorting of itineraries list

        // returns the sum of trip durations for all legs, in minutes
        // This includes connection times on all legs (but does not include stopovers, in particular the stopover in the turnaround point at destination of round trip travel)
        Object.defineProperty(this, 'duration', {
            get: function() {
                var duration = this.legs.reduce(function (total, leg) {
                    return total + leg.getDuration();
                }, 0);
                return duration;
            }
        });

        Object.defineProperty(this, 'outboundLegDuration', {
            get: function() {
                return __.first(this.legs).getDuration();
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

        Object.defineProperty(this, 'totalFareAmountWithCurrency', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.totalFare;
            }
        });

        Object.defineProperty(this, 'totalFareAmount', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.totalFare.amount;
            }
        });

        Object.defineProperty(this, 'totalFareCurrency', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.totalFare.currency;
            }
        });

        Object.defineProperty(this, 'baseFareAmount', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.baseFare.amount;
            }
        });

        Object.defineProperty(this, 'baseFareCurrency', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.baseFare.currency;
            }
        });

        Object.defineProperty(this, 'totalTaxAmount', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.totalTax.amount;
            }
        });

        Object.defineProperty(this, 'totalTaxCurrency', {
            get: function() {
                return this.itineraryPricingInfo.fareAmounts.totalTax.currency;
            }
        });
    }

    Itinerary.prototype.addLeg = function(leg) {
        this.legs.push(leg);
        this.updateLegsChangeOfAirportAtDeparture();
        this.updateLegsChangeOfAirportAtArrival();
    };

    /**
     * returns array with numbers of segments per leg. Array length is number of legs.
     * Needed for parsing FareInfos and matching the absolute (within whole itinerary) segment numbers into relative (within given leg) segment numbers
     *
     * Example return array: two legs, first leg has 2 flights, second leg has one flight:
     * [2, 1]
     */
    Itinerary.prototype.getLegsSegmentCounts = function () {
        return this.legs.map(function (leg) {
            return leg.segments.length;
        });
    };

    Itinerary.prototype.updateLegsChangeOfAirportAtDeparture = function () {
        if (this.isOneWayTravel()) {
            return;
        }
        var that = this;
        this.legs.forEach(function (leg, idx, allLegs) {
            if (idx === 0) {
                leg.hasAirportChangeAtDeparture = !that.isDepartureAndReturnSameAirport();
            } else {
                leg.hasAirportChangeAtDeparture = leg.getLegDepartureAirport() !== allLegs[idx - 1].getLegArrivalAirport();
            }
        });
    };

    Itinerary.prototype.updateLegsChangeOfAirportAtArrival = function () {
        if (this.isOneWayTravel()) {
            return;
        }
        var that = this;
        this.legs.forEach(function (leg, idx, allLegs) {
            if (that.isLastLeg(idx)) {
                leg.hasAirportChangeAtArrival = !that.isDepartureAndReturnSameAirport();
            } else {
                leg.hasAirportChangeAtArrival = leg.getLegArrivalAirport() !== allLegs[idx + 1].getLegDepartureAirport();
            }
        });
    };

    Itinerary.prototype.isLastLeg = function (legIdx) {
        return legIdx === (this.legs.length - 1);
    };

    Itinerary.prototype.getOutboundDepartureDateTime =  function() {
        var outboundLeg = __.first(this.legs);
        return __.first(outboundLeg.segments).departureDateTime;
    };

    Itinerary.prototype.getOutboundArrivalDateTime =  function() {
        var outboundLeg = __.first(this.legs);
        return __.last(outboundLeg.segments).arrivalDateTime;
    };

    Itinerary.prototype.getInboundDepartureDateTime =  function() {
        var inboundLeg = __.last(this.legs);
        return __.first(inboundLeg.segments).arrivalDateTime;
    };

    Itinerary.prototype.getInboundArrivalDateTime =  function() {
        var inboundLeg = __.last(this.legs);
        return __.last(inboundLeg.segments).arrivalDateTime;
    };

    // returns maximum number of connections on all legs
    Itinerary.prototype.getNumberOfStops = function() {
        return __.max(this.legs.map(function (leg) {
            return leg.getNumberOfStops();
        }));
    };

    Itinerary.prototype.getSumNumberOfStopsForAllLegs = function () {
        return this.legs.reduce(function (total, leg) {
            return total + leg.getNumberOfStops();
        }, 0);
    };

    Itinerary.prototype.getFirstLeg = function () {
      return __.first(this.legs);
    };

    Itinerary.prototype.getFirstMarketingAirline = function() {
        return this.legs[0].segments[0].marketingAirline;
    };

    /* returns unique list of all marketing airlines, in the order as they first appear in the journey */
    // WARN: performance optimisation, assuming Itinerary object is not changed after creation (and adding all legs in the beginning)
    Itinerary.prototype.getAllMarketingAirlines = function() {
        if (_.isUndefined(this.allMktAirlines)) {
            var allMktAirlines = [];
            this.legs.forEach(function (leg) {
                __.pushAll(allMktAirlines, leg.getAllMarketingAirlines());
            });
            this.allMktAirlines = __.uniq(allMktAirlines);
        }
        return this.allMktAirlines;
    };

    Itinerary.prototype.getConnectionAirports = function () {
        var legsConnectionAirportsLists = this.legs.map(function (leg) {
            return leg.getConnectionAirports();
        });
        return __.union(__.flatten(legsConnectionAirportsLists));
    };

    Itinerary.prototype.getTripDepartureAirport = function () {
        return __.first(this.legs).getLegDepartureAirport();
    };

    Itinerary.prototype.getTripArrivalAirport= function () {
        return __.last(this.legs).getLegArrivalAirport();
    };

    Itinerary.prototype.getFirstLegArrivalAirport = function () {
        return __.first(this.legs).getLegArrivalAirport();
    };

    Itinerary.prototype.isDepartureAndReturnSameAirport = function () {
        return this.getTripDepartureAirport() === this.getTripArrivalAirport();
    };

    Itinerary.prototype.departureAndArrivalDifferentForComplexTravel = function () {
        if (this.isOneWayTravel()) {
            return;
        }
        return !this.isDepartureAndReturnSameAirport();
    };

    Itinerary.prototype.isOneWayTravel = function () {
        return (this.legs.length === 1);
    };

    // WARN: performance optimisation, assuming Itinerary object is not changed after creation (and adding all legs in the beginning)
    Itinerary.prototype.hasChangeOfAirportsAtAnyStopover = function () {
        if (this.isOneWayTravel()) {
            return;
        }
        if (_.isUndefined(this.hasChangeOfAirportsAtAnyStopoverIndicator)) {
            this.hasChangeOfAirportsAtAnyStopoverIndicator = this.legs.some(function (leg, idx, allLegs) {
                return (((idx === 0) && (leg.hasAirportChangeAtArrival)) // first leg
                || (((idx > 0) && (idx < (allLegs.length - 1))) && (leg.hasAirportChangeAtDeparture || leg.hasAirportChangeAtArrival)) // middle legs
                || ((idx > 0) && (leg.hasAirportChangeAtDeparture))); // last leg
            });
        }
        return this.hasChangeOfAirportsAtAnyStopoverIndicator;
    };

    Itinerary.prototype.getPricingSource = function () {
      return this.pricingSource;
    };

    Itinerary.prototype.getFlightStructure = function() {
        return this.legs.map(function (leg) {
            return leg.getFlightStructure();
        }).join(' ||| ');
    };

   // WARN: performance optimisation, assuming Itinerary object is not changed after creation (all legs are added in batch, after object creation, and before querying this hasRedEyeFlight property) //TODO: change into client (parser) to call method .build() on Itinerary, and that method will call update all stats and indicators
    Itinerary.prototype.hasRedEyeFlight = function () {
        if (_.isUndefined(this.hasRedEyeFlightIndicator)) {
            this.hasRedEyeFlightIndicator = this.legs.some(function (leg) {
                return leg.hasRedEyeFlight();
            });
        }
        return this.hasRedEyeFlightIndicator;
    };

    Itinerary.prototype.hasShortConnection = function () {
        return this.legs.some(function (leg) {
            return leg.hasShortConnection();
        });
    };

    Itinerary.prototype.hasLongConnection = function () {
        return this.legs.some(function (leg) {
            return leg.hasLongConnection();
        });
    };

    Itinerary.prototype.getSeatsRemaining = function (legIdx, segmentIdx) {
        return this.itineraryPricingInfo.getSeatsRemaining(legIdx, segmentIdx);
    };

    Itinerary.prototype.getCabin = function (legIdx, segmentIdx) {
        return this.itineraryPricingInfo.getCabin(legIdx, segmentIdx);
    };

    Itinerary.prototype.getMeals = function (legIdx, segmentIdx) {
        return this.itineraryPricingInfo.getMeals(legIdx, segmentIdx);
    };

    Itinerary.prototype.getBaggageAllowance = function (legIdx, segmentIdx) {
        return this.itineraryPricingInfo.getBaggageAllowance(legIdx, segmentIdx);
    };

    Itinerary.prototype.hasLowSeatsRemaining = function () {
        return this.itineraryPricingInfo.hasLowSeatsRemaining();
    };

    return Itinerary;
});
