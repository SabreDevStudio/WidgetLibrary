define([
        'datamodel/Itinerary'
        , 'util/LodashExtensions'
    ],
    function (
        Itinerary
        , __
    ) {
        'use strict';

        function BrandedItinerary() {
            Itinerary.apply(this, arguments);

            this.additionalFaresPricingInfos = []; // currently additional fare means the same as one brand. Not unifying names yes, as this class may be used also for flex fares (will be generalized then)
        }

        BrandedItinerary.prototype = Object.create(Itinerary.prototype);
        BrandedItinerary.prototype.constructor = BrandedItinerary;

        BrandedItinerary.prototype.addAdditionalFare = function (additionalFare) {
            this.additionalFaresPricingInfos.push(additionalFare);
        };

        BrandedItinerary.prototype.hasMultipleBrands = function () {
            return this.additionalFaresPricingInfos.length > 0;
        };

        BrandedItinerary.prototype.getBrandsMatchedToFlight = function (legIndex, segmentIndex) {
            var mainFareBrand = this.itineraryPricingInfo.getBrandMatchedToFlight(legIndex, segmentIndex);

            var additionalFaresBrands = this.additionalFaresPricingInfos.map(function (additionalFare) {
                return additionalFare.getBrandMatchedToFlight(legIndex, segmentIndex);
            });

            return [mainFareBrand].concat(additionalFaresBrands).filter(__.isDefined); // main fare brand may be also undefined
        };


        return BrandedItinerary;
    });
