define(['util/validator', 'util/feature_detection', 'lodash'], function (v, browser_features, _) {
    "use strict";
    /*
     * WARN: Script uses Date.prototype.toLocaleString(), which implementation varies across platforms.
     * In the script I patch one IE problem with formatting. You will probably replace this formatting by array of strings for days of week and month names.
     */
    function DateFormatter(formatterOptions) {
        var that = this;

        formatterOptions = formatterOptions || {};

        this.options = _.defaults(formatterOptions, {
            alwaysUseLocalizedFailsafes: false
        });

        validateOptions();

        function validateOptions() {
            if (that.options.alwaysUseLocalizedFailsafes) {
                v.defined(that.options.localizedMonthNamesFailsafe, "when requesting to always localize, you have to actually provide the localized month names array and week names array");
                v.defined(that.options.localizedWeekDayNamesFailsafe, "when requesting to always localize, you have to actually provide the localized month names array and week names array");
            }

            // if you do not provide failsafes, then on browsers not supporting localized Date.toLocaleString it will not display month name and week day names in calendar header
            if (that.options.localizedMonthNamesFailsafe) {
                v.arrayHasLength(that.options.localizedMonthNamesFailsafe, 12, "When providing fail safe for localized month names, you have to provide names for all 12 months..");
            }

            if (that.options.localizedWeekDayNamesFailsafe) {
                v.arrayHasLength(that.options.localizedWeekDayNamesFailsafe, 7, "When providing fail safe for localized names of days of week, you have to provide all 7 of them..");
            }
        }

        this.weekDayNamesCacheKey = Object.keys(this.options);

        if (_.isUndefined(DateFormatter.prototype.weekDaysNamescache[this.weekDayNamesCacheKey])) {
            DateFormatter.prototype.weekDaysNamescache[this.weekDayNamesCacheKey] = this.createLocalizedWeekDayNames();
        }
    }

    DateFormatter.prototype.FULL_MONTH_FORMAT = 'MMMM';

    DateFormatter.prototype.weekDaysNamescache = {};

    DateFormatter.prototype.monthNamesCache = {};

    /** accepts moment date */
    DateFormatter.prototype.getMonthLocalizedName = function(date) {
        var cacheKey = Object.keys(this.options).concat(date);
        if (_.isUndefined(DateFormatter.prototype.monthNamesCache[cacheKey])) {
            DateFormatter.prototype.monthNamesCache[cacheKey] = this.createMonthLocalizedName(date);
        }
        return DateFormatter.prototype.monthNamesCache[cacheKey];
    };

    DateFormatter.prototype.createMonthLocalizedName = function(date) {
        if (this.options.alwaysUseLocalizedFailsafes) {
            return (this.options.localizedMonthNamesFailsafe)[date.month()];
        }
        if (browser_features.localizedToLocaleStringSupported()) {
            var monthStartDate = date.toDate();
            var monthName = monthStartDate.toLocaleString(this.options.locale, {month: "long"});
            // Remove the left-to-right marks that IE puts in the output of toLocaleString(). Only IE behaviour
            if (browser_features.isIE()) {
                monthName = monthName.replace(/\u200E/g, '');
            }
            return monthName;
        }
        if (this.options.localizedMonthNamesFailsafe) {
            return (this.options.localizedMonthNamesFailsafe)[date]; // if this option is not defined then month name will nto be shown
        }
        // if localization not supported and there is no fail safe, then try to format according to current locale:
        return date.format(this.FULL_MONTH_FORMAT);
    };

    /**
     * @return {Array} Array of localized strings representing days of week
     */
    DateFormatter.prototype.createLocalizedWeekDayNames = function() {
        if (this.options.alwaysUseLocalizedFailsafes) {
            return this.options.localizedWeekDayNamesFailsafe;
        }

        if (browser_features.localizedToLocaleStringSupported()) {
            var localizedWeekDayNames = [];
            var mondayDate = new Date(2015, 5, 1); // 1 June 2015 is Mon
            var currentWeekDay = mondayDate;
            for (var i = 0; i < 7; i++) {
                var weekLocalizedStr = currentWeekDay.toLocaleString(this.options.locale, {weekday: 'short'});
                // Remove the left-to-right marks that IE puts in the output of toLocaleString()
                if (browser_features.isIE()) {
                    weekLocalizedStr = weekLocalizedStr.replace(/\u200E/g, '');
                }
                localizedWeekDayNames.push(weekLocalizedStr);
                currentWeekDay.setDate(currentWeekDay.getDate() + 1);
            }
            return localizedWeekDayNames;
        }
        return this.options.localizedWeekDayNamesFailsafe; // if not provided then week day names in header will not be displayed
    };

    DateFormatter.prototype.getLocalizedWeekDayNames = function() {
        return DateFormatter.prototype.weekDaysNamescache[this.weekDayNamesCacheKey];
    };

    return DateFormatter;
});