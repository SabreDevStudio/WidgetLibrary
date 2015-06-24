define(['ItinerariesListWidget', 'moment', 'jasmine-jquery', 'datamodel/Itinerary', 'datamodel/ItinerariesList'], function(ItinerariesListWidget, moment, JasmineJqueryDummy, Itinerary, ItinerariesList) {
    "use strict";

    var sampleItinerary = new Itinerary();
    sampleItinerary.baseFareAmount = 132.33;
    sampleItinerary.baseFareCurrency = 'USD';
    sampleItinerary.totalFareAmount = 186.2;
    sampleItinerary.totalFareCurrency = 'USD';
    sampleItinerary.totalTaxAmount = 39.24;
    sampleItinerary.legs = [
        {segments: [
            {
                departureDateTime: moment('2015-04-30T07:32:00'),
                departureAirport: 'LAX',
                arrivalAirport: 'DFW',
                arrivalDateTime: moment('2015-04-30T09:15:00'),
                cabin: 'Y',
                elapsedTime: 200,
                equipment: '320',
                marketingAirline: 'AA',
                marketingFlightNumber: 999,
                operatingAirline: 'NK',
                operatingFlightNumber: 867,
                seatsRemaining: 4
            },
            {
                departureAirport: 'DFW',
                departureDateTime: moment('2015-04-30T10:32:00'),
                arrivalAirport: 'MIA',
                arrivalDateTime: moment('2015-04-30T12:45:00'),
                cabin: 'Y',
                elapsedTime: 200,
                equipment: '123',
                marketingAirline: 'DL',
                marketingFlightNumber: 3442,
                operatingAirline: 'NK',
                operatingFlightNumber: 867,
                seatsRemaining: 4
            }
        ]},
        {segments: [
            {
                departureAirport: 'MIA',
                departureDateTime: moment('2015-05-01T20:32:00'),
                arrivalAirport: 'LAX',
                arrivalDateTime: moment('2015-05-01T23:15:00'),
                cabin: 'Y',
                elapsedTime: 300,
                equipment: '320',
                marketingAirline: 'AA',
                marketingFlightNumber: 123,
                operatingAirline: 'DL',
                operatingFlightNumber: 453,
                seatsRemaining: 3
            }
        ]}
    ];

    var itinerariesList = new ItinerariesList();
    itinerariesList.add(sampleItinerary);

    describe('update() method', function () {
        it('itineraries list DOM updated after update() called', function () {
            var itinerariesListWidget = new ItinerariesListWidget();

            itinerariesListWidget.update(itinerariesList);
            var dom = itinerariesListWidget.getCurrentDom();

            expect(dom.children('.SDSItinerariesList').data('totalitineraries')).toBe(1);
            // there is one itinerary
            expect(dom.find('.SDSItinerariesList > .SDSItinerary').size()).toBe(1);
            // itin has 2 legs
            expect(dom.find('.SDSItinerariesList > .SDSItinerary .SDSLeg').size()).toBe(2);

            var firstLegSummary = dom.find('.SDSItinerariesList > .SDSItinerary > .SDSLegList > .SDSLeg:first-child > .SDSLegSummary');
            expect(firstLegSummary.find('> .SDSTravelDate')).toContainText('30');

            expect(firstLegSummary.find('> .SDSDepartureAirport')).toContainText('LAX');
            expect(firstLegSummary.find('> .SDSArrivalAirport')).toContainText('MIA');

            expect(firstLegSummary.find('> .SDSArrivalTime')).toContainText('12:45');

            var secondLegSummary = dom.find('.SDSItinerariesList > .SDSItinerary .SDSLeg:last-child > .SDSLegSummary');
            expect(secondLegSummary.find('> .SDSTravelDate')).toContainText('01');

            expect(secondLegSummary.find('> .SDSDepartureAirport')).toContainText('MIA');
            expect(secondLegSummary.find('> .SDSArrivalAirport')).toContainText('LAX');

            expect(secondLegSummary.find('> .SDSArrivalTime')).toContainText('23:15');

            // first itinerary has 2 flights
            expect(dom.find('.SDSItinerariesList > .SDSItinerary .SDSLeg:first-child > .SDSLegDetails .SDSFlightDetails').size()).toBe(2);

            var firstLegFirstFlightDetails = dom.find('.SDSItinerariesList > .SDSItinerary .SDSLeg:first-child > .SDSLegDetails > .SDSFlight:first-child > .SDSFlightDetails');
            expect(firstLegFirstFlightDetails.find('> .SDSDepartureArrivalDetails:first > .SDSFlightTimeLong')).toContainText('07:32');
            expect(firstLegFirstFlightDetails.find('> .SDSDepartureArrivalDetails:first > .SDSDepartureAirport')).toContainText('LAX');

            expect(firstLegFirstFlightDetails.find('> .SDSDepartureArrivalDetails:last > .SDSFlightTimeLong')).toContainText('09:15');
            expect(firstLegFirstFlightDetails.find('> .SDSDepartureArrivalDetails:last > .SDSArrivalAirport')).toContainText('DFW');

            // prices:
            expect(dom.find('.SDSPriceSummary .SDSTotalPrice')).toContainText(186.2);
            expect(dom.find('.SDSPriceSummary .SDSTotalPrice')).toContainText('USD');
            expect(dom.find('.SDSPriceSummary .SDSBaseFarePrice')).toContainText(132.33);
            expect(dom.find('.SDSPriceSummary .SDSTotalTaxesPrice')).toContainText(39.24);

        });
    });

});
