define(['widgets/calendar/CalendarWidget', 'util/exceptions', 'jasmine-jquery',
    'text!../../widgets/calendar/fixtures/AdvancedCalendarResponse_OK_Apr2015.json',
    'text!../../widgets/calendar/fixtures/AdvancedCalendarResponse_404.json',
    'text!../../widgets/calendar/fixtures/AdvancedCalendarResponse_OK_multiple_months.json',
    'datamodel/ShoppingData'
], function(Calendar, ex, JasmineJqueryDummy,
    responseFixture_OK_Apr2015,
    responseFixture404,
    responseFixtureOKMultipleMonths,
    ShoppingData
) {
    "use strict";

    var defaultOptions = {
        year: 2015,
        month: 3,
        optionsPerDay: 1,
        currency: "USD",
        locale: "en-US",
        currentDate: '2015-01-01'
    };

    var defaultCustomerSearchCriteria = {
        origin: 'DFW',
        destination: 'LAX',
        departureDate: '2015-04-05',
        returnDate: '2015-04-06'
    };

    function createWebServiceMock(responseFixture) {
        return {
            sendRequest: function (requestOptions, responseProcessingFn) {
                responseProcessingFn(undefined, JSON.parse(responseFixture));
            },
            maxRequestedTravelOutboundDate: function () {
                return undefined;
            }
        }
    }

    function verifyApr2015DisplayedCorrectly(dom) {
        expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarDateNumber')).toContainText('1');
        expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarCellPrice')).toContainText('226.2');

        expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarDateNumber')).toContainText('5');
        expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarCellPrice')).toContainText('206.2');

        expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarDateNumber')).toContainText('30');
        expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarCellPrice')).toContainText('186.2');
    }

    describe('integration test:', function () {

        it('prices extracted from web service and presented on every cell', function (done) {
            var calendar = new Calendar(defaultOptions, {
                webService: createWebServiceMock(responseFixture_OK_Apr2015)
            });
            calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                verifyApr2015DisplayedCorrectly(dom);
                done();
            });
        });

        it('no data found from web service', function (done) {
            var calendar = new Calendar(defaultOptions, {
                webService: createWebServiceMock(responseFixture404)
            });
            calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                expect(dom.find('table.SDSCalendar:not(.SDSNoPrices)').size()).toBe(0);
                expect(dom.find('table.SDSCalendar.SDSNoPrices').size()).toBe(1);
                done();
            });
        });
    });

    describe('multiple month SDSCalendar, for one month there are no options from web service', function () {
        it('other months should render correctly', function (done) {
            var calendar = new Calendar(defaultOptions, {
                  tabs: 2
                , webService:createWebServiceMock(responseFixture_OK_Apr2015) // this fixture contains prices for Apr 2015 only
            });

            calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                verifyApr2015DisplayedCorrectly(dom);
                // May: no options
                expect(dom.find('div.SDSCalendarSlot:last-child')).toContainElement('table.SDSCalendar.SDSNoPrices');
                expect(dom.find('div.SDSCalendarSlot:last-child')).not.toContainElement('table.SDSCalendar:not(.SDSNoPrices)');
                done();
            });
        });
    });

    describe('global cache reused across SDSCalendar instances', function () {
        it('global cache reused', function (done) {
            var globalPriceCache = new ShoppingData();
            var webServiceMock = createWebServiceMock(responseFixture_OK_Apr2015);
            // Given:
            // create first Calendar, and make it use global cache
            var calendar1 = new Calendar(defaultOptions, {
                  globalOptionsCache: globalPriceCache
                , webService: webServiceMock
            });

            // When:
            // Render first SDSCalendar to make it take data from (mocked) webservice, which will also populate the global cache:
            calendar1.newSearch(defaultCustomerSearchCriteria, function (dom) {
                verifyApr2015DisplayedCorrectly(dom);
            });

            // Then:
            // The other Calendar should use data from the cache and NOT make call to the datasource
            var calendar2 = new Calendar(defaultOptions, {
                  globalOptionsCache: globalPriceCache
                , webService: webServiceMock
            });
            var spy = spyOn(webServiceMock, 'sendRequest').and.callFake(webServiceMock.sendRequest); // our data source spy has to call the callback so that rendering continues (our assertions are within the client callback called after rendering finishes. Otherwise they will not be executed and we get async test timeout error).

            calendar2.newSearch(defaultCustomerSearchCriteria, function (dom) {
                verifyApr2015DisplayedCorrectly(dom);
            });

            // Then: the actual test assertion:
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    describe('calendarCellClicked event', function () {
        it("itinerary passed to registered event handler", function (done) {
            var calendar = new Calendar(defaultOptions, {
                webService: createWebServiceMock(responseFixture_OK_Apr2015)
            });

            // When: subscribe to the calendarCellClicked event
            var eventHandlerSpy = jasmine.createSpy('spy');
            calendar.bind('calendarCellClicked', eventHandlerSpy);

            calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                // When: calendar rendered and when calendar cell is clicked:
                // select any calendar cell: 30th Apr 2015
                var calendarCell = dom.find('.SDSCalendarSlot:first-of-type > .SDSCalendar > tbody > tr:nth-child(5) > td:nth-child(4)');

                calendarCell.click();

                // Then: expect event handler to be called, and passed itinerary
                expect(eventHandlerSpy).toHaveBeenCalled();
                var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
                expect(argsPassedToEventHandler.length).toBe(1); // only one ItinerariesList passed
                var itinerariesListPassed = argsPassedToEventHandler[0];
                expect(itinerariesListPassed.size()).toBe(1); // the ItinerariesList passed has one element
                expect(itinerariesListPassed.getItineraries()[0].totalFareAmount).toBeDefined(); // check passed itinerary contains any property defined for itinerary
                done();
            });
        });
    });

    describe('new search', function () {
        it('one month search, no tabs', function (done) {
            var calendar = new Calendar(defaultOptions, {
                webService: createWebServiceMock(responseFixture_OK_Apr2015)
            });
            calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                verifyApr2015DisplayedCorrectly(dom);
                done();
            });
        });
    });

});