define(['util/LodashExtensions'], function (_) {
    "use strict";

    function ItinerariesList() {

        var itineraries = [];

        this.getItineraries = function () {
            return itineraries;
        };

        this.getPermittedItineraries = function () {
          return _.reject(itineraries, 'filteredOut');
        };

        this.add = function (itin) {
            itineraries.push(itin);
        };

        this.size = function () {
            return this.getPermittedItineraries().length;
        };

        this.getMinValue = function (propertyName) {
            return _.chain(this.getPermittedItineraries())
                .map(_.ary(_.partialRight(_.result, propertyName), 1))
                .min().value();
        };

        this.getMaxValue = function (propertyName) {
            return _.chain(this.getPermittedItineraries())
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
            var selectableValues =  _.chain(this.getPermittedItineraries())
                .groupByAndGetCountAndMin(propertyName, 'totalFareAmount').map(function (groupingItem) {
                    return {
                        value: groupingItem.value,
                        count: groupingItem.count,
                        minPrice: groupingItem.min
                    };
                })
                .sortBy('value')
                .value();
            return {selectableValues: selectableValues};
        };

        this.getStatistics = function (statisticsSpecification) {
            var filterablePropertyName = statisticsSpecification.property;
            switch (statisticsSpecification.type) {
                case 'range': {
                    return this.getRangeStatistics(filterablePropertyName);
                }
                case 'discrete': {
                    return  this.getDiscreteValuesStatistics(filterablePropertyName);
                }
                case 'noop': {
                    return undefined;
                }
                default:
                    throw new Error('Illegal specification of bounds requested: ' + statisticsSpecification.type);
            }
        };
    }

    ItinerariesList.prototype.getCurrentValuesBounds = function (statisticsSpecifications) {
        var that = this;
        return statisticsSpecifications.map(function (statisticsSpecification) {
            return {
                filterablePropertyName: statisticsSpecification.property,
                statistics: that.getStatistics(statisticsSpecification)
            };
        });
    };

    ItinerariesList.prototype.getLeadPrice = function () {
        return this.getMinValue('totalFareAmount');
    };

    ItinerariesList.prototype.getCheapestItinerary = function () {
        return _.min(this.getPermittedItineraries(), 'totalFareAmount');
    };

    ItinerariesList.prototype.getShortestItinerary = function () {
        return _.min(this.getPermittedItineraries(), 'duration');
    };

    ItinerariesList.prototype.applyFilters = function (filteringFunctions) {
        this.getItineraries().forEach(function (itin) {
            itin.filteredOut = !filteringFunctions.every(function (filteringFunction) {
                return filteringFunction(itin);
            });
        });
    };

    return ItinerariesList;
});