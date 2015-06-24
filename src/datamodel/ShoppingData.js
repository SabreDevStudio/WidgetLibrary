define(['moment', 'datamodel/ItinerariesList', 'util/LodashExtensions'], function (moment, ItinerariesList, __) {
    //TODO: lodash also available thru global object..
    "use strict";

    function ShoppingData() {

        this.data = {};
    }

    /* In all this object we use string representation of moment date objects for month and day key.
       In order not to depend on moment.js internal date format used in toString(),
       the this object prototype internal fixed format is defined and used to create string keys from moment objects. */
    ShoppingData.prototype.DATE_FORMAT_FOR_KEYS = 'ddd MMM DD YYYY HH:mm:ss';

    /* if there is entry for given month, then data had been already requested (from web service) for this month.
    * It is to remember that call was made, there was no results, so not point to call web service again
     * This function is called client code feeding this object, before or after adding the actual, found, shopping data
    **/
    ShoppingData.prototype.markRequestedData = function(key, startDate, endDate) {
        var that = this;
        //the prices object primary keys are 1st days of all months. To have the range iteration include also 1st of startDate, we have to move start date to beginning of month
        moment().range(startDate.clone().startOf('month'), endDate).by('months', function (month) {
            var monthKey = month.format(this.DATE_FORMAT_FOR_KEYS);
            that.initKeyEntries(that.data, key, monthKey);
        });
    };

    ShoppingData.prototype.contains = function(key, month) {
        var monthKey = month.format(this.DATE_FORMAT_FOR_KEYS);
        return (_.has(this.data, key) && _.has(this.data[key], [monthKey]));
    };

    // merges new shopping data (the same type of object) into the current object.
    // if there are data under the same keys (days), then new data override old data: meaning all new itineraries will override all old ones (no old one will remain)
    ShoppingData.prototype.addUpdate = function(newData) {
        var that = this;
        _.each(newData.data, function (dataForKey, key) {
            if(_.isUndefined(dataForKey)) {
                return;
            }
            _.each(dataForKey, function (monthData, monthKey) {
                that.initKeyEntries(that.data, key, monthKey);
                that.addUpdateForMonth(key, monthData);
            });
            that.updateLeadPrices(key);
        });
    };

    ShoppingData.prototype.addUpdateForMonth = function(key, addedMonthData) {
        var that = this;
        if (_.isUndefined(addedMonthData)) {
            return;
        }
        _.each(addedMonthData, function (dayData, day) {
            if (_.isUndefined(dayData)) {
               return;
            }
            _.each(dayData.itinerariesList.getItineraries(), function (itin) {
                that.addItinerary(key, itin, moment(day, that.DATE_FORMAT_FOR_KEYS));
            });
        });
    };

    ShoppingData.prototype.addItinerary = function (key, itinerary, date) {
        var monthKey = date.clone().startOf('month').format(this.DATE_FORMAT_FOR_KEYS);
        var dayKey = date.clone().startOf('day').format(this.DATE_FORMAT_FOR_KEYS);
        this.initKeyEntries(this.data, key, monthKey, dayKey);

        this.data[key][monthKey][dayKey].itinerariesList.add(itinerary);
    };

    ShoppingData.prototype.getItinerariesList = function (key, day) {
        var monthKey = day.clone().startOf('month').format(this.DATE_FORMAT_FOR_KEYS);
        var dayKey = day.format(this.DATE_FORMAT_FOR_KEYS);
        if (_.has(this.data, key) && _.has(this.data[key], [monthKey]) && _.has(this.data[key][monthKey], [dayKey])) {
            return this.data[key][monthKey][dayKey].itinerariesList;
        }
    };


    ShoppingData.prototype.getLeadPrices = function (key, month) {
        var leadPrices = {};
        var that = this;
        var monthKey = month.format(this.DATE_FORMAT_FOR_KEYS);
        if (_.has(this.data, key) && _.has(this.data[key], [monthKey])) {
            Object.keys(this.data[key][monthKey]).forEach(function (dayKey) {
                leadPrices[dayKey] = that.data[key][monthKey][dayKey].leadPrice;
            });
        }
        return leadPrices;
    };

    /**
     * iterates all data months and finds lead price for each day of each month
     */
    ShoppingData.prototype.updateLeadPrices = function (key) {
        if (!_.has(this.data, key)) {
            return;
        }
        _.each(this.data[key], function (monthData) {
            if (_.isUndefined(monthData)) {
                return;
            }
            _.each(monthData, function (dayData, dayKey) {
                var leadPrice = dayData.itinerariesList.getLeadPrice();
                monthData[dayKey].leadPrice = leadPrice;
            });
        })
    };

    //TODO this is lodash 3.7 _.set function, other problems with new lodash 3.7 now, refactor later
    ShoppingData.prototype.initKeyEntries = function(data, key, monthKey, dayKey) {
        if (_.isUndefined(data)) {
            this.data = {}
        }
        if (!this.data[key]) {
            this.data[key] = {};
        }
        if (!this.data[key][monthKey]) {
            this.data[key][monthKey] = {};
        }
        if (dayKey && !this.data[key][monthKey][dayKey]) {
            this.data[key][monthKey][dayKey] = {
                itinerariesList: new ItinerariesList()
            };
        }
    };

    return ShoppingData;
});