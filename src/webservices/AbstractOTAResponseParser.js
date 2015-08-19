define([
          'lodash'
        , 'moment'
        , 'datamodel/Itinerary'
        , 'datamodel/Leg'
        , 'datamodel/ItinerariesList'
        , 'datamodel/AlternateDatesOneWayPriceMatrix'
        , 'datamodel/AlternateDatesRoundTripPriceMatrix'
    ],
    function (
          _
        , moment
        , Itinerary
        , Leg
        , ItinerariesList
        , AlternateDatesOneWayPriceMatrix
        , AlternateDatesRoundTripPriceMatrix
    ) {
        'use strict';

        function AbstractOTAResponseParser() {

            this.getFirstItineraryTripType = function(response) {
                var firstItinerary = _.first(this.getPricedItinerariesArray(response));
                if (firstItinerary.AirItinerary.DirectionInd === 'OneWay') {
                    return 'OneWay';
                }
                if (firstItinerary.AirItinerary.DirectionInd === 'Return') {
                    return 'RoundTrip';
                }
            };

            // other class hierarchy creation logic in client code , not to introduce Factory class to be used only by this client
            this.createAlternateDatesPriceMatrixForTripType = function (tripType) {
                if (tripType === 'OneWay') {
                    return new AlternateDatesOneWayPriceMatrix();
                }
                if (tripType === 'RoundTrip') {
                    return new AlternateDatesRoundTripPriceMatrix();
                }
            };
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

        AbstractOTAResponseParser.prototype.extractAlternateDatesPriceMatrix = function (response) {
            var firstItineraryTripType = this.getFirstItineraryTripType(response);
            var altDatePriceMatrix = this.createAlternateDatesPriceMatrixForTripType(firstItineraryTripType);

            if (!this.itinerariesFound(response)) {
                return altDatePriceMatrix;
            }

            var that = this;
            this.getPricedItinerariesArray(response).forEach(function(itin) {
                var travelDatesWithLeadPrice = that.getTravelDatesWithLeadPrice(itin);
                altDatePriceMatrix.addLeadFareForDate(travelDatesWithLeadPrice);
            });

            return altDatePriceMatrix;
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

            itinerary.pricingSource = this.parsePricingSource(itin);

            return itinerary;
        };

        AbstractOTAResponseParser.prototype.getTravelDatesWithLeadPrice = function (itin) {
            var itinerary = this.parseItinerary(itin);
            var travelDatesWithLeadPrice = {
                  departureDate: itinerary.getOutboundDepartureDateTime()
                , returnDate: itinerary.getInboundDepartureDateTime()
                , price: itinerary.totalFareAmount
                , currency: itinerary.totalFareCurrency
            };
            return travelDatesWithLeadPrice;
        };

        AbstractOTAResponseParser.prototype.parseLeg = function(responseLeg) {
            var that = this;
            var leg = new Leg();
            leg.duration = parseInt(responseLeg.ElapsedTime);
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
