define(['lodash'], function (_) {

    function WidgetBase() {
        "use strict";

        WidgetBase.uuid = WidgetBase.uuid || 0;

        // uuid is the unique id of the widget, within the SDK
        this.uuid = ++WidgetBase.uuid;

        /** hash of event handler names into the arrays of event handlers registered to them */
        var registeredEventHandlers = {};

        var optionsArgsArray = Array.prototype.slice.call(arguments);

        this.options = mergeOptions(optionsArgsArray);

        /** As constructor arguments to any widget deriving from WidgetBase you can pass any number of objects representing options.
         * These objects are merged by this mergeOptions method into one object.
         * If some property was set in previous argument object, and is set again in next argument object, then it will be overridden by the new one.
         * This is useful for having one default configuration for all widgets of some kind, and then overriding it on particular widget object level
         */
        function mergeOptions(objectsArray) {
            return objectsArray.reduce(function (acc, next) {
                return _.assign(acc, next);
            }, {});
        }

        WidgetBase.prototype.getOptions = function () {
            return this.options;
        };

        WidgetBase.prototype.bind = function (eventName, eventHandler) {
            if (!registeredEventHandlers.eventName) {
                registeredEventHandlers.eventName = [];
            }
            registeredEventHandlers.eventName.push(eventHandler); // it is possible to register the same handler for the same event more than once
        };

        WidgetBase.prototype.unbind = function (eventName, eventHandler) {
            var idx = registeredEventHandlers.eventName.indexOf(eventHandler);
            registeredEventHandlers.eventName.splice(idx, 1);
        };

        /** triggers specific events (to be sent to all registered event handlers) */
        WidgetBase.prototype.trigger = function (eventName, eventData) {
            registeredEventHandlers.eventName.forEach(function (handler) {
                handler(eventData); // TODO WARN: handlers executed synchronously
                // TODO WARN: we pass the data itself, not copy, to possibly external code
            });
        };
    }

    return WidgetBase;
});
