define([
        'datamodel/ItineraryPricingInfo'
    ],
    function (
        ItineraryPricingInfo
    ) {
        'use strict';
        /**
         * Special Case / Null object for ItineraryPricingInfo, for the case when no fares were returned (no brands matched).
         * @constructor
         */
        function ItineraryPricingInfoNotReturnedFare() {
            ItineraryPricingInfo.apply(this, arguments);

            // information, on itinerary pricing info level, why this itinerary was not priced.
            this.fareStatus;
        }

        ItineraryPricingInfoNotReturnedFare.prototype = Object.create(ItineraryPricingInfo.prototype);
        ItineraryPricingInfoNotReturnedFare.prototype.constructor = ItineraryPricingInfoNotReturnedFare;

        /**
         * For discrimination between this null object and its base class ItineraryPricingInfo. Always returns false.
         * @returns {boolean}
         */
        ItineraryPricingInfoNotReturnedFare.prototype.fareReturned = function () {
            return false;
        };

        ItineraryPricingInfoNotReturnedFare.prototype.getTranslatedFareStatus = function() {
            switch (this.fareStatus) {
                case "A": return "Class is not available";
                case "O": return "Class is not offered";
                case "F": return "No fare found or applicable";
                case "N": return "Unknown status";
            }
        };

        return ItineraryPricingInfoNotReturnedFare;
    });
