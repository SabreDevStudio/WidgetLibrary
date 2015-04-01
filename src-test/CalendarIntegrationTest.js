define(['Calendar', 'util/exceptions', 'jasmine-jquery',
    'text!../src-test/fixtures/AdvancedCalendarResponse.json',
    'text!../src-test/fixtures/AdvancedCalendarResponse_404.json'
], function(Calendar, ex, JasmineJqueryDummy,
    responseFixtureOK,
    responseFixture404
) {
    "use strict";

    var defaultOptions = {
        year: 2015,
        month: 4,
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
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarCellPrice p')).toContainText('226.2');

                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarDateNumber')).toContainText('5');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarCellPrice p')).toContainText('206.2');

                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarDateNumber')).toContainText('30');
                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarCellPrice p')).toContainText('186.2');
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
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarCellPrice p')).toContainText('226.2');

                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarDateNumber')).toContainText('5');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarCellPrice p')).toContainText('206.2');

                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarDateNumber')).toContainText('30');
                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarCellPrice p')).toContainText('186.2');
                done();
            });
        });

        it('no data found from web service', function (done) {
            var calendar = new Calendar(defaultOptions);
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixture404);
            };
            calendar.render(function (dom) {
                expect(dom.find('table.calendar:not(.noPrices)').size()).toBe(0);
                expect(dom.find('table.calendar.noPrices').size()).toBe(1);
                done();
            });

        });

    });

    describe('multiple month calendar, one of months gets 404 from web service', function (done) {
        it('other months should render correctly', function (done) {
            var calendar = new Calendar(defaultOptions, {numberOfMonths: 2});

            // Our spy function will return 404 (no options) for the first month and OK (options) for the second month
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                if (request.indexOf('"FromDate": "2015-04-01"') > 0) {
                    responseProcessingFn(undefined, responseFixture404);
                }  else if (request.indexOf('"FromDate": "2015-05-01"') > 0) {
                    responseProcessingFn(undefined, responseFixtureOK);
                }
            };

            calendar.render(function (dom) {
                // first month: no options
                expect(dom.find('div.calendarSlot:first-child')).toContainElement('table.calendar.noPrices');
                expect(dom.find('div.calendarSlot:first-child')).not.toContainElement('table.calendar:not(.noPrices)');
                // second month: options present
                expect(dom.find('div.calendarSlot:last-child')).not.toContainElement('table.calendar.noPrices');
                expect(dom.find('div.calendarSlot:last-child')).toContainElement('table.calendar:not(.noPrices)');
                done();
            });
        });
    });

    describe('global cache reused across calendar instances', function () {
        it('global cache reused', function (done) {
            var globalPriceCache = {};
            // Given:
            // create first calendar, and make it get data from test fixture.
            var calendar1 = new Calendar(defaultOptions, {globalPriceCache: globalPriceCache});
            calendar1.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixtureOK);
            };
            // When:
            // Render first calendar to make it take data from datasource (which will also populate the global cache):
            calendar1.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarCellPrice p')).toContainText('226.2');
            });

            // Then:
            // The other calendar should use data from the cache and NOT make call to the datasource
            var calendar2 = new Calendar(defaultOptions, {globalPriceCache: globalPriceCache});
            var spy = spyOn(calendar2, 'dataSourceFetchFn').and.callFake(function (request, responseProcessingFn) { // our data source spy has to call the callback so that rendering continues (our assertions are within the client callback called after rendering finishes. Otherwise they will not be executed and we get async test timeout error).
                    responseProcessingFn(undefined, responseFixtureOK);
                });

            calendar2.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarCellPrice p')).toContainText('226.2');

                // Then: the actual test assertion:
                expect(spy).not.toHaveBeenCalled();
                done();
            });
        });
    });
});