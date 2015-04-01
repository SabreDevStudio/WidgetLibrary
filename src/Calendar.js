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
    'stache!view-templates/Calendar.html',
    'stache!request-templates/AdvancedCalendarRequest.json',
    'util/feature_detection',
    'lib/commWrapper',
    'moment',
    'util/CurrencyFormatter',
    'util/PriceClassifier',
    "async"
    ], function (WidgetBase, v, $, _, Mustache, calendarTemplate, requestTemplate, browser_features_package, comm, moment, CurrencyFormatter, PriceClassifier, async) {
    "use strict";

    /**
     * Widget representing the Calendar of options. Every cell presents a price for travel originating on that day, with requested length of stay (LoS)
     *
     */
    function Calendar() {

        var DEFAULT_DATE_FORMAT = 'YYYY-M-D';
        var MAX_CALENDAR_DAYS_IN_CACHE = 192;

        WidgetBase.apply(this, arguments);

        var that = this;

        var monthBoundsCache = {};

        var currentDomRepresentation;

        var firstMonthCurrentlyShown;

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

        // we check if options exists at all, then then first we set defaults for options that have defaults, and only than we validate all options
        // we validate options after applying defauls as we are also checking relations between some options (like dates), so defaults must be already assigned
        v.notEmpty(this.options, "You have to specify options");

        setOptionsDefaults();

        validateOptions(this.options);

        function setOptionsDefaults() {
            /*jshint maxcomplexity: 25 */
            that.options.locale = that.options.locale || window.navigator.language; // for example "en-US"
            // if length of stay is not explicitly provided then it is calculated from departure data and arrival date
            var dateFormat = that.options.dateFormat || DEFAULT_DATE_FORMAT;

            // if length of stay is not defined by customer then infer it from travel dates
            // if that is not possible either then this options will be failed while validating options anyway
            that.lengthOfStay = that.options.lengthOfStay || (function() {
                if (that.options.departureDate && that.options.arrivalDate) {
                    var departureDate = moment(that.options.departureDate, dateFormat);
                    var arrivalDate = moment(that.options.arrivalDate, dateFormat);
                    return arrivalDate.diff(departureDate, 'days');
                }
            })();
            that.options.browser_features = that.options.browser_features || browser_features_package; // dependency injection for unit testing
            that.options.year = that.options.year || (function () {
                if (that.options.departureDate) {
                    return moment(that.options.departureDate).year();
                }
            })();
            that.options.month = that.options.month || (function () {
                if (that.options.departureDate) {
                    return moment(that.options.departureDate).month() + 1;
                }
            })();
            that.options.optionsPerDay = that.options.optionsPerDay || 1;
            that.options.numberOfMonths = that.options.numberOfMonths || 1;
            that.options.globalPriceCache = that.options.globalPriceCache || {}; // if external common cache reference is not provided then we will use cache local to widget instance
            that.options.traceCustomerPointer = that.options.traceCustomerPointer || true;

            that.options.minDate = (that.options.minDate)? moment(that.options.minDate, dateFormat) : moment(); //TODO filter within calendar cells if we can show this date
            that.options.maxDate = (that.options.maxDate)? moment(that.options.maxDate, dateFormat) : moment().add(MAX_CALENDAR_DAYS_IN_CACHE, 'days');
            that.minDateStartOfMonth = that.options.minDate.clone().startOf('month');
            that.maxDateEndOfMonth = that.options.maxDate.clone().endOf('month');
            that.maxDateStartOfMonth = that.options.maxDate.clone().startOf('month');
        }

        function validateOptions(options) {
            /*jshint maxcomplexity: 25 */
            var dateFormat = options.dateFormat || DEFAULT_DATE_FORMAT;

            if (options.year && options.month) {
                that.userRequestedCalendarStartMonth = moment({year: options.year, month: options.month-1});
            }

            v.onlyOneDefined(options.lengthOfStay, options.arrivalDate, "You have to specify lengthOfStay or arrivalDate (and not both)"); // TODO: for one ways request you will not have LoS

            if (options.arrivalDate) {
                v.validDate(options.arrivalDate, dateFormat);
            }

            if (options.departureDate) {
                v.validDate(options.departureDate, dateFormat);
            }

            if (options.departureDate && options.arrivalDate) {
                v.notAfter(options.departureDate, options.arrivalDate, dateFormat, "departure date", "arrival date");
            }

            v.currencySymbol(options.currency, "You have to specify currency, and options.currency must be valid 3 letter currency code, for example USD");

            // if you do not provide failsafes, then on browsers not supporting localized Date.toLocaleString it will not display month name and week day names in calendar header
            if (options.localizedMonthNamesFailsafe) {
                v.arrayHasLength(options.localizedMonthNamesFailsafe, 12, "When providing fail safe for localized month names, you have to provide names for all 12 months..");
            }

            if (options.localizedWeekDayNamesFailsafe) {
                v.arrayHasLength(options.localizedWeekDayNamesFailsafe, 7, "When providing fail safe for localized names of days of week, you have to provide all 7 of them..");
            }

            v.airportCode(options.origin, "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");

            v.airportCode(options.destination, "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");

            if (typeof options.departureDate === 'undefined') {
                v.year(options.year, "If you do not specify departureDate then you have to specify valid travel year and month. Year in YYYY format, and month in MM format");
                v.month(options.month, "If you do not specify departureDate then you have to specify valid travel year and month. Year in YYYY format, and month in MM format. Month numbers start from 1, not from 0");
            }

            if (options.minDate) {
                if (options.departureDate) {
                    v.notAfter(options.minDate, options.departureDate, dateFormat, "calendar min date", "departure date");
                }
                if (that.userRequestedCalendarStartMonth) {
                    v.notAfter(that.minDateStartOfMonth, that.userRequestedCalendarStartMonth, dateFormat, "the month of calendar min date", "travel date from calendar options year and month");
                }
            }
            if (options.maxDate) {
                if (options.departureDate) {
                    v.notAfter(options.departureDate, options.maxDate, dateFormat, " departure date", "calendar max date");
                }
                if (that.userRequestedCalendarStartMonth) {
                    v.notAfter(that.userRequestedCalendarStartMonth, options.maxDate, dateFormat, "date from calendar year and month", "calendar max date");
                }
            }
            if (options.minDate && options.maxDate) {
                v.notAfter(options.minDate, options.maxDate, dateFormat, "calendar max date", "calendar min date");
                if (options.numberOfMonths) {
                    var maxNumberOfMonthsFromMinAndMaxDates = that.maxDateEndOfMonth.clone().add(1, 'month').diff(that.minDateStartOfMonth);
                    v.notGreaterThan(options.numberOfMonths, maxNumberOfMonthsFromMinAndMaxDates);
                }
            }
        }

    //TODO: deep copy all options in base constructor

        /**
         * Returns object representing number of days in the specified month, and two arrays: one representing the days of
         * last week the of the previous month (in relation to the moth specified),
         * and one representing days of the first week of the next month.
         * @returns {{prevMonthDaysOfLastWeek: Array, nextMonthDaysOfFirstWeek: Array, monthNumberOfDays: number, monthStartDayOfWeek: number}}
         */
        this.getMonthBounds = function(monthStartDate) {
            // days in the last week of the previous month. For example if this month (specified in argument) starts with Wednesday, then previous month days of last week are Mon and Thu
            // size of this array also determines the day of week that this month starts
            // this array holds day numbers (like [29, 30, 31])
            var prevMonthDaysOfLastWeek = [];
            // next month days of its first week. If this month ends on Friday, then it is Saturday, Sunday.
            var nextMonthDaysOfFirstWeek = [];

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

        function createModelData(prices, bounds, isTheFirstMonthShown, isTheLastMonthShown) {
            var noPricesFound = (Object.keys(prices).length === 0);

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
                noPricesFound: noPricesFound,
                monthName: monthName,
                isTheFirstMonthShown: isTheFirstMonthShown,
                prevInactive: (noPricesFound || (bounds.monthStartDate.isSame(that.minDateStartOfMonth) || bounds.monthStartDate.isBefore(that.minDateStartOfMonth))),
                isTheLastMonthShown: isTheLastMonthShown,
                nextInactive: (noPricesFound || (bounds.monthEndDate.isSame(that.maxDateEndOfMonth) || (bounds.monthEndDate.isAfter(that.maxDateEndOfMonth)))),
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
            if (that.options.traceCustomerPointer) {
                addTraceCustomerPointer(dom, that.lengthOfStay);
            }
            // listeners on prev and next month links
            var prevLink = $(dom).find('caption > .monthNavigationLink.prev:not(.inactive)');
            prevLink.click(function () {
                // on click inactivate the link (till results are loaded), and disable click handler on this link
                $(this).addClass('inactive');
                $(this).off('click');
                that.render(null, -1);
            });
            var nextLink = $(dom).find('caption > .monthNavigationLink.next:not(.inactive)');
            nextLink.click(function () {
                $(this).addClass('inactive');
                $(this).off('click');
                that.render(null, 1);
            });

        }

        this.createWebServiceRequest = function(bounds) { // privileged for unit testing
            var requestOptions = {};
            var keys = ['origin', 'destination', 'optionsPerDay'];
            keys.forEach(function (key) {
                requestOptions[key] = that.options[key];
            });
            requestOptions.fromDate = bounds.monthStartDate.format('YYYY-MM-DD');
            requestOptions.toDate = bounds.monthEndDate.format('YYYY-MM-DD');
            requestOptions.lengthOfStay = that.lengthOfStay;
            return requestTemplate(requestOptions);
        };


        function getLowestPricesPerDay(responseData) {
            if (typeof responseData === 'undefined') {
                return {}; // if no prices found return empty prices object
            }
            var rs = JSON.parse(responseData);
            if (typeof rs.OTA_AirLowFareSearchRS === 'undefined' || typeof rs.OTA_AirLowFareSearchRS.Success === 'undefined') {
                return {}; // if no prices found return empty prices object
            }
            return rs.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.reduce(function (acc, next) {
                var departureDate = moment(next.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureDateTime).startOf('day');
                var totalPrice = Number(next.AirItineraryPricingInfo[0].ItinTotalFare.TotalFare.Amount); //TODO: why AirItineraryPricingInfo is array? of one element always?
                // TODO parse also total fare currency?
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
         * If second argument is provided (for example while testing), then web service call is not done and prices from the second argument are used.
         *
         * @param clientCallback
         */
        Calendar.prototype.render = function(clientCallback, offsetMonths) {
            var startMonth = this.firstMonthCurrentlyShown || this.userRequestedCalendarStartMonth;
            startMonth.add(offsetMonths, 'months');
            var endMonth = startMonth.clone().add(this.options.numberOfMonths - 1, 'month');

            var monthsToRender = generateMonths(startMonth, endMonth);

            if (this.options.maxDate) {
                monthsToRender = adjustToMinMaxDates(monthsToRender);
            }

            async.concatSeries(monthsToRender, renderOneMonth, function (err, allMonthsData) {
                    var calendarHTML = calendarTemplate({slots: allMonthsData});
                    var calendarDOM = $(calendarHTML);
                    addInternalEventHandlers(calendarDOM);
                    that.firstMonthCurrentlyShown = startMonth;
                    if (clientCallback) {
                        that.currentDomRepresentation = calendarDOM;
                        return clientCallback(calendarDOM);
                    }
                    // TODO: it is not obvious that the next two lines will execute only for rerender. Introduce rerender method
                    var calendarDomWithHolderStripped = calendarDOM.children();
                    that.currentDomRepresentation.empty().append(calendarDomWithHolderStripped);
            });
        };

        function renderOneMonth(monthObject, callback) {
            var month = monthObject.month;
            var isTheFirstMonthShown = monthObject.isTheFirstMonthShown;
            var isTheLastMonthShown = monthObject.isTheLastMonthShown;

            // 1. make sure we have bounds in bounds cache for every month to be displayed:
            if (!monthBoundsCache[month]) {
                monthBoundsCache[month] = that.getMonthBounds(month);
            }

            // 2. for every month to be displayed:
            //    if there are data for this month in global cache, get data from cache and render
            //    if no data in global cache then create web service request and pass callback to render this month to the data source fetch function
            var cacheKey = [that.options.origin, that.options.destination, month, that.lengthOfStay, that.options.currency];
            var calendarDom;
            if (that.options.testPrices && that.options.testPrices[month]) {
                calendarDom = createModelData(that.options.testPrices[month], monthBoundsCache[month], isTheFirstMonthShown, isTheLastMonthShown);
                callback(null, calendarDom);
            }
            else if (that.options.globalPriceCache[cacheKey]) {
                var prices = that.options.globalPriceCache[cacheKey];
                calendarDom = createModelData(prices, monthBoundsCache[month], isTheFirstMonthShown, isTheLastMonthShown);
                callback(null, calendarDom);
            } else {
                var request = that.createWebServiceRequest(monthBoundsCache[month]);
                that.dataSourceFetchFn(request, function (err, data) {
                    if (err && err.status !== 404) { // 404 is not error but valid business response
                        callback(err);
                    }
                    var prices = getLowestPricesPerDay(data);
                    calendarDom = createModelData(prices, monthBoundsCache[month], isTheFirstMonthShown, isTheLastMonthShown);
                    // update cache:
                    that.options.globalPriceCache[cacheKey] = prices;
                    callback(null, calendarDom);
                });
            }
        }

        function generateMonths(startMonth, endMonth) {
            var months = [];
            var numberOfMonths = endMonth.diff(startMonth, 'months') + 1;
            for (var idx = 0; idx < numberOfMonths; idx++) {
                months.push({
                    month: startMonth.clone().add(idx, 'months'),
                    isTheFirstMonthShown: (idx === 0),
                    isTheLastMonthShown: (idx === numberOfMonths-1)
                });
            }
            return months;
        }

        // check if months to render validate min and max dates, if not then shift. We should have enough space (which is validated earlier, in options validation)
        function adjustToMinMaxDates(months) {
            // start month of (argument) months array should not be lower than min date month (object invariant)
            // calculate number of months that the last month to render is greater than max date month - then array will be shifted back by this number
            var lastMonthInArray = months[months.length - 1].month;
            var monthsLeftTillHittingDateMax = that.maxDateStartOfMonth.diff(lastMonthInArray, 'months');
            if (monthsLeftTillHittingDateMax >= 0) {
                return months;
            }
            months.forEach(function(month) {
                month.month.subtract(1, 'months');
            });
            return months;
        }
    }

    Calendar.prototype = Object.create(WidgetBase.prototype);
    Calendar.prototype.constructor = Calendar;

    return Calendar;
});