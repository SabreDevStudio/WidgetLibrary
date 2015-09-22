define(['util/LodashExtensions'], function (_) {
    "use strict";

    function ItinerariesList() {

        var itineraries = [];

        this.getItineraries = function () {
            return itineraries;
        };

        this.getPermittedItineraries = function () {
            //console.log('getPermittedItineraries called');
          return _.reject(itineraries, 'filteredOut');
        };

        this.add = function (itin) {
            itineraries.push(itin);
        };

        this.addItinerariesList = function(itinerariesList) {
            var that = this;
            itinerariesList.getItineraries().forEach(function (itin) {
                that.add(itin);
            });
            return this;
        };

        this.addItinerariesListWithDedup = function(itinerariesList) {
            this.dedupMerge(itinerariesList);
            return this;
        };

        this.size = function () {
            return this.getPermittedItineraries().length;
        };

        this.getMinValue = function (propertyName, propertyFieldToCompareOn) {
            return _.chain(this.getPermittedItineraries())
                .map(_.ary(_.partialRight(_.result, propertyName), 1))
                .min(propertyFieldToCompareOn).value();
        };

        this.getMaxValue = function (propertyName, propertyFieldToCompareOn) {
            return _.chain(this.getPermittedItineraries())
                .map(_.ary(_.partialRight(_.result, propertyName), 1))
                .max(propertyFieldToCompareOn).value();
        };

        this.getRangeStatistics = function (propertyName) {
            return {
                min: this.getMinValue(propertyName),
                max: this.getMaxValue(propertyName)
            };
        };

        this.getMonetaryAmountRangeStatistics = function (propertyName) {
            return {
                min: this.getMinValue(propertyName, 'amount'),
                max: this.getMaxValue(propertyName, 'amount')
            };
        };

        this.getDiscreteValuesStatistics = function (propertyName) {
            var selectableValues =  _.chain(this.getPermittedItineraries())
                .groupByAndGetCountAndMin(propertyName, 'totalFareAmount', 'totalFareCurrency').map(function (groupingItem) {
                    return {
                          value: groupingItem.value
                        , count: groupingItem.count
                        , minPrice: groupingItem.min
                        , currency: groupingItem.mustBeEqualPropertyValue
                    };
                })
                .sortBy('value')
                .value();
            return {selectableValues: selectableValues};
        };

        //TODO SRP extract from here
        this.getStatistics = function (statisticsSpecification) {
            var filterablePropertyName = statisticsSpecification.property;
            switch (statisticsSpecification.type) {
                case 'range': {
                    return this.getRangeStatistics(filterablePropertyName);
                }
                case 'rangeMonetaryAmount': {
                    return this.getMonetaryAmountRangeStatistics(filterablePropertyName);
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

        /**
         * Performs deduplication of the itinerariesList passed as argument with own itineraries,
         * and merges deduplicated itinerariesList to own itineraries list.
         *
         * The deduplication key is the flight structure of itinerary: all flights of itinerary (segments: origin, destination, datetimes, flight numbers, airlines).
         * Any pricing and availability related information (booking codes, seats remaining, total fare) is not included into deduplication key.
         *
         * Algorithm:
         * For every itinerary from argument itinerariesList DO: TODO correct doc
         *  calculate itinerary flight structure
         *  check if any own itinerary contains  same flight structure
         *  IF any own itinerary contains same flight structure
         *      THEN choose own itinerary (leave own itinerary in place) or replace own itinerary with argument itinerary, based on the priority of the web service that produced it (see later).
         *      ELSE add the argument itinerary to own itineraries list
         * DONE;
         *
         * WARN: this algorithm for the moment has O(n^2) complexity, can be easily improved.
         *
         * When both itineraries have same flight structure than the version that was produced by a 'more life search' service will be chosen.
         * For example itineraries from BFM will be preferred over itineraries from Instaflights.
         *
         * @param itinerariesList
         */
            //TODO SRP extract from here
        this.dedupMerge = function (candidateItinerariesList) {
            var flightStructureToItinerariesMap = this.createFlightStructureToItinerariesMap(itineraries);
            var knownKeys = _.keys(flightStructureToItinerariesMap);
            candidateItinerariesList.getItineraries().forEach(function (candidateItin) {
                var candidateKey = candidateItin.getFlightStructure();
                if (_.contains(knownKeys, candidateKey)) {
                    var knowItinPricingSource = flightStructureToItinerariesMap[candidateKey].getPricingSource();
                    var candidateItinPricingSource = candidateItin.getPricingSource();
                    var pricingSourceCompareResult = comparePricingSources(knowItinPricingSource, candidateItinPricingSource);
                    if (pricingSourceCompareResult === -1) { // candidate itin better, replace known itin with candidate itin. Otherwise (known itin better or tie), do not do anything
                        flightStructureToItinerariesMap[candidateKey] = candidateItin;
                    }
                } else {
                    flightStructureToItinerariesMap[candidateKey] = candidateItin;
                }
            });
            var deduppedItineraries = _.values(flightStructureToItinerariesMap);
            itineraries = deduppedItineraries;
        };

        function comparePricingSources(first, second) {
            if (first === 'BFM') {
                return 1;
            }
            if (second === 'BFM') {
                return -1;
            }
            return 0;
        }

        this.createFlightStructureToItinerariesMap = function (itineraries) {
            return _.indexBy(itineraries, function (itin) {
                return itin.getFlightStructure();
            });
        };

    }

    //TODO SRP extract from here
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
        var minimumPriceItinerary = _.min(this.getPermittedItineraries(), 'totalFareAmount');
        return {
              price: minimumPriceItinerary.totalFareAmount
            , currency: minimumPriceItinerary.totalFareCurrency
        };
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