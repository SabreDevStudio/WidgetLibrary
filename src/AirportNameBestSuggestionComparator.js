define(['lodash'],
    function (_) {
        'use strict';

        function AirportNameBestSuggestionComparator(stringCurrentlySearchedFor) {
            this.stringCurrentlySearchedFor = stringCurrentlySearchedFor.toUpperCase();

            var that = this;

            function getOrderByAirportCodeFullMatch(a, b) {
                if (a.airportCode === that.stringCurrentlySearchedFor) {
                    return 1;
                }
                if (b.airportCode === that.stringCurrentlySearchedFor) {
                    return -1;
                }
                return 0;
            }

            function getOrderByLabelAtStringStart(a, b) {
                if (_.startsWith(a.fullName.toUpperCase(), that.stringCurrentlySearchedFor)) {
                    return 1;
                }
                if (_.startsWith(b.fullName.toUpperCase(), that.stringCurrentlySearchedFor)) {
                    return -1;
                }
            }

            return function(a, b) {
                var orderByValueFullMatch = getOrderByAirportCodeFullMatch(a, b);
                if (orderByValueFullMatch !== 0) {
                    return orderByValueFullMatch;
                }

                var orderByLabelAtStringStart = getOrderByLabelAtStringStart(a, b);
                if (orderByLabelAtStringStart !== 0) {
                    return orderByLabelAtStringStart;
                }

                return 0;
            };
        }

        return AirportNameBestSuggestionComparator;
});
