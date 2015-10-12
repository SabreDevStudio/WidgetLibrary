define([
          'webservices/OTAResponseParser'
        , 'datamodel/SegmentBaggageAllowance'
    ],
    function (
          OTAResponseParser
        , SegmentBaggageAllowance
    ) {
        'use strict';

        function BFMResponseParser() {
            OTAResponseParser.apply(this, arguments);
        }

        BFMResponseParser.prototype = Object.create(OTAResponseParser.prototype);
        BFMResponseParser.prototype.constructor = BFMResponseParser;

        BFMResponseParser.prototype.parseItineraryPricingInfo = function (itineraryPricingInfoResponsePart, legsSegmentCounts) {
            var itineraryPricingInfo = OTAResponseParser.prototype.parseItineraryPricingInfo.call(this, itineraryPricingInfoResponsePart, legsSegmentCounts);

            if (itineraryPricingInfoResponsePart.PTC_FareBreakdowns.PTC_FareBreakdown.length > 1) {
                throw new Error('itineraryPricingInfoResponsePart.PTC_FareBreakdowns.PTC_FareBreakdown.length > 1 not supported. There is one entry in this array for every passenger type requested. Currently only ADT passenger type requested (one type, regardless of number of ADT passengers)');
            }
            var ptcFareBreakdown = itineraryPricingInfoResponsePart.PTC_FareBreakdowns.PTC_FareBreakdown[0];

            itineraryPricingInfo.nonRefundableIndicator = ptcFareBreakdown.Endorsements.NonRefundableIndicator;

            var obFeesResponsePart = ptcFareBreakdown.PassengerFare.OBFees;
            itineraryPricingInfo.OBFees = obFeesResponsePart && this.parseOBFees(obFeesResponsePart);

            itineraryPricingInfo.baggageAllowance = this.parseBaggageAllowance(ptcFareBreakdown.PassengerFare.TPA_Extensions.BaggageInformationList);

            return itineraryPricingInfo;
        };

        BFMResponseParser.prototype.parseBaggageAllowance = function (baggageInformationList) {
            var segmentBaggageAllowance = new SegmentBaggageAllowance();
            baggageInformationList.BaggageInformation.forEach(function (allowanceInfo, legIndex) { //TODO it is NOT leg index??
                var legAllowanceInfo = allowanceInfo.Allowance;
                var legSegmentsRelativeIndexes = allowanceInfo.Segment.map(function (segment) {
                    return segment.Id;
                });
                segmentBaggageAllowance.addLegAllowance(legIndex, legAllowanceInfo, legSegmentsRelativeIndexes);
            });
            return segmentBaggageAllowance;
        };

        return BFMResponseParser;
    });
