define(['moment', 'moment_range'],
    function (moment, moment_range) {
        'use strict';

        /*
            Model object representing one month of calendar. Needed for widgets presenting calendars.
            In particular models information about preceding month last week and next month first week (both presented with the current month on calendar widget)
         */
        function CalendarMonthBounds(_monthStartDate) {
            var monthStartDate = _monthStartDate.clone();

            // stores day numbers (like 28, 29, 30, 31) of the last week of the preceding month that fall in the same week as the first week of this calendar month
            // For example if this month (specified in argument) starts with Wednesday, then previous month days of last week are Mon and Thu
            var prevMonthDaysOfLastWeek = [];
            var nextMonthDaysOfFirstWeek = [];

            // number of days this month has
            var monthNumberOfDays = monthStartDate.daysInMonth();

            var monthStartDayOfWeek = monthStartDate.day();
            monthStartDayOfWeek = normalizeIntoLocaleWithSundayAsLastDayOfWeek(monthStartDayOfWeek);
            var prevMonthNumberOfDays = monthStartDate.clone().subtract(1, 'day').daysInMonth();

            // push previous month day numbers to its last week
            for (var i = monthStartDayOfWeek - 2; i >= 0; i--) { //TODO: unreadable
                prevMonthDaysOfLastWeek.push(prevMonthNumberOfDays - i);
            }

            var monthEndDate = monthStartDate.clone().endOf('month');
            var monthEndDayOfWeek = monthEndDate.day();
            monthEndDayOfWeek = normalizeIntoLocaleWithSundayAsLastDayOfWeek(monthEndDayOfWeek);

            for (i = 1; i <= (7 - monthEndDayOfWeek); i++) {
                nextMonthDaysOfFirstWeek.push(i);
            }

            function normalizeIntoLocaleWithSundayAsLastDayOfWeek(dayOfWeekNumber) {
                // convert 0 representing Sunday into 7
                return (dayOfWeekNumber === 0) ? 7 : dayOfWeekNumber;
            }

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

            Object.defineProperty(this, 'monthNumberOfDays', {
                enumerable: true,
                get: function() { return monthNumberOfDays;}
            });

            Object.defineProperty(this, 'monthStartDayOfWeek', {
                enumerable: true,
                get: function() { return monthStartDayOfWeek;}
            });
        }

        return CalendarMonthBounds;
    });
