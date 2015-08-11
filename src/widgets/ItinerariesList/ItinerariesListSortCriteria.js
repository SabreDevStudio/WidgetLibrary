define([
        'util/LodashExtensions'
    ],
    function (
        _
    ) {
        'use strict';

        /**
         * This object models available sort criteria for ItinerariesList, and the currently selected sort criteria order.
         * The Currently selected sort criteria order is the list of sort criteria, that are to be applied to Itineraries, till there are no ties.
         */
        function ItinerariesListSortCriteria() {

            var that = this;

            /* all possible criteria to select from */
            this.availableSortCriteria = this.configureAvailableSortCriteria();

            /* the business logic specific sort criteria order, to be applied when there is a tie on the first user-selected sort criterion */
            this.sortCriteriaNaturalOrder = this.setSortCriteriaNaturalOrder();

            function setSortCriteriaInternal(firstCriterion) {
                // current sort criteria list will contain the user-selected criterion in the head, and then will be supplemented by others, defined in sortCriteriaNaturalOrder
                currentSortCriteria = that.sortCriteriaNaturalOrder.reduce(_.pushIfNotContains, [firstCriterion]);
            }

            this.setSortCriteria = function (firstCriterion) {
                setSortCriteriaInternal(firstCriterion);
            };

            this.resetSortCriteria = function () {
                setSortCriteriaInternal(_.first(this.sortCriteriaNaturalOrder));
            };

            this.getCurrentSortCriteria = function () {
                return currentSortCriteria;
            };

            var currentSortCriteria = this.resetSortCriteria();
        };

        ItinerariesListSortCriteria.prototype.sortCriteriaDefinitions = {
            byPriceAsc: {
                label: 'Price (Lowest)',
                propertyName: 'totalFareAmount',
                reverse: false
            },
            byPriceDesc: {
                label: 'Price (Highest)',
                propertyName: 'totalFareAmount',
                reverse: true
            },
            byDurationAsc: {
                label: 'Duration (Shortest)',
                propertyName: 'duration',
                reverse: false
            },
            byDurationDesc: {
                label: 'Duration (Longest)',
                propertyName: 'duration',
                reverse: true
            },
            byNumberOfStopsAsc: {
                label: 'Stops (Lowest)',
                propertyName: 'sumNumberOfStopsForAllLegs',
                reverse: false
            },
            byNumberOfStopsDesc: {
                label: 'Stops (Highest)',
                propertyName: 'sumNumberOfStopsForAllLegs',
                reverse: true
            },
            byDepartureTimeAsc: {
                label: 'Departure (Earliest)',
                propertyName: 'outboundDepartureDateTime',
                reverse: false
            },
            byDepartureTimeDesc: {
                label: 'Departure (Latest)',
                propertyName: 'outboundDepartureDateTime',
                reverse: true
            },
            byArrivalTimeAsc: {
                label: 'Arrival (Earliest)',
                propertyName: 'outboundArrivalDateTime',
                reverse: false
            },
            byArrivalTimeDesc: {
                label: 'Arrival (Latest)',
                propertyName: 'outboundArrivalDateTime',
                reverse: true
            }
        };

        /* may be overwritten by class clients */
        ItinerariesListSortCriteria.prototype.configureAvailableSortCriteria = function () {
            return [
                  this.sortCriteriaDefinitions.byPriceAsc
                , this.sortCriteriaDefinitions.byPriceDesc
                , this.sortCriteriaDefinitions.byDurationAsc
                , this.sortCriteriaDefinitions.byDurationDesc
                , this.sortCriteriaDefinitions.byNumberOfStopsAsc
                , this.sortCriteriaDefinitions.byNumberOfStopsDesc
                , this.sortCriteriaDefinitions.byDepartureTimeAsc
                , this.sortCriteriaDefinitions.byDepartureTimeDesc
                , this.sortCriteriaDefinitions.byArrivalTimeAsc
                , this.sortCriteriaDefinitions.byArrivalTimeDesc
            ];
        };

        /* business logic specific sort criteria order (next criteria are applied when application of previous one returned tie)
           may be overwritten by class clients */
        ItinerariesListSortCriteria.prototype.setSortCriteriaNaturalOrder = function () {
            return [
                  this.sortCriteriaDefinitions.byPriceAsc
                , this.sortCriteriaDefinitions.byDurationAsc
                , this.sortCriteriaDefinitions.byNumberOfStopsAsc
                , this.sortCriteriaDefinitions.byDepartureTimeAsc
                , this.sortCriteriaDefinitions.byArrivalTimeAsc
            ];    
        };

        return ItinerariesListSortCriteria;
    });
