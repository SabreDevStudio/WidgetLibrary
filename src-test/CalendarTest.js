define(['calendar'], function(cal) {

    describe('just checking', function() {
        it('works for app', function() {
            var prevMonthLastDays = cal.createCalendarLogic(2015, 3).prevMonthDaysOfLastWeek;
            expect(prevMonthLastDays).toEqual([ 23, 24, 25, 26, 27, 28]);

            prevMonthLastDays = cal.createCalendarLogic(2015, 5).prevMonthDaysOfLastWeek;
            expect(prevMonthLastDays).toEqual([27, 28, 29, 30]);

            prevMonthLastDays = cal.createCalendarLogic(2015, 6).prevMonthDaysOfLastWeek;
            expect(prevMonthLastDays).toEqual([]);

        });
    });
});
