/**
 * We assume that first day of week is Monday
 * We assume that months are indexed from 1, not from 0 (to have January use 1, not 0).
 * by LoS we refer to length of stay
 *
 * WARN: Script uses Date.prototype.toLocaleString(), which implementation varies across platforms.
 * In the script I patch one IE problem with formatting. You will probably replace this formatting by array of strings for days of week and month names.
 */
define(['WidgetBase', 'validator' ,'jquery', 'lodash',
    'mustache',
    'stache!view-templates/calendar.html',
    'stache!request-templates/AdvancedCalendarRequest.json',
    'util/feature_detection',
    'lib/commWrapper',
    'moment',
    'util/CurrencyFormatter',
    'util/PriceClassifier'
    ], function (WidgetBase, v, $, _, Mustache, calendarTemplate, requestTemplate, browser_features_package, comm, moment, CurrencyFormatter, PriceClassifier) {
    "use strict";

    /**
     * Widget representing the Calendar of options. Every cell presents a price for travel originating on that day, with requested length of stay (LoS)
     *
     */
    function Calendar() {

        WidgetBase.apply(this, arguments);

        var that = this;

        /**
         * Function to fetch data from web service. By default this widget fetches from Advanced Calendar REST service.
         * This function must take two arguments:
         *  1. request, as string  function (err, data)
         *  2. callback function, and pass to it two arguments: error and response data.
         *  For example:
         *  var otherDataSourceFunction = function(request, callback) {
         *      ...
         *      callback(err, data);
         *  }
         */
        Calendar.prototype.dataSourceFetchFn = comm.advanced_calendar_search;

        validateOptions(this.options);

        setOptionsDefaults();

        function validateOptions(options) {
            v.notEmpty(options, "You have to specify options");

            v.onlyOneDefined(options.lengthOfStay, options.arrivalDate, "You have to specify lengthOfStay or arrivalDate (and not both)"); // TODO: for one ways request you will not have LoS

            v.currencySymbol(options.currency, "You have to specify currency, and options.currency must be valid 3 letter currency code, for example USD");

            // if you do not provide failsafes, then on browsers not supporting localized Date.toLocaleString it will not display month name and week day names in calendar header
            if (v.isDefined(options.localizedMonthNamesFailsafe)) {
                v.arrayHasLength(options.localizedMonthNamesFailsafe, 12, "When providing fail safe for localized month names, you have to provide names for all 12 months..");
            }

            if (v.isDefined(options.localizedWeekDayNamesFailsafe)) {
                v.arrayHasLength(options.localizedWeekDayNamesFailsafe, 7, "When providing fail safe for localized names of days of week, you have to provide all 7 of them..");
            }

            v.airportCode(options.origin, "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");

            v.airportCode(options.destination, "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");

            v.year(options.year, "you have to specify valid travel year and month. Year in YYYY format, and month in MM format");
            v.month(options.month, "you have to specify valid travel year and month. Year in YYYY format, and month in MM format. Month numbers start from 1, not from 0");
        }

        function setOptionsDefaults() {
            that.options.locale = that.options.locale || window.navigator.language; // for example "en-US"
            // if length of stay is not explicitly provided then it is calculated from departure data and arrival date
            that.options.lengthOfStay = that.options.lengthOfStay || (function () {
                var departureDate = moment(that.options.departureDate, 'YYYY-M-D');
                var arrivalDate = moment(that.options.arrivalDate, 'YYYY-M-D');
                return arrivalDate.diff(departureDate, 'days');
            })();
            that.options.browser_features = that.options.browser_features || browser_features_package; // dependency injection for unit testing
        }


        /**
         * Returns object representing number of days in the specified month, and two arrays: one representing the days of
         * last week the of the previous month (in relation to the moth specified),
         * and one representing days of the first week of the next month.
         * @returns {{prevMonthDaysOfLastWeek: Array, nextMonthDaysOfFirstWeek: Array, monthNumberOfDays: number, monthStartDayOfWeek: number}}
         */
        function getBounds() {
            // days in the last week of the previous month. For example if this month (specified in argument) starts with Wednesday, then previous month days of last week are Mon and Thu
            // size of this array also determines the day of week that this month starts
            // this array holds day numbers (like [29, 30, 31])
            var prevMonthDaysOfLastWeek = [];
            // next month days of its first week. If this month ends on Friday, then it is Saturday, Sunday.
            var nextMonthDaysOfFirstWeek = [];

            var monthStartDate = moment({year: that.options.year, month: (that.options.month - 1)});
            var monthEndDate   = monthStartDate.clone().endOf('month');

            // number of days this month has
            var monthNumberOfDays = monthStartDate.daysInMonth();

            var monthStartDayOfWeek = monthStartDate.day();

            // convert 0 representing Sunday into 7
            monthStartDayOfWeek = (monthStartDayOfWeek===0) ? 7 : monthStartDayOfWeek;

            var prevMonthNumberOfDays = monthStartDate.clone().subtract(1, 'day').daysInMonth();

            // push previous month day numbers to its last week
            for (var i = monthStartDayOfWeek - 2; i >= 0; i--) {
                prevMonthDaysOfLastWeek.push(prevMonthNumberOfDays - i);
            }

            var monthEndDayOfWeek = monthEndDate.day();
            // convert 0 representing Sunday into 7
            monthEndDayOfWeek = (monthEndDayOfWeek===0) ? 7 : monthEndDayOfWeek;

            for (i = 1; i <= (7 - monthEndDayOfWeek); i++) {
                nextMonthDaysOfFirstWeek.push(i);
            }

            return {
                monthStartDate: monthStartDate,
                monthEndDate: monthEndDate,
                prevMonthDaysOfLastWeek: prevMonthDaysOfLastWeek,
                nextMonthDaysOfFirstWeek: nextMonthDaysOfFirstWeek,
                monthNumberOfDays: monthNumberOfDays,
                monthStartDayOfWeek: monthStartDayOfWeek
            };
        };

        var bounds = getBounds();

        function createModelData(prices) {
            var monthStartDate = bounds.monthStartDate.toDate();

            var monthName;
            if (that.options.browser_features.localizedToLocaleStringSupported()) {
                monthName = monthStartDate.toLocaleString(that.options.locale, { month: "long" });
                // Remove the left-to-right marks that IE puts in the output of toLocaleString(). Only IE behaviour
                if (that.options.browser_features.isIE()) {
                    monthName = monthName.replace(/\u200E/g, '');
                }
            } else if (that.options.localizedMonthNamesFailsafe) {
                monthName = (that.options.localizedMonthNamesFailsafe)[that.options.month - 1]; // if this option is not defined then month name will nto be shown
            }

            var allWeeks = [];
            var currentWeek = {week: []};

            // 1. add days of last week of previous month (in the same week as the 1st day of current month)
            bounds.prevMonthDaysOfLastWeek.forEach(function (dayNumber) {
                currentWeek.week.push(
                    {
                        dayNumber: dayNumber,
                        isPrevOrNextMonthDay: true,
                        hidden: !(that.options.showDayNumbersPrevAndNextMonth)
                    }
                );
            });

            var currencyFormatter = new CurrencyFormatter(that.options.locale, that.options.currency);

            // classifier will be needed to assign prices per day into price tiers (cheapest, second cheapest, and so on).
            var priceClassifier = new PriceClassifier(_.values(prices));

            // 2. add this month all days and prices
            var dayCellData = {};
            var currentDayOfMonth = bounds.monthStartDate.clone();
            var currPrice;
            while (currentDayOfMonth.isBefore(bounds.monthEndDate) || currentDayOfMonth.isSame(bounds.monthEndDate)) {
                dayCellData = {};
                dayCellData.dayNumber = currentDayOfMonth.date();
                if (prices[currentDayOfMonth]) {
                    currPrice = prices[currentDayOfMonth];
                    dayCellData.price = currencyFormatter.format(currPrice);
                    dayCellData.priceTier = priceClassifier.tier(currPrice);
                }
                currentWeek.week.push(dayCellData);
                if (currentWeek.week.length === 7) {
                    allWeeks.push(currentWeek);
                    currentWeek = {week: []};
                }
                // increment loop counter
                currentDayOfMonth.add(1, 'day');
            }
            if (currentWeek.week.length < 7) {
                // 3. add days of first week of next month
                bounds.nextMonthDaysOfFirstWeek.forEach(function (dayNumber) {
                    currentWeek.week.push(
                        {
                            dayNumber: dayNumber,
                            isPrevOrNextMonthDay: true,
                            hidden: !(that.options.showDayNumbersPrevAndNextMonth)
                        }
                    );
                });
                allWeeks.push(currentWeek);
            }

            return {
                monthName: monthName,
                dayOfWeekNames: getLocalizedWeekDayNames(),
                weeks: allWeeks
            };
        }

        /**
         * @return {Array} Array of localized strings representing days of week
         */
        function getLocalizedWeekDayNames() {
            var localizedWeekDayNames = [];
            var mondayDate = new Date(2015, 5, 1); // 1 June 2015 is Mon
            var currentWeekDay = mondayDate;

            if (that.options.browser_features.localizedToLocaleStringSupported()) {
                for(var i = 0; i < 7; i++) {
                    var weekLocalizedStr = currentWeekDay.toLocaleString(that.options.locale, {weekday: 'short'});
                    // Remove the left-to-right marks that IE puts in the output of toLocaleString()
                    if (that.options.browser_features.isIE()) {
                        weekLocalizedStr = weekLocalizedStr.replace(/\u200E/g, '');
                    }
                    localizedWeekDayNames.push(weekLocalizedStr);
                    currentWeekDay.setDate(currentWeekDay.getDate() + 1);
                }
            } else {
                localizedWeekDayNames = that.options.localizedWeekDayNamesFailsafe; // if not provided then week day names in header will not be displayed
            }
            return localizedWeekDayNames;
        }

        function getLosDays(thisDay, lengthOfStay) {
            // first add all next days in the same week to the nextDays array
            var nextDaysSameWeek = thisDay.nextAll().toArray();
            var allNextWeeksSameMonth = thisDay.parent().nextAll();

            // then add to it also all days from all next weeks, till the end of the month
            nextDaysSameWeek = nextDaysSameWeek.concat(allNextWeeksSameMonth.children().toArray());

            var allLoSDays = thisDay.toArray();
            // highlight all next days till LoS
            for (var i = 0; (i < nextDaysSameWeek.length) && (i < lengthOfStay - 1); i++) {
                allLoSDays.push(nextDaysSameWeek[i]);
            }
            return allLoSDays;
        }

        /**
         * Adds handler for mouseenter and mouseleave events to highlight the mouse entered calendar cell and all next cells within LoS
         * @param calendarNode
         * @param lengthOfStay
         */
        function addTraceCustomerPointer(calendarNode, lengthOfStay) {

            var calendarCells = $(calendarNode).find("td.calendarCell");

            calendarCells.mouseenter(function () {
                var allLoSdays = getLosDays($(this), lengthOfStay);
                for (var i = 0; i < allLoSdays.length; i++) {
                    $(allLoSdays[i]).addClass("highlight");
                }
            });

            calendarCells.mouseleave(function () {
                var allLoSdays = getLosDays($(this), lengthOfStay);
                for (var i = 0; i < allLoSdays.length; i++) {
                    $(allLoSdays[i]).removeClass("highlight");
                }
            });
        }

        function addInternalEventHandlers(dom) {
            // by default we trace customer pointer, as it goes over calendar cells, highlighting all cells within customer specified LoS
            if ((typeof that.options.traceCustomerPointer === 'undefined') || (that.options.traceCustomerPointer === true)) {
                addTraceCustomerPointer(dom, that.options.lengthOfStay);
            }
        }

        this.createWebServiceRequest = function() { // privileged for unit testing
            var requestOptions = {};
            var keys = ['origin', 'destination', 'lengthOfStay', 'optionsPerDay'];
            keys.forEach(function (key) {
                requestOptions[key] = that.options[key];
            });
            requestOptions.fromDate = bounds.monthStartDate.format('YYYY-MM-DD');
            requestOptions.toDate = bounds.monthEndDate.format('YYYY-MM-DD');
            return requestTemplate(requestOptions);
        };

        function createCalendarDom(prices) {
            var data = createModelData(prices);
            var calendarHTML = calendarTemplate(data);
            var calendarDOM = $(calendarHTML);
            addInternalEventHandlers(calendarDOM);
            return calendarDOM;
        }

        function getLowestPricesPerDay(responseData) {
            var rs = JSON.parse(responseData);
            // TODO parse total fare currency?
            return rs.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.reduce(function (acc, next) {
                var departureDate = moment(next.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureDateTime).startOf('day');
                var totalPrice    = Number(next.AirItineraryPricingInfo[0].ItinTotalFare.TotalFare.Amount); //TODO: why AirItineraryPricingInfo is array? of one element always?
                if (acc[departureDate]) {
                    if (totalPrice < acc[departureDate]) {
                        acc[departureDate] = totalPrice;
                    }
                } else {
                    acc[departureDate] = totalPrice;
                }
                return acc;
            }, {});
        }

        /**
         * Creates actual calendar jquery object and passes it to client callback.
         * Client, in their callback, will typically append that calendar object to their DOM.
         *
         * Typically the second argument (prices) is not provided and the widget does call to the web service for prices.
         * If sedond argument is provided (for example while testing), then web service call is not done and prices from the second argument are used.
         *
         * @param clientCallback
         * @param prices: optional: object representing prices per day. Keys are moment library dates, values are numbers
         */
        Calendar.prototype.render = function (clientCallback, prices) {
            if (prices) {
                var calendarDom = createCalendarDom(prices);
                clientCallback(calendarDom);
            } else {
                var request = this.createWebServiceRequest();
                this.dataSourceFetchFn(request, function (err, data) {
                    var prices = getLowestPricesPerDay(data);
                    calendarDom = createCalendarDom(prices);
                    clientCallback(calendarDom);
                });
            }
        };
    };

    Calendar.prototype = Object.create(WidgetBase.prototype);
    Calendar.prototype.constructor = Calendar;

    return Calendar;
});