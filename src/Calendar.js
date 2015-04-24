/**
 * We assume that first day of week is Monday
 * Months are indexed from 0, not from 1 (like Javascript Date object, or moment library).
 * Days are indexed from 1
 * By LoS we refer to length of stay
 *
 */
define(['WidgetBase', 'util/validator' ,'jquery', 'jquery-ui', 'lodash',
    'mustache',
    'stache!view-templates/Calendar.html',
    'stache!request-templates/AdvancedCalendarRequest.json',
    'util/feature_detection',
    'lib/commWrapper',
    'moment',
    'moment_range',
    'util/currencyFormatter',
    'util/DateFormatter',
    'util/PriceClassifier',
    "async",
    'util/exceptions',
    'datamodel/ShoppingData',
    'parsers/AdvancedCalendarResponseParser'
    ], function (WidgetBase, v, $, jqueryUIDummy, _, Mustache, calendarTemplate, requestTemplate, browser_features_package, comm, moment, moment_range, CurrencyFormatter, DateFormatter, PriceClassifier, async, ex, ShoppingData, AdvancedCalendarResponseParser) {
    "use strict";

    /**
     * Widget representing the Calendar of options. Every cell presents a price for travel originating on that day, with requested length of stay (LoS)
     *
     */
    function Calendar() {

        var DEFAULT_DATE_FORMAT = 'YYYY-M-D';

        Calendar.MAX_CALENDAR_DAYS_IN_CACHE = 192;

        this.dateFormatter = (window.SDS)? window.SDS.dateFormatter() : new DateFormatter(); //TODO: this is mandatory dependency, should be in contructor? But also very often default implementation is fine, rarely need to overrirde


        this.setDateFormatter = function(dateFormatter) {
            this.dateFormatter = dateFormatter;
        };
        var responseParser = new AdvancedCalendarResponseParser();

        WidgetBase.apply(this, arguments);

        var that = this;

        var monthBoundsCache = {};

        // we check if options exists at all, then then first we set defaults for options that have defaults, and only than we validate all options
        // we validate options after applying defauls as we are also checking relations between some options (like dates), so defaults must be already assigned

        v.notEmpty(this.options, "You have to specify options");

        setOptionsDefaults();

        validateOptions(this.options);

        var currencyFormatter = (window.SDS)? window.SDS.currencyFormatter() : new CurrencyFormatter({currency: this.options.currency}); //TODO: this is mandatory dependency, should be in contructor? But also very often default implementation is fine, rarely need to overrirde

        var searchCriteria = {
            origin: this.options.origin,
            destination: this.options.destination,
            lengthOfStay: this.lengthOfStay,
            currency: currencyFormatter.getCurrency()
        };

        function setOptionsDefaults() {
            /*jshint maxcomplexity: 25 */
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
                    return moment(that.options.departureDate).month();
                }
            })();
            that.options.optionsPerDay = that.options.optionsPerDay || 1;
            that.options.numberOfMonths = that.options.numberOfMonths || 1;
            that.options.globalOptionsCache = that.options.globalOptionsCache || new ShoppingData(); // if external common cache reference is not provided then we will use cache local to widget instance

            that.options.traceCustomerPointer = that.options.traceCustomerPointer || true;

            that.options.currentDate = (that.options.currentDate)? moment(that.options.currentDate, dateFormat): moment(); // for (unit) testing: exposing dependency on current time, which is used to determine start and end dates for call to the web service. See lastTravelDateAvailableInWebService

            that.lastTravelDateAvailableInWebService = that.options.currentDate.clone().add(Calendar.MAX_CALENDAR_DAYS_IN_CACHE, 'days');

            that.options.minDate = (that.options.minDate)? moment(that.options.minDate, dateFormat) : that.options.currentDate; //TODO filter within calendar cells if we can show this date
            that.options.maxDate = (that.options.maxDate)? moment(that.options.maxDate, dateFormat) : that.lastTravelDateAvailableInWebService;
            that.minDateStartOfMonth = that.options.minDate.clone().startOf('month');
            that.maxDateEndOfMonth = that.options.maxDate.clone().endOf('month');
            that.maxDateStartOfMonth = that.options.maxDate.clone().startOf('month');
        }

        function validateOptions(options) {
            /*jshint maxcomplexity: 25 */
            var dateFormat = options.dateFormat || DEFAULT_DATE_FORMAT;

            if (options.year && options.month) {
                that.userRequestedCalendarStartMonth = moment({year: options.year, month: options.month});
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

            v.airportCode(options.origin, "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");

            v.airportCode(options.destination, "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");

            if (typeof options.departureDate === 'undefined') {
                v.year(options.year, "If you do not specify departureDate then you have to specify valid travel year and month. Year in YYYY format, and month in MM format");
                v.month(options.month, "If you do not specify departureDate then you have to specify valid travel year and month. Year in YYYY format, and month in MM format. Month numbers start from 1, not from 0");
            }

            if (options.minDate) {
                v.notAfter(that.options.currentDate, options.minDate, dateFormat, "minimum date", "current date");
                if (options.departureDate) {
                    v.notAfter(options.minDate, options.departureDate, dateFormat, "calendar min date", "departure date");
                }
                if (that.userRequestedCalendarStartMonth) {
                    v.notAfter(that.minDateStartOfMonth, that.userRequestedCalendarStartMonth, dateFormat, "the month of calendar min date", "travel date from calendar options year and month");
                }
            }
            if (options.maxDate) {
                v.notAfter(options.maxDate, that.lastTravelDateAvailableInWebService, dateFormat, "maximum date", "maximum date that there are data in the web service, which is 192 days from now");
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
            if (options.tabs) {
                if (options.tabs <= 0) {
                    throw new ex.IllegalArgumentException("tabs option must be greater than 0");
                }
                if (options.numberOfMonths > 1) {
                    throw new ex.IllegalArgumentException("You can use tabbed presentation only with one month presented (numberOfMonths must be 1)");
                }
            }
        }

        /**
         * Returns object representing number of days in the specified month, and two arrays: one representing the days of
         * last week the of the previous month (in relation to the moth specified),
         * and one representing days of the first week of the next month.
         * @returns {{prevMonthDaysOfLastWeek: Array, nextMonthDaysOfFirstWeek: Array, monthNumberOfDays: number, monthStartDayOfWeek: number}}
         */
        function getMonthBounds(monthStartDate) {
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
        }

        function createModelData(prices, bounds, monthSeqNumber, totalMonths) {
            /*jshint maxcomplexity: 10 */
            var allWeeks = [];
            var currentWeek = {week: []};

            var createDataForPrevNextMonthDays = function (dayNumber) {
                return {
                    dayNumber: dayNumber,
                    isPrevOrNextMonthDay: true,
                    hidden: !(that.options.showDayNumbersPrevAndNextMonth)
                };
            };

            // 1. add days of last week of previous month (in the same week as the 1st day of current month)
            currentWeek.week = bounds.prevMonthDaysOfLastWeek.map(createDataForPrevNextMonthDays);

            // classifier will be needed to assign prices per day into price tiers (cheapest, second cheapest, and so on).
            if (prices) {
                var priceClassifier = new PriceClassifier(_.values(prices));
            }

            // 2. add this month all days and prices
            moment().range(bounds.monthStartDate, bounds.monthEndDate).by('days', function (day) {
                var dayCellData = {};
                dayCellData.dayNumber = day.date();
                if (prices && prices[day]) {
                    var currPrice = prices[day];
                    dayCellData.price = currencyFormatter.format(currPrice);
                    dayCellData.priceTier = priceClassifier.tier(currPrice);
                }
                currentWeek.week.push(dayCellData);
                if (currentWeek.week.length === 7) {
                    allWeeks.push(currentWeek);
                    currentWeek = {week: []};
                }
            });

            if (currentWeek.week.length < 7) {
                // 3. add days of first week of next month
                currentWeek.week = currentWeek.week.concat(
                    bounds.nextMonthDaysOfFirstWeek.map(createDataForPrevNextMonthDays)
                );
                allWeeks.push(currentWeek);
            }

            var noPricesFound = ((typeof prices === 'undefined') || (Object.keys(prices).length === 0) );

            var monthName = that.dateFormatter.getMonthLocalizedName(bounds.monthStartDate);

            return {
                noPricesFound: noPricesFound,
                monthSeqNumber: monthSeqNumber,
                month: bounds.monthStartDate.month(),
                year: bounds.monthStartDate.year(),
                monthName: monthName,
                monthLeadPrice:  (prices)? getMinimumObjectValue(prices): undefined,
                isTheFirstMonthShown: (monthSeqNumber === 1),
                prevInactive: (noPricesFound || (bounds.monthStartDate.isSame(that.minDateStartOfMonth) || bounds.monthStartDate.isBefore(that.minDateStartOfMonth))),
                isTheLastMonthShown: (monthSeqNumber === totalMonths),
                nextInactive: (noPricesFound || (bounds.monthEndDate.isSame(that.maxDateEndOfMonth) || (bounds.monthEndDate.isAfter(that.maxDateEndOfMonth)))),
                dayOfWeekNames: that.dateFormatter.getLocalizedWeekDayNames(),
                weeks: allWeeks
            };
        }

        function getMinimumObjectValue(object) {
            var allValues = Object.keys( object ).map(function ( key ) { return object [key]; });
            return Math.min.apply( null, allValues);
        }

        function getLosDays(thisDay, lengthOfStay) {
            // first add all next days in the same week to the nextDays array
            var nextDaysSameWeek = thisDay.nextAll().toArray();
            var allNextWeeksSameMonth = thisDay.parent().nextAll();

            // then add to it also all days from all next weeks, till the end of the month
            var thisAndNextDaysSameMonth = thisDay.toArray().concat(nextDaysSameWeek).concat(allNextWeeksSameMonth.children().toArray());

            // get all next days within LoS
            return _.take(thisAndNextDaysSameMonth, lengthOfStay + 1); // in LoS we include both arrival day and departure day
        }

        /**
         * Adds handler for mouseenter and mouseleave events to highlight the mouse entered calendar cell and all next cells within LoS
         * @param calendarNode
         * @param lengthOfStay
         */
        function addTraceCustomerPointer(calendarNode, lengthOfStay) {

            var calendarCells = $(calendarNode).find("td.SDSCalendarCell");

            calendarCells.mouseenter(function () {
                var allLoSdays = getLosDays($(this), lengthOfStay);
                allLoSdays.forEach(function (cell) {
                    $(cell).addClass("SDSHighlight");
                });
            });

            calendarCells.mouseleave(function () {
                var allLoSdays = getLosDays($(this), lengthOfStay);
                allLoSdays.forEach(function (cell) {
                    $(cell).removeClass("SDSHighlight");
                });
            });
        }

        function addInternalEventHandlers(dom) {
            // by default we trace customer pointer, as it goes over calendar cells, highlighting all cells within customer specified LoS
            if (that.options.traceCustomerPointer) {
                addTraceCustomerPointer(dom, that.lengthOfStay);
            }
            // listeners on prev and next month links
            var prevLink = $(dom).find('caption > .SDSNavigationLink.SDSPrev:not(.SDSInactive)');
            prevLink.click(function () {
                // on click inactivate the link (till results are loaded), and disable click handler on this link
                $(this).addClass('SDSInactive');
                $(this).off('click');
                that.render(null, -1);
            });
            var nextLink = $(dom).find('caption > .SDSNavigationLink.SDSNext:not(.SDSInactive)');
            nextLink.click(function () {
                $(this).addClass('SDSInactive');
                $(this).off('click');
                that.render(null, 1);
            });
        }

        function setUpExternalListenableEvents(dom) {
            var allCalendarCells = $(dom).find('.SDSCalendarCell:has(> .SDSCalendarCellPrice)');
            allCalendarCells.click(function () {
                var dayOfMonth = $(this).children('.SDSCalendarDateNumber').html();
                var month = $(this).closest('.SDSCalendar').data('month');
                var year  = $(this).closest('.SDSCalendar').data('year');
                var thisDay = moment({year: year, month:month, day: dayOfMonth});
                var calendarDayItineraries = that.options.globalOptionsCache.getItinerariesList(searchCriteria, thisDay);
                that.trigger('calendarCellClicked', calendarDayItineraries);
            });
        }

        function addTabs(dom, numberOfTabs) {
            return $(dom).tabs({
                heightStyle:"content",
                active: Math.floor(numberOfTabs / 2)
            });
        }

        this.createWebServiceRequest = function(startDate, endDate) { // public for unit testing
            var requestOptions = {};
            var keys = ['origin', 'destination', 'optionsPerDay'];
            keys.forEach(function (key) {
                requestOptions[key] = that.options[key];
            });
            requestOptions.fromDate = startDate.format('YYYY-MM-DD');
            requestOptions.toDate = endDate.format('YYYY-MM-DD');
            requestOptions.lengthOfStay = that.lengthOfStay;
            return requestTemplate(requestOptions);
        };

        /**
         * Creates actual calendar jquery object and passes it to client callback.
         * Client, in their callback, will typically append that calendar object to their DOM.
         *
         * Typically the second argument (prices) is not provided and the widget does call to the web service for prices.
         * If second argument is provided (for example while testing), then web service call is not done and prices from the second argument are used.
         *
         * @param clientCallback
         */
        this.render = function(clientCallback, offsetMonths) {
            var startMonth = this.firstMonthCurrentlyShown || this.userRequestedCalendarStartMonth;
            var endMonth;
            startMonth.add(offsetMonths, 'months');
            if (this.options.tabs && this.options.tabs > 1) {
                var adjacentMonths = this.generateAdjacentMonths(startMonth, this.options.tabs - 1);
                startMonth = adjacentMonths.startMonth;
                endMonth = adjacentMonths.endMonth;
            } else {
                endMonth = startMonth.clone().add(this.options.numberOfMonths - 1, 'month');
            }

            var monthsToRender = generateMonths(startMonth, endMonth);

            if (this.options.minDate || this.options.maxDate) {
                monthsToRender = adjustToMinMaxDates(monthsToRender);
            }

            async.concatSeries(monthsToRender, renderOneMonth, function (err, allMonthsData) {
                    var calendarHTML = calendarTemplate({
                        uuid: that.uuid,
                        origin: allMonthsData[0].origin,
                        tabsUsed: (that.options.tabs > 1),
                        totalMonths: monthsToRender.length,
                        slots: allMonthsData
                    });
                    var calendarDOM = $(calendarHTML);

                    if (that.options.tabs && that.options.tabs > 1) {
                        calendarDOM = addTabs(calendarDOM, that.options.tabs);
                    }
                    addInternalEventHandlers(calendarDOM);
                    setUpExternalListenableEvents(calendarDOM);
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
            var totalMonths = monthObject.totalMonths;
            var monthSeqNumber = monthObject.monthSeqNumber;

            // 1. make sure we have bounds in bounds cache for every month to be displayed:
            if (!monthBoundsCache[month]) {
                monthBoundsCache[month] = getMonthBounds(month);
            }

            // 2. for every month to be displayed:
            //    if there are data for this month in global cache, get data from cache and render
            //    if no data in global cache then create web service request and pass callback to render this month to the data source fetch function
            var calendarModelData;
            if (that.options.testPrices && that.options.testPrices[month]) {
                calendarModelData = createModelData(that.options.testPrices[month], monthBoundsCache[month], monthSeqNumber, totalMonths, searchCriteria);
                callback(null, calendarModelData);
            }
            else if (that.options.globalOptionsCache.contains(searchCriteria, month)) {
                var pricesForWholeMonth = that.options.globalOptionsCache.getLeadPrices(searchCriteria, month);
                calendarModelData = createModelData(pricesForWholeMonth, monthBoundsCache[month], monthSeqNumber, totalMonths, searchCriteria);
                callback(null, calendarModelData);
            } else {
                var requestStartDate = that.options.currentDate;
                var requestEndDate = that.lastTravelDateAvailableInWebService;
                var request = that.createWebServiceRequest(requestStartDate, requestEndDate); //TODO: filter out from request the months that we already have.
                that.dataSourceFetchFn(request, function (err, data) {
                    if (err && err.status !== 404) { // 404 is not error but valid business response
                        callback(err);
                    }
                    var shoppingData = responseParser.parseResponse(data, requestStartDate, requestEndDate, searchCriteria);
                    calendarModelData = createModelData(shoppingData.getLeadPrices(searchCriteria, month), monthBoundsCache[month], monthSeqNumber, totalMonths, searchCriteria);

                    // update cache for all months that we requested
                    that.options.globalOptionsCache.addUpdate(shoppingData);
                    callback(null, calendarModelData);
                });
            }
        }

        /*
            generates bounds for adjacent months by adding months around the central month.
            It starts adding on the right of the central month, adds one month, then adds another to the left of central month, and then loops again
            Returns leftmost month and rightmost month
         */
        this.generateAdjacentMonths = function(centralMonth, monthsToAdd) { // privileged for unit testing
            if (monthsToAdd < 1) {
                throw new ex.IllegalArgumentException("at least one month to add as adjacent is needed");
            }
            var numberToAddPerSide = Math.floor(monthsToAdd / 2);
            var numberToAddToTheRight = monthsToAdd % 2;
            return {
                startMonth: centralMonth.clone().subtract(numberToAddPerSide, 'month'),
                endMonth:   centralMonth.clone().add(numberToAddPerSide + numberToAddToTheRight, 'month')
            };
        };

        function generateMonths(startMonth, endMonth) {
            var monthsArray = [];
            moment().range(startMonth, endMonth).by('months', function (month) {
                monthsArray.push(month);
            });
            return monthsArray.map(function (month, idx, array) {
                return {
                    month: month,
                    monthSeqNumber: idx + 1,
                    totalMonths: array.length
                };
            });
        }

        // check if months to render validate min and max dates, if not then shift and trim.
        function adjustToMinMaxDates(monthDescriptors) {
            var requestedRange = moment().range(monthDescriptors[0].month, monthDescriptors[monthDescriptors.length - 1].month);
            var allowedRange   = moment().range(that.minDateStartOfMonth, that.maxDateStartOfMonth);

            // 1. if requested moth range fulls fully within allowed range then do not change anything:
            if (requestedRange.start.within(allowedRange) && requestedRange.end.within(allowedRange)) {
                return monthDescriptors;
            }
            // 2. if length of requested range is not greater than the length of allowed range then shift requested range into the allowed range:
            if (requestedRange <= allowedRange) { // this compares range lengths in millis, documentation: https://github.com/gf3/moment-range
                var difference;
                if (requestedRange.start.isBefore(allowedRange.start)) {
                    difference = allowedRange.start.diff(requestedRange.start, 'months');
                    monthDescriptors.forEach(function(monthDescriptor) {
                        monthDescriptor.month.add(difference, 'months');
                    });
                    return monthDescriptors;
                }
                if (requestedRange.end.isAfter(allowedRange.end)) {
                    difference = requestedRange.end.diff(allowedRange.end, 'months');
                    monthDescriptors.forEach(function(monthDescriptor) {
                        monthDescriptor.month.subtract(difference, 'months');
                    });
                    return monthDescriptors;
                }
            }

            //3. otherwise, we have to shift into allowed range and then trim what stands out
            // Calculate the difference, in months, between min date and first requested date.
            // If first requested date is less than min date than this number will be positive - we will then shift to right by this number of months
            var diff = allowedRange.start.diff(requestedRange.start, 'months');
            if (diff > 0) {
                monthDescriptors.forEach(function(monthDescriptor) {
                    monthDescriptor.month.add(diff, 'months');
                });
            }
            // trim all months that are over max allowed date:
            return monthDescriptors.filter(function (monthDescriptor) {
                return (monthDescriptor.month.isBefore(allowedRange.end) || monthDescriptor.month.isSame(allowedRange.end));
            });
        }
    }

    Calendar.prototype = Object.create(WidgetBase.prototype);
    Calendar.prototype.constructor = Calendar;

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

    return Calendar;
});