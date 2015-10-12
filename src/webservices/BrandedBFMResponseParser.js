define([
          'lodash'
        , 'datamodel/BrandedItinerary'
        , 'datamodel/BrandToSegmentMatchingItem'
        , 'datamodel/ItineraryPricingInfo'
        , 'webservices/BFMResponseParser'
    ],
    function (
          _
        , BrandedItinerary
        , BrandToSegmentMatchingItem
        , ItineraryPricingInfo
        , BFMResponseParser
    ) {
        'use strict';

        function BrandedBFMResponseParser() {
            BFMResponseParser.apply(this, arguments);
        }

        BrandedBFMResponseParser.prototype = Object.create(BFMResponseParser.prototype);
        BrandedBFMResponseParser.prototype.constructor = BrandedBFMResponseParser;

        BrandedBFMResponseParser.prototype.parseItinerary = function (responseItin) {
            var that = this;
            var itinerary = new BrandedItinerary();

            responseItin.AirItinerary.OriginDestinationOptions.OriginDestinationOption.forEach(function (leg) { //TODO dups with AbstractOTAResponseParser
                itinerary.addLeg(that.parseLeg(leg));
            });
            if (responseItin.AirItineraryPricingInfo.length > 1) {
                throw new Error('parser unsupported');
            }
            var itineraryPricingInfoResponsePart = this.getItineraryPricingInfoResponsePart(responseItin);
            var legsSegmentCounts = itinerary.getLegsSegmentCounts();
            itinerary.itineraryPricingInfo = this.parseItineraryPricingInfo(itineraryPricingInfoResponsePart, legsSegmentCounts);

            if (responseItin.TPA_Extensions.AdditionalFares) {
                var additionalFares = this.parseAdditionalFares(responseItin.TPA_Extensions.AdditionalFares, legsSegmentCounts);
                additionalFares.forEach(function (additionalFare) {
                    itinerary.addAdditionalFare(additionalFare);
                });
            }

            itinerary.pricingSource = this.parsePricingSource(responseItin);

            return itinerary;
        };

        BrandedBFMResponseParser.prototype.parseAdditionalFares = function (allAdditionalFaresResponseParts, legsSegmentCounts) {
            var that = this;
            return allAdditionalFaresResponseParts.map(function (additionalInfoPart) {
                return that.parseItineraryPricingInfo(additionalInfoPart.AirItineraryPricingInfo, legsSegmentCounts);
            });
        };

        BrandedBFMResponseParser.prototype.parseItineraryPricingInfo = function (itineraryPricingInfoResponsePart, legsSegmentCounts) {
            if (itineraryPricingInfoResponsePart.FareReturned === false) {
                console.log(itineraryPricingInfoResponsePart.FareStatus);
                return new ItineraryPricingInfo(); //TODO: null object??
            }

            var itineraryPricingInfo = BFMResponseParser.prototype.parseItineraryPricingInfo.call(this, itineraryPricingInfoResponsePart, legsSegmentCounts);

            var fareComponents = itineraryPricingInfoResponsePart.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerFare.TPA_Extensions.FareComponents;
            itineraryPricingInfo.brandToSegmentMatchings = fareComponents && fareComponents.FareComponent.map(parseBrandToSegmentMatching);

            function parseBrandToSegmentMatching(fc) {
                var brandToSegmentMatching = new BrandToSegmentMatchingItem(fc.BrandName);
                fc.Segment.forEach(function (segmentMatching) {
                    // WARN: service returns leg and segment indices starting numeration from 1, not from 0. Indices normalized into 0-based.
                    brandToSegmentMatching.addMatchedSegment(segmentMatching.LegIndex - 1, segmentMatching.FlightIndex - 1);
                });
                return brandToSegmentMatching;
            }

            return itineraryPricingInfo;
        };

        return BrandedBFMResponseParser;
    });
