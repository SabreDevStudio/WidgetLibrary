define([
          'lodash'
        , 'util/LodashExtensions'
        , 'datamodel/SegmentBaggageAllowance'
    ],
    function (
          _
        , __
        , SegmentBaggageAllowance
    ) {
        'use strict';

        /**
         * Holds all price-related itinerary information.
         * In particular it is all the prices: base fare, total taxes, total fare,
         * and all other fare conditions related information: if ticket will be refundable, OB fees, baggage allowance (pieces, kg), cabin (Economy), number of seats remaining, meal.
         *
         * It is the collaborator of Itinerary, assigned to its field itineraryPricingInfo.
         * In case of branded itineraries it is also assigned as elements to additionalFaresPricingInfos - one item per for every brand.
         *
         * @param legsSegmentCounts array with number of segments for every leg. For example [1,2] (one segments in first leg, two segments in second). This context object is needed for parsing.
         * @constructor
         */
        function ItineraryPricingInfo(legsSegmentCounts) {

            this.legsSegmentCounts = legsSegmentCounts;

            this.nonRefundableIndicator = undefined;

            this.OBFees = [];

            this.baggageAllowance = undefined;

            //TODO extract all brand related info into other inheriting class
            this.brandToSegmentMatchings = [];

            /* two level map of leg and segment indices into segment (flight) cabin code.
             * For example: this.segmentCabins[1][2] will refer to the cabin of the leg with index 1 (second leg) and segment with index 2 (third segment).
             */
            this.segmentCabins = {};
            // two level map of leg and segment indices into number of seats remaining of segment (flight).
            this.segmentSeatsRemaining = {};

            this.segmentMeals = {};

            this.fareAmounts = {
                baseFare: undefined, // MonetaryAmount types
                totalFare: undefined,
                totalTax: undefined
            };

            // will store summaries, like unique brands, or unique cabins. For performance optimisation
            this.summaries = {};
        }

        /**
         * Based on absolute segment index (index of segment among all segments, from all legs), calculates leg index and segment index for this segment
         * @param segmentAbsoluteIdx
         */
        ItineraryPricingInfo.prototype.calculateLegAndSegmentRelativeIndices = function (segmentAbsoluteIdx) {
            var totalSegmentsTillEndOfThisLeg = 0;
            var totalSegmentsTillStartOfThisLeg = 0;
            for (var legIdx = 0; legIdx < this.legsSegmentCounts.length; legIdx++) {
                totalSegmentsTillEndOfThisLeg += this.legsSegmentCounts[legIdx];
                if (segmentAbsoluteIdx < totalSegmentsTillEndOfThisLeg) {
                    var segmentRelativeIdx = segmentAbsoluteIdx - totalSegmentsTillStartOfThisLeg;
                    return {
                        legIdx: legIdx,
                        relativeSegmentIdx: segmentRelativeIdx
                    };
                }
                totalSegmentsTillStartOfThisLeg = totalSegmentsTillEndOfThisLeg;
            }
        };

        /**
         * For discrimination between this and its accompanying null object ItineraryPricingInfoNotReturnedFares. Always returns false.
         * @returns {boolean}
         */
        ItineraryPricingInfo.prototype.fareReturned = true;

        /**
         * Used by parsers, sets cabin for given <b>absolute</b> segment (flight) index.
         * @param segmentAbsoluteIndex the index of segment (flight) in the whole itinerary (not flight index in leg (relative)). Index is 0-based.
         * @param cabin
         */
        ItineraryPricingInfo.prototype.setCabin = function (segmentAbsoluteIndex, cabin) {
            var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentAbsoluteIndex);
            if (_.isUndefined(this.segmentCabins[legAndSegmentIndices.legIdx])) {
                this.segmentCabins[legAndSegmentIndices.legIdx] = {};
            }
            this.segmentCabins[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = cabin;
        };

        /**
         * See setCabin
         */
        ItineraryPricingInfo.prototype.setMeal = function (segmentAbsoluteIndex, mealCode) {
            var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentAbsoluteIndex);
            if (_.isUndefined(this.segmentMeals[legAndSegmentIndices.legIdx])) {
                this.segmentMeals[legAndSegmentIndices.legIdx] = {};
            }
            this.segmentMeals[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = mealCode;
        };

        /**
         * See setCabin
         */
        ItineraryPricingInfo.prototype.setSeatsRemaining = function (segmentAbsoluteIndex, seatsRemaining) {
            var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentAbsoluteIndex);
            if (_.isUndefined(this.segmentSeatsRemaining[legAndSegmentIndices.legIdx])) {
                this.segmentSeatsRemaining[legAndSegmentIndices.legIdx] = {};
            }
            this.segmentSeatsRemaining[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = seatsRemaining;
        };

        /**
         * For given leg and segment relative indexes returns the brand name (if exists) if the brand was assigned to given flight.
         */
        ItineraryPricingInfo.prototype.getBrandMatchedToFlight = function (legIndex, segmentIndex) {
            var matchingFound = _.find(this.brandToSegmentMatchings, function (matchingItem) {
                return matchingItem.hasMatchingForFlight(legIndex, segmentIndex);
            });
            return matchingFound && matchingFound.brandName;
        };

        /**
         * Returns array of _uniq_ brands matched to all itinerary flights. In particular may be one element array.
         */
        ItineraryPricingInfo.prototype.getUniqueBrandsMatchedToAllFlights = function () {
            if (_.isUndefined(this.brandToSegmentMatchings)) {
                return [];
            }
            return _.uniq(this.brandToSegmentMatchings.map(function (matching) {
                return matching.brandName;
            }));
        };

        ItineraryPricingInfo.prototype.getSeatsRemaining = function (legIdx, segmentIdx) {
            return this.segmentSeatsRemaining[legIdx] && this.segmentSeatsRemaining[legIdx][segmentIdx];
        };

        ItineraryPricingInfo.prototype.getCabin = function (legIdx, segmentIdx) {
            return this.segmentCabins[legIdx] && this.segmentCabins[legIdx][segmentIdx];
        };

        ItineraryPricingInfo.prototype.getUniqueCabins = function () {
            return _.uniq(__.leafValues(this.segmentCabins));
        };

        ItineraryPricingInfo.prototype.getMeals = function (legIdx, segmentIdx) {
            return this.segmentMeals[legIdx] && this.segmentMeals[legIdx][segmentIdx];
        };

        ItineraryPricingInfo.prototype.getUniqueMeals = function () {
            return _.uniq(__.leafValues(this.segmentMeals));
        };

        /**
         * Used by parser.
         * @param baggageAllowanceForSegments
         */
        ItineraryPricingInfo.prototype.setBaggageAllowance = function (baggageAllowanceForSegments) {
            this.baggageAllowance = new SegmentBaggageAllowance();
            var that = this;
            baggageAllowanceForSegments.forEach(function (segmentsAllowance) {
                segmentsAllowance.segmentsAbsoluteIndexes.forEach(function (absoluteIdx) {
                    var legAndSegmentIndices = that.calculateLegAndSegmentRelativeIndices(absoluteIdx);
                    that.baggageAllowance.addLegSegmentsAllowance(legAndSegmentIndices.legIdx, legAndSegmentIndices.relativeSegmentIdx, segmentsAllowance.allowance);
                });
            });
        };

        ItineraryPricingInfo.prototype.getBaggageAllowance = function (legIdx, segmentIdx) {
            return this.baggageAllowance && this.baggageAllowance.getSegmentAllowance(legIdx, segmentIdx);
        };

        ItineraryPricingInfo.prototype.getUniqueBaggageAllowance = function () {
            return this.baggageAllowance.uniqueBaggageAllowance();
        };

        /**
         * Returns indicator that number of seats remaining is low.
         * The low threshold is arbitrary. Shopping services return this value in range between 1 and 9.
         * @returns {boolean}
         */
        ItineraryPricingInfo.prototype.hasLowSeatsRemaining = function () {
            var LOW_SEATS_REMAINING_THRESHOLD = 4;
            return _.values(this.segmentSeatsRemaining).some(function (segmentMap) {
                return _.values(segmentMap).some(function (seatsRemaining) {
                    return (seatsRemaining <= LOW_SEATS_REMAINING_THRESHOLD);
                });
            });
        };

        ItineraryPricingInfo.prototype.updateSummaries = function () {
            this.summaries = {
                  uniqueBrandsMatchedToAllFlights: this.getUniqueBrandsMatchedToAllFlights()
                , uniqueCabins: this.getUniqueCabins()
                , uniqueMeals: this.getUniqueMeals()
                , uniqueBaggageAllowance: this.getUniqueBaggageAllowance()
            };
        };

        return ItineraryPricingInfo;
});
