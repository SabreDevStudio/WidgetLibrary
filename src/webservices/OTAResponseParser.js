define([
          'lodash'
        , 'webservices/AbstractOTAResponseParser'
    ],
    function (
          _
        , AbstractOTAResponseParser
    ) {
        'use strict';

        function OTAResponseParser() {

            this.getPricedItinerariesArray = function(response) {
                return response.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary;
            };

            this.itinerariesFound = function (response) {
                return _.has(response, 'OTA_AirLowFareSearchRS', 'Success');
            };

            this.getAirItineraryPricingInfo = function(itin) {
                return itin.AirItineraryPricingInfo[0];
            };

            this.parseEquipment = function(segment) {
                return segment.Equipment[0].AirEquipType;
            };

            this.getBusinessErrorMessage = function (response) {
                var skippedErrorTypes = ['WORKERTHREAD', 'SERVER', 'DEFAULT', 'DRE', 'IF2'];
                var errorMessage = JSON.parse(response).OTA_AirLowFareSearchRS.Errors.Error
                    .filter(function (error) {
                        return !_.contains(skippedErrorTypes, error.Type);
                    })
                    .map(function (error) {
                        return error.ShortText;
                    })
                    .join(', ');
                return errorMessage;
            };
        }

        OTAResponseParser.prototype = Object.create(AbstractOTAResponseParser.prototype);
        OTAResponseParser.prototype.constructor = OTAResponseParser;

        return OTAResponseParser;
    });
