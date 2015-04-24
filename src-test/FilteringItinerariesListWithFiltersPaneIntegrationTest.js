define(['ItinerariesListWidget', 'FiltersPaneWidget', 'moment', 'jasmine-jquery', 'datamodel/Itinerary', 'datamodel/ItinerariesList', 'datamodel/TestItineraryBuilder'],
    function(ItinerariesListWidget, FiltersPaneWidget, moment, JasmineJqueryDummy, Itinerary, ItinerariesList, TestItineraryBuilder) {
    "use strict";

    describe('filtering applied to itineraries list widget', function () {

        var builder = new TestItineraryBuilder();

        var itinerariesList = new ItinerariesList();

        itinerariesList.add(builder.buildSampleItinerary({totalFareAmount: 100, airline: 'AA'}));
        itinerariesList.add(builder.buildSampleItinerary({totalFareAmount: 200, airline: 'AA'}));
        itinerariesList.add(builder.buildSampleItinerary({totalFareAmount: 100, airline: 'LH'}));
        itinerariesList.add(builder.buildSampleItinerary({totalFareAmount: 150, airline: 'LH'}));
        itinerariesList.add(builder.buildSampleItinerary({totalFareAmount: 300, airline: 'LH'}));

        var itinerariesListWidget = new ItinerariesListWidget();

        var filtersPaneWidget = new FiltersPaneWidget();

        itinerariesListWidget.addFilterWidget(filtersPaneWidget);

        itinerariesListWidget.update(itinerariesList);

        it('initially no options are filtered out', function () {
            // initially all itin are shown: all 5 itineraries
            expect(itinerariesListWidget.getItineraries(true).length).toBe(5);
            itinerariesListWidget.render(function (dom) {
                // initially all itin are shown: all 5 itineraries
                expect(dom.find('.SDSItinerariesList > .SDSItinerary').size()).toBe(5);
            });
        });

        it('check filters initial state: should reflect current itineraries of the ItineraryListWidget', function () {
            filtersPaneWidget.render(function (dom) {
                // price filter
                var priceFilterDOM = dom.find('.SDSRangeFilter[data-filterablepropertyname="totalFareAmount"]');
                expect(priceFilterDOM.find('.SDSRangeFilterCurrentValueMin')).toContainText('100');
                expect(priceFilterDOM.find('.SDSRangeFilterCurrentValueMax')).toContainText('300');

                var numberOfStopsFilterDOM = dom.find('.SDSDiscreteValuesFilter[data-filterablepropertyname="getNumberOfStops"]');
                // all itineraries have one stop: so one item to filter:
                expect(numberOfStopsFilterDOM.find('.SDSMultipleSelectionItem').size()).toBe(1);
                var numberOfStopsSelectionItem = numberOfStopsFilterDOM.find('.SDSMultipleSelectionItem');
                // all itineraries have one stop
                expect(numberOfStopsSelectionItem.find('.SDSMultipleSelectionItemValue')).toContainText('1');
                // there are 5 itineraries in total
                expect(numberOfStopsSelectionItem.find('.SDSMultipleSelectionItemCount')).toContainText(5);

                var airlinesFilterDOM = dom.find('.SDSDiscreteValuesFilter[data-filterablepropertyname="getFirstMarketingAirline"]');
                // there are two airlines to select presented
                expect(airlinesFilterDOM.find('.SDSMultipleSelectionItem').size()).toBe(2);

                var firstAirline = airlinesFilterDOM.find('.SDSMultipleSelectionItem:first-child');
                expect(firstAirline.find('.SDSMultipleSelectionItemValue')).toContainText('AA');
                expect(firstAirline.find('.SDSMultipleSelectionItemCount')).toContainText(2);

                var secondAirline = airlinesFilterDOM.find('.SDSMultipleSelectionItem:nth-child(2)');
                expect(secondAirline.find('.SDSMultipleSelectionItemValue')).toContainText('LH');
                expect(secondAirline.find('.SDSMultipleSelectionItemCount')).toContainText(3);
            });
        });
        //TODO: in Protractor?
    });

});

