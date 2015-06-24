require(['jquery', 'util/jQueryExtensions'], function ($, $$) {
    'use strict';

    describe('nextAllAndFirstLevelCousins', function () {

        var dom = $(
            "<tbody>" +
                "<tr>" +
                    "<td>0</td>" +
                    "<td id='self'>1</td>" +
                    "<td>2</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>3</td>" +
                    "<td>4</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>5</td>" +
                    "<td>6</td>" +
                "</tr>" +
            "</tbody>");

        it('returns only self for max = 1', function () {
            var result = $(dom).find('#self').nextAllAndFirstLevelCousins(1);
            expect(result.length).toBe(1);
            expect($(result)).toContainText('1');
        });

        it('returns all, no max cap', function () {
            var result = $(dom).find('#self').nextAllAndFirstLevelCousins();
            expect(result.length).toBe(6);
            expect($(result[0])).toContainText('1');
            expect($(result[1])).toContainText('2');

            expect($(result[5])).toContainText('6');
        });

        it('returns all up to the specified max', function () {
            var result = $(dom).find('#self').nextAllAndFirstLevelCousins(5);
            expect(result.length).toBe(5);
            expect($(result[0])).toContainText('1');
            expect($(result[1])).toContainText('2');
            expect($(result[4])).toContainText('5');
        });

    });
});