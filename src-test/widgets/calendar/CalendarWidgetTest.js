define(['widgets/calendar/CalendarWidget', 'util/exceptions', 'jasmine-jquery', 'util/feature_detection', 'moment', 'util/currencyFormatter', 'util/DateFormatter', 'util/CalendarTestPricesGenerator', 'datamodel/ShoppingData'],
    function (Calendar, ex, JasmineJqueryDummy, browser_features, moment, CurrencyFormatter, DateFormatter, testPricesGenerator, ShoppingData) {
        "use strict";

        var defaultOptions = {
            lengthOfStay: 14,
            currency: "USD",
            globalOptionsCache: new ShoppingData(), //TODO: exposing this in interface?
            currentDate: "2015-01-01" // freeze current date so that test are not dependent on current time
        };

        var defaultCustomerSearchCriteria = {
            origin: 'DFW',
            destination: 'LAX',
            departureDate: '2015-03-05',
            lengthOfStay: 14
        };
        
        var January = {year: 2015, month: 0};
        var February = {year: 2015, month: 1};
        var March = {year: 2015, month: 2};
        var April = {year: 2015, month: 3};
        var May = {year: 2015, month: 4};

        //TODO make sure globally that UT does not make calls to real web service: mock communication function and make it report errors when called: spy on options.webService?

        // helper function, to run all expectations for a month commonly used. Extracted as function not to repeat the same assertions

        function verifyOnlyOneMonthShown(dom) {
            expect(dom.find('table.SDSCalendar').size()).toBe(1);
        }

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
                calendar.options.testPrices = testPricesGenerator.generatePrices([March]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    // toEqual([ 23, 24, 25, 26, 27, 28]);
                    expect(dom.find('div.SDSCalendarSlot:first-child tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden').size()).toBe(6);
                    expect(dom.find('tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:first-child > div.SDSCalendarDateNumber')).toContainText('23');
                    expect(dom.find('tr:first-child > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:nth-child(6) > div.SDSCalendarDateNumber')).toContainText('28');
                });
            });

            it('days of first week of next month set correctly', function (done) {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([March]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden').size()).toBe(5);
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:nth-child(3) > div.SDSCalendarDateNumber')).toContainText('1');
                    expect(dom.find('tr:nth-child(6) > td.SDSCalendarCell.SDSCalendarPrevOrNextMonthDay.SDSHidden:last-child > div.SDSCalendarDateNumber')).toContainText('5');
                    done();
                });
            });

            it('number of days in month is correct', function () {
                var calendar = new Calendar(defaultOptions, {month: 1});
                calendar.options.testPrices = testPricesGenerator.generatePrices([February]);
                var searchCriteria = _.extend({}, defaultCustomerSearchCriteria, {departureDate: '2015-02-05'});
                calendar.newSearch(searchCriteria, function (dom) {
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
        });

        describe('calendar rendering:', function () {

            it('HTML structure displayed correctly', function (done) {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([March]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom).toContainElement('caption');
                    expect(dom.find('table.SDSCalendar').data('month')).toEqual(2);
                    expect(dom.find('table.SDSCalendar').data('year')).toEqual(2015);
                    verifyMarch2015renderedCorrectly(dom);
                    done();
                });
            });


            it("when customer points with mouse at the cell, then (if not disabled in options) we highlight this cell and next cells within LoS. Highlight is done by adding class", function () {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([March]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
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
            it('prices are presented on every cell', function (done) {
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([April]);
                var searchCriteria = _.extend({}, defaultCustomerSearchCriteria, {departureDate: '2015-04-05'});
                calendar.newSearch(searchCriteria, function (dom) {
                    var price6Apr = dom.find('tbody tr:nth-child(2) td:first-child div.SDSCalendarCellPrice');
                    var formatter = new CurrencyFormatter({locale: "en-US", currency: defaultOptions.currency});
                    expect(price6Apr).toContainText(formatter.format(600.05));

                    var price30Apr = dom.find('tbody tr:nth-child(5) td:nth-child(4) div.SDSCalendarCellPrice');
                    expect(price30Apr).toContainText(formatter.format('3000.05'));
                    done();
                });
            });
        });

        describe('creating request model from user search criteria', function () {
            it('when LoS not specified explicitly it is calculated from travel dates', function () { //TODO
                var options = {
                    departureDate: '2015-05-05',
                    arrivalDate: '2015-05-07',
                    currency: "USD",
                    locale: "en-US",
                    currentDate: '2015-01-01'
                };
                var cal = new Calendar(options);
                //TODO expect(cal.lengthOfStay).toEqual(2);
            });
        });

        describe('price tiers added', function () {
            it('1st tier (cheapest) marked for all cells with cheapest price', function () {
                // every Sunday will have cheapest price, every Monday second cheapest, and so on (Saturdays the most expensive)
                var prices = testPricesGenerator.generatePrices([March], function (date) {
                    return date.day() * 100 + 100.05;
                });

                var cal = new Calendar(defaultOptions);
                cal.options.testPrices = prices;
                cal.newSearch(defaultCustomerSearchCriteria, function (dom) {
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
            var cal = new Calendar(defaultOptions, {numberOfMonthsToShow: 3}, {localizedMonthNamesFailsafe: en_localizedMonthNames});
            cal.options.testPrices = testPricesGenerator.generatePrices([March, April, May]
            );
            it('three month calendar', function () {
                cal.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                });
            });
            it('markers of first and last month in sequence', function () {
                cal.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);
                });
            });
        });

        describe('min and max days', function () {
            it('if departure date month is the same month as min date, and number of tabs is greater than 1, then present also adjacent months on tabs', function (done) {
                //When: we create calendar with min date at beginning of March
                var calendar = new Calendar(defaultOptions, {
                    minDate: "2015-03-01",
                    maxDate: "2015-06-15",
                    tabs: 3
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([March, April, May]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(3);
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-of-type'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-of-type(2)'));
                    done();
                });
            });

            it('if departure date month is the same month as max date month, and number of months is greater than 1, then present adjacent months on tabs', function (done) {
                //When: we create calendar with max date to end of March
                var calendar = new Calendar(defaultOptions, { // calendar is requested for Mar
                    minDate: "2015-01-01",
                    maxDate: "2015-03-31",
                    tabs: 2
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([
                    January,
                    February,
                    March
                ]);
                //Then we should present calendar Feb and March (numberOfMonthsToShow is 2):
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(2);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-of-type'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-of-type(2)'));
                    done();
                });
            });

            it('tabs requested greater than 1, while min and max days allow for only one month)', function () {
                //When: we create calendar with min and max dates constraining to March only.
                // Also we request number of months more than one month
                var calendar = new Calendar(defaultOptions, {
                    minDate: "2015-03-01",
                    maxDate: "2015-03-31",
                    tabs: 2
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices([March, April, May]);
                //Then only one month can be shown (March)
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom.find('table.SDSCalendar').size()).toBe(1);
                    verifyMarch2015renderedCorrectly(dom);
                });
            });
        });


        describe('Prev and Next buttons', function () {
            it("Next button works", function () {
                // When: we create calendar of one month, for March 2015
                var calendar = new Calendar(defaultOptions);
                calendar.options.testPrices = testPricesGenerator.generatePrices([
                    March,
                    April,
                    May]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {

                    // after Next icon is clicked then Calendar should present April 2015:
                    var nextLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext');
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    var spyOnNextClicked = spyOnEvent(nextLink, 'click');
                    // trigger click and verify was clicked
                    nextLink.click();
                    expect('click').toHaveBeenTriggeredOn(nextLink);
                    expect(spyOnNextClicked).toHaveBeenTriggered();

                    // to verify, you have to get the current dom after the update. The dom reference passed to this closure will not auto update: In production code the wrapper element is updated and new view is displayed. This is only special case in unit testing, when there is no widget parent, but do is just passed to anonymous function (the second argument to newSearch).
                    dom = calendar.getCurrentDom();
                    verifyOnlyOneMonthShown(dom);

                    // verify calendar now shows April 2015
                    verifyApril2015renderedCorrectly(dom.find('table.SDSCalendar'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // additionally verify after the click HTML structure is still fine - the bug with wrapping div.SDSCalendarContainer into another one
                    expect(dom.find('div.SDSCalendarContainer').addBack().size()).toBe(1);

                    // now, after another click calendar should present May 2015.
                    // trigger click
                    nextLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext');
                    nextLink.click();

                    dom = calendar.getCurrentDom();
                    // verify calendar now shows May 2015
                    verifyOnlyOneMonthShown(dom);
                    verifyMay2015renderedCorrectly(dom.find('table.SDSCalendar'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // additionally verify after the click HTML structure is still fine - bug with wrapping div.SDSCalendarContainer into another one
                    expect(dom.find('div.SDSCalendarContainer').addBack().size()).toBe(1);
                });
            });

            it("prev button works for 3 months calendar", function () {
                // When: we create calendar of three months, for March-Apr-May 2015
                var calendar = new Calendar(defaultOptions, {numberOfMonthsToShow: 3, minDate: "2015-01-01"});
                // let's make sure we have test data for Jan-Feb-Mar-Apr-May
                calendar.options.testPrices = testPricesGenerator.generatePrices([
                    January,
                    February,
                    March,
                    April,
                    May
                ]);

                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    // trigger click and verify was clicked
                    var prevLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev');
                    var spyOnNextClicked = spyOnEvent(prevLink, 'click');
                    prevLink.click();
                    expect('click').toHaveBeenTriggeredOn(prevLink);
                    expect(spyOnNextClicked).toHaveBeenTriggered();

                    // after Prev icon is clicked then Calendar should show Feb-Mar-Apr
                    // has 3 months
                    dom = calendar.getCurrentDom();
                    expect(dom.find('table.SDSCalendar').size()).toBe(3);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:first-child'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                    verifyApril2015renderedCorrectly(dom.find('div.SDSCalendarSlot:last-child'));
                    verifyPrevAndNextNavLinksPresentedCorrectly(dom);

                    // trigger click
                    prevLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev');
                    prevLink.click();

                    dom = calendar.getCurrentDom();
                    // now, after another click calendar should present Jan-Feb-Mar
                    expect(dom.find('table.SDSCalendar').size()).toBe(3);
                    verifyFebruary2015renderedCorrectly(dom.find('div.SDSCalendarSlot:nth-child(2)'));
                    verifyMarch2015renderedCorrectly(dom.find('div.SDSCalendarSlot:last-child'));
                });
            });

            it("Prev inactive when we first calendar already presents first month permitted by minDate", function () {
                var calendar = new Calendar(defaultOptions, {numberOfMonthsToShow: 2, minDate: '2015-03-01'});
                calendar.options.testPrices = testPricesGenerator.generatePrices([March, April]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    // prev link inactive
                    var prevMonthLink = dom.find('div.SDSCalendarSlot:first-child > table.SDSCalendar > caption > .SDSNavigationLink.SDSPrev');
                    expect(prevMonthLink).toHaveClass('SDSInactive');
                    // next link active
                    var nextMonthLink = dom.find('div.SDSCalendarSlot:nth-child(2) > table.SDSCalendar > caption > .SDSNavigationLink.SDSNext');
                    expect(nextMonthLink).not.toHaveClass('SDSInactive');
                });
            });

            it("Next inactive on calendar having no prices: we assume that if there are not prices found for given month in the future, then there will be no prices even farther in the future", function () {
                var calendar = new Calendar(defaultOptions, {numberOfMonthsToShow: 2, minDate: '2015-01-01'});
                calendar.options.testPrices = testPricesGenerator.generatePrices([
                    March,
                    _.extend({emptyPrices: true}, April)
                ]);
                calendar.newSearch(defaultCustomerSearchCriteria, function (dom) {
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
                cal.newSearch(defaultCustomerSearchCriteria, function (dom) {
                    expect(dom.find('div.SDSCalendarContainer').addBack().attr('id').length).toBeGreaterThan(1);
                });

            });
        });

        describe('tabbed display', function () {
            it("3 tabs requested", function () {
                var TABS_NUMBER = 3;

                // in default options we request March. With tabbed display we will show also adjacent months, in this case Feb and Apr
                var cal = new Calendar(defaultOptions, {tabs: TABS_NUMBER});

                cal.options.testPrices = testPricesGenerator.generatePrices([
                        February,
                        March,
                        April
                ]);

                cal.newSearch(defaultCustomerSearchCriteria, function (dom) {
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