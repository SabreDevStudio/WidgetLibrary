define(['filters/BaseFilter', 'datamodel/ItinerariesList', 'jquery', 'jquery-ui', 'stache!view-templates/RangeFilter.html', 'moment', 'lodash'],
    function (BaseFilter, ItinerariesList, $, jqueryUIDummy, RangeFilterTemplate, moment, _) {
        "use strict";

        function RangeFilter() {
            BaseFilter.apply(this, arguments);
        };

        RangeFilter.prototype = Object.create(BaseFilter.prototype);
        RangeFilter.prototype.constructor = RangeFilter;

        RangeFilter.prototype.filterSpecificOptionsDefaults = {
            range: true
        };

        RangeFilter.prototype.createDOM = function () {
            // if bounds are not set to numbers (which is the case when there are no options found) then do not render at all
            //if ((!_.isFinite(this.options.min)) || !_.isFinite(this.options.max)) {
            //    return;
            //}
            var that = this;
            var htmlPartial = RangeFilterTemplate({
                filterablePropertyName: this.options.filterablePropertyName,
                headerText: this.options.headerText,
                min: this.options.min,
                max: this.options.max
            });
            var dom = $(htmlPartial);

            var slider = dom.find('.SDSRangeFilterSlider').slider({
                range: this.options.range,
                min: this.options.min,
                max: this.options.max,
                values: [this.options.min, this.options.max]
            });

            slider.slider().on({ // it must be defined as on() event, not as option in slider constructor (slide property), otherwise unable to trigger slide events
                slide: function (event, ui) {
                    var min = ui.values[0],
                        max = ui.values[1];
                    var thisFilter = $(this).closest('.SDSRangeFilter');
                    //update current selected range labels
                    thisFilter.find('.SDSRangeFilterCurrentValueMin').html(that.options.labelFormattingFunction(min));
                    thisFilter.find('.SDSRangeFilterCurrentValueMax').html(that.options.labelFormattingFunction(max));
                    // call construct new filtering function and send event
                    that.createFilteringFunctionAndCallEventHandler(that.options.filterablePropertyName, min, max);
                }
            });

            // set current range labels to initial min max values:
            dom.find('.SDSRangeFilterCurrentValueMin').html(that.options.labelFormattingFunction(this.options.min));
            dom.find('.SDSRangeFilterCurrentValueMax').html(that.options.labelFormattingFunction(this.options.max));

            this.currentDOM = dom;
            return dom;
        };

        RangeFilter.prototype.defaultFilteringFunctionConstructorFn = function (filterablePropertyName, min, max) {
            return function (element) {
                var elementValue = _.result(element, filterablePropertyName);
                return ( (elementValue >= min) && (elementValue <= max) );
            };
        };

        RangeFilter.prototype.getBoundsSpecification = function () {
            return {
                filterablePropertyName: this.options.filterablePropertyName,
                type: ItinerariesList.prototype.StatisticsTypeEnum.range
            };
        };

        RangeFilter.prototype.reset = function () {
            if (_.isUndefined(this.currentDOM)) {
                return;
            }
            var slider = this.currentDOM.find('.SDSRangeFilterSlider');
            var sliderOptions = $(slider).slider( 'option' );
            $(slider).slider( 'values', [ sliderOptions.min, sliderOptions.max ] );
        };

        return RangeFilter;
    });