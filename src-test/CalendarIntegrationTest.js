define(['Calendar', 'util/exceptions', 'jasmine-jquery',
    'text!../src-test/fixtures/AdvancedCalendarResponse.json'
], function(Calendar, ex, JasmineJqueryDummy,
    responseFixture
) {
    "use strict";

    describe('integration test:', function () {
        it('prices extracted from web service and presented on every cell', function (done) {
            var options = {
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
            var calendar = new Calendar(options);
            calendar.dataSourceFetchFn = function (request, responseProcessingFn) {
                responseProcessingFn(undefined, responseFixture);
            };

            calendar.render(function (dom) {
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(3) div.calendarCellPrice p')).toContainText('226.2');

                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarDateNumber')).toContainText('5');
                expect(dom.find('tbody > tr:nth-child(1) > td:nth-child(7) div.calendarCellPrice p')).toContainText('206.2');

                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarDateNumber')).toContainText('30');
                expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) div.calendarCellPrice p')).toContainText('186.2');

                // the cheapest price is for

                done();
            });
        });
    });
});