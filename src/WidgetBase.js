define(['lodash'], function (_) {

    function WidgetBase() {
        "use strict";

        var optionsArgsArray = Array.prototype.slice.call(arguments);
        this.options = mergeOptions(optionsArgsArray);

        function mergeOptions(objectsArray) {
            return objectsArray.reduce(function (acc, next) {
                return _.assign(acc, next);
            }, {});
        }

        WidgetBase.prototype.getOptions = function () {
            return this.options;
        };
    }

    return WidgetBase;
});
