define(['Calendar', 'util/exceptions', 'jasmine-jquery', 'util/feature_detection', 'moment', 'util/CurrencyFormatter'], function(Calendar, ex, JasmineJqueryDummy, browser_features, moment, CurrencyFormatter) {
    "use strict";

    function generatePricesForTest(year, month) {
        var prices = {};
        var currentDay = moment({year: year, month: month - 1});
        var endOfMonthDay = currentDay.clone().endOf('month');
        while(currentDay.isBefore(endOfMonthDay) || currentDay.isSame(endOfMonthDay)) {
            prices[currentDay] = currentDay.date() * 100 + 0.05;
            currentDay.add(1, 'day');
        }
        return prices;
    }

    var defaultOptions = {
        year: 2015,
        month: 3,
        lengthOfStay: 14,
        currency: "USD",
        origin: "LAX",
        destination: 'NYC'
    };

    describe('calendar days calculation logic', function() {
        it('days of last week of previous month set correctly', function() {
            var calendar = new Calendar(defaultOptions);
            calendar.render(function (dom) {
                // toEqual([ 23, 24, 25, 26, 27, 28]);
                expect(dom.find('tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(6);
                expect(dom.find('tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden:first-child > div.cellWrapper > div.calendarDateNumber')).toContainText('23');
                expect(dom.find('tr:first-child > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(6) > div.cellWrapper > div.calendarDateNumber')).toContainText('28');
            }, generatePricesForTest(31));
        });

        it('days of first week of next month set correctly', function() {
            var calendar = new Calendar(defaultOptions);
            calendar.render(function (dom) {
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden').size()).toBe(5);
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:nth-child(3) > div.cellWrapper > div.calendarDateNumber')).toContainText('1');
                expect(dom.find('tr:nth-child(6) > td.calendarCell.prevOrNextMonthDay.hidden:last-child > div.cellWrapper > div.calendarDateNumber')).toContainText('5');
            }, generatePricesForTest(31));
        });

        it('number of days in month is correct', function () {
            var calendar = new Calendar(defaultOptions, {month: 2});
            calendar.render(function (dom) {
                expect(dom.find('td.calendarCell:not(.prevOrNextMonthDay) > div.cellWrapper > div.calendarDateNumber').size()).toBe(28);
            }, generatePricesForTest(28));
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
    });

    describe('calendar rendering:', function () {

        it('month name displayed correctly: no fail safe for month names', function () {
            var calendar = new Calendar(defaultOptions, {locale: "en-US"});
            calendar.render(function (dom) {
                expect(dom).toContainElement('caption');
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('caption')).toContainText('March');
                }
            }, generatePricesForTest(31));
        });

        it('month name displayed correctly: no fail safe for month names, other locale supported', function () {
            var calendar = new Calendar(defaultOptions, {
                currency: "BRL",
                year: 2015,
                month: 2,
                locale: "pt-BR" // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
            });
            calendar.render(function (dom) {
                expect(dom).toContainElement('caption');
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('caption')).toContainText('fevereiro'); // February
                }
            }, generatePricesForTest(28));
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
            calendar.render(function (dom) {
                expect(dom.find('caption')).toContainText('localizedMonthName3');
            }, generatePricesForTest(31));
        });

        it('short days of week displayed correctly in header: other locale, fail safe provided', function () {
            var overrides = {
                currency: "BRL",
                locale: "pt-BR", // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
                localizedWeekDayNamesFailsafe: ['1String', '2String', '3String', '4String', '5String', '6String', '7String']
            };
            var calendar = new Calendar(defaultOptions, overrides);
            calendar.render(function (dom) {
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(dom.find('thead > tr > th:last-child')).toContainText('dom'); // 'dom' is portuguese for Sun
                } else {
                    expect(dom.find('thead > tr > th:last-child')).toContainText('7String');
                }
            }, generatePricesForTest(31));
        });

        it('HTML structure displayed correctly', function () {
            var calendar = new Calendar(defaultOptions);
            calendar.render(function (dom) {
                expect(dom.find('td.calendarCell > div.cellWrapper > div.calendarDateNumber').size()).toBe(42); // 31 days in moth + preceding and next months days in same weeks
                expect(dom.find('td.calendarCell > div.cellWrapper > div.calendarDateNumber')).toContainText(1);
                expect(dom.find('div.calendarDateNumber')).toContainText(31);
                expect(dom).not.toContainHtml('<div class="calendarDateNumber">0</div>');

                expect(dom).toContainElement('td.calendarCell > div.cellWrapper > div.calendarCellPrice');

                // 1nd March 2015 is Sunday, so it should be last <td> in first <tr> (table row, representing a week)
                expect(dom.find('tbody > tr:first-child > td:last-child div.calendarDateNumber')).toContainText(1);

                // 30nd March 2015 is Mon, so it should be the first <td> in last <tr> (table row, representing a week)
                expect(dom.find('tbody > tr:last-child > td:first-child div.calendarDateNumber')).toContainText(30);
            }, generatePricesForTest(31));
        });

        it("when customer points with mouse at the cell, then (if not disabled in options) we highlight this cell and next cells within LoS. Highlight is done by adding class", function () {
            var calendar = new Calendar(defaultOptions);
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
            }, generatePricesForTest(31));
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
            var prices = generatePricesForTest(2015, 4);
            var calendar = new Calendar(options);
            calendar.render(function (dom) {
                var price6Apr = dom.find('tbody tr:nth-child(2) td:first-child div.calendarCellPrice > p');
                var formatter = new CurrencyFormatter(options.locale, options.currency);
                expect(price6Apr).toContainText(formatter.format(600.05));

                var price30Apr = dom.find('tbody tr:nth-child(5) td:nth-child(4) div.calendarCellPrice > p');
                expect(price30Apr).toContainText(formatter.format('3000.05'));
            }, prices);
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

            var calendar = new Calendar(options);
            var rqJson = JSON.parse(calendar.createWebServiceRequest());
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
            expect(cal.getOptions().lengthOfStay).toEqual(2);
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
            var prices = (function generatePricesForTest(year, month) {
                var prices = {};
                var currentDay = moment({year: year, month: month - 1});
                var endOfMonthDay = currentDay.clone().endOf('month');
                while(currentDay.isBefore(endOfMonthDay) || currentDay.isSame(endOfMonthDay)) {
                    prices[currentDay] = currentDay.day() * 100 + 100.05;
                    currentDay.add(1, 'day');
                }
                return prices;
            })(defaultOptions.year, defaultOptions.month);

            var cal = new Calendar(defaultOptions);
            cal.render(function (dom) {
                // Sun
                expect(dom.find('tbody > tr > td:last-child')).toContainElement('div.calendarCellPrice.tier-1');
                // Mon
                expect(dom.find('tbody > tr:nth-child(2) > td:first-child')).toContainElement('div.calendarCellPrice.tier-2');
                // Sat
                expect(dom.find('tbody > tr:nth-child(2) > td:nth-child(6)')).toContainElement('div.calendarCellPrice.tier-7');
            }, prices);
        });
    });

});