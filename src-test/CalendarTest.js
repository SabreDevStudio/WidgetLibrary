define(['Calendar', 'util/exceptions', 'jasmine-jquery', 'util/feature_detection', 'moment', 'util/currencyFormatter', 'util/DateFormatter', 'util/CalendarTestPricesGenerator', 'datamodel/ShoppingData'],
    function (Calendar, ex, JasmineJqueryDummy, browser_features, moment, CurrencyFormatter, DateFormatter, testPricesGenerator, ShoppingData) {
        "use strict";

        var defaultOptions = {
            year: 2015,
            month: 2, // March
            lengthOfStay: 14,
            currency: "USD",
            origin: "LAX",
            destination: 'NYC',
            globalOptionsCache: new ShoppingData(), //TODO: exposing this in interface?!
            currentDate: "2015-01-01" // freeze current date so that test are not dependent on current time
        };


        //TODO make sure globally that UT does not make calls to real web service: mock communication function and make it report errors when called

        // helper function, to run all expectations for a month commonly used. Extracted as function not to repeat the same assertions
        function verifyMarch2015renderedCorrectly(dom) {

            expect(dom.find('td.SDSCalendarCell > div.SDSCalendarDateNumber').size()).toBe(42); // 31 days in moth + preceding and next months days in same weeks
            expect(dom.find('td.SDSCalendarCell:not(.SDSCalendarPrevOrNextMonthDay) > div.SDSCalendarDateNumber').size()).toBe(31);

            expect(dom).not.toContainHtml('<div class="SDSCalendarDateNumber">0</div>');

            expect(dom).toContainElement('td.SDSCalendarCell > div.SDSCalendarCellPrice');

            // 1nd March 2015 is Sunday, so it should be last <td> in first <tr> (table row, representing a week)
            expect(dom.find('tbody > tr:first-child > td:last-child div.SDSCalendarDateNumber')).toContainText(1);

            // 15 March is Sun, in third week
            expect(dom.find('tbody > tr:nth-child(3) > td:nth-child(7) div.SDSCalendarDateNumber')).toContainText(15);

            // 30nd March 2015 is Mon, so it should be the first <td> in last <tr> (table row, representing a week)
            expect(dom.find('tbody > tr:last-child > td:first-child div.SDSCalendarDateNumber')).toContainText(30);

            expect(dom.find('tbody > tr:nth-child(6) > td:nth-child(2) div.SDSCalendarDateNumber')).toContainText(31);
        }

        function verifyApril2015renderedCorrectly(dom) {
            // number of days
            expect(dom.find('td.SDSCalendarCell:not(.SDSCalendarPrevOrNextMonthDay) > div.SDSCalendarDateNumber').size()).toBe(30);

            expect(dom.find('tbody > tr:first-child > td:nth-child(3) .SDSCalendarDateNumber')).toContainText(1);
            // 6 Apr: Monday, second row
            expect(dom.find('tbody > tr:nth-child(2) > td:first-child div.SDSCalendarDateNumber')).toContainText(6);
            expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(4) .SDSCalendarDateNumber')).toContainText(30);

        }

        function verifyMay2015renderedCorrectly(dom) {
            expect(dom.find('td.SDSCalendarCell:not(.SDSCalendarPrevOrNextMonthDay) > div.SDSCalendarDateNumber').size()).toBe(31);
            // 3 May: Sun, first row
            expect(dom.find('tbody > tr:first-child > td:last-child div.SDSCalendarDateNumber')).toContainText(3);
        }

        function verifyFebruary2015renderedCorrectly(dom) {
            expect(dom.find('td.SDSCalendarCell:not(.SDSCalendarPrevOrNextMonthDay) > div.SDSCalendarDateNumber').size()).toBe(28);
            // 3 May: Sun, first row
            expect(dom.find('tbody > tr:first-child > td:last-child div.SDSCalendarDateNumber')).toContainText(1);
            expect(dom.find('tbody > tr:nth-child(5) > td:nth-child(6) div.SDSCalendarDateNumber')).toContainText(28);
        }

        var en_localizedMonthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        describe('calendar days calculation logic', function () {
            it('days of last week of previous month set correctly', function () {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
                calendar.render(function (dom) {
                    // toEqual([ 23, 24, 25, 26, 27, 28]);
                    expect(dom.find('div.SDSCalendarSlot:first-child tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden').size()).toBe(6);
                    expect(dom.find('tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:first-child > div.SDSCalendarDateNumber')).toContainText('23');
                    expect(dom.find('tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:nth-child(6) > div.SDSCalendarDateNumber')).toContainText('28');
                });
            });

            it('days of first week of next month set correctly', function () {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
                calendar.render(function (dom) {
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden').size()).toBe(5);
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:nth-child(3) > div.SDSCalendarDateNumber')).toContainText('1');
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:last-child > div.SDSCalendarDateNumber')).toContainText('5');
                });
            });

            it('number of days in month is correct', function () {
                var calendar = new Calendar(defaultOptions, {month: 1});
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 1}]);
                calendar.render(function (dom) {
                    expect(dom.find('td.SDSCalendarCell:not(.SDSCalendarPrevOrNextMonthDay) > div.SDSCalendarDateNumber').size()).toBe(28);
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
                    month: 2,
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
                    , currentDate: '2015-01-01'
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
                            , currentDate: '2015-01-01'
                            , currency: "BRL"
                        }
                    );
                }).toThrow();
            });

        });

        describe('calendar rendering:', function () {

            it('HTML structure displayed correctly', function () {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}]);
                calendar.render(function (dom) {
                    expect(dom).toContainElement('caption');
                    expect(dom.find('table.SDSCalendar').data('month')).toEqual(2);
                    expect(dom.find('table.SDSCalendar').data('year')).toEqual(2015);
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
                    // the length of stay is 14 days, and the rule is that we highlight departure date + length od stay days (including return date): so the number of highlighted days is the length of stay + 1
                    expect(cellFor2ndMarch).toHaveClass('SDSHighlight');
                    expect(cellFor2ndMarch.next()).toHaveClass('SDSHighlight');

                    // verify last cell to highlight is highlighted
                    var cellFor16March = cellFor2ndMarch.parent().parent().find('tr:nth-child(4) td:first-child()');
                    expect(cellFor16March).toHaveClass('SDSHighlight');
                    // but not the next one after the last
                    var cellFor17March = cellFor2ndMarch.parent().parent().find('tr:nth-child(4) td:nth-child(2)');
                    expect(cellFor17March).not.toHaveClass('SDSHighlight');
                });
            });
        });

        describe('presenting prices:', function () {
            it('prices are presented on every cell', function () {
                var options = {
                    year: 2015,
                    month: 3,
                    origin: 'LAX',
                    destination: 'NYC',
                    lengthOfStay: 14,
                    currency: "USD",
                    locale: "en-US",
                    currentDate: '2015-01-01'
                };
                var calendar = new Calendar(options);
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 3}]);
                calendar.render(function (dom) {
                    var price6Apr = dom.find('tbody tr:nth-child(2) td:first-child div.SDSCalendarCellPrice');
                    var formatter = new CurrencyFormatter({locale: options.locale, currency: options.currency});
                    expect(price6Apr).toContainText(formatter.format(600.05));

                    var price30Apr = dom.find('tbody tr:nth-child(5) td:nth-child(4) div.SDSCalendarCellPrice');
                    expect(price30Apr).toContainText(formatter.format('3000.05'));
                });
            });
        });

        describe('create request from template:', function () {
            it('actual request arguments present', function () {
                var options = {
                    year: 2015,
                    month: 3,
                    origin: 'DFW',
                    destination: 'LAX',
                    lengthOfStay: 14,
                    optionsPerDay: 1,
                    currency: "USD",
                    locale: "en-US"
                };

                var calendar = new Calendar(defaultOptions, options);
                var thisMonth = moment({year: options.year, month: options.month});
                var rqJson = JSON.parse(calendar.createWebServiceRequest(thisMonth, thisMonth));
                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DestinationLocation.LocationCode).toEqual('LAX');
                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].OriginLocation.LocationCode).toEqual('DFW');
                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.FromDate).toEqual('2015-04-01');
                // we set ToDate to 192 days plus start date (max number of days we have in the service)
                //expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.ToDate).toEqual('2015-04-30');

                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DestinationLocation.LocationCode).toEqual('DFW');
                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].OriginLocation.LocationCode).toEqual('LAX');
                expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DepartureDates.lengthOfStayOrLengthOfStayRange[0].LengthOfStayRange.MinDays).toEqual('14');
            });

            it('when LoS not specified explicitly it is calculated from travel dates', function () {
                var options = {
                    year: 2015,
                    month: 3,
                    departureDate: '2015-05-05',
                    arrivalDate: '2015-05-07',
                    currency: "USD",
                    locale: "en-US",
                    origin: 'LAX',
                    destination: 'NYC',
                    currentDate: '2015-01-01'
                };
                var cal = new Calendar(options);
                expect(cal.lengthOfStay).toEqual(2);
            });

            it('you cannot specify both arrival date and length of stay (LoS)', function () {
                var options = {
                    year: 2015,
                    month: 3,
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
                var prices = testPricesGenerator.generatePrices([{
                    year: defaultOptions.year,
                    month: defaultOptions.month
                }], function (date) {
                    return date.day() * 100 + 100.05;
                });

                var cal = new Calendar(defaultOptions);
                cal.options.testPrices = prices;
                cal.render(function (dom) {
                    // Sun
                    expect(dom.find('tbody > tr > td:last-child')).toContainElement('div.SDSCalendarCellPrice.SDSPriceTier-1');
                    // Mon
                    expect(dom.find('tbody > tr:nth-child(2) > td:first-child')).toContainElement('div.SDSCalendarCellPrice.SDSPriceTier-2');
                    // Sat
                    expect(dom.find('tbody > tr:nth-child(2) > td:nth-child(6)')).toContainElement('div.SDSCalendarCellPrice.SDSPriceTier-7');
                });
            });
        });

        function verifyPrevAndNextNavLinksPresentedCorrectly(dom) {
            // always true, for any size of calendar:
            expect(dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption')).toContainElement('.SDSNavigationLink.SDSPrev');
            expect(dom.find('div.SDSCalendarSlot:last-child > table.SDSCalendar > caption')).toContainElement('.SDSNavigationLink.SDSNext');

            var numberOfMonths = dom.find('div.SDSCalendarSlot').size();

            if (numberOfMonths > 1) {
                expect(dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSNext');
                expect(dom.find('div.SDSCalendarSlot:last-child > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSPrev');
            }
            if (numberOfMonths > 2) {
                // only the first month can have prev link - all others cannot have prev link
                expect(dom.find('div.SDSCalendarSlot:not(:first-child) > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSPrev');
                // only the last month can have next link - all others cannot have next link
                expect(dom.find('div.SDSCalendarSlot:not(:last-child) > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSNext');
                // lets choose any one in the middle, for example second - it cannot have prev or next links
                expect(dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSPrev');
                expect(dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar > caption')).not.toContainElement('.SDSNavigationLink.SDSNext');
            }
        }

        describe('calendars for multiple months', function () {
            it('three month calendar', function () {
                var cal = new Calendar(defaultOptions, {numberOfMonths: 3}, {localizedMonthNamesFailsafe: en_localizedMonthNames});
                cal.options.testPrices = testPricesGenerator.generatePrices([
                        {year: defaultOptions.year, month: defaultOptions.month},
                        {year: defaultOptions.year, month: defaultOptions.month + 1},
                        {year: defaultOptions.year, month: defaultOptions.month + 2}
                    ]
                );
                cal.render(function (dom) {
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                    verifyMay2015renderedCorrectly(dom.find('div.SDSCalendarSlot:last-child'));
                });
            });
            it('markers of first and last month in sequence', function () {
                var cal = new Calendar(defaultOptions, {numberOfMonths: 3}, {localizedMonthNamesFailsafe: en_localizedMonthNames});
                cal.options.testPrices = testPricesGenerator.generatePrices([
                        {year: defaultOptions.year, month: defaultOptions.month},
                        {year: defaultOptions.year, month: defaultOptions.month + 1},
                        {year: defaultOptions.year, month: defaultOptions.month + 2}
                    ]
                );
                cal.render(function (dom) {
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);
                });
            });
        });

        describe('min and max days', function () {
            it('if departure date month is the same month as min date, and number of months is greater than 1, then present also next months (in quantity of numberOfMonths - 1)', function () {
                //When: we create calendar with min date at beginning of March
                var calendar = new Calendar(defaultOptions, {
                    minDate: "2015-03-01",
                    maxDate: "2015-06-15",
                    numberOfMonths: 2
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {
                    year: 2015,
                    month: 3
                }, {year: 2015, month: 4}]);
                //Then we should present calendar for March and Apr (numberOfMonths is 2):
                calendar.render(function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(2);
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                });
            });

            it('if departure date month is the same month as max date month, and number of months is greater than 1, then present also previous months (in quantity of numberOfMonths - 1)', function () {
                //When: we create calendar with max date to end of March
                var calendar = new Calendar(defaultOptions, { // calendar is requested for Mar
                    minDate: "2015-01-01",
                    maxDate: "2015-03-31",
                    numberOfMonths: 2
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([
                    {year: 2015, month: 0},
                    {year: 2015, month: 1},
                    {year: 2015, month: 2},
                ]);
                //Then we should present calendar Feb and March (numberOfMonths is 2):
                calendar.render(function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(2);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                });
            });

            it('numberOfMonths requested > 1, while min and max days allow for only one month)', function () {
                //When: we create calendar with min and max dates constraining to March only.
                // Also we request number of months more than one month
                var calendar = new Calendar(defaultOptions, {
                    minDate: "2015-03-01",
                    maxDate: "2015-03-31",
                    numberOfMonths: 2
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {
                    year: 2015,
                    month: 3
                }, {year: 2015, month: 4}]);
                //Then only one month can be shown (March)
                calendar.render(function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(1);
                    verifyMarch2015renderedCorrectly(dom);
                });
            });
        });


        describe('Prev and Next buttons', function () {
            it("Next button works", function () {
                // When: we create calendar of one month, for March 2015
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {
                    year: 2015,
                    month: 3
                }, {year: 2015, month: 4}]);
                calendar.render(function (dom) {

                    // after Next icon is clicked then Calendar should present April 2015:
                    var nextLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext');
                    var spyOnNextClicked = spyOnEvent(nextLink, 'click');
                    // trigger click and verify was clicked
                    nextLink.click();
                    expect('click').toHaveBeenTriggeredOn(nextLink);
                    expect(spyOnNextClicked).toHaveBeenTriggered();
                    // verify calendar now shows April 2015
                    expect(dom.find('table.SDSCalendar').size()).toBe(1);
                    verifyApril2015renderedCorrectly(dom.find('table.SDSCalendar'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // additionally verify after the click HTML structure is still fine - the bug with wrapping div.SDSCalendarContainer into another one
                    expect(dom.find('div.SDSCalendarContainer').addBack().size()).toBe(1);

                    // now, after another click calendar should present May 2015.
                    // trigger click
                    nextLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext');
                    nextLink.click();

                    // verify calendar now shows May 2015
                    expect(dom.find('table.SDSCalendar').size()).toBe(1);
                    verifyMay2015renderedCorrectly(dom.find('table.SDSCalendar'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // additionally verify after the click HTML structure is still fine - bug with wrapping div.SDSCalendarContainer into another one
                    expect(dom.find('div.SDSCalendarContainer').addBack().size()).toBe(1);
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
                    var prevLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev');
                    var spyOnNextClicked = spyOnEvent(prevLink, 'click');
                    prevLink.click();
                    expect('click').toHaveBeenTriggeredOn(prevLink);
                    expect(spyOnNextClicked).toHaveBeenTriggered();

                    // after Prev icon is clicked then Calendar should show Feb-Mar-Apr
                    // has 3 months
                    expect(dom.find('table.SDSCalendar').size()).toBe(3);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:last-child'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // trigger click
                    prevLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev');
                    prevLink.click();
                    // now, after another click calendar should present Jan-Feb-Mar
                    expect(dom.find('table.SDSCalendar').size()).toBe(3);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:last-child'));
                });
            });

            it("Prev inactive when we first calendar already presents first month permitted by minDate", function () {
                var calendar = new Calendar(defaultOptions, {numberOfMonths: 2, minDate: '2015-03-01'});
                calendar.options.testPrices = testPricesGenerator.generatePrices([{year: 2015, month: 2}, {
                    year: 2015,
                    month: 3
                }]);
                calendar.render(function (dom) {
                    // prev link inactive
                    expect(dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev.SDSInactive').size()).toBe(1);
                    // next link active
                    expect(dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext:not(.SDSInactive)').size()).toBe(1);
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
                    expect(dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar:not(.SDSNoPrices)').size()).toBe(1);
                    expect(dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar.SDSNoPrices').size()).toBe(1);

                    // next link inactive
                    expect(dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext.SDSInactive').size()).toBe(1);
                });
            });

        });

        describe('unique id (uuid) for calendar', function () {
            it("uuid assigned correctly", function () {
                var cal1 = new Calendar(defaultOptions);
                var cal2 = new Calendar(defaultOptions);

                expect(cal1.uuid).toBeGreaterThan(0);
                expect(cal2.uuid).toBeGreaterThan(0);

                expect(cal2.uuid).toBeGreaterThan(cal1.uuid);
            });

            it("uuid present in DOM", function () {
                var cal = new Calendar(defaultOptions);
                cal.render(function (dom) {
                    expect(dom.find('div.SDSCalendarContainer').addBack().attr('id').length).toBeGreaterThan(1);
                });

            });
        });

        describe('tabbed display', function () {
            it("adjacent months generation", function () {
                var cal = new Calendar(defaultOptions);
                var centralMonth = moment({year: 2015, month: 5}); // June

                // if one more month needed then add it to the right
                var adjacentMonths = cal.generateAdjacentMonths(centralMonth, 1);
                expect(adjacentMonths.startMonth).toEqual(centralMonth);
                expect(adjacentMonths.endMonth).toEqual(centralMonth.clone().add(1, 'month'));

                // if two more months needed then add one to the right and one to the left
                adjacentMonths = cal.generateAdjacentMonths(centralMonth, 2);
                expect(adjacentMonths.startMonth).toEqual(centralMonth.clone().subtract(1, 'month'));
                expect(adjacentMonths.endMonth).toEqual(centralMonth.clone().add(1, 'month'));

                // 5 adjacent months: 2 to left and 3 to the right
                adjacentMonths = cal.generateAdjacentMonths(centralMonth, 5);
                expect(adjacentMonths.startMonth).toEqual(centralMonth.clone().subtract(2, 'month'));
                expect(adjacentMonths.endMonth).toEqual(centralMonth.clone().add(3, 'month'));
            });

            it("3 tabs requested", function () {
                var TABS_NUMBER = 3;

                // in default options we request March. With tabbed display we will show also adjacent months, in this case Feb and Apr
                var cal = new Calendar(defaultOptions, {tabs: TABS_NUMBER});

                cal.options.testPrices = testPricesGenerator.generatePrices([
                        {year: defaultOptions.year, month: defaultOptions.month - 1}, // Feb 2015
                        {year: defaultOptions.year, month: defaultOptions.month}, // Mar 2015
                        {year: defaultOptions.year, month: defaultOptions.month + 1}      // Apr 2015
                    ]
                );

                cal.render(function (dom) {
                    var linkId;
                    var tabHeader;
                    var monthName;
                    var monthLeadPrice;
                    for (var seq = 1; seq <= TABS_NUMBER; seq++) {
                        linkId = "SDSCalendar_" + cal.uuid + "_Slot_" + seq + "_of_" + TABS_NUMBER;
                        tabHeader = dom.find('ol > li > a[href="#' + linkId + '"]');
                        monthName = tabHeader.children('.SDSCalendarMonthName').html();
                        monthLeadPrice = tabHeader.children('.SDSCalendarMonthLeadPrice').html();

                        // verify tab header
                        expect(monthLeadPrice).toEqual('100.05');

                        // verify correct id on particular calendar div elements
                        expect(dom.find('.SDSCalendarSlot:nth-of-type(' + seq + ')').attr('id')).toEqual(linkId);

                    }
                    // table captions not presented when tabs used
                    expect(dom.find('.SDSCalendarSlot > .SDSCalendar > caption').size()).toBe(0);

                    // and verify data presented correctly for every month
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-of-type(1)'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-of-type(2)'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-of-type(3)'));
                });

            });
        });

});