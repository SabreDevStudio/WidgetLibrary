(function(window, undefined) {
    "use strict";

    // $ variable to store the jQuery version we will be using inside SDK
    var $;

    /**
     * Returns the jQuery already loaded, if satisfies the exact jQuery version, or loads it from CDN
     * @param version exactly the version required
     */
    function loadJQuery(version, callback) {
        // version loaded already fills our requirements
        if ((window.jQuery) && (window.jQuery.fn.jquery == version)) {
            $ = window.jQuery;
            callback();
        // load jQuery if not loaded or in not version we want
        } else {
            var script = document.createElement('script');
            script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/" + version + "/jquery.min.js");

            var scriptInsertPoint = document.getElementsByTagName('script')[0];
            scriptInsertPoint.parentNode.insertBefore(script, scriptInsertPoint);

            if (script.readyState) { // if IE8 and older
                script.onreadystatechange = function () {
                    if (/complete|loaded/.test(script.readyState)) {
                        $ = scriptLoadedHandler();
                        script.onload = null; // deregister event handlers to protect from IE memory leaks
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            } else { // other browsers
                script.onload = function () {
                    $ = scriptLoadedHandler();
                    script.onload = null; // deregister event handlers to protect from IE memory leaks
                    script.onreadystatechange = null;
                    callback();
                }
            }
        }
    }

    function scriptLoadedHandler() {
        return window.jQuery.noConflict(true);
    }

    // pad with empty cells for beginning of the week before 1st day of the month.
    // if options.showDayNumbersPrevAndNextMonth set then pad with previous month days
    function padPreviousMonthDays(monthStartDay, rowToAppendTo, showDayNumbersPrevAndNextMonth) {

        var monthStartDayOfWeek = monthStartDay.getDay();

        // convert 0 representing Sunday into 7
        monthStartDayOfWeek = (monthStartDayOfWeek===0) ? 7 : monthStartDayOfWeek;

        var prevMonthEndDate = new Date();
        prevMonthEndDate.setDate(monthStartDay.getDate() - 1);
        var prevMonthEndDay = prevMonthEndDate.getDate();

        var currentDayOfWeek = 1; //1 means Monday

        if ( (typeof showDayNumbersPrevAndNextMonth === 'undefined') || (showDayNumbersPrevAndNextMonth !== true)) {
            while(currentDayOfWeek++ < monthStartDayOfWeek) {
                rowToAppendTo.append($("<td></td>"));
            }
        } else {
            var prevMonthDay;
            while(currentDayOfWeek++ < monthStartDayOfWeek) {
                prevMonthDay = prevMonthEndDay - (monthStartDayOfWeek - currentDayOfWeek);
                rowToAppendTo.append($("<td class='calendarCell prevNextMonth'><div class='tmp'><div class='calendarDateNumber'>" + prevMonthDay + "</div></div></td>"));
            }
        }
        return currentDayOfWeek;
    }

    // pad with empty cells till end of the week of the last day of the month
    // if options.showDayNumbersPrevAndNextMonth set then pad with next month days
    // TODO: first create calendar model and then render it. Now in one functiion you have model and logic and rendering, very bad!!
    function padNextMonthDays(currentDayOfWeek, rowToAppendTo, showDayNumbersPrevAndNextMonth) {
        if ( (typeof showDayNumbersPrevAndNextMonth === 'undefined') || (showDayNumbersPrevAndNextMonth !== true)) {
            for (var i = currentDayOfWeek; i < 7; i++) { // if currentDauOfTheWeek is 7 then it will not execute - no need to add next days
                rowToAppendTo.append($("<td></td>"));
            }
        } else {
            console.log(currentDayOfWeek);
            for (var i = currentDayOfWeek; i < 7; i++) { // if currentDauOfTheWeek is 7 then it will not execute - no need to add next days
                rowToAppendTo.append($("<td class='calendarCell prevNextMonth'><div class='tmp'><div class='calendarDateNumber'>" + i + "</div></div></td>"));
            }
        }
    }

    /**
     * Returns DOM node structure, HTML table, representing calendar for one month
     *
     * @method createCalendar
     * @param {int} month number of month, 0 for January to 11 for December
     * @param {int} year year,  values from 0 to 99 map to the years 1900 to 1999.
     */
    function createCalendar(options) {
        var calendar = $("<table class='calendar'></table>");
        var monthStartDay = new Date(options.year, options.month - 1);
        var monthNameString = monthStartDay.toLocaleString(window.navigator.language, { month: "long" });
        calendar.append($("<caption>" + monthNameString + "</caption>"));

        var daysOfWeekHeader = $("<thead></thead>").append($("<tr></tr>"));
        getLocalizedWeekDayNames().forEach(function(dayOfWeek){
            daysOfWeekHeader.append($("<th>" + dayOfWeek + "</th>"));
        });
        calendar.append(daysOfWeekHeader);

        calendar.append("<tbody></tbody>");

        var row = $("<tr></tr>");

        var monthEndDay = new Date(monthStartDay.getFullYear(), monthStartDay.getMonth() + 1, 0).getDate();

        // TODO add unit tests!! on DOM level
        var currentDayOfWeek = padPreviousMonthDays(monthStartDay, row, options.showDayNumbersPrevAndNextMonth); //TODO refactor: working by function side effect, extract logic for first date of the week

        var dayNumber;
        var currencyFormatter = new Intl.NumberFormat(window.navigator.language, {style: 'currency', currency: options.currency});
        for (dayNumber = 1; dayNumber <= monthEndDay; dayNumber++) {
            row.append($("<td class='calendarCell'><div class='tmp'><div class='calendarDateNumber'>" + dayNumber +
            "</div><div class='calendarCellPrice'><p>" + currencyFormatter.format(dayNumber*1000 + 0.23) +
            "</p></div></div></td>"));
            if ((currentDayOfWeek + dayNumber - 2) % 7 === 0) {
                calendar.append(row);
                row = $("<tr></tr>");
            }
        }
        if ((currentDayOfWeek + dayNumber) % 7 !== 0) {
            // TODO: not working
            padNextMonthDays(currentDayOfWeek, row, options.showDayNumbersPrevAndNextMonth);
            calendar.append(row);
        }

        return calendar;
    };

    /**
     * @return {Array} Array of localized strings representing days of week
     */
    function getLocalizedWeekDayNames() {
        var localizedWeekDayNames = [];
        var weekStartingWithMonday = new Date(2015, 5, 1); // 1 June 2015 starts with Mon
        for(var i = 0; i < 7; i++) {
            localizedWeekDayNames.push(weekStartingWithMonday.toLocaleString(window.navigator.language, {weekday: 'short'}));
            weekStartingWithMonday.setDate(weekStartingWithMonday.getDate() + 1);
        }
        return localizedWeekDayNames;
    }


    function runCustomerCode() {
        if (window.SDS_onload) {
            for (var i = 0; i < window.SDS_onload.length; i++) {
                var func = window.SDS_onload[i];
                if (typeof func === 'function') {
                    func();
                }
            }
        }
    }

    // Load jQuery from CDN, if not present on page
    var REQUIRED_JQUERY_VERSION = '1.11.2';
    //setTimeout(function() {loadjQuery(REQUIRED_JQUERY_VERSION, initializeSDK)}, 2000);
    loadJQuery(REQUIRED_JQUERY_VERSION, initializeSDK);

    function getLosDays(thisDay, lengthOfStay) {
        // first add all next days in the same week to the nextDays array
        var nextDays = thisDay.nextAll().toArray();
        var allNextWeeksSameMonth = thisDay.parent().nextAll();
        // then add to it also all days from all next weeks, till the end of the month
        nextDays = nextDays.concat(allNextWeeksSameMonth.children().toArray());

        var allLoSDays = thisDay.toArray();
        // highlight all next days till LoS
        for (var i = 0; (i < nextDays.length) && (i < lengthOfStay - 1); i++) {
            allLoSDays.push(nextDays[i]);
        }
        return allLoSDays;
    }

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

    function validateOptions(options) {
        if (typeof(options.lengthOfStay) === 'undefined') {
            throw new Error("You have to specify lengthOfStay");
        }
    }

    function initializeSDK() {
        var SDS = {};
        SDS.initializedSuccessful = false;

        if (window.SDS) {
            return;
        }

        SDS.init = function (options) {
            if (typeof options.apiKey === 'undefined') {
                new Error("You have to specify apiKey to use Sabre Dev Studio");
            }
            this.initializedSuccessful = true;
        };

        SDS.calendar = function (targetDomElementId, options) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }
            //validateOptions();
            var calendarNode = createCalendar(options);
            $("#" + targetDomElementId).append(calendarNode);
            // by default we trace customer pointer, as it goes over calendar cells, highlighting all cells within customer specified LoS
            if ((typeof options.traceCustomerPointer === 'undefined') || (options.traceCustomerPointer === false)) {
                addTraceCustomerPointer(calendarNode, options.lengthOfStay);
            }
        };

        window.SDS = SDS;

        runCustomerCode();
    }

})(this);
