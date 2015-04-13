define(['Calendar', 'util/exceptions', 'jasmine-jquery',
    'text!../src-test/fixtures/AdvancedCalendarResponse.json',
    'text!../src-test/fixtures/AdvancedCalendarResponse_404.json',
    'text!../src-test/fixtures/AdvancedCalendarResponse_OK_multiple_months.json',
    'datamodel/ShoppingData'
], function(Calendar, ex, JasmineJqueryDummy,
    responseFixtureOK,
    responseFixture404,
    responseFixtureOKMultipleMonths,
    ShoppingData
) {
    "use strict";

    var defaultOptions = {
        year: 2015,
        month: 3,
        origin: 'DFW',
        destination: 'LAX',
        departureDate: '2015-05-05',
        arrivalDate: '2015-05-06',
        optionsPerDay: 1,
        currency: "USD",
        locale: "en-US"
    };

    describe('integration test:', function (done) {

        it('prices extracted from web service and presented on every cell', function (done) {
            var calendar = new Calendar(defaultOptions);
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixtureOK);
            };

            calendar.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarCellPrice')).toContainText('226.2');

                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarDateNumber')).toContainText('5');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarCellPrice')).toContainText('206.2');

                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarDateNumber')).toContainText('30');
                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarCellPrice')).toContainText('186.2');
                done();
            });
        });

        it('prices extracted from web service and presented on every cell: simulate time to fetch data', function (done) { // to spot errors on not proper async communication handling
            var calendar = new Calendar(defaultOptions);
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                setTimeout(function () {
                    responseProcessingFn(undefined, responseFixtureOK);
                }, 100);
            };

            calendar.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarCellPrice')).toContainText('226.2');

                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarDateNumber')).toContainText('5');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.SDSCalendarCellPrice')).toContainText('206.2');

                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarDateNumber')).toContainText('30');
                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.SDSCalendarCellPrice')).toContainText('186.2');
                done();
            });
        });

        it('no data found from web service', function (done) {
            var calendar = new Calendar(defaultOptions);
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixture404);
            };
            calendar.render(function (dom) {
                expect(dom.find('table.SDSCalendar:not(.SDSNoPrices)').size()).toBe(0);
                expect(dom.find('table.SDSCalendar.SDSNoPrices').size()).toBe(1);
                done();
            });

        });

    });

    describe('multiple month SDSCalendar, for one month there are no options from web service', function (done) {
        it('other months should render correctly', function (done) {
            var calendar = new Calendar(defaultOptions, {numberOfMonths: 2});

            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                    responseProcessingFn(undefined, responseFixtureOK); // this fixture contains prices for Apr 2015 only
            };

            calendar.render(function (dom) {
                // Apr: options present
                expect(dom.find('div.SDSCalendarSlot:first-child')).not.toContainElement('table.SDSCalendar.SDSNoPrices');
                expect(dom.find('div.SDSCalendarSlot:first-child')).toContainElement('table.SDSCalendar:not(.SDSNoPrices)');
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
            // Given:
            // create first SDSCalendar, and make it get data from test fixture.
            var calendar1 = new Calendar(defaultOptions, {globalOptionsCache: globalPriceCache});
            calendar1.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixtureOK);
            };
            // When:
            // Render first SDSCalendar to make it take data from datasource (which will also populate the global cache):
            calendar1.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarCellPrice')).toContainText('226.2');
            });

            // Then:
            // The other SDSCalendar should use data from the cache and NOT make call to the datasource
            var calendar2 = new Calendar(defaultOptions, {globalOptionsCache: globalPriceCache});
            var spy = spyOn(calendar2, 'dataSourceFetchFn').and.callFake(function (request, responseProcessingFn) { // our data source spy has to call the callback so that rendering continues (our assertions are within the client callback called after rendering finishes. Otherwise they will not be executed and we get async test timeout error).
                    responseProcessingFn(undefined, responseFixtureOK);
                });

            calendar2.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.SDSCalendarCellPrice')).toContainText('226.2');

                // Then: the actual test assertion:
                expect(spy).not.toHaveBeenCalled();
                done();
            });
        });
    });

    describe('calendarCellClicked event', function () {
        it("itinerary passed to registered event handler", function (done) {
            var calendar = new Calendar({
                year: 2015,
                month: 3, // Apr
                origin: 'DFW',
                destination: 'LAX',
                lengthOfStay: 1,
                currency: 'USD'
            });
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixtureOK);
            };
            // When: subscribe to the calendarCellClicked event
            var eventHandlerSpy = jasmine.createSpy('spy');
            calendar.bind('calendarCellClicked', eventHandlerSpy);

            calendar.render(function (dom) {
                // When: calendar rendered and when calendar cell is clicked:
                // select any calendar cell: 30th Apr 2015
                var calendarCell = dom.find('.SDSCalendarSlot:first-of-type > .SDSCalendar > tbody > tr:nth-child(5) > td:nth-child(4)');

                calendarCell.click();

                // Then: expect event handler to be called, and passed itinerary
                expect(eventHandlerSpy).toHaveBeenCalled();
                var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
                expect(argsPassedToEventHandler.length).toBe(1); // only one itineraries array passed
                expect(argsPassedToEventHandler[0].length).toBe(1); // the itinerary array passed is one element array
                expect(argsPassedToEventHandler[0][0].totalFareAmount).toBeDefined(); // check passed itinerary contains any property defined for itinerary
                done();
            });
        });
    });

});