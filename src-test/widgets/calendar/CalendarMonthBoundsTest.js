require(['widgets/calendar/CalendarMonthBounds', 'moment'], function (CalendarMonth, moment) {
    'use strict';

    describe('calendar month logic', function () {

        var july2015 = new CalendarMonth(moment({year: 2015, month: 6}));

        it('correct month start and end dates', function () {
            expect(july2015.monthStartDate.isSame(moment('2015-07-01'))).toBeTruthy();
            expect(july2015.monthEndDate.isSame(moment('2015-07-31').endOf('day'))).toBeTruthy();
        });

        it('correct month start day of week', function () {
            var WEDNESDAY_DAY_OF_WEEK_SEQ_NUMBER = 3; // starting from 1; //TODO change to start from 0?
            expect(july2015.monthStartDayOfWeek).toEqual(WEDNESDAY_DAY_OF_WEEK_SEQ_NUMBER);
        });

        it('days of last week of preceding month', function () {
            expect(july2015.prevMonthDaysOfLastWeek).toEqual([29, 30]);
        });

        it('days of first week of succeeding month', function () {
            expect(july2015.nextMonthDaysOfFirstWeek).toEqual([1, 2]);
        });


    });
});