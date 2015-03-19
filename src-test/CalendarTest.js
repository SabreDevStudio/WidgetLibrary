define(['Calendar', 'util/exceptions', 'jasmine-jquery', 'jquery', 'util/feature_detection'], function(Calendar, ex, JasmineJqueryDummy, $, browser_features) {
    "use strict";

    describe('calendar days calculation logic', function() {
        it('days of last week of previous month set correctly', function() {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            // toEqual([ 23, 24, 25, 26, 27, 28]);
            expect(dom.find('tr:nth-child(1) > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(6);
            expect(dom.find('tr:nth-child(1) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(1) > div.cellWrapper > div.calendarDateNumber')).toContainText('23');
            expect(dom.find('tr:nth-child(1) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(6) > div.cellWrapper > div.calendarDateNumber')).toContainText('28');
        });

        it('days of first week of next month set correctly', function() {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(5);
            expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(3) > div.cellWrapper > div.calendarDateNumber')).toContainText('1');
            expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(7) > div.cellWrapper > div.calendarDateNumber')).toContainText('5');
        });

        it('number of days in month is correct', function () {
            var options = {
                year: 2015,
                month: 2,
                lengthOfStay: 14,
                currency: "USD"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(28);
        });
    });

    describe('calendar creation logic', function () {
        it('invalid options: missing LoS', function () {
            expect(Calendar.bind(null, undefined)).toThrow(new ex.IllegalArgumentException("You have to specify options"));
        });

        it('invalid options: bad currency specification', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "US" // <-- should be USD
            };
            expect(function () {
                new Calendar(options);
            }).toThrow();
        });

        it('calendar created', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD"
            };

            var calendar = new Calendar(options);
            expect(calendar).not.toBeNull();
        });
    });

    describe('calendar rendering:', function () {

        it('month name displayed correctly: no fail safe for month names', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD",
                locale: "en-US"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            if (browser_features.localizedToLocaleStringSupported()) {
                expect(dom).toContainHtml('<caption>March</caption>');
            } else {
                expect(dom).toContainElement('caption');
            }
        });

        it('month name displayed correctly: no fail safe for month names, other locale supported', function () {
            var options = {
                year: 2015,
                month: 2,
                lengthOfStay: 14,
                currency: "BRL",
                locale: "pt-BR" // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            if (browser_features.localizedToLocaleStringSupported()) {
                expect($(dom).find('caption')).toContainText('fevereiro'); // February
            } else {
                expect(dom).toContainElement('caption');
            }
        });

        it('month name displayed correctly: fail safe for month name used', function () {
            var localizedMonthNamesFailsafe = [];
            for (var i = 1; i <= 12; i++) {
                localizedMonthNamesFailsafe.push("localizedMonthName" + i);
            }
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD",
                locale: "en-US",
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

            var calendar = new Calendar(options);
            var dom = calendar.render();
            expect(dom).toContainHtml('<caption>localizedMonthName3</caption>');
        });

        it('short days of week displayed correctly in header: other locale, fail safe provided', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "BRL",
                locale: "pt-BR", // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
                localizedWeekDayNamesFailsafe: ['1String', '2String', '3String', '4String', '5String', '6String', '7String']
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            if (browser_features.localizedToLocaleStringSupported()) {
                expect($(dom).find('thead > tr > th:nth-child(7)')).toContainText('dom'); // 'dom' is portuguese for Sun
            } else {
                expect($(dom).find('thead > tr > th:nth-child(7)')).toContainText('7String');
            }
        });

        it('HTML structure displayed correctly', function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD",
                locale: "en-US"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();
            expect(dom).toEqual('table.calendar');

            // TODO eval Xpath
            expect(dom).toContainElement('td.calendarCell > div.cellWrapper > div.calendarDateNumber');
            expect(dom).toContainHtml('<div class="calendarDateNumber">1</div>');
            expect(dom).toContainHtml('<div class="calendarDateNumber">31</div>');
            expect(dom).not.toContainHtml('<div class="calendarDateNumber">0</div>');

            expect(dom).toContainElement('td.calendarCell > div.cellWrapper > div.calendarCellPrice');

            // 1nd March 2015 is Sunday, so it should be last <td> in first <tr> (table row, representing a week)
            // TODO: CSS or Xpath selectors
            expect($(dom).find('tbody tr').first().children().last()).toContainHtml('<div class="calendarDateNumber">1</div>');

            // 30nd March 2015 is Mon, so it should be the first <td> in last <tr> (table row, representing a week)
            expect($(dom).find('tbody tr').last().children().first()).toContainHtml('<div class="calendarDateNumber">30</div>');

        });

        it("when customer points with mouse at the cell, then (if not disabled in options) we highlight this cell and next cells within LoS. Highlight is done by adding class", function () {
            var options = {
                year: 2015,
                month: 3,
                lengthOfStay: 14,
                currency: "USD"
            };
            var calendar = new Calendar(options);
            var dom = calendar.render();

            var cellFor2ndMarch = $(dom).find('tbody tr:nth-child(2)').children().first();

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