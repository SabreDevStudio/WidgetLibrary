define([],
    function () {
        'use strict';

        function BrandToSegmentMatchingItem(brandName) {
            this.brandName = brandName;
            this.matchedSegments = [];
        }

        BrandToSegmentMatchingItem.prototype.addMatchedSegment = function (legIndex, segmentIndex) {
            this.matchedSegments.push({
                legIndex: legIndex
                , segmentIndex: segmentIndex
            });
        };

        BrandToSegmentMatchingItem.prototype.hasMatchingForFlight = function(legIndex, segmentIndex) {
            return this.matchedSegments.some(function (matchedSegment) {
                return ((matchedSegment.legIndex === legIndex) && (matchedSegment.segmentIndex === segmentIndex));
            });
        };

        BrandToSegmentMatchingItem.prototype.getBrandsMatchedForFlight = function (legIndex, segmentIndex) {
            if (this.hasMatchingForFlight(legIndex, segmentIndex)) {
                return this.brandName;
            }
        };

        return BrandToSegmentMatchingItem;
    });
