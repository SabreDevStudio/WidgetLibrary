define([
          'lodash'
        , 'webservices/AbstractOTAResponseParser'
    ],
    function (
          _
        , AbstractOTAResponseParser
    ) {
        'use strict';

        function InstaflightResponseParser() {

            AbstractOTAResponseParser.apply(this, arguments);

            this.getPricedItinerariesArray = function(response) {
                return response.PricedItineraries;
            };

            this.itinerariesFound = function (response) {
                return _.has(response, 'PricedItineraries');
            };

            this.getItineraryPricingInfoResponsePart = function(itin) {
                return itin.AirItineraryPricingInfo;
            };

            this.parseEquipment = function(segment) {
                return segment.Equipment.AirEquipType;
            };

            this.parsePricingSource = function() {
                return 'Instaflights';
            };
        }

        InstaflightResponseParser.prototype = Object.create(AbstractOTAResponseParser.prototype);
        InstaflightResponseParser.prototype.constructor = InstaflightResponseParser;

        return InstaflightResponseParser;
    });
