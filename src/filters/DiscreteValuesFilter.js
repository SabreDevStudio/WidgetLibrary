define(['filters/BaseFilter', 'datamodel/ItinerariesList', 'jquery', 'stache!view-templates/DiscreteValuesFilter.html', 'lodash'],
    function (BaseFilter, ItinerariesList, $, DiscreteValuesFilterTemplate, _) {
        "use strict";

        function DiscreteValuesFilter() {
            BaseFilter.apply(this, arguments);

            var that = this;

            // add unique item ID to all elements. Needed for HTML unique ID for each discrete item
            this.addItemId = function() {
                this.options.selectableValues.forEach(function (item) {
                    item.itemId = that.options.filterablePropertyName + '_' + item.value;
                });
            };
        };

        DiscreteValuesFilter.prototype = Object.create(BaseFilter.prototype);
        DiscreteValuesFilter.prototype.constructor = DiscreteValuesFilter;

        DiscreteValuesFilter.prototype.defaultFilteringFunctionConstructorFn = function (filterablePropertyName, allowedItemValues) {
            return function (element) {
                var elementValue = _.result(element, filterablePropertyName);
                return ( allowedItemValues.indexOf(elementValue) !== -1);
            };
        };

        DiscreteValuesFilter.prototype.createDOM = function () {
            // if there are no selectable options then no point to create filter
            if ( _.isUndefined(this.options.selectableValues) || (this.options.selectableValues.length === 0)) {
                return;
            }
            var that = this;
            this.addItemId();
            var html = DiscreteValuesFilterTemplate({
                filterablePropertyName: this.options.filterablePropertyName,
                headerText: this.options.headerText,
                selectableValues: this.options.selectableValues
            });
            var dom = $(html);
            dom.find('.SDSMultipleSelectionItem input[type="checkbox"]').change(function () {
                // get state of all checkboxes within the same filter
                var allowedItemValues = [];
                $(this).closest('.SDSDiscreteValuesFilter').find('.SDSMultipleSelectionItem input[type="checkbox"]').each(function (idx, item) {
                    if (item.checked) {
                        allowedItemValues.push($(item).data('itemvalue'));
                    }
                });
                that.createFilteringFunctionAndCallEventHandler(that.options.filterablePropertyName, allowedItemValues);
            });
            this.currentDOM = dom;
            return dom;
        };

        DiscreteValuesFilter.prototype.getBoundsSpecification = function () {
            return {
                filterablePropertyName: this.options.filterablePropertyName,
                type: ItinerariesList.prototype.StatisticsTypeEnum.discrete
            };
        };

        DiscreteValuesFilter.prototype.reset = function () {
            if (_.isUndefined(this.currentDOM)) {
                return;
            }
            // check all checkboxes
            this.currentDOM.find('.SDSMultipleSelectionItem input[type="checkbox"]').each(function (idx, element) {
                element.checked = true;
            });
        };

        return DiscreteValuesFilter;
    });