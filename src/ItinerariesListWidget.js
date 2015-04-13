define(['WidgetBase', 'stache!view-templates/ItinerariesListWidget.html'], function (WidgetBase, viewTemplate) {
    "use strict";

    function ItinerariesListWidget() {

        var model = {
            uuid: this.uuid,
            itineraries: []
        };

        var currentDom;

        ItinerariesListWidget.prototype.update = function(itinerariesList) {
            updateModel(itinerariesList);
            reRender();
        };

        ItinerariesListWidget.prototype.render = function(clientCallback) {
            clientCallback(generateDom());
        };

        function reRender() {
            var hostingElement = currentDom.parent();
            hostingElement.empty().append(generateDom());
        }

        function updateModel(itinerariesList) {
            model.itineraries = itinerariesList;
        }

        function generateDom() {
            var html = viewTemplate(model);
            currentDom = $(html);
            return currentDom;
        }
    }

    ItinerariesListWidget.prototype = Object.create(WidgetBase.prototype);
    ItinerariesListWidget.prototype.constructor = ItinerariesListWidget;

    return ItinerariesListWidget;

});