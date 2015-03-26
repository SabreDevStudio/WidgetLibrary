define(['WidgetBase'], function (WidgetBase) {

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
            var objDefaults = {size: 10, uuid: -1};
            var objOberrides = {size: 20};
            var widget = new WidgetBase(objDefaults, objOberrides);
            expect(widget.getOptions()).toEqual({size: 20, uuid: -1});
        });
    })

})