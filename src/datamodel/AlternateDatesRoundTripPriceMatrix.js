define([
          'lodash'
        , 'datamodel/AlternateDatesAbstractPriceMatrix'
    ],
    function (
          _
        , AlternateDatesAbstractPriceMatrix
    ) {
        'use strict';

        function AlternateDatesRoundTripPriceMatrix() {

            AlternateDatesAbstractPriceMatrix.apply(this, arguments);

            var that = this;

            this.addLeadFareForDate = function (travelDatesWithLeadPrice) {
                var entry = findEntryForDepartureAndReturnDates(travelDatesWithLeadPrice.departureDate, travelDatesWithLeadPrice.returnDate);
                this.updateEntry(entry, travelDatesWithLeadPrice.price, travelDatesWithLeadPrice.currency);
            };

            this.getLeadFareForTravelDates = function (departureDate, returnDate) {
                var sameDateAsDepartureDateFn = _.partial(this.datesAreSameDay, departureDate);
                var departureEntry = _.find(this.leadFaresForDates, function (entry) {
                    return sameDateAsDepartureDateFn(entry.departureDate);
                });
                if (_.isUndefined(departureEntry)) {
                    return;
                }
                var sameDateAsReturnDateFn = _.partial(this.datesAreSameDay, returnDate);
                var entry = _.find(departureEntry.pricesForReturnDates, function (entry) {
                    return sameDateAsReturnDateFn(entry.returnDate);
                });
                if (_.isUndefined(entry)) {
                    return;
                }
                return {
                    price: entry.price,
                    currency: entry.currency
                };
            };

            /**
             * Returns ordered deduplicated list of all return dates that exist for any departure date
             */
            this.getAllReturnDates = function () {
                var allReturnDates = _.flattenDeep(this.leadFaresForDates.map(function (departureDateEntry) {
                    return departureDateEntry.pricesForReturnDates.map(function (returnDateEntry) {
                        return returnDateEntry.returnDate;
                    });
                }));
                return _.uniq(allReturnDates, false, function (momentDate) {
                    return momentDate.unix();
                });
            };

            function findEntryForDepartureAndReturnDates(departureDate, returnDate) {
                var departureDateEntry = that.findEntryForDepartureDate(departureDate);
                return findEntryForReturnDate(departureDateEntry, returnDate);
            }

            function findEntryForReturnDate(departureDateEntry, returnDate) {
                if (_.isUndefined(departureDateEntry.pricesForReturnDates)) {
                    departureDateEntry.pricesForReturnDates = [];
                }
                var departureDateEntriesArray = departureDateEntry.pricesForReturnDates;
                var sameDateAsReturnDateFn = _.partial(that.datesAreSameDay, returnDate);
                var entryForReturnDate = _.find(departureDateEntriesArray, function (entry) {
                    return sameDateAsReturnDateFn(entry.returnDate);
                });
                if (_.isUndefined(entryForReturnDate)) {
                    var newEntry = {
                          returnDate: returnDate
                    };
                    var lowestIndexForInsert = _.sortedIndex(departureDateEntriesArray, newEntry, function (entry) {
                        return entry.returnDate.unix();
                    });
                    departureDateEntriesArray.splice(lowestIndexForInsert, 0, newEntry);
                    return newEntry;
                }
                return entryForReturnDate;
            }

        }

        AlternateDatesRoundTripPriceMatrix.prototype = Object.create(AlternateDatesAbstractPriceMatrix.prototype);
        AlternateDatesRoundTripPriceMatrix.prototype.constructor = AlternateDatesRoundTripPriceMatrix;

        return AlternateDatesRoundTripPriceMatrix;
    });