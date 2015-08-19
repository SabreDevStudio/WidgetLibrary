define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        function AlternateDatesAbstractPriceMatrix() {

            this.leadFaresForDates = [];
            /* example content for round trip matrix: order of departure and return dates is maintained (sort order is maintained while inserting new elements)
             [
             {
             departureDate: '05 Jan'
             , pricesForReturnDates: [{ returnDate: '10 Jan', price: 100, currency: 'USD' }, { returnDate: '11 Jan', price: 110, currency: 'USD' }]
             },
             {
             departureDate: '06 Jan'
             , pricesForReturnDates: [{ returnDate: '10 Jan', price: 100, currency: 'USD' }, { returnDate: '11 Jan', price: 110, currency: 'USD' }]
             }
             ]

             example content for one way matrix: order of departure dates is maintained (sort order is maintained while inserting new elements)
             [
             {
             departureDate: '05 Jan',
             price: 100,
             currency: 'USD'
             },
             {
             departureDate: '06 Jan'
             price: 105,
             currency: 'USD'
             }
             ]
             */

            /**
             * returns ordered matrix of lead prices. Both departure dates and return dates are ordered ascending.
             * @returns {Array}
             */
            this.getAllLeadFares = function () {
                return this.leadFaresForDates;
            };

            this.findEntryForDepartureDate = function(departureDate) {
                var sameDateAsDepartureDateFn = _.partial(this.datesAreSameDay, departureDate);
                var entryForDepartureDate = _.find(this.leadFaresForDates, function (entry) {
                    return sameDateAsDepartureDateFn(entry.departureDate);
                });
                if (_.isUndefined(entryForDepartureDate)) {
                    var newEntry = {
                        departureDate: departureDate
                    };
                    var lowestIndexForInsert = _.sortedIndex(this.leadFaresForDates, newEntry, function (entry) {
                        return entry.departureDate.unix();
                    });
                    this.leadFaresForDates.splice(lowestIndexForInsert, 0, newEntry);
                    return newEntry;
                }
                return entryForDepartureDate;
            };

            this.updateEntry = function(entry, candidatePrice, candidateCurrency) {
                if (entry.currency && (entry.currency !== candidateCurrency)) {
                    throw new Error('Different currency when trying to update price for dates. Cannot compare the already cheapest fare in ' + entry.currency + ' to candidate fare in ' + candidateCurrency);
                }
                if (_.isUndefined(entry.currency)) {
                    entry.currency = candidateCurrency;
                }
                if (_.isUndefined(entry.price) || (entry.price > candidatePrice)) {
                    entry.price = candidatePrice;
                }
            };

            this.datesAreSameDay = function(first, second) {
                return first.clone().startOf('day').isSame(second.clone().startOf('day'));
            };

            this.hasAtLeastOnePrice = function () {
                return (!_.isEmpty(this.leadFaresForDates));
            };
        }

        return AlternateDatesAbstractPriceMatrix;
    });
