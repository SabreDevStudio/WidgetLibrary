define(['lodash'],
    function (_) {
        'use strict';

        function AirportNameBestSuggestionComparator(stringCurrentlySearchedFor) {
            this.stringCurrentlySearchedFor = stringCurrentlySearchedFor.toUpperCase();

            var that = this;

            function getOrderByValueFullMatch(a, b) {
                if (a.value === that.stringCurrentlySearchedFor) {
                    return 1;
                }
                if (b.value === that.stringCurrentlySearchedFor) {
                    return -1;
                }
                return 0;
            }

            function getOrderByLabelAtStringStart(a, b) {
                if (_.startsWith(a.label.toUpperCase(), that.stringCurrentlySearchedFor)) {
                    return 1;
                }
                if (_.startsWith(b.label.toUpperCase(), that.stringCurrentlySearchedFor)) {
                    return -1;
                }
            }

            return function(a, b) {
                var orderByValueFullMatch = getOrderByValueFullMatch(a, b);
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
