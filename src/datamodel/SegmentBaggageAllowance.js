define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        function SegmentBaggageAllowance() {
            this.legSegmentBaggageAllowance = {}; // two level mapping of leg and segment (relative) indexes into matched baggage allowance
        }

        SegmentBaggageAllowance.prototype.addLegAllowance = function (legIndex, allowanceInfo, legSegmentsRelativeIndexes) {
            if (_.isUndefined(this.legSegmentBaggageAllowance[legIndex])) {
                this.legSegmentBaggageAllowance[legIndex] = {};
            }
            var that = this;
            legSegmentsRelativeIndexes.forEach(function (legSegmentRelativeIndex) {
                that.legSegmentBaggageAllowance[legIndex][legSegmentRelativeIndex] = allowanceInfo;
            });
        };

        SegmentBaggageAllowance.prototype.getSegmentAllowance = function (legIndex, segmentIndex) {
            return this.legSegmentBaggageAllowance[legIndex][segmentIndex];
        };

        return SegmentBaggageAllowance;
    });
