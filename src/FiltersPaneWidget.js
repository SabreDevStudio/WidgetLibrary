define(['WidgetBase', 'jquery', 'util/validator', 'filters/BaseFilter', 'filters/RangeFilter', 'filters/DiscreteValuesFilter', 'lodash'
    , 'stache!view-templates/FiltersPaneWidget.html', 'moment']
    , function (WidgetBase, $, v, BaseFilter, RangeFilter, DiscreteValuesFilter, _, filtersPaneWidgetTemplate, moment) {
    "use strict";

    function FiltersPaneWidget() {

        WidgetBase.apply(this, arguments);

        // stores all current filtering function, as a mapping of filter that produced function into the function
        // is updated per filter, on filter change
        // all its values contain all current filtering functions
        var currentFilteringFunctions = {};

        var that = this;

        /* This event listener will be passed to all filters. When a filter changes state, then it is called */
        var filtersEventListener = function (filterablePropertyName, filteringFunction) {
            currentFilteringFunctions[filterablePropertyName] = filteringFunction;
            this.trigger('filteringCriteriaChanged', _.values(currentFilteringFunctions));
        };

        // model: TODO make it explicit
        this.filters = this.configureDefaultFilters(filtersEventListener);

        this.addResetAllFiltersHandler = function (dom) {
          $(dom).find('.SDSResetAllFiltersLink').click(function (ev) {
              ev.preventDefault();
              // 1.  clear all current filters:
              currentFilteringFunctions = {};
              // 2. as new the filtering functions pass the function that will pass true for everything
              that.trigger('filteringCriteriaChanged', [_.constant(true)]);
              // 3. reset the filters themselves:
              _.each(that.filters, function (filter) {
                  filter.reset();
              });
              // 4. and rerender itself
              that.updateView();
          });
        };
    }

    FiltersPaneWidget.prototype = Object.create(WidgetBase.prototype);
    FiltersPaneWidget.prototype.constructor = FiltersPaneWidget;

    FiltersPaneWidget.prototype.createDOM = function () {
        var containingDOM = $(filtersPaneWidgetTemplate({}));
        var filtersWrapper = containingDOM.children('.SDSFiltersPaneFiltersWrapper');
        // create DOM on all filters and add them to filters wrapper
        _.values(this.filters).reduce(function (accumulatorDOM, nextFilter) {
            return accumulatorDOM.append(nextFilter.createDOM());
        }, filtersWrapper);
        this.addResetAllFiltersHandler(containingDOM);
        return containingDOM;
    };

    FiltersPaneWidget.prototype.getFiltersBoundsSpecifications = function () {
      return _.values(this.filters).map(function (filter) {
          return filter.getBoundsSpecification();
      });
    };

    FiltersPaneWidget.prototype.resetFiltersBounds = function (newStatistics) {
        var that = this;
        newStatistics.forEach(function (statistic) {
            that.filters[statistic.filterablePropertyName].updateFilterOptions(statistic.statistics);
        });
        this.updateView();
    };

    FiltersPaneWidget.prototype.configureDefaultFilters = function(filtersEventListener) {
        // filters hash contains mappings of the filterablePropertyName into filter operating on that property
        var defaultFilters = {};

        var priceFilter = new RangeFilter({
            headerText: 'Limit Price',
            filterablePropertyName: 'totalFareAmount',
            range: true
        }, filtersEventListener, this);
        defaultFilters.totalFareAmount = priceFilter;

        var numberOfStopsFilter = new DiscreteValuesFilter({
            headerText: 'Number of stops',
            filterablePropertyName: 'getNumberOfStops',
            selectableValues: []
        }, filtersEventListener, this);
        defaultFilters.getNumberOfStops = numberOfStopsFilter;

        var airlinesFilter = new DiscreteValuesFilter({
            headerText: 'Airlines',
            filterablePropertyName: 'getFirstMarketingAirline'
        }, filtersEventListener, this);
        defaultFilters.getFirstMarketingAirline = airlinesFilter;

        var outboundDepartureTimeFilter = new RangeFilter({
            headerText: 'Outbound flight departure',
            filterablePropertyName: 'getOutboundDepartureDateTime',
            range: true,
            labelFormattingFunction: function (value) {
                return moment(value, 'x').format('hh:mm a'); // 'x': slider widget will pass time as unix timestamp, format into hh:mm
            }
        }, filtersEventListener, this);
        defaultFilters.getOutboundDepartureDateTime = outboundDepartureTimeFilter;

        var inboundArrivalTimeFilter = new RangeFilter({
            headerText: 'Inbound flight arrival',
            filterablePropertyName: 'getInboundArrivalDateTime',
            range: true,
            labelFormattingFunction: function (value) {
                return moment(value, 'x').format('hh:mm a'); // 'x': slider widget will pass time as unix timestamp, format into hh:mm
            }
        }, filtersEventListener, this);
        defaultFilters.getInboundArrivalDateTime = inboundArrivalTimeFilter;

        return defaultFilters;
    };

    return FiltersPaneWidget;

});