define(['Calendar', 'util/exceptions', 'jasmine-jquery', 'util/feature_detection', 'moment', 'util/CurrencyFormatter', 'util/CalendarTestPricesGenerator'],
function(Calendar, ex, JasmineJqueryDummy, browser_features, moment, CurrencyFormatter, testPricesGenerator) {
    "use strict";

    var defaultOptions = {
        year: 2015,
        month: 3,
        lengthOfStay: 14,
        currency: "USD",
        origin: "LAX",
        destination: 'NYC',
        globalPriceCache: {},
        minDate: "2015-01-01" // freeze min date because otherwise it will point to now.
    };

    //TODO how to make sure globally any UT does not make calls to real web service? regardless how any calendar is setup

    // helper function, to run all expectations for a month commonly used. Extracted as function not to repeat the same assertions
    function verifyMarch2015renderedCorrectly(dom) {

        expect(dom.find('td.calendarCell > div.cellWrapper > div.calendarDateNumber').size()).toBe(42); // 31 days in moth + preceding and next months days in same weeks
        expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(31);

        expect(dom).not.toContainHtml('<div class="calendarDateNumber">0</div>');

        expect(dom).toContainElement('td.calendarCell > div.cellWrapper > div.calendarCellPrice');

        // 1nd March 2015 is Sunday, so it should be last <td> in first <tr> (table row, representing a week)
        expect(dom.find('tbody > tr:first-child > td:last-child div.calendarDateNumber')).toContainText(1);

        // 15 March is Sun, in third week
        expect(dom.find('tbody > tr:nth-child(3) > td:nth-child(7) div.calendarDateNumber')).toContainText(15);

        // 30nd March 2015 is Mon, so it should be the first <td> in last <tr> (table row, representing a week)
        expect(dom.find('tbody > tr:last-child > td:first-child div.calendarDateNumber')).toContainText(30);

        expect(dom.find('tbody > tr:nth-child(6) > td:nth-child(2) div.calendarDateNumber')).toContainText(31);
    }

    function verifyApril2015renderedCorrectly(dom) {
        // number of days
        expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(30);

        expect(dom.find('tbody > tr:first-child > td:nth-child(3) .calendarDateNumber')).toContainText(1);
        // 6 Apr: Monday, second row
        expect(dom.find('tbody > tr:nth-child(2) > td:first-child div.calendarDateNumber')).toContainText(6);
        expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) .calendarDateNumber')).toContainText(30);

    }

    function verifyMay2015renderedCorrectly(dom) {
        expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(31);
        // 3 May: Sun, first row
        expect(dom.find('tbody > tr:first-child > td:last-child div.calendarDateNumber')).toContainText(3);
    }

    function verifyFebruary2015renderedCorrectly(dom) {
        expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(28);
        // 3 May: Sun, first row
        expect(dom.find('tbody > tr:first-child > td:last-child div.calendarDateNumber')).toContainText(1);
        expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(6) div.calendarDateNumber')).toContainText(28);
    }

    var en_localizedMonthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    describe('calendar days calculation logic', function() {
        it('days of last week of previous month set correctly', function() {
            var calendar = new Calendar(defaultOptions);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                // toEqual([ 23, 24, 25, 26, 27, 28]);
                expect(dom.find('div.calendarSlot:first-child tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(6);
                expect(dom.find('tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden:first-child > div.cellWrapper > div.calendarDateNumber')).toContainText('23');
                expect(dom.find('tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(6) > div.cellWrapper > div.calendarDateNumber')).toContainText('28');
            });
        });

        it('days of first week of next month set correctly', function() {
            var calendar = new Calendar(defaultOptions);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(5);
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(3) > div.cellWrapper > div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:last-child > div.cellWrapper > div.calendarDateNumber')).toContainText('5');
            });
        });

        it('number of days in month is correct', function () {
            var calendar = new Calendar(defaultOptions, {month: 2});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 1}]);
            calendar.render(function (dom) {
                expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(28);
            });
        });
    });

    describe('calendar creation logic', function () {
        it('invalid options: missing LoS', function () {
            expect(function () {
                new Calendar();
            }).toThrow(new ex.IllegalArgumentException("You have to specify options"));
        });

        it('invalid options: bad currency specification', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "US" // <-- should be USD to be correct
            };
            expect(function () {
                new Calendar(options);
            }).toThrow();
        });

        it('calendar created', function () {
            var calendar = new Calendar(defaultOptions);
            expect(calendar).not.toBeNull();
        });

        it('calendar created when year and month not provided, but departureDate provided', function () {
            var calendar = new Calendar({
                  origin: 'LAX'
                , destination: 'NYC'
                , departureDate: '2015-04-15'
                , arrivalDate: '2015-04-17'
                , currency: "BRL"
            }); // no exception thrown
            expect(calendar).toBeDefined();
        });

        it('arrivalDate cannot be before departure date', function () {
            expect(function () {
                new Calendar({
                          origin: 'LAX'
                        , destination: 'NYC'
                        , departureDate: '2015-04-15'
                        , arrivalDate: '2015-04-14' // <--- 14 Apr before 15 Apr
                        , currency: "BRL"
                    }
                );
            }).toThrow();
        });

    });

        describe('calendar rendering:', function () {

        it('month name displayed correctly: no fail safe for month names', function () {
            var calendar = new Calendar(defaultOptions, {locale: "en-US"});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                expect(dom).toContainElement('caption');
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('caption')).toContainText('March');
                }
            });
        });

        it('month name displayed correctly: no fail safe for month names, other locale supported', function () {
            var calendar = new Calendar(defaultOptions, {
                currency: "BRL",
                year: 2015,
                month: 2,
                locale: "pt-BR" // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
            });
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 1}]);
            calendar.render(function (dom) {
                expect(dom).toContainElement('caption');
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('caption')).toContainText('fevereiro'); // February
                }
            });
        });

        it('month name displayed correctly: fail safe for month name used', function () {
            var localizedMonthNamesFailsafe = [];
            for (var i = 1; i <= 12; i++) {
                localizedMonthNamesFailsafe.push("localizedMonthName" + i);
            }
            var optionsOverrides = {
                localizedMonthNamesFailsafe: localizedMonthNamesFailsafe,
                browser_features: {
                    isIE: function () {
                        return false;
                    },
                    localizedToLocaleStringSupported: function () {
                        return false;
                    }
                }
            };
            var calendar = new Calendar(defaultOptions, optionsOverrides);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                expect(dom.find('caption')).toContainText('localizedMonthName3');
            });
        });

        it('short days of week displayed correctly in header: other locale, fail safe provided', function () {
            var overrides = {
                currency: "BRL",
                locale: "pt-BR", // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
                localizedWeekDayNamesFailsafe: ['1String', '2String', '3String', '4String', '5String', '6String', '7String']
            };
            var calendar = new Calendar(defaultOptions, overrides);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('thead > tr > th:last-child')).toContainText('dom'); // 'dom' is portuguese for Sun
                } else {
                    expect(dom.find('thead > tr > th:last-child')).toContainText('7String');
                }
            });
        });

        it('HTML structure displayed correctly', function () {
            var calendar = new Calendar(defaultOptions);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                verifyMarch2015renderedCorrectly(dom);
            });
        });


        it("when customer points with mouse at the cell, then (if not disabled in options) we highlight this cell and next cells within LoS. Highlight is done by adding class", function () {
            var calendar = new Calendar(defaultOptions);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
            calendar.render(function (dom) {
                var cellFor2ndMarch = dom.find('tbody > tr:nth-child(2) > td:first-child');

                var spyMouseEnterEvent = spyOnEvent(cellFor2ndMarch, 'mouseenter');
                cellFor2ndMarch.mouseenter();
                expect('mouseenter').toHaveBeenTriggeredOn(cellFor2ndMarch);
                expect(spyMouseEnterEvent).toHaveBeenTriggered();

                // verify highlighted
                expect(cellFor2ndMarch).toHaveClass('highlight');
                expect(cellFor2ndMarch.next()).toHaveClass('highlight');

                // verify last cell to highlight is highlighted
                var cellFor15March = cellFor2ndMarch.parent().parent().find('tr:nth-child(3) td').last();
                expect(cellFor15March).toHaveClass('highlight');
                // but not the next one after the last
                var cellFor16March = cellFor2ndMarch.parent().parent().find('tr:nth-child(4) td').first();
                expect(cellFor16March).not.toHaveClass('highlight');
            });
        });
    });

    describe('presenting prices:', function () {
        it('prices are presented on every cell', function () {
            var options = {
                year: 2015,
                month: 4,
                origin: 'LAX',
                destination: 'NYC',
                lengthOfStay: 14,
                currency: "USD",
                locale: "en-US"
            };
            var calendar = new Calendar(options);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 3}]);
            calendar.render(function (dom) {
                var price6Apr = dom.find('tbody tr:nth-child(2) td:first-child div.calendarCellPrice > p');
                var formatter = new CurrencyFormatter(options.locale, options.currency);
                expect(price6Apr).toContainText(formatter.format(600.05));

                var price30Apr = dom.find('tbody tr:nth-child(5) td:nth-child(4) div.calendarCellPrice > p');
                expect(price30Apr).toContainText(formatter.format('3000.05'));
            });
        });
    });

    describe('create request from template:', function () {
        it('actual request arguments present', function () {
            var options = {
                year: 2015,
                month: 4,
                origin: 'DFW',
                destination: 'LAX',
                lengthOfStay: 14,
                optionsPerDay: 1,
                currency: "USD",
                locale: "en-US"
            };

            var calendar = new Calendar(defaultOptions, options);
            var monthBounds = calendar.getMonthBounds(moment({year: options.year, month: options.month - 1}));
            var rqJson = JSON.parse(calendar.createWebServiceRequest(monthBounds));
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DestinationLocation.LocationCode).toEqual('LAX');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].OriginLocation.LocationCode).toEqual('DFW');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.FromDate).toEqual('2015-04-01');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.ToDate).toEqual('2015-04-30');

            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DestinationLocation.LocationCode).toEqual('DFW');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].OriginLocation.LocationCode).toEqual('LAX');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DepartureDates.lengthOfStayOrLengthOfStayRange[0].LengthOfStayRange.MinDays).toEqual('14');
        });

        it ('when LoS not specified explicitly it is calculated from travel dates', function () {
            var options = {
                year: 2015,
                month: 4,
                departureDate: '2015-05-05',
                arrivalDate: '2015-05-07',
                currency: "USD",
                locale: "en-US",
                origin: 'LAX',
                destination: 'NYC'
            };
            var cal = new Calendar(options);
            expect(cal.lengthOfStay).toEqual(2);
        });

        it ('you cannot specify both arrival date and length of stay (LoS)', function () {
            var options = {
                year: 2015,
                month: 4,
                origin: 'DFW',
                destination: 'LAX',
                departureDate: '2015-05-05',
                arrivalDate: '2015-05-06',
                lengthOfStay: 14,
                optionsPerDay: 1,
                currency: "USD",
                locale: "en-US"
            };
            expect(function () {
                new Calendar(options);
            }).toThrow(new ex.IllegalArgumentException("You have to specify lengthOfStay or arrivalDate (and not both)"));
        });
    });

    describe('price tiers added', function () {
        it('1st tier (cheapest) marked for all cells with cheapest price', function () {
            // every Sunday will have cheapest price, every Monday second cheapest, and so on (Saturdays the most expensive)
            var prices = testPricesGenerator.generatePrices([{year: defaultOptions.year, month: defaultOptions.month - 1}], function (date) {
                return date.day() * 100 + 100.05;
            });

            var cal = new Calendar(defaultOptions);
            cal.options.testPrices = prices;
            cal.render(function (dom) {
                // Sun
                expect(dom.find('tbody > tr > td:last-child')).toContainElement('div.calendarCellPrice.tier-1');
                // Mon
                expect(dom.find('tbody > tr:nth-child(2) > td:first-child')).toContainElement('div.calendarCellPrice.tier-2');
                // Sat
                expect(dom.find('tbody > tr:nth-child(2) > td:nth-child(6)')).toContainElement('div.calendarCellPrice.tier-7');
            });
        });
    });

    function verifyPrevAndNextNavLinksPresentedCorrectly(dom) {
        // always true, for any size of calendar:
        expect(dom.find('div.calendarSlot:first-child > table.calendar > caption')).toContainElement('.monthNavigationLink.prev');
        expect(dom.find('div.calendarSlot:last-child > table.calendar > caption')).toContainElement('.monthNavigationLink.next');

        var numberOfMonths = dom.find('div.calendarSlot').size();

        if (numberOfMonths > 1) {
            expect(dom.find('div.calendarSlot:first-child > table.calendar > caption')).not.toContainElement('.monthNavigationLink.next');
            expect(dom.find('div.calendarSlot:last-child > table.calendar > caption')).not.toContainElement('.monthNavigationLink.prev');
        }
        if (numberOfMonths > 2) {
            // only the first month can have prev link - all others cannot have prev link
            expect(dom.find('div.calendarSlot:not(:first-child) > table.calendar > caption')).not.toContainElement('.monthNavigationLink.prev');
            // only the last month can have next link - all others cannot have next link
            expect(dom.find('div.calendarSlot:not(:last-child) > table.calendar > caption')).not.toContainElement('.monthNavigationLink.next');
            // lets choose any one in the middle, for example second - it cannot have prev or next links
            expect(dom.find('div.calendarSlot:nth-child(2) > table.calendar > caption')).not.toContainElement('.monthNavigationLink.prev');
            expect(dom.find('div.calendarSlot:nth-child(2) > table.calendar > caption')).not.toContainElement('.monthNavigationLink.next');
        }
    }

    describe('calendars for multiple months', function () {
        it('three month calendar', function () {
            var cal = new Calendar(defaultOptions, {numberOfMonths: 3}, {localizedMonthNamesFailsafe: en_localizedMonthNames});
            cal.options.testPrices = testPricesGenerator.generatePrices([
                    {year: defaultOptions.year, month: defaultOptions.month - 1},
                    {year: defaultOptions.year, month: defaultOptions.month},
                    {year: defaultOptions.year, month: defaultOptions.month + 1}
                ]
            );
            cal.render(function (dom) {
                verifyMarch2015renderedCorrectly(dom.find('div.calendarSlot:first-child'));
                verifyApril2015renderedCorrectly(dom.find('div.calendarSlot:nth-child(2)'));
                verifyMay2015renderedCorrectly(dom.find('div.calendarSlot:last-child'));
            });
        });
        it('markers of first and last month in sequence', function () {
            var cal = new Calendar(defaultOptions, {numberOfMonths: 3}, {localizedMonthNamesFailsafe: en_localizedMonthNames});
            cal.options.testPrices = testPricesGenerator.generatePrices([
                    {year: defaultOptions.year, month: defaultOptions.month - 1},
                    {year: defaultOptions.year, month: defaultOptions.month},
                    {year: defaultOptions.year, month: defaultOptions.month + 1}
                ]
            );
            cal.render(function (dom) {
                verifyPrevAndNextNavLinksPresentedCorrectly(dom);
            });
        });
    });

    describe('min and max days' , function () {
        it('if departure date month is the same month as min date, and number of months is greater than 1, then present also next months (in quantity of numberOfMonths - 1)', function () {
            //When: we create calendar with min date at beginning of March
            var calendar = new Calendar(defaultOptions, {minDate: "2015-03-01", maxDate: "2015-09-15", numberOfMonths: 2});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {year: 2015, month: 3}, {year: 2015, month: 4}]);
            //Then we should present calendar for March and Apr (numberOfMonths is 2):
            calendar.render(function (dom) {
                expect(dom.find('table.calendar').size()).toBe(2);
                verifyMarch2015renderedCorrectly(dom.find('div.calendarSlot:first-child'));
                verifyApril2015renderedCorrectly(dom.find('div.calendarSlot:nth-child(2)'));
            });
        });

        it('if departure date month is the same month as max date month, and number of months is greater than 1, then present also previous months (in quantity of numberOfMonths - 1)', function () {
            //When: we create calendar with max date to end of March
            var calendar = new Calendar(defaultOptions, {minDate: "2015-01-01", maxDate: "2015-03-31", numberOfMonths: 2});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {year: 2015, month: 3}, {year: 2015, month: 4}]);
            //Then we should present calendar for Feb and March (numberOfMonths is 2):
            calendar.render(function (dom) {
                expect(dom.find('table.calendar').size()).toBe(2);
                verifyFebruary2015renderedCorrectly(dom.find('div.calendarSlot:first-child'));
                verifyMarch2015renderedCorrectly(dom.find('div.calendarSlot:nth-child(2)'));
            });
        });

        it('numberOfMonths requested > 1, while min and max days allow for only one month)', function () {
            //When: we create calendar with min and max dates constraining to March only.
            // Also we request number of months more than one month
            var calendar = new Calendar(defaultOptions, {minDate: "2015-03-01", maxDate: "2015-03-31", numberOfMonths: 2});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {year: 2015, month: 3}, {year: 2015, month: 4}]);
            //Then only one month can be shown (March)
            calendar.render(function (dom) {
                expect(dom.find('table.calendar').size()).toBe(1);
                verifyMarch2015renderedCorrectly(dom);
            });
        });
    });


    describe('Prev and Next buttons', function() {
        it("Next button works", function () {
            // When: we create calendar of one month, for March 2015
            var calendar = new Calendar(defaultOptions);
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {year: 2015, month: 3}, {year: 2015, month: 4}]);
            calendar.render(function (dom) {

                // after Next icon is clicked then Calendar should present April 2015:
                var nextLink = dom.find('div.calendarSlot:first-child > table.calendar > caption > .monthNavigationLink.next');
                var spyOnNextClicked = spyOnEvent(nextLink, 'click');
                // trigger click and verify was clicked
                nextLink.click();
                expect('click').toHaveBeenTriggeredOn(nextLink);
                expect(spyOnNextClicked).toHaveBeenTriggered();
                // verify calendar now shows April 2015
                expect(dom.find('table.calendar').size()).toBe(1);
                verifyApril2015renderedCorrectly(dom.find('table.calendar'));
                verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                // additionally verify after the click HTML structure is still fine - bug with wrapping div.calendarContainer into another one
                expect(dom.find('div.calendarContainer').size()).toBe(1);

                // now, after another click calendar should present May 2015.
                // trigger click
                nextLink = dom.find('div.calendarSlot:first-child > table.calendar > caption > .monthNavigationLink.next');
                nextLink.click();

                // verify calendar now shows May 2015
                expect(dom.find('table.calendar').size()).toBe(1);
                verifyMay2015renderedCorrectly(dom.find('table.calendar'));
                verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                // additionally verify after the click HTML structure is still fine - bug with wrapping div.calendarContainer into another one
                expect(dom.find('div.calendarContainer').size()).toBe(1);
            });
        });

        it("prev button works for 3 months calendar", function () {
            // When: we create calendar of three months, for March-Apr-May 2015
            var calendar = new Calendar(defaultOptions, {numberOfMonths: 3, minDate: "2015-01-01"});
            // let's make sure we have test data for Jan-Feb-Mar-Apr-May
            calendar.options.testPrices = testPricesGenerator.generatePrices([
                {year: 2015, month: 0},
                {year: 2015, month: 1},
                {year: 2015, month: 2},
                {year: 2015, month: 3},
                {year: 2015, month: 4}
            ]);

            calendar.render(function (dom) {
                // trigger click and verify was clicked
                var prevLink = dom.find('div.calendarSlot:first-child > table.calendar > caption > .monthNavigationLink.prev');
                var spyOnNextClicked = spyOnEvent(prevLink, 'click');
                prevLink.click();
                expect('click').toHaveBeenTriggeredOn(prevLink);
                expect(spyOnNextClicked).toHaveBeenTriggered();

                // after Prev icon is clicked then Calendar should show Feb-Mar-Apr
                // has 3 months
                expect(dom.find('table.calendar').size()).toBe(3);
                verifyFebruary2015renderedCorrectly(dom.find('div.calendarSlot:first-child'));
                verifyMarch2015renderedCorrectly(dom.find('div.calendarSlot:nth-child(2)'));
                verifyApril2015renderedCorrectly(dom.find('div.calendarSlot:last-child'));
                verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                // trigger click
                prevLink = dom.find('div.calendarSlot:first-child > table.calendar > caption > .monthNavigationLink.prev');
                prevLink.click();
                // now, after another click calendar should present Jan-Feb-Mar
                expect(dom.find('table.calendar').size()).toBe(3);
                verifyFebruary2015renderedCorrectly(dom.find('div.calendarSlot:nth-child(2)'));
                verifyMarch2015renderedCorrectly(dom.find('div.calendarSlot:last-child'));
            });
        });

        it("Prev inactive when we first calendar already presents first month permitted by minDate", function () {
            var calendar = new Calendar(defaultOptions, {numberOfMonths: 2, minDate: '2015-03-01'});
            calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {year: 2015, month: 3}]);
            calendar.render(function (dom) {
                // prev link inactive
                expect(dom.find('div.calendarSlot:first-child > table.calendar > caption > .monthNavigationLink.prev.inactive').size()).toBe(1);
                // next link active
                expect(dom.find('div.calendarSlot:nth-child(2) > table.calendar > caption > .monthNavigationLink.next:not(.inactive)').size()).toBe(1);
            });
        });

        it("Next inactive on calendar having no prices: we assume that if there are not prices found for given month in the future, then there will be no prices even farther in the future", function () {
            var calendar = new Calendar(defaultOptions, {numberOfMonths: 2, minDate: '2015-01-01'});
            calendar.options.testPrices = testPricesGenerator.generatePrices([
                {year: 2015, month: 2},
                {year: 2015, month: 3, emptyPrices: true}
            ]);
            calendar.render(function (dom) {
                // both months rendered, first has prices, second has no prices:
                expect(dom.find('div.calendarSlot:first-child > table.calendar:not(.noPrices)').size()).toBe(1);
                expect(dom.find('div.calendarSlot:nth-child(2) > table.calendar.noPrices').size()).toBe(1);

                // next link inactive
                expect(dom.find('div.calendarSlot:nth-child(2) > table.calendar > caption > .monthNavigationLink.next.inactive').size()).toBe(1);
            });
        });

    });
});