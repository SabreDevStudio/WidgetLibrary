define([
          'lodash'
        , 'webservices/common/parsers/AbstractOTAResponseParser'
    ],
    function (
          _
        , AbstractOTAResponseParser
    ) {
        'use strict';

        /**
         * Parser used for BFM and Advanced Calendar responses
         * @constructor
         */
        function OTAResponseParser() {
            AbstractOTAResponseParser.apply(this, arguments);
        }

        OTAResponseParser.prototype = Object.create(AbstractOTAResponseParser.prototype);
        OTAResponseParser.prototype.constructor = OTAResponseParser;

        OTAResponseParser.prototype.getPricedItinerariesArray = function(response) {
            return response.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary;
        };

        OTAResponseParser.prototype.itinerariesFound = function (response) {
            return _.has(response, 'OTA_AirLowFareSearchRS', 'Success');
        };

        OTAResponseParser.prototype.getItineraryPricingInfoResponsePart = function(itin) {
            return itin.AirItineraryPricingInfo[0];
        };

        OTAResponseParser.prototype.parseEquipment = function(segment) {
            return segment.Equipment[0].AirEquipType;
        };

        OTAResponseParser.prototype.getBusinessErrorMessages = function (message) {
            var skippedErrorTypes = ['WORKERTHREAD', 'SERVER', 'DEFAULT', 'DRE', 'IF2', 'DSFCLIENT', 'JRCHILD'];
            try {
                // var responseJSON = JSON.parse(message);
                //if (_.has(responseJSON, 'OTA_AirLowFareSearchRS', 'Errors', 'Error')) {
                var errorMessages = JSON.parse(message).OTA_AirLowFareSearchRS.Errors.Error
                        .filter(function (error) {
                            return !_.contains(skippedErrorTypes, error.Type);
                        })
                        .map(function (error) {
                            return error.ShortText;
                        }) || [];
                return _.unique(errorMessages);
                //}
            } catch(e) {
                return [message];
            }
        };

        OTAResponseParser.prototype.parsePricingSource = function(itinerary) {
            return 'BFM'; //TODO: parse actual from response
            // or more detailed parsing:
            //var pricingInfo = itinerary.AirItineraryPricingInfo[0];
            //if (pricingInfo.PricingSource === 'ADVJR1' && pricingInfo.PricingSubSource === 'MIP') {
            //    return 'BFM_MIP';
            //}
        };

        return OTAResponseParser;
    });
