define(['util/LodashExtensions'], function (_) {
    "use strict";

    function ItinerariesList() {
        var itineraries = [];

        this.getItineraries = function () {
            return itineraries;
        };

        this.add = function (itin) {
            itineraries.push(itin);
        };

        this.sort = function() { //TODO hardcoded sort criteria for now
            itineraries = _.sortBy(itineraries, 'totalFareAmount');
        };

        this.size = function (includeFilteredOut) {
            if (includeFilteredOut === true) {
                return itineraries.length;
            }
            return _.reject(itineraries, 'filteredOut').length;
        };

        this.getMinValue = function (propertyName) {
            return _.chain(itineraries)
                .reject('filteredOut')
                .map(_.ary(_.partialRight(_.result, propertyName), 1))
                .min().value();
        };

        this.getMaxValue = function (propertyName) {
            return _.chain(itineraries)
                .reject('filteredOut')
                .map(_.ary(_.partialRight(_.result, propertyName), 1))
                .max().value();
        };

        this.getRangeStatistics = function (propertyName) {
            return {
                min: this.getMinValue(propertyName),
                max: this.getMaxValue(propertyName)
            };
        };

        this.getDiscreteValuesStatistics = function (propertyName) {
            var selectableValues =  _.chain(itineraries)
                .reject('filteredOut')
                .groupByAndGetCountAndMin(propertyName, 'totalFareAmount').map(function (value, key) {
                    return {
                        value: key,
                        count: value.count,
                        minPrice: value.min
                    };
                })
                .sortBy('value')
                .value();
            return {selectableValues: selectableValues};
        };

        ItinerariesList.prototype.getCurrentValuesBounds = function (boundsSpecifications) {
            var that = this;
            return boundsSpecifications.map(function (spec) {
                var filterablePropertyName = spec.filterablePropertyName;
                if (spec.type === that.StatisticsTypeEnum.range) {
                    var statistics = that.getRangeStatistics(filterablePropertyName);
                } else if (spec.type === that.StatisticsTypeEnum.discrete) {
                    statistics = that.getDiscreteValuesStatistics(filterablePropertyName)
                } else {
                    throw new Error('Illegal specification of bounds requested' + spec.type);
                }
                return {
                    filterablePropertyName: filterablePropertyName,
                    statistics: statistics
                };
            });
        };

        ItinerariesList.prototype.getLeadPrice = function () {
            return this.getMinValue('totalFareAmount');
        };

        ItinerariesList.prototype.StatisticsTypeEnum = Object.freeze({
            'range': 'range',
            'discrete': 'discrete'
        });

    }

    ItinerariesList

    return ItinerariesList;
});