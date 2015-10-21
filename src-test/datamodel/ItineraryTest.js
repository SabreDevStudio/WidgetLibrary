define(['moment', 'datamodel/Itinerary', 'TestItineraryBuilder']
    , function (moment, Itinerary, ItineraryBuilder) {
    "use strict";

    describe('itinerary creation', function () {
        it('construct itinerary and get legs', function () {
            var sampleSegment = {
                arrivalAirport: 'LAX',
                arrivalTime: moment('2015-04-30T07:32:00'),
                cabin: 'Y',
                departureAirport: 'DFW',
                departureTime: moment('2015-04-30T06:15:00'),
                elapsedTime: 200,
                equipment: '320',
                marketingAirline: 'NK',
                marketingFlightNumber: 999,
                operatingAirline: 'NK',
                operatingFlightNumber: 867,
                seatsRemaining: 4
            };
            var itin = new Itinerary();
            itin.addLeg({segments: [sampleSegment]});

            expect(itin.legs.length).toBe(1);
        });
    });

    describe('getNumberOfStops', function () {
        it('construct itinerary and get legs', function () {
            var itin = (new ItineraryBuilder()).buildSampleItinerary({totalFareAmount: 100, airline: 'AA'});
            // this itinerary contains one connection on first leg and no stops on second leg
            expect(itin.getNumberOfStops()).toBe(1);

        });
    });

});