define([
          'moment'
        , 'datamodel/Itinerary'
        , 'datamodel/Leg'
        , 'datamodel/ItinerariesList'
    ],
    function (
          moment
        , Itinerary
        , Leg
        , ItinerariesList
    ) {
        'use strict';

        function AbstractOTAResponseParser() {
        }

        AbstractOTAResponseParser.prototype.parse = function(response) {
            var itins = new ItinerariesList();

            if (!this.itinerariesFound(response)) {
                return itins;
            }

            var that = this;
            this.getPricedItinerariesArray(response).forEach(function(itin) {
                var parsedItinerary = that.parseItinerary(itin);
                itins.add(parsedItinerary);
            });

            return itins;
        };

        AbstractOTAResponseParser.prototype.parseItinerary = function (itin) {
            var that = this;
            var itinerary = new Itinerary();
            itin.AirItinerary.OriginDestinationOptions.OriginDestinationOption.forEach(function (leg) {
                itinerary.addLeg(that.parseLeg(leg));
            });
            if (itin.AirItineraryPricingInfo.length > 1) {
                throw new Error('parser unsupported');
            }
            var airItineraryPricingInfo = this.getAirItineraryPricingInfo(itin);
            airItineraryPricingInfo.FareInfos.FareInfo.forEach(function (fareInfo, index) {
                itinerary.setCabin(index, fareInfo.TPA_Extensions.Cabin.Cabin);
                itinerary.setSeatsRemaining(index, fareInfo.TPA_Extensions.SeatsRemaining.Number);
            });
            itinerary.baseFareAmount = airItineraryPricingInfo.ItinTotalFare.BaseFare.Amount; //TODO: refactor all price related props of itin into Itinerary.pricingInfo: {totalFare: ...} etc. But used also in filters, do later!
            itinerary.baseFareCurrency = airItineraryPricingInfo.ItinTotalFare.BaseFare.CurrencyCode;
            itinerary.totalTaxAmount = airItineraryPricingInfo.ItinTotalFare.Taxes.Tax[0].Amount;
            if (airItineraryPricingInfo.ItinTotalFare.Taxes.Tax.length > 1) {
                throw new Error('parser unsupported');
            }
            var totalFareAmountFromResponse = airItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
            itinerary.totalFareAmount = _.isString(totalFareAmountFromResponse)? parseFloat(totalFareAmountFromResponse): totalFareAmountFromResponse;
            itinerary.totalFareCurrency = airItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode;
            return itinerary;
        };

        AbstractOTAResponseParser.prototype.parseLeg = function(responseLeg) {
            var that = this;
            var leg = new Leg();
            leg.segments = responseLeg.FlightSegment.map(function (segment) {
                if (segment.Equipment.length > 1) {
                    throw new Error('parser unsupported'); //TODO: UT on complex responses
                }
                return {
                    departureAirport: segment.DepartureAirport.LocationCode,
                    departureDateTime: moment(segment.DepartureDateTime, moment.ISO_8601),
                    arrivalAirport: segment.ArrivalAirport.LocationCode,
                    arrivalDateTime: moment(segment.ArrivalDateTime, moment.ISO_8601),
                    elapsedTime: segment.ElapsedTime,
                    equipment: that.parseEquipment(segment),
                    marketingFlightNumber: segment.FlightNumber,
                    marketingAirline: segment.MarketingAirline.Code,
                    operatingFlightNumber: segment.OperatingAirline.FlightNumber,
                    operatingAirline: segment.OperatingAirline.Code
                };
            });
            return leg;
        };


        return AbstractOTAResponseParser;
    });
