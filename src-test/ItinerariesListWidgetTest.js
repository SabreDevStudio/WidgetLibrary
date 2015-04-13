define(['ItinerariesListWidget', 'moment', 'jasmine-jquery'], function(ItinerariesListWidget, moment, JasmineJqueryDummy) {
    "use strict";
    describe('update() method', function () {
        it('itineraries list DOM updated after update() called', function () {
            var itinerariesListWidget = new ItinerariesListWidget();

            var sampleItinerary = {
                baseFareAmount: 132.33,
                baseFareCurrency: 'USD',
                totalFareAmount: 186.2,
                totalFareCurrency: 'USD',
                totalTaxAmount: 39.24,
                legs: [
                        {segments: [
                            {
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
                            }
                        ]},
                        {segments: [
                            {
                                arrivalAirport: 'DFW',
                                arrivalTime: moment('2015-05-01T20:32:00'),
                                cabin: 'Y',
                                departureAirport: 'LAX',
                                departureTime: moment('2015-05-01T22:15:00'),
                                elapsedTime: 200,
                                equipment: '320',
                                marketingAirline: 'AA',
                                marketingFlightNumber: 123,
                                operatingAirline: 'DL',
                                operatingFlightNumber: 453,
                                seatsRemaining: 3
                            }
                        ]}
                ]
            };

            var itinerariesList = [];
            itinerariesList.push(sampleItinerary);

            itinerariesListWidget.render(function (dom) {
                itinerariesListWidget.update(itinerariesList);
                //TODO
                dom = dom;
            });
        });
    });
});
