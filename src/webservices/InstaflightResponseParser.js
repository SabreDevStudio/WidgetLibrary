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

            this.getPricedItinerariesArray = function(response) {
                return response.PricedItineraries;
            };

            this.itinerariesFound = function (response) {
                return _.has(response, 'PricedItineraries');
            };

            this.getAirItineraryPricingInfo = function(itin) {
                return itin.AirItineraryPricingInfo;
            };

            this.parseEquipment = function(segment) {
                return segment.AirEquipType;
            };

            this.parsePricingSource = function() {
                return 'Instaflights';
            }
        }

        InstaflightResponseParser.prototype = Object.create(AbstractOTAResponseParser.prototype);
        InstaflightResponseParser.prototype.constructor = InstaflightResponseParser;

        return InstaflightResponseParser;
    });
