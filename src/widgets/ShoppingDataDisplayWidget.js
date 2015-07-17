define(['../WidgetBase'], function (WidgetBase) {
    "use strict";

    function ShoppingDataDisplayWidget() {
        WidgetBase.apply(this, arguments);
    }

    ShoppingDataDisplayWidget.prototype = Object.create(WidgetBase.prototype);
    ShoppingDataDisplayWidget.prototype.constructor = ShoppingDataDisplayWidget;


    /**
     * Widgets presenting Shopping data can listen to the SearchFormWidget searchCriteriaUpdated events, and will trigger new search based on new search criteria sent in SearchFormWidget searchCriteriaUpdated events
     * @param searchFormWidget
     */
    ShoppingDataDisplayWidget.prototype.addSearchForm = function(searchFormWidget) {
        searchFormWidget.bind('searchCriteriaUpdated', this.newSearch, this);
        this.bind('searchComplete', searchFormWidget.onSearchComplete, searchFormWidget); //WARN: event searchComplete on _any_ of the listening ShoppingDataDisplayWidget will send this event to SearchFormWidget. Requirements may substantiate a generic solution (in WidgetBase), to execute callback only after _all_ listeners sent back some event.
    };

    return ShoppingDataDisplayWidget;
});