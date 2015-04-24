define(['lodash', 'util/validator', 'jquery', 'jquery-ui'],
    function (_, v, $, jqueryUIDummy) {
        "use strict";

        function BaseFilter(options, onChangeHandler, onChangeHandlerCaller) {
            this.options = {};
            this.onChangeHandler = onChangeHandler;
            this.onChangeHandlerCaller = onChangeHandlerCaller;

            var that = this;

            this.setFilterOptions(options);
        };

        BaseFilter.prototype.createFilteringFunctionAndCallEventHandler = function () {
            var newFilteringFunction = this.options.filteringFunctionConstructorFn.apply(this, arguments);
            var callContext = this.onChangeHandlerCaller || this;
            this.onChangeHandler.apply(callContext, [this.options.filterablePropertyName, newFilteringFunction]);
        };

        BaseFilter.prototype.validateFilterGenericOptions = function (options) {
            v.defined(options.headerText);
            if (!_.isUndefined(options.filteringFunctionConstructorFn)) {
                v.function(options.filteringFunctionConstructorFn);
            }
        };

        BaseFilter.prototype.updateFilterOptions = function (newOptions) {
            _.defaults(newOptions, this.options);
            this.setFilterOptions(newOptions);
        };

        BaseFilter.prototype.setFilterOptions = function (newOptions) {
            this.validateFilterGenericOptions(newOptions);
            if (!_.isUndefined(this.validateFilterSpecificOptions)) {
                this.validateFilterSpecificOptions(newOptions);
            }

            this.options = newOptions;

            // set generic defaults
            _.defaults(this.options, {
                filteringFunctionConstructorFn: this.defaultFilteringFunctionConstructorFn,
                labelFormattingFunction: _.identity
            });

            // set filter specific defaults
            if (!_.isUndefined(this.filterSpecificOptionsDefaults)) {
                _.defaults(this.options, this.filterSpecificOptionsDefaults);
            }
        };

        return BaseFilter;
});