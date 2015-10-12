define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        function ItinerariesListSummaryByAirlineAndNumberOfStops(itineraries) {
            var summaries = calculateSummaries(itineraries);

            this.getSummaries = function () {
              return summaries;
            };

            function calculateSummaries(itineraries) {
                
                var totalSummary = createEmptySummary();
                var airlineSummaries = {};

                itineraries.forEach(function (itin) { // TODO into reduce?
                    var marketingAirline = itin.getFirstLeg().getFirstFlightMarketingAirline();

                    if (_.isUndefined(airlineSummaries[marketingAirline])) {
                        airlineSummaries[marketingAirline] = createEmptySummary();
                    }

                    var itineraryTotalFareAmount = itin.totalFareAmountWithCurrency.amount;
                    var totalFareCurrency = itin.totalFareAmountWithCurrency.currency;
                    var itineraryNumberOfStops = itin.getNumberOfStops();

                    updateSummary(totalSummary, itineraryTotalFareAmount, totalFareCurrency, itineraryNumberOfStops);
                    updateSummary(airlineSummaries[marketingAirline], itineraryTotalFareAmount, totalFareCurrency, itineraryNumberOfStops);
                });

                totalSummary =  resetInfinityValuesToUndefined(totalSummary);
                var airlineSummariesArray = airlineSummariesToArray(airlineSummaries)
                                            .map(resetInfinityValuesToUndefined)
                                            .sort(airlineSummaryComparator);

                airlineSummariesArray = addIsCheapestFlags(airlineSummariesArray);

                return {
                    airlineSummaries: airlineSummariesArray,
                    totalSummary: totalSummary
                };
            }

            function updateSummary(summary, itineraryTotalFareAmount, totalFareCurrency, itineraryNumberOfStops) {
                if (summary.totalFareCurrency && summary.totalFareCurrency !== totalFareCurrency) {
                    throw new Error('Unable to compare two prices when they have different currencies');
                }
                summary.totalFareCurrency = totalFareCurrency;

                if (itineraryNumberOfStops === 0) {
                    summary.nonStopLowestPrice = Math.min(summary.nonStopLowestPrice, itineraryTotalFareAmount);
                } else if (itineraryNumberOfStops === 1) {
                    summary.oneStopLowestPrice = Math.min(summary.oneStopLowestPrice, itineraryTotalFareAmount);
                } else { // for all number of stops over 1
                    summary.twoAndMoreStopsLowestPrice = Math.min(summary.twoAndMoreStopsLowestPrice, itineraryTotalFareAmount);
                }
            }

            function createEmptySummary() {
                return {
                      nonStopLowestPrice: Infinity
                    , oneStopLowestPrice: Infinity
                    , twoAndMoreStopsLowestPrice: Infinity
                };
            }

            function airlineSummariesToArray(airlineSummariesObj) {
                return _.map(airlineSummariesObj, function (summary, airlineCode) {
                    return {
                          airline: airlineCode
                        , nonStopLowestPrice: summary.nonStopLowestPrice
                        , oneStopLowestPrice: summary.oneStopLowestPrice
                        , twoAndMoreStopsLowestPrice: summary.twoAndMoreStopsLowestPrice
                    };
                });
            }

            function resetInfinityValuesToUndefined(object) {
                var retValue = {};
                _.each(object, function (propValue, propKey) {
                    retValue[propKey] = (propValue === Infinity)? undefined : propValue;
                });
                return retValue;
            }

            /**
             * Sorts airline summaries array, bringing to the head of array the records with lowest prices, regardless of number of stops.
             * Number of stops is not considered, only prices.
              */
            function airlineSummaryComparator(first, second) {
                var firstLowestPrice = _.min([first.nonStopLowestPrice, first.oneStopLowestPrice, first.twoAndMoreStopsLowestPrice]);
                var secondLowestPrice = _.min([second.nonStopLowestPrice, second.oneStopLowestPrice, second.twoAndMoreStopsLowestPrice]);
                if (firstLowestPrice === secondLowestPrice) {
                    return 0;
                } else if (firstLowestPrice > secondLowestPrice) {
                    return 1;
                } else {
                    return -1;
                }
            }

            /**
             * Operates on assumption that the list is already sorted.
             */
            function addIsCheapestFlags(airlineSummaries) {
                for(var i = 0; i < airlineSummaries.length; i++) {
                    if (airlineSummaries[i].nonStopLowestPrice) {
                        airlineSummaries[i].isCheapestNonStop = true;
                        break;
                    }
                }
                for(i = 0; i < airlineSummaries.length; i++) {
                    if (airlineSummaries[i].oneStopLowestPrice) {
                        airlineSummaries[i].isCheapestOneStopLowestPrice = true;
                        break;
                    }
                }
                for(i = 0; i < airlineSummaries.length; i++) {
                    if (airlineSummaries[i].twoAndMoreStopsLowestPrice) {
                        airlineSummaries[i].isCheapestTowOrMoreStopsLowestPrice = true;
                        break;
                    }
                }
                return airlineSummaries;
            }

        };

        return ItinerariesListSummaryByAirlineAndNumberOfStops;
    });
