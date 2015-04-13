define(['WidgetBase'], function (WidgetBase) {
    "use strict";

    describe('options are deep copied in constructor', function () {
        it('options undefined', function () {
            // given
            var originalOptions = {
                one: 1
            };
            var widget1 = new WidgetBase(originalOptions);

            // when we modify options on widget level
            widget1.options.one = undefined;

            // then they are not modified on global level
            expect(originalOptions.one).toEqual(1);
        });
    });

    describe('merge options', function () {
        it('options undefined', function () {
            var widget = new WidgetBase();
            expect(widget.getOptions()).toEqual({});
        });

        it('one options object', function () {
            var obj = {size: 10};
            var widget = new WidgetBase(obj);
            expect(widget.getOptions()).toEqual(obj);
        });

        it('two options objects', function () {
            var defaults = {size: 10, uuid: -1};
            var overrides = {size: 20};
            var widget = new WidgetBase(defaults, overrides);
            expect(widget.getOptions()).toEqual({size: 20, uuid: -1});
        });
    });

});