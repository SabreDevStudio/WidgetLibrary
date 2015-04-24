define(['lodash', 'jquery'], function (_, $) {
    "use strict";

    function WidgetBase() {

        WidgetBase.uuid = WidgetBase.uuid || 0;

        // uuid is the unique id of the widget, within the SDK
        this.uuid = ++WidgetBase.uuid;

        /** hash of event handler names into the arrays of event handlers registered to them */
        this.registeredEventHandlers = {};

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
    }

    WidgetBase.prototype.createDOMWithEventHandlers = function () {
        var dom = this.createDOM();
        this.addCommonEventHandlers(dom);
        return dom;
    };

    WidgetBase.prototype.addCommonEventHandlers = function(dom) {
        return this.makeFilterLabelsCollapsible(dom);
    };

    WidgetBase.prototype.render = function(clientCallback) {
        this.currentDOM = this.createDOMWithEventHandlers();
        clientCallback(this.currentDOM);
    };

    WidgetBase.prototype.reRender = function () {
        if (_.isUndefined(this.currentDOM)) {
            this.currentDOM = this.createDOMWithEventHandlers();
        } else {
            var previousDOMHolder = this.currentDOM.empty();
            var newDOMWithHolderStripped = this.createDOMWithEventHandlers().children();
            previousDOMHolder.append(newDOMWithHolderStripped);
        }
    };

    WidgetBase.prototype.getOptions = function () {
        return this.options;
    };

    WidgetBase.prototype.bind = function (eventName, eventHandler, eventHandlerOwner) {
        if (_.isUndefined(this.registeredEventHandlers[eventName])) {
            this.registeredEventHandlers[eventName] = [];
        }
        this.registeredEventHandlers[eventName].push({
            eventHandler: eventHandler,
            eventHandlerOwner: eventHandlerOwner
        }); // it is possible to register the same handler for the same event more than once
    };

    WidgetBase.prototype.unbind = function (eventName, eventHandler) {
        var idx = this.registeredEventHandlers[eventName].indexOf(eventHandler); //TODO not working now, fix when needed
        this.registeredEventHandlers[eventName].splice(idx, 1);
    };

    /** triggers specific events (to be sent to all registered event handlers) */
    WidgetBase.prototype.trigger = function (eventName, eventData) {
        if (_.isUndefined(this.registeredEventHandlers[eventName])) {
          return;
        }
        this.registeredEventHandlers[eventName].forEach(function (handlerAndHandlerOwner) {
            // WARN: handlers executed synchronously
            // WARN: we pass the data itself, not copy, to possibly external code
            handlerAndHandlerOwner.eventHandler.call(handlerAndHandlerOwner.eventHandlerOwner, eventData);

        });
    };

    // on click it will collapse all the current dom elements that have have class SDSCollapsibleContent and matching data-collapsible-group-id attribute
    WidgetBase.prototype.makeFilterLabelsCollapsible = function (dom) {
        $(dom).find('.SDSCollapsibleFlip').click(function(ev) {
            ev.preventDefault();
            var collapsibleGroupId = $(this).attr('data-collapsible-group-id');
            $(this).closest('.SDSWidget').find('.SDSCollapsibleContent[data-collapsible-group-id="' + collapsibleGroupId + '"]').toggle();
            if ($(this).hasClass('SDSCollapsibleFlip')) {
                $(this).removeClass('SDSCollapsibleFlip').addClass('SDSExpandableFlip');
            } else {
                $(this).removeClass('SDSExpandableFlip').addClass('SDSCollapsibleFlip');
            }
        });
        return dom;
    };

    return WidgetBase;
});
