define(['datamodel/ShoppingData', 'datamodel/Itinerary', 'moment'], function (ShoppingData, Itinerary, moment) {
    "use strict";

    function AdvancedCalendarResponseParser() {

        var that = this;

        AdvancedCalendarResponseParser.prototype.parseResponse = function (responseData, startDate, endDate, key) {
            var shoppingData = new ShoppingData();
            shoppingData.markRequestedData(key, startDate, endDate);
            if (typeof responseData === 'undefined') {
                return shoppingData; // if no prices found return empty prices object
            }
            var rs = JSON.parse(responseData);
            if (typeof rs.OTA_AirLowFareSearchRS === 'undefined' || typeof rs.OTA_AirLowFareSearchRS.Success === 'undefined') {
                return shoppingData; // if no prices found return empty prices objects for every month
            }

            rs.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.forEach(function (itin) {
                shoppingData.addItinerary(key, that.parseItinerary(itin));
            });

            shoppingData.updateLeadPrices(key);

            return shoppingData;
        };

        this.parseItinerary = function (itin) {
            var itinerary = new Itinerary();
            itin.AirItinerary.OriginDestinationOptions.OriginDestinationOption.forEach(function (leg) {
                itinerary.addLeg(parseLeg(leg));
            });
            if (itin.AirItineraryPricingInfo.length > 1) {
                throw new Error('parser unsupported');
            }
            itin.AirItineraryPricingInfo[0].FareInfos.FareInfo.forEach(function (fareInfo, index) {
                itinerary.setCabin(index, fareInfo.TPA_Extensions.Cabin.Cabin);
                itinerary.setSeatsRemaining(index, fareInfo.TPA_Extensions.SeatsRemaining.Number);
            });
            itinerary.baseFareAmount = itin.AirItineraryPricingInfo[0].ItinTotalFare.BaseFare.Amount;
            itinerary.baseFareCurrency = itin.AirItineraryPricingInfo[0].ItinTotalFare.BaseFare.CurrencyCode;
            itinerary.totalTaxAmount = itin.AirItineraryPricingInfo[0].ItinTotalFare.Taxes.Tax[0].Amount;
            if (itin.AirItineraryPricingInfo[0].ItinTotalFare.Taxes.Tax.length > 1) {
                throw new Error('parser unsupported');
            }
            itinerary.totalFareAmount = itin.AirItineraryPricingInfo[0].ItinTotalFare.TotalFare.Amount;
            itinerary.totalFareCurrency = itin.AirItineraryPricingInfo[0].ItinTotalFare.TotalFare.CurrencyCode;
            return itinerary;
        }

        function parseLeg(leg) {
            var legObj = {}; // leg is array of segments
            legObj.segments = leg.FlightSegment.map(function (segment) {
                if (segment.Equipment.length > 1) {
                    throw new Error('parser unsupported'); //TODO: UT on complex responses
                }
                return {
                    departureAirport: segment.DepartureAirport.LocationCode,
                    departureDateTime: moment(segment.DepartureDateTime),
                    arrivalAirport: segment.ArrivalAirport.LocationCode,
                    arrivalDateTime: moment(segment.ArrivalDateTime),
                    elapsedTime: segment.ElapsedTime,
                    equipment: segment.Equipment[0].AirEquipType,
                    marketingFlightNumber: segment.FlightNumber,
                    marketingAirline: segment.MarketingAirline.Code,
                    operatingFlightNumber: segment.OperatingAirline.FlightNumber,
                    operatingAirline: segment.OperatingAirline.Code
                };
            });
            return legObj;
        }
    }

    return AdvancedCalendarResponseParser;
});