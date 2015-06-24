define(['util/validator', 'util/feature_detection', 'lodash', 'moment'], function (v, browser_features, _, moment) {
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
    }

    DateFormatter.prototype.FULL_MONTH_FORMAT = 'MMMM';

    /** accepts moment date */
    DateFormatter.prototype.getMonthLocalizedName = _.memoize(function(date) {
        if (this.options.alwaysUseLocalizedFailsafes) {
            return (this.options.localizedMonthNamesFailsafe)[date.month()];
        }
        if (browser_features.localizedToLocaleStringSupported()) {
            return this.createLocalizedMonthName(date);
        }
        if (this.options.localizedMonthNamesFailsafe) {
            return (this.options.localizedMonthNamesFailsafe)[date]; // if this option is not defined then month name will not be shown
        }
        // if localization not supported and there is no fail safe, then try to format according to current locale:
        return date.format(this.FULL_MONTH_FORMAT);
    }, function (date) {
        var cacheKey = _.keys(this.options).concat(date);
        return cacheKey;
    });


    function removeIESpecialCharacters(localizedString) {
        // Remove the left-to-right marks that IE puts in the output of toLocaleString(). Only IE behaviour
        if (browser_features.isIE()) {
            localizedString = localizedString.replace(/\u200E/g, '');
        }
        return localizedString;
    }

    DateFormatter.prototype.createLocalizedMonthName = function(date) {
        var monthStartDate = date.toDate();
        var monthName = monthStartDate.toLocaleString(this.options.locale, {month: "long"});
        monthName = removeIESpecialCharacters(monthName);
        return monthName;
    };


    /**
     * @return {Array} Array of localized strings representing days of week
     */
    DateFormatter.prototype.getLocalizedWeekDayNames = _.memoize(function() {
        if (this.options.alwaysUseLocalizedFailsafes) {
            return this.options.localizedWeekDayNamesFailsafe;
        }
        if (browser_features.localizedToLocaleStringSupported()) {
            return this.createLocalizedWeekdayNames();
        }
        return this.options.localizedWeekDayNamesFailsafe; // if not provided then week day names in header will not be displayed
    }, function () {
        var cacheKey = _.keys(this.options);
        return cacheKey;
    });

    DateFormatter.prototype.createLocalizedWeekdayNames = function() {
        var localizedWeekDayNames = [];
        var mondayDate = moment("2015-06-01", "YYYY-MM-DD"); // 1 June 2015 is Mon
        var sundayDate = mondayDate.clone().add(6, 'day');
        var that = this;
        moment.range(mondayDate, sundayDate).by('days', function (day) {
            var weekLocalizedStr = day.toDate().toLocaleString(that.options.locale, {weekday: 'short'});
            weekLocalizedStr = removeIESpecialCharacters(weekLocalizedStr);
            localizedWeekDayNames.push(weekLocalizedStr);
        });
        return localizedWeekDayNames;
    };

    return DateFormatter;
});