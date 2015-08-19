define([
          'moment'
        , 'moment_range'],
    function (
          moment
        , moment_range) {
        'use strict';

        /*
            Model object representing one month of calendar. Needed for widgets presenting calendars.
            In particular models information about preceding month last week and next month first week (both presented with the current month on calendar widget)
         */
        function CalendarMonthBounds(_monthStartDate) {

            var monthStartDate = _monthStartDate.clone();

            // TODO comments to reflect moment.js
            // stores day numbers (like 28, 29, 30, 31) of the last week of the preceding month that fall in the same week as the first week of this calendar month
            // For example if this month (specified in argument) starts with Wednesday, then previous month days of last week are Mon and Thu
            var prevMonthDaysOfLastWeek = [];
            var nextMonthDaysOfFirstWeek = [];

            // push previous month day numbers to its last week
            var firstDayOfLastWeekOfPrevMonth = _monthStartDate.clone().startOf('week'); //TODO: by default moment.js startOf('week') returns locale aware start of week, which for default locale 'en' returns Sunday. ADD comments on no support for localization
            var lastDayOfPrevMonth = monthStartDate.clone().subtract(1, 'days');
            moment.range(firstDayOfLastWeekOfPrevMonth, lastDayOfPrevMonth).by('days', function (day) {
                prevMonthDaysOfLastWeek.push(day);
            });

            var monthEndDate = monthStartDate.clone().endOf('month');

            var firstDayOfNextMonth = monthEndDate.clone().add(1, 'days');
            var lastDayOfFirstWeekOfNextMonth = monthEndDate.clone().endOf('week');
            moment.range(firstDayOfNextMonth, lastDayOfFirstWeekOfNextMonth).by('days', function (day) {
                nextMonthDaysOfFirstWeek.push(day);
            });

            Object.defineProperty(this, 'monthStartDate', {
                enumerable: true,
                get: function() { return monthStartDate;}
            });

            Object.defineProperty(this, 'monthEndDate', {
                enumerable: true,
                get: function() { return monthEndDate;}
            });

            Object.defineProperty(this, 'prevMonthDaysOfLastWeek', {
                enumerable: true,
                get: function() { return prevMonthDaysOfLastWeek;}
            });

            Object.defineProperty(this, 'nextMonthDaysOfFirstWeek', {
                enumerable: true,
                get: function() { return nextMonthDaysOfFirstWeek;}
            });
        }

        return CalendarMonthBounds;
    });
