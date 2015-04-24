define(['moment', 'datamodel/ItinerariesList', 'util/LodashExtensions'], function (moment, ItinerariesList, __) {
    //TODO: lodash also available thru global object..
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
            return _.has(data, key, month);
        };

        // merges new shopping data (the same type of object) into the current object.
        // if there are data under the same keys (days), then new data override old data: meaning all new itineraries will override all old ones (no old one will remain)
        ShoppingData.prototype.addUpdate = function(newData) {
            _.each(newData, function (dataForKey, key) {
                if(_.isUndefined(dataForKey)) {
                    return;
                }
                _.each(dataForKey, function (monthData) {
                    if(_.isUndefined(dataForKey)) {
                        return;
                    }
                    addUpdateForMonth(key, monthData);
                });
                that.updateLeadPrices(key);
            });
        };

        function addUpdateForMonth(key, addedMonthData) {
            if (_.isUndefined(addedMonthData)) {
                return;
            }
            _.each(addedMonthData, function (dayData, day) {
                if (_.isUndefined(dayData)) {
                   return;
                }
                _.each(dayData.itinerariesList, function (itin) {
                    this.addItinerary(key, itin, day);
                });
            });
        }

        ShoppingData.prototype.addItinerary = function (key, itinerary, date) {
            date = date || itinerary.getOutboundDepartureDateTime();
            var month = date.clone().startOf('month');
            var day = date.clone().startOf('day');
            initKeyEntries(data, key, month, day);

            data[key][month][day].itinerariesList.add(itinerary);
        };

        ShoppingData.prototype.getItinerariesList = function (key, day) {
            var month = day.clone().startOf('month');
            if (_.has(data, key, month, day)) {
                return data[key][month][day].itinerariesList;
            }
            return [];
        };


        ShoppingData.prototype.getLeadPrices = function (key, month) {
            var leadPrices = {};
            if (_.has(data, key, month)) {
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
            if (!_.has(data, key)) {
                return;
            }
            _.each(data[key], function (monthData) {
                if (_.isUndefined(monthData)) {
                    return;
                }
                _.each(monthData, function (dayData, day) {
                    var leadPrice = dayData.itinerariesList.getLeadPrice();
                    monthData[day].leadPrice = leadPrice;
                });
            })
        };

        //TODO this is lodash 3.7 _.set function, other problems with new lodash 3.7 now, refactor later
        function initKeyEntries(data, key, month, day) {
            if (_.isUndefined(data)) {
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
                    itinerariesList: new ItinerariesList()
                };
            }
        }
    }

    return ShoppingData;
});