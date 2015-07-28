define([],
    function () {
        'use strict';

        return {
            // comparator function assigns greater ranking when itinerary is more preferable.
            // So when using this comparator, while sorting, the best itineraries will go to the end of list.
            comparator: function (first, second) {
                var durationNormalizationFactor = (first.duration + second.duration) / (first.totalFareAmount + second.totalFareAmount);

                var rankingFirst = -(first.duration / durationNormalizationFactor + first.totalFareAmount);
                var rankingSecond = -(second.duration / durationNormalizationFactor + second.totalFareAmount);
                if (rankingFirst === rankingSecond) {
                    return 0;
                } else if (rankingFirst > rankingSecond) {
                    return 1
                } else {
                    return -1;
                }
            }
        };
    });
