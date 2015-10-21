define(['moment', 'datamodel/ItinerariesList', 'TestItineraryBuilder'], function (moment, ItinerariesList, TestItineraryBuilder) {
    "use strict";

    describe('get statistics', function () {

        var builder = new TestItineraryBuilder();

        var itineraries = new ItinerariesList();
        itineraries.add(builder.buildSampleItinerary({totalFareAmount: 100, airline: 'AA'}));
        itineraries.add(builder.buildSampleItinerary({totalFareAmount: 200, airline: 'AA'}));
        itineraries.add(builder.buildSampleItinerary({totalFareAmount: 300, airline: 'LH'}));

        // this itinerary is filteredOut and should not be considered in statistics
        var filteredOutItinerary = builder.buildSampleItinerary({totalFareAmount: 50, airline: 'LX'});
        filteredOutItinerary.filteredOut = true;
        itineraries.add(filteredOutItinerary);

        it('range, price', function () {
            expect(itineraries.getRangeStatistics('totalFareAmount').min).toBe(100);
            expect(itineraries.getRangeStatistics('totalFareAmount').max).toBe(300);
        });

        it('discrete values, number of stops', function () {
            expect(itineraries.getDiscreteValuesStatistics('getNumberOfStops').selectableValues.length).toBe(1);
            // there are three itins and all have 1 number of stops (number of stops is the key)
            expect(itineraries.getDiscreteValuesStatistics('getNumberOfStops').selectableValues[0].value).toEqual('1');
            expect(itineraries.getDiscreteValuesStatistics('getNumberOfStops').selectableValues[0].count).toEqual(3);
            expect(itineraries.getDiscreteValuesStatistics('getNumberOfStops').selectableValues[0].minPrice).toEqual(100);
        });

        it('discrete values, first marketing airline', function () {
            // we have two airlines in itins: two items to select
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues.length).toBe(2);
            // AA: 2 options
            // results in selectableValues array are ordered by value (in this case lexicographic sort)
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[0].value).toEqual('AA');
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[0].count).toEqual(2);
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[0].minPrice).toEqual(100);
            // LH: 1 option
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[1].value).toEqual('LH');
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[1].count).toEqual(1);
            expect(itineraries.getDiscreteValuesStatistics('getFirstMarketingAirline').selectableValues[1].minPrice).toEqual(300);
        });

    });

});