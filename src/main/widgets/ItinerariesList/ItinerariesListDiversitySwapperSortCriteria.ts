define([
          'lodash'
        , 'util/LodashExtensions'
        , 'widgets/ItinerariesList/ItinerariesListSortCriteria'
    ],
    function (
              _
            , __
            , ItinerariesListSortCriteria
    ) {
        'use strict';

        /**
         * This object models available sort criteria for ItinerariesList, and the currently selected sort criteria order.
         * The Currently selected sort criteria order is the list of sort criteria, that are to be applied to Itineraries, till there are no ties.
         */
        function ItinerariesListDiversitySwapperSortCriteria() {

            ItinerariesListSortCriteria.call(this);
        }

        ItinerariesListDiversitySwapperSortCriteria.prototype = Object.create(ItinerariesListSortCriteria.prototype);
        ItinerariesListDiversitySwapperSortCriteria.prototype.constructor = ItinerariesListDiversitySwapperSortCriteria;

        /* may be overwritten by class clients */
        ItinerariesListDiversitySwapperSortCriteria.prototype.configureAvailableSortCriteria = function () {

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
                , this.sortCriteriaDefinitions.byWeightedPriceAmountAsc
                , this.sortCriteriaDefinitions.byWeightedPriceAmountDesc
            ];
        };

        return ItinerariesListDiversitySwapperSortCriteria;

    });
