define([
      'util/LodashExtensions'
    , 'moment'
    , 'moment_range'
    , 'widgets/calendar/CalendarMonthBounds'
    , 'util/PriceClassifier'
    , 'util/momentRangeUtils' //TODO works also without it...
    , 'datamodel/ShoppingData'
    ],
    function (
      _
    , moment
    , moment_range
    , CalendarMonthBounds
    , PriceClassifier
    , momentRangeUtils
    , ShoppingData
) {
        'use strict';

        function Calendar(options) {

            var that = this;

            var numberOfMonths = options.numberOfMonths;
            var lastSearchCriteria = {};
            var modelMonths = [];

            this.months = [];

            this.dayOfWeekNames = moment.weekdaysMin();

            this.getLastSearchCriteria = function () {
              return lastSearchCriteria;
            };

            this.setLastSearchCriteria = function (searchCriteria) {
              lastSearchCriteria = searchCriteria;
            };

            this.getModelMonths = function () {
              return modelMonths;
            };

            this.priceClassifier = new PriceClassifier();

            this.prepareDataModel = function (searchCriteria) {
                var requestedMonth = searchCriteria.getFirstLeg().departureDateTime;
                var rangeOfMonthsToShow = createRangeOfMonthsToShow(requestedMonth);
                modelMonths = createModelMonths(rangeOfMonthsToShow);
                this.requestedMonthSeqNumber = calculateRequestedMonthSeqNumber(requestedMonth, modelMonths);
            };

            function calculateRequestedMonthSeqNumber(requestedMonth, modelMonths) {
                for (var i = 0; i < modelMonths.length; i++) {
                    if (modelMonths[i].isSame(requestedMonth)) {
                        return i;
                    }
                }
            }

            function createRangeOfMonthsToShow (firstMonthToShow) {
                var firstMonthShown = firstMonthToShow.clone().startOf('month');
                var lastMonthShown = firstMonthShown.clone().add(numberOfMonths - 1, 'month');
                var requestedRange = moment.range(firstMonthShown, lastMonthShown);

                requestedRange = moment.generateAdjacentMonths(requestedRange.start, numberOfMonths - 1);

                if (minOrMaxDateConstraintPresent()) {
                    var allowedRange = moment.range(that.minDateStartOfMonth, that.maxDateStartOfMonth);
                    requestedRange = moment.adjustToMinMaxDates(requestedRange, allowedRange);
                }
                return requestedRange;
            }

            function createModelMonths(monthsRange) {
                var modelMonths = [];
                monthsRange.by('months', function (month) {
                    modelMonths.push(month);
                });
                return modelMonths;
            }

            this.updateMonthModelWithLeadPrices = function(prices, monthMinPrices, bounds) {
                var that = this;
                var allWeeks = [];
                var currentWeek = {days: []};

                var createDataForPrevNextMonthDays = function (dayNumber) {
                    return {
                        day: dayNumber,
                        isPrevOrNextMonthDay: true
                    };
                };

                // 1. add days of last week of previous month (in the same week as the 1st day of current month)
                currentWeek.days = bounds.prevMonthDaysOfLastWeek.map(createDataForPrevNextMonthDays);

                // 2. add this month all days and prices
                var noPricesFound = true;
                moment().range(bounds.monthStartDate, bounds.monthEndDate).by('days', function (day) {
                    var dayCellData = {};
                    dayCellData.day = day;
                    var dayKey = day.format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                    if (prices && prices[dayKey]) {
                        noPricesFound = false;
                        var currPrice = prices[dayKey].price;
                        dayCellData.price = currPrice;
                        dayCellData.currency = prices[dayKey].currency;
                        dayCellData.priceTier = that.priceClassifier.classifyIntoTier(currPrice);
                    }
                    currentWeek.days.push(dayCellData);
                    if (currentWeek.days.length === 7) {
                        allWeeks.push(currentWeek);
                        currentWeek = {days: []};
                    }
                });

                if (currentWeek.days.length < 7) {
                    // 3. add days of first week of next month
                    currentWeek.days = currentWeek.days.concat(
                        bounds.nextMonthDaysOfFirstWeek.map(createDataForPrevNextMonthDays)
                    );
                    allWeeks.push(currentWeek);
                }

                return {
                    monthStartDate: bounds.monthStartDate,
                    noPricesFound: noPricesFound,
                    monthLeadPrice: monthMinPrices[bounds.monthStartDate] && monthMinPrices[bounds.monthStartDate].price,
                    monthLeadPriceCurrency: monthMinPrices[bounds.monthStartDate] && monthMinPrices[bounds.monthStartDate].currency,
                    weeks: allWeeks
                };
            };

            this.calculateMonthsMinPrices = function(prices) {
                return _.reduce(prices, function (acc, priceAndCurrency, dayKey) {
                    var month = moment(dayKey).startOf('month');
                    if (acc[month.toString()] && acc[month.toString()].currency !== priceAndCurrency.currency) {
                        throw new Error('Unable to calculate month min price as currencies for particular day prices are different');
                    }
                    if (_.isUndefined(acc[month.toString()]) || (acc[month.toString()].price > priceAndCurrency.price)) {
                        acc[month.toString()] = priceAndCurrency;
                    }
                    return acc;
                }, {});
            };

            function minOrMaxDateConstraintPresent() {
                return that.minDate || that.maxDate;
            }

            this.getMonthBounds = _.memoize(function(month) {
                return new CalendarMonthBounds(month);
            });

        }

        Calendar.prototype.hasData = function () {
            return !(_.isEmpty(this.months));
        };

        Calendar.prototype.setLastDayDisplayedCap = function (maxAvailableDate) {
            this.maxAvailableDate = maxAvailableDate;
        };

        Calendar.prototype.updateWithLeadPrices = function (searchCriteria, leadPrices) {
            var that = this;
            this.setLastSearchCriteria(searchCriteria);

            // classifier will be needed to assign prices per day into price tiers (cheapest, second cheapest, and so on).
            this.priceClassifier.train(_.pluck(_.values(leadPrices), 'price'));
            var monthsMinPrices = this.calculateMonthsMinPrices(leadPrices);
            this.months = this.getModelMonths().map(function (month) { //TODO abstraction levels in all functions
                var monthBounds = that.getMonthBounds(month);
                return that.updateMonthModelWithLeadPrices(leadPrices, monthsMinPrices, monthBounds);
            });
            this.months = trimLeadingAndTrailingMonthsWithNoPrices(this.months);
        };

        function trimLeadingAndTrailingMonthsWithNoPrices(months) {
            var firstMonthWithPrices = _.findIndex(months, 'noPricesFound', false);
            var lastMonthWithPrices = _.findLastIndex(months, 'noPricesFound', false);
            return months.slice(firstMonthWithPrices, lastMonthWithPrices + 1);
        }

        Calendar.prototype.getDisplayedRange = function () {
            return new moment.range(_.first(this.getModelMonths()), _.last(this.getModelMonths()).clone().endOf('month'));
        };

        return Calendar;
    });
