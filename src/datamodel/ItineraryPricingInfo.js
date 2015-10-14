define([
          'lodash'
        , 'datamodel/SegmentBaggageAllowance'
    ],
    function (
          _
        , SegmentBaggageAllowance
    ) {
        'use strict';

        function ItineraryPricingInfo(legsSegmentCounts) {

            this.legsSegmentCounts = legsSegmentCounts;

            this.nonRefundableIndicator = undefined;

            this.OBFees = [];

            this.baggageAllowance;

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

            var that = this;

            /**
             * Based on absolute segment index (index of segment among all segments, from all legs), calculates leg index and segment index for this segment
             * @param segmentAbsoluteIdx
             */
            this.calculateLegAndSegmentRelativeIndices = function (segmentAbsoluteIdx) {
                var totalSegmentsTillEndOfThisLeg = 0;
                var totalSegmentsTillStartOfThisLeg = 0;
                for (var legIdx = 0; legIdx < that.legsSegmentCounts.length; legIdx++) {
                    totalSegmentsTillEndOfThisLeg += that.legsSegmentCounts[legIdx];
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
            ItineraryPricingInfo.prototype.fareReturned = function () {
                return true;
            };

            ItineraryPricingInfo.prototype.setCabin = function (segmentNumber, cabin) {
                var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentNumber);
                if (_.isUndefined(this.segmentCabins[legAndSegmentIndices.legIdx])) {
                    this.segmentCabins[legAndSegmentIndices.legIdx] = {};
                }
                this.segmentCabins[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = cabin;
            };

            ItineraryPricingInfo.prototype.setMeal = function (segmentNumber, mealCode) {
                var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentNumber);
                if (_.isUndefined(this.segmentMeals[legAndSegmentIndices.legIdx])) {
                    this.segmentMeals[legAndSegmentIndices.legIdx] = {};
                }
                this.segmentMeals[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = mealCode;
            };

            ItineraryPricingInfo.prototype.setSeatsRemaining = function (segmentNumber, seatsRemaining) {
                var legAndSegmentIndices = this.calculateLegAndSegmentRelativeIndices(segmentNumber);
                if (_.isUndefined(this.segmentSeatsRemaining[legAndSegmentIndices.legIdx])) {
                    this.segmentSeatsRemaining[legAndSegmentIndices.legIdx] = {};
                }
                this.segmentSeatsRemaining[legAndSegmentIndices.legIdx][legAndSegmentIndices.relativeSegmentIdx] = seatsRemaining;
            };
            
            ItineraryPricingInfo.prototype.getBrandMatchedToFlight = function (legIndex, segmentIndex) {
                var matchingFound = _.find(this.brandToSegmentMatchings, function (matchingItem) {
                    return matchingItem.hasMatchingForFlight(legIndex, segmentIndex);
                });
                return matchingFound && matchingFound.brandName;
            };

            ItineraryPricingInfo.prototype.getSeatsRemaining = function (legIdx, segmentIdx) {
                return this.segmentSeatsRemaining[legIdx] && this.segmentSeatsRemaining[legIdx][segmentIdx];
            };

            ItineraryPricingInfo.prototype.getCabin = function (legIdx, segmentIdx) {
                return this.segmentCabins[legIdx] && this.segmentCabins[legIdx][segmentIdx];
            };

            ItineraryPricingInfo.prototype.getMeals = function (legIdx, segmentIdx) {
                return this.segmentMeals[legIdx] && this.segmentMeals[legIdx][segmentIdx];
            };

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

            ItineraryPricingInfo.prototype.hasLowSeatsRemaining = function () {
                var LOW_SEATS_REMAINING_THRESHOLD = 4;
                return _.values(this.segmentSeatsRemaining).some(function (segmentMap) {
                    return _.values(segmentMap).some(function (seatsRemaining) {
                        return (seatsRemaining <= LOW_SEATS_REMAINING_THRESHOLD);
                    })
                });
            };
        }

        return ItineraryPricingInfo;
});
