define([
      'lodash'
    , 'moment'
    , 'datamodel/Itinerary'
    , 'datamodel/ItineraryPricingInfo'
    , 'datamodel/ItinerariesList'
    , 'datamodel/Leg'
    , 'datamodel/Segment'
    ], function (
      _
    , moment
    , Itinerary
    , ItineraryPricingInfo
    , ItinerariesList
    , Leg
    , Segment
) {
    "use strict";

    // TODO: move it to src-test: but problems with require-js to load it from src-test. The same with util CalendarTestPricesGenerator
    function TestItineraryBuilder() {
    }

    TestItineraryBuilder.prototype.buildSampleItinerary = function(spec) {
            var itin = new Itinerary();
            // creates boilerplate itinerary. Fields that matter are marked in comments
            itin.itineraryPricingInfo = new ItineraryPricingInfo();
            itin.itineraryPricingInfo.fareAmounts.totalFare = {
                amount: spec.totalFareAmount || 243.43,
                currency: 'USD'
            };
            itin.itineraryPricingInfo.fareAmounts.baseFare = {
                amount: Math.floor(0.7 * itin.totalFareAmount),
                currency: 'USD'
            };
            itin.itineraryPricingInfo.fareAmounts.totalTax = {
                amount: Math.floor(0.3 * itin.totalFareAmount),
                currency: 'USD'
            };

            var firstLeg = new Leg();
            firstLeg.segments = [new Segment(
                {
                    departureDateTime: moment('2015-04-30T07:32:00').clone().add(_.random(0,2), 'hours'),
                    departureAirport: 'LAX',
                    arrivalAirport: 'DFW',
                    arrivalDateTime: moment('2015-04-30T09:15:00').clone().add(_.random(0,50), 'minutes'),
                    cabin: 'Y',
                    elapsedTime: 200,
                    equipment: '320',
                    marketingAirline: spec.airline || 'LX', // airline
                    marketingFlightNumber: 999,
                    operatingAirline: 'NK',
                    operatingFlightNumber: 867
                }),
                new Segment({
                    departureAirport: 'DFW',
                    departureDateTime: moment('2015-04-30T10:32:00').clone().add(_.random(0,2), 'hours'),
                    arrivalAirport: 'MIA',
                    arrivalDateTime: moment('2015-04-30T14:45:00').clone().add(_.random(0,50), 'minutes'),
                    cabin: 'Y',
                    elapsedTime: 200,
                    equipment: '123',
                    marketingAirline: 'DL', // WARN: setting marketing airline to other airline on purpose. In such case marketing airlines from both legs must be allowed, for the itinerary to be allowed
                    marketingFlightNumber: 3442,
                    operatingAirline: 'NK',
                    operatingFlightNumber: 867
                })
            ];
            itin.addLeg(firstLeg);

            var secondLeg = new Leg();
            secondLeg.segments = [
                new Segment({
                        departureAirport: 'MIA',
                        departureDateTime: moment('2015-05-01T20:32:00').clone().add(_.random(0,2), 'hours'),
                        arrivalAirport: 'LAX',
                        arrivalDateTime: moment('2015-05-01T23:15:00').clone().add(_.random(0,2), 'hours'),
                        cabin: 'Y',
                        elapsedTime: 300,
                        equipment: '320',
                        marketingAirline: spec.airline || 'LX', // airline
                        marketingFlightNumber: 123,
                        operatingAirline: 'DL',
                        operatingFlightNumber: 453
                    })
                ];
            itin.addLeg(secondLeg);

            return itin;
        };

        TestItineraryBuilder.prototype.buildRandomItinerary = function() {
            var airlines = ['AF', 'LH', 'LX', 'DL', 'OK'];
            var price = 300 + _.random(0, 300);
            return this.buildSampleItinerary({
                totalFareAmount: price,
                airline: airlines[_.random(0, airlines.length - 1)]
            });
        };

        TestItineraryBuilder.prototype.buildRandomItinerariesList = function (count) {
            var itinerariesList = new ItinerariesList();
            for (var i = 0; i < count; i++) {
                itinerariesList.add(this.buildRandomItinerary());
            }
            return itinerariesList;
        };

        return TestItineraryBuilder;

});
