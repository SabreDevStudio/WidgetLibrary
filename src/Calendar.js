/**
 * We assume that first day of week is Monday
 * We assume that months are indexed from 1, not from 0 (to have January use 1, not 0).
 * by LoS we refer to length of stay
 *
 * WARN: Script uses Date.prototype.toLocaleString(), which implementation varies across platforms.
 * In the script I patch one IE problem with formatting. You will probably replace this formatting by array of strings for days of week and month names.
 */
define(['jquery', 'util/exceptions', 'mustache', 'stache!templates/calendar', 'util/feature_detection'], function ($, ex, Mustache, calendarTemplate, browser_features_package) {
    "use strict";

    /**
     * Creates DOM node structure for HTML table, representing calendar for one month
     *
     * @method createCalendar
     * @param {int} month number of month, 1 for January to 12 for December
     * @param {int} year year in yyyy format
     */
    return function Calendar(options) {

        validateOptions(options);
        setOptionsDefaults();

        function setOptionsDefaults() {
            options.locale = options.locale || window.navigator.language; // for example "en-US"
        }

        options.browser_features = (options.browser_features)? options.browser_features: browser_features_package; // dependency injection for testing

        function validateOptions(options) {
            if (typeof options === 'undefined') {
                throw new ex.IllegalArgumentException("You have to specify options");
            }
            if (typeof options.lengthOfStay === 'undefined') { // TODO: for one ways request you will not have LoS
                throw new ex.IllegalArgumentException("You have to specify lengthOfStay");
            }
            if (typeof options.currency === 'undefined' || !(/[A-Z]{3}/.test(options.currency))) {
                throw new ex.IllegalArgumentException("You have to specify currency, and options.currency must be valid 3 letter currency code, for example USD");
            }
            // if you do not provide failsafes, then on browsers not supporting localized Date.toLocaleString it will not display month name and week day names in calendar header
            if(options.localizedMonthNamesFailsafe && options.localizedMonthNamesFailsafe.length !== 12) {
                throw new ex.IllegalArgumentException("When providing fail safe for localized month names, you have to provide names for all 12 months..");
            }
            if(options.localizedWeekDayNamesFailsafe && options.localizedWeekDayNamesFailsafe.length !== 7) {
                throw new ex.IllegalArgumentException("When providing fail safe for localized names of days of week, you have to provide all 7 of them..");
            }
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

            var monthStartDay = new Date(options.year, options.month - 1);
            var monthEndDate = new Date(monthStartDay.getFullYear(), monthStartDay.getMonth() + 1, 0);

            // number of days this month has
            var monthNumberOfDays = monthEndDate.getDate();

            var monthStartDayOfWeek = monthStartDay.getDay();

            // convert 0 representing Sunday into 7
            monthStartDayOfWeek = (monthStartDayOfWeek===0) ? 7 : monthStartDayOfWeek;

            var prevMonthEndDate = new Date(options.year, options.month - 1);
            prevMonthEndDate.setDate(monthStartDay.getDate() - 1);
            var prevMonthEndDay = prevMonthEndDate.getDate();

            // push previous month day numbers to its last week
            for (var i = monthStartDayOfWeek - 2; i >= 0; i--) {
                prevMonthDaysOfLastWeek.push(prevMonthEndDay - i);
            }

            var monthEndDayOfWeek = monthEndDate.getDay();
            // convert 0 representing Sunday into 7
            monthEndDayOfWeek = (monthEndDayOfWeek===0) ? 7 : monthEndDayOfWeek;

            for (i = 1; i <= (7 - monthEndDayOfWeek); i++) {
                nextMonthDaysOfFirstWeek.push(i);
            }

            return {
                prevMonthDaysOfLastWeek: prevMonthDaysOfLastWeek,
                nextMonthDaysOfFirstWeek: nextMonthDaysOfFirstWeek,
                monthNumberOfDays: monthNumberOfDays,
                monthStartDayOfWeek: monthStartDayOfWeek
            };
        }

        function createModelData() {
            var monthStartDay = new Date(options.year, options.month - 1);

            var monthName;
            if (options.browser_features.localizedToLocaleStringSupported()) {
                monthName = monthStartDay.toLocaleString(options.locale, { month: "long" });
                // Remove the left-to-right marks that IE puts in the output of toLocaleString(). Only IE behaviour
                if (options.browser_features.isIE()) {
                    monthName = monthName.replace(/\u200E/g, '');
                }
            } else if (options.localizedMonthNamesFailsafe) {
                monthName = (options.localizedMonthNamesFailsafe)[options.month - 1]; // if this option is not defined then month name will nto be shown
            }

            var allWeeks = [];
            var currentWeek = {week: []};

            var bounds = getBounds();

            // 1. add days of last week of previous month (in the same week as the 1st day of current month)
            bounds.prevMonthDaysOfLastWeek.forEach(function (dayNumber) {
                currentWeek.week.push(
                    {
                        dayNumber: dayNumber,
                        isPrevOrNextMonthDay: true,
                        hidden: !(options.showDayNumbersPrevAndNextMonth)
                    }
                );
            });

            // 2. add this month all days
            for (var dayNumber = 1; dayNumber <= bounds.monthNumberOfDays; dayNumber++) {
                currentWeek.week.push({'dayNumber': dayNumber});
                if ((bounds.monthStartDayOfWeek + dayNumber - 1) % 7 === 0) {
                    allWeeks.push(currentWeek);
                    currentWeek = {week: []};
                }
            }
            if ((bounds.monthStartDayOfWeek + dayNumber) % 7 !== 0) {
                // 3. add days of first week of next month
                bounds.nextMonthDaysOfFirstWeek.forEach(function (dayNumber) {
                    currentWeek.week.push(
                        {
                            dayNumber: dayNumber,
                            isPrevOrNextMonthDay: true,
                            hidden: !(options.showDayNumbersPrevAndNextMonth)
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

            if (options.browser_features.localizedToLocaleStringSupported()) {
                for(var i = 0; i < 7; i++) {
                    var weekLocalizedStr = currentWeekDay.toLocaleString(options.locale, {weekday: 'short'});
                    // Remove the left-to-right marks that IE puts in the output of toLocaleString()
                    if (options.browser_features.isIE()) {
                        weekLocalizedStr = weekLocalizedStr.replace(/\u200E/g, '');
                    }
                    localizedWeekDayNames.push(weekLocalizedStr);
                    currentWeekDay.setDate(currentWeekDay.getDate() + 1);
                }
            } else {
                localizedWeekDayNames = options.localizedWeekDayNamesFailsafe; // if not provided then week day names in header will not be displayed
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

        function addEventHandlers(dom) {
            // by default we trace customer pointer, as it goes over calendar cells, highlighting all cells within customer specified LoS
            if ((typeof options.traceCustomerPointer === 'undefined') || (options.traceCustomerPointer === true)) {
                addTraceCustomerPointer(dom, options.lengthOfStay);
            }
        }

        this.render = function () {
            var data = createModelData();
            var calendarHTML = calendarTemplate(data);
            var calendarDOM = $(calendarHTML);
            addEventHandlers(calendarDOM);
            return calendarDOM;
        };
    };

});