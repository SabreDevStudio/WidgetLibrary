define(['moment'], function (moment) {
    "use strict";

    function ShoppingData() {
        var data = {};

        var that = this;

        /* if there is entry for given month, then data had been already requested (from web service) for this month.
        * It is to remember that call was made, there was no results, so not point to call web service again
         * This function is called client code feeding this object, before or after adding the actual, found, shopping data
        **/
        ShoppingData.prototype.markRequestedData = function(key, startDate, endDate) {
            //the prices object primary keys are 1st days of all months. To have the range iteration include also 1st of startDate, we have to move start date to beginning of month
            moment().range(startDate.clone().startOf('month'), endDate).by('months', function (month) {
                initKeyEntries(data, key, month);
            });

        };

        ShoppingData.prototype.contains = function(key, month) {
            return (data[key] && data[key][month]);
        };

        // merges new shopping data (the same type of object) into the current object.
        // if there are data under the same keys (days), then new data override old data: meaning all new itineraries will override all old ones (no old one will remain)
        ShoppingData.prototype.addUpdate = function(newData) {
            Object.keys(newData).forEach(function (key) {
                if (!newData[key]) {
                    return;
                }
                Object.keys(newData[key]).forEach(function (month) {
                    addUpdateForMonth(key, newData[key][month]);
                });
                that.updateLeadPrices(key);
            });
        };

        function addUpdateForMonth(key, addedMonthData) {
            if (!addedMonthData) {
                return;
            }
            Object.keys(addedMonthData).forEach(function (day) {
                if (!addedMonthData[day]) {
                    return;
                }
                addedMonthData[day].itineraries.forEach(function (itin) {
                    this.addItinerary(key, itin, day);
                });
            });
        }

        ShoppingData.prototype.addItinerary = function (key, itinerary, date) {
            date = date || itinerary.getTravelDate();
            var month = date.clone().startOf('month');
            var day = date.clone().startOf('day');
            initKeyEntries(data, key, month, day);

            data[key][month][day].itineraries.push(itinerary);
        };

        ShoppingData.prototype.getItineraries = function (key, day) {
            var month = day.clone().startOf('month');
            if (!data[key] || !data[key][month] || !data[key][month][day]) {
                return [];
            }
            return data[key][month][day].itineraries;
        };


        ShoppingData.prototype.getLeadPrices = function (key, month) {
            var leadPrices = {};
            if (data[key] && data[key][month]) {
                Object.keys(data[key][month]).forEach(function (day) {
                    leadPrices[day] = data[key][month][day].leadPrice;
                });
            }
            return leadPrices;
        };

        /**
         * iterates all data months and finds lead price for each day of each month
         */
        ShoppingData.prototype.updateLeadPrices = function (key) {
            if (!data[key]) {
                return;
            }
            Object.keys(data[key]).forEach(function (month) {
                if (!data[key][month]) {
                    return;
                }
                Object.keys(data[key][month]).forEach(function (day) {
                    var leadPrice = _.min(data[key][month][day].itineraries, 'totalFareAmount').totalFareAmount;
                    data[key][month][day].leadPrice = leadPrice;
                });
            });
        };

        function initKeyEntries(data, key, month, day) {
            if (!data) {
                data = {}
            }
            if (!data[key]) {
                data[key] = {};
            }
            if (!data[key][month]) {
                data[key][month] = {};
            }
            if (day && !data[key][month][day]) {
                data[key][month][day] = {
                    itineraries: []
                };
            }
        }

    }

    return ShoppingData;
});