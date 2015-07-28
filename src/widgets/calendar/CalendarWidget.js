/**
 * We assume that first day of week is Monday
 * Months are indexed from 0, not from 1 (like Javascript Date object, or moment library).
 * Days are indexed from 1
 * By LoS we refer to length of stay
 *
 * This widget and other widgets adopt MVC architecture, with the following design decisions:
 * - Controllers (annotated in method comments as @Controller) are possibly thin and only update the Model. They update the Model by calling functions that build the new model. Model details are not hidden from Controllers into separate class.
 * - Views, on view changes, call a controller function (onEvent...). So they know explicitly about controllers and call specific controllers. There is no internal "viewChanged..." event that views emit and controllers listen to.
 * - Model: on its update, executes function to update view. No (typical) Observer pattern (view observing the model).
 */
define(['../ShoppingDataDisplayWidget', 'widgets/calendar/CalendarMonthBounds', 'util/validator', 'jquery', 'util/jQueryExtensions', 'jquery-ui', 'util/LodashExtensions',
    'mustache',
    'stache!view-templates/Calendar.html',
    'util/feature_detection',
    'moment',
    'moment_range',
    'util/momentRangeUtils',
    'util/currencyFormatter',
    'util/DateFormatter',
    'util/PriceClassifier',
    "async",
    'util/exceptions',
    'datamodel/ShoppingData',
    'webservices/OTAResponseParser',
    'datamodel/SearchCriteria',
    '../../webservices/advancedCalendar/AdvancedCalendarWebService'
], function (ShoppingDataDisplayWidget, CalendarMonth, v, $, $$, jqueryUIDummy, _
    , Mustache, calendarTemplate, browser_features_package, moment, moment_range, momentRangeUtils, CurrencyFormatter, DateFormatter, PriceClassifier, async, ex
    , ShoppingData, OTAResponseParser, SearchCriteria, AdvancedCalendarWebService) {
    "use strict";

    /**
     * Widget representing the Calendar of options. Every cell presents a price for travel originating on that day, with requested length of stay (LoS)
     *
     * By default this widget fetches from Advanced Calendar REST service.
     */
    function Calendar() {

        // the model object representing Model from MVC
        var dataModel;

        // we persist the last search criteria (from last newSearch), as they are reused when building new model for the prev/next month we navigate to.
        var lastSearchCriteria;

        // to control logic to be executed only for the first view rendering
        var isFirstSearch = true;

        this.dateFormatter = (window.SDS) ? window.SDS.dateFormatter() : new DateFormatter();

        this.setDateFormatter = function (dateFormatter) {
            this.dateFormatter = dateFormatter;
        };

        // TODO expose as external dependency so that this calendar can work also with other services.
        // var responseParser = new AdvancedCalendarResponseParser();
        var responseParser = new OTAResponseParser();

        ShoppingDataDisplayWidget.apply(this, arguments);

        var webService = this.options.webService || new AdvancedCalendarWebService(); //TODO: same: move creation of this default object into external factory?

        var that = this;

        // we check if options exists at all, then then first we set defaults for options that have defaults, and only than we validate all options
        // we validate options after applying defaults as we are also checking relations between some options (like dates), so defaults must be already assigned
        v.notEmpty(this.options, "You have to specify options");

        setOptionsDefaults();

        validateOptions(this.options);

        var currencyFormatter = (window.SDS) ? window.SDS.currencyFormatter() : new CurrencyFormatter({
            currency: this.options.currency,
            locale: this.options.locale
        });

        function createOptionsCacheKey(searchCriteria) {
            return searchCriteria.origin + '-' + searchCriteria.destination + '-' + searchCriteria.lengthOfStay + '-' + that.options.currency;
        }

        function setOptionsDefaults() {
            that.options.dateFormat = that.options.dateFormat || that.OPTIONS_DEFAULT_DATE_FORMAT;

            that.options.browser_features = that.options.browser_features || browser_features_package; // dependency injection for unit testing

            that.options.optionsPerDay = that.options.optionsPerDay || 1;
            that.options.numberOfMonthsToShow = that.options.numberOfMonthsToShow || 1;
            that.options.globalOptionsCache = that.options.globalOptionsCache || new ShoppingData(); // if external common cache reference is not provided then we will use cache local to widget instance

            that.options.traceCustomerPointer = that.options.traceCustomerPointer || true;

            that.options.currentDate = (that.options.currentDate)? moment(that.options.currentDate, that.options.dateFormat) : moment(); // for (unit) testing: exposing dependency on current time, which is used to determine start and end dates for call to the web service. See lastTravelDateAvailableInWebService
            that.options.minDate = (that.options.minDate) ? moment(that.options.minDate, that.options.dateFormat) : that.options.currentDate; //TODO filter within calendar cells for first month if we can show all days
            that.options.maxDate = (that.options.maxDate) ? moment(that.options.maxDate, that.options.dateFormat) : undefined;

            var maxRequestedTravelOutboundDateFromWebService = webService.maxRequestedTravelOutboundDate();

            if (_.isUndefined(that.options.maxDate) && _.isDefined(maxRequestedTravelOutboundDateFromWebService)) {
                that.options.maxDate = maxRequestedTravelOutboundDateFromWebService;
            } else if (_.isDefined(maxRequestedTravelOutboundDateFromWebService)) {
                that.options.maxDate = moment.min(that.options.maxDate, maxRequestedTravelOutboundDateFromWebService);
            }

            that.minDateStartOfMonth = that.options.minDate.clone().startOf('month');

            if (_.isDefined(that.options.maxDate)) {
                that.maxDateStartOfMonth = that.options.maxDate.clone().startOf('month');
                that.maxDateEndOfMonth = that.options.maxDate.clone().endOf('month');
            }
        }

        function validateOptions(options) {
            if (options.minDate) {
                v.notAfter(that.options.currentDate, options.minDate, that.options.dateFormat, "minimum date", "current date");
            }
            if (options.minDate && options.maxDate) {
                v.notAfter(options.minDate, options.maxDate, that.options.dateFormat, "calendar max date", "calendar min date");
                if (options.numberOfMonthsToShow) {
                    var maxNumberOfMonthsFromMinAndMaxDates = that.maxDateEndOfMonth.clone().add(1, 'month').diff(that.minDateStartOfMonth);
                    v.notGreaterThan(options.numberOfMonthsToShow, maxNumberOfMonthsFromMinAndMaxDates);
                }
            }
            if (options.tabs && options.tabs <= 0) {
                throw new ex.IllegalArgumentException("tabs option must be greater than 0");
            }
        }

        function createMonthModel(prices, bounds, monthSeqNumber, totalMonths) {
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
                var dayKey = day.format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                if (prices && prices[dayKey]) {
                    var currPrice = prices[dayKey];
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

            var noPricesFound = (_.isUndefined(prices) || (_.values(prices).length === 0) );

            var monthName = that.dateFormatter.getMonthLocalizedName(bounds.monthStartDate);

            return {
                month: bounds.monthStartDate,
                monthSeqNumber: monthSeqNumber,
                monthNumber: bounds.monthStartDate.month(),
                yearNumber: bounds.monthStartDate.year(),
                monthName: monthName,
                noPricesFound: noPricesFound,
                monthLeadPrice: _.minOfValues(prices),
                isTheFirstMonthShown: (monthSeqNumber === 1),
                isTheLastMonthShown: (monthSeqNumber === totalMonths),
                prevInactive: (noPricesFound || (bounds.monthStartDate.isSame(that.minDateStartOfMonth) || bounds.monthStartDate.isBefore(that.minDateStartOfMonth))),
                nextInactive: (noPricesFound || (bounds.monthEndDate.isSame(that.maxDateEndOfMonth) || (bounds.monthEndDate.isAfter(that.maxDateEndOfMonth)))),
                dayOfWeekNames: that.dateFormatter.getLocalizedWeekDayNames(),
                weeks: allWeeks
            };
        }

        /**
         * Adds handler for mouseenter and mouseleave events to highlight the mouse entered calendar cell and all next cells within LoS
         * @param calendarNode
         * @param lengthOfStay
         */
        function addTraceCustomerPointer(calendarNode, lengthOfStay) {

            var calendarCells = $(calendarNode).find("td.SDSCalendarCell");

            calendarCells.mouseenter(function () {
                var allLoSdays = $$(this).nextAllAndFirstLevelCousins(lengthOfStay + 1); // in length of stay highlight we include both departure and return day ( that's why + 1)
                allLoSdays.forEach(function (cell) {
                    $(cell).addClass("SDSHighlight");
                });
            });

            calendarCells.mouseleave(function () {
                var allLoSdays = $$(this).nextAllAndFirstLevelCousins(lengthOfStay + 1);
                allLoSdays.forEach(function (cell) {
                    $(cell).removeClass("SDSHighlight");
                });
            });
        }

        function addInternalEventHandlers(dom) {
            // by default we trace customer pointer, as it goes over calendar cells, highlighting all cells within customer specified LoS
            if (that.options.traceCustomerPointer) {
                addTraceCustomerPointer(dom, lastSearchCriteria.lengthOfStay);
            }
            // listeners on prev and next month links
            var prevLink = $(dom).find('caption > .SDSIconNavigationLink.SDSPrevIcon:not(.SDSInactive)');
            prevLink.click(function () {
                // on click inactivate the link (till results are loaded), and disable click handler on this link
                $(this).addClass('SDSInactive');
                $(this).off('click');
                that.onNavigationLinkClicked.call(that, that.NavigationLinkType.Prev);
            });
            var nextLink = $(dom).find('caption > .SDSIconNavigationLink.SDSNextIcon:not(.SDSInactive)');
            nextLink.click(function () {
                $(this).addClass('SDSInactive');
                $(this).off('click');
                that.onNavigationLinkClicked.call(that, that.NavigationLinkType.Next);
            });
        }

        function setUpExternalListenableEvents(dom) {
            var allCalendarCells = $(dom).find('.SDSCalendarCell:has(> .SDSCalendarCellPrice)');
            allCalendarCells.click(function () {
                var dayOfMonth = $(this).children('.SDSCalendarDateNumber').html();
                var month = $(this).closest('.SDSCalendar').data('month');
                var year = $(this).closest('.SDSCalendar').data('year');
                var thisDay = moment({year: year, month: month, day: dayOfMonth});
                var optionsCacheKey = createOptionsCacheKey(lastSearchCriteria);
                var calendarDayItineraries = that.options.globalOptionsCache.getItinerariesList(optionsCacheKey, thisDay);
                that.trigger('calendarCellClicked', calendarDayItineraries);
            });
        }

        function addTabs(dom) {
            if (_.isUndefined(that.options.tabs)) {
                return;
            }
            var activeTabIndex = Math.floor(that.options.tabs / 2);
            $(dom).tabs({
                heightStyle: "content",
                active: activeTabIndex
            });
        }

        var getMonthBounds = _.memoize(function(month) {
            return new CalendarMonth(month);
        });

        function renderOneMonth(monthObject, callback) {
            var month = monthObject.month;
            var totalMonths = monthObject.totalMonths;
            var monthSeqNumber = monthObject.monthSeqNumber;

            // 1. make sure we have bounds in bounds cache for every month to be displayed:
            var monthBounds = getMonthBounds(month);

            // 2. for every month to be displayed:
            //    if there are data for this month in global cache, get data from cache and render
            //    if no data in global cache then create web service request and pass callback to render this month to the data source fetch function
            var calendarModelData;
            var optionsCacheKey = createOptionsCacheKey(lastSearchCriteria);
            var monthKey = month.format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
            if (that.options.testPrices && that.options.testPrices[monthKey]) {
                calendarModelData = createMonthModel(that.options.testPrices[monthKey], monthBounds, monthSeqNumber, totalMonths);
                callback(null, calendarModelData);
            } else if (that.options.globalOptionsCache.contains(optionsCacheKey, month)) {
                var pricesForWholeMonth = that.options.globalOptionsCache.getLeadPricesForMonth(optionsCacheKey, month);
                calendarModelData = createMonthModel(pricesForWholeMonth, monthBounds, monthSeqNumber, totalMonths);
                callback(null, calendarModelData);
            } else {
                var requestStartDate = that.options.currentDate;
                var requestEndDate = that.lastTravelDateAvailableInWebService;
                var webServiceRequestOptions = ({
                      origin: lastSearchCriteria.origin
                    , destination: lastSearchCriteria.destination
                    , requestStartDate: requestStartDate
                    , requestEndDate: requestEndDate
                    , lengthOfStay: lastSearchCriteria.lengthOfStay
                    , optionsPerDay: that.options.optionsPerDay
                }); //TODO: filter out from request the months that we already have.
                webService.sendRequest(webServiceRequestOptions, function (err, data) {
                    if (err && err.status !== 404) { // do not parse errors other that 404. 404 is a valid business response.
                        callback(err);
                    }

                    var itinerariesList = responseParser.parse(data);
                    var shoppingData = new ShoppingData();
                    shoppingData.markRequestedData(optionsCacheKey, requestStartDate, requestEndDate);
                    itinerariesList.getItineraries().forEach(function(itineary) {
                        shoppingData.addItinerary(optionsCacheKey, itineary, itineary.getOutboundDepartureDateTime());
                    });
                    shoppingData.updateLeadPrices(optionsCacheKey);

                    calendarModelData = createMonthModel(shoppingData.getLeadPricesForMonth(optionsCacheKey, month), monthBounds, monthSeqNumber, totalMonths);

                    // update cache for all months that we requested
                    that.options.globalOptionsCache.addUpdate(shoppingData); //TODO: hide using cache at all from this service
                    callback(null, calendarModelData);
                });
            }
        }

        /* generates array of objects representing months and their sequence numebr in the array.
         * Needed for rendering which is done independently for every month (and rendering must know which month in sequence it is and what is the total number of months */
        function generateMonths(monthsRange) {
            var monthsArray = [];
            monthsRange.by('months', function (month) {
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

        /**
         * @Controller
         * Main controller, executed for every new search. Typically called by SearchFormWidget or from client client code.
         * The second argument: callbackOnViewUpdate, is optional.
         * @param searchCriteria
         * @param callbackOnViewUpdate
         */
        this.newSearch = function (searchCriteria, callbackOnViewUpdate) {
            searchCriteria = _.extend({}, searchCriteria);
            this.setDefaults(searchCriteria);
            lastSearchCriteria = searchCriteria;
            var requestModelMonths = this.createRequestModelMonths(searchCriteria);

            callbackOnViewUpdate = this.setCallbackForTheFirstSearch(callbackOnViewUpdate);
            this.populateDataModel(requestModelMonths, function (allMonthsDataModel) {
                that.updateDataModel(allMonthsDataModel, callbackOnViewUpdate);
            });
        };

        // @Controller
        this.onNavigationLinkClicked = function (navigationLinkType) {
            var newFirstMonth = dataModel[0].month.clone();
            switch (navigationLinkType) {
                case (this.NavigationLinkType.Prev):
                    newFirstMonth.subtract(1, 'month');
                    break;
                case (this.NavigationLinkType.Next):
                    newFirstMonth.add(1, 'month');
                    break;
            }
            var requestModelMonths = this.createRequestModelMonths(lastSearchCriteria, newFirstMonth);
            this.populateDataModel(requestModelMonths, function (allMonthsDataModel) { //TODO dup
                that.updateDataModel(allMonthsDataModel);
            });
        };


        this.setCallbackForTheFirstSearch = function (callbackOnViewUpdate) {
            if (_.isUndefined(callbackOnViewUpdate) && isFirstSearch) {
                isFirstSearch = false;
                if (_.isUndefined(that.options.callbackOnViewCreate)) {
                    throw new Error('you have to either pass callback on view update, or define callbackOnViewCreate when creating calendar');
                }
                callbackOnViewUpdate = that.options.callbackOnViewCreate;
            }
            return callbackOnViewUpdate;
        };

        this.setDefaults = function (searchCriteria) {
            searchCriteria.lengthOfStay = searchCriteria.lengthOfStay || moment(searchCriteria.returnDate).diff(moment(searchCriteria.departureDate), 'days');
        }

        /** translates user search criteria into requested calendar model. //TODO describe both models, maybe in class header, describe that it is MVC, how view is updated.
         * Here the business logic what calendar data to show to customer based on their search criteria
         * @param searchCriteria
         */
        this.createRequestModelMonths = function (searchCriteria, firstMonthToShow) {
            var calendarRequestedModel = {};
            calendarRequestedModel.lengthOfStay = moment(searchCriteria.returnDate).diff(moment(searchCriteria.departureDate), 'days'); //TODO not used
            // as search criteria searchCriteria.departureDate we accept both JS Date object and string in the format defined or predefined (default)
            var firstMonthToShow = firstMonthToShow || (_.isDate(searchCriteria.departureDate))? moment(searchCriteria.departureDate) : moment(searchCriteria.departureDate, that.options.dateFormat);
            var rangeOfMonthsToShow = this.createRangeOfMonthsToShow(firstMonthToShow);
            var requestModelMonths = generateMonths(rangeOfMonthsToShow); //TODO move it into next function??
            return requestModelMonths;
        };

        function tabsDisplayRequested() {
            return that.options.tabs && that.options.tabs > 1;
        }

        function minOrMaxDateConstraintPresent() {
            return that.options.minDate || that.options.maxDate;
        }

        this.createRangeOfMonthsToShow = function (firstMonthToShow) {
            var firstMonthShown = firstMonthToShow.clone().startOf('month');
            var lastMonthShown = firstMonthShown.clone().add(that.options.numberOfMonthsToShow - 1, 'month');
            var requestedRange = moment.range(firstMonthShown, lastMonthShown);

            if (tabsDisplayRequested()) {
                requestedRange = moment.generateAdjacentMonths(requestedRange.start, this.options.tabs - 1);
            }

            if (minOrMaxDateConstraintPresent()) {
                var allowedRange = moment.range(that.minDateStartOfMonth, that.maxDateStartOfMonth);
                requestedRange = moment.adjustToMinMaxDates(requestedRange, allowedRange);
            }
            return requestedRange;
        };

        this.populateDataModel = function (requestModelMonths, callback) {
            async.concatSeries(requestModelMonths, renderOneMonth, function (err, allMonthsDataModel) { //TODO rename renderOneMonth into populateOneMonth
                callback(allMonthsDataModel);
            });
        };

        this.updateDataModel = function (allMonthsDataModel, callbackOnViewUpdate) {
            dataModel = allMonthsDataModel;
            that.updateView(callbackOnViewUpdate);
            that.trigger('searchComplete');
        };

        this.createDOM  = function () {
            var calendarHTML = calendarTemplate({
                uuid: that.uuid,
                tabsUsed: (that.options.tabs > 1),
                slots: dataModel
            });
            var calendarDOM = $(calendarHTML);

            addInternalEventHandlers(calendarDOM);
            setUpExternalListenableEvents(calendarDOM);
            addTabs(calendarDOM);
            return calendarDOM;
        };

    }

    Calendar.prototype = Object.create(ShoppingDataDisplayWidget.prototype);
    Calendar.prototype.constructor = Calendar;

    Calendar.prototype.OPTIONS_DEFAULT_DATE_FORMAT = 'YYYY-M-D';

    Calendar.prototype.NavigationLinkType = Object.freeze({
        'Prev': 'Prev',
        'Next': 'Next'
    });

    return Calendar;
});