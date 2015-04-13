define(['validator', 'util/feature_detection'], function (v, browser_features) {

    /*
     * WARN: Script uses Date.prototype.toLocaleString(), which implementation varies across platforms.
     * In the script I patch one IE problem with formatting. You will probably replace this formatting by array of strings for days of week and month names.
     */
    function DateFormatter(formatterOptions) {
        "use strict";

        var that = this;

        var options = $.extend(true, {}, formatterOptions);

        setOptionsDefaults();

        validateOptions();

        function setOptionsDefaults() {
            options.alwaysUseLocalizedFailsafes = options.alwaysUseLocalizedFailsafes || false;
        }

        var FULL_MONTH_FORMAT = 'MMMM';

        function validateOptions() {
            if (options.alwaysUseLocalizedFailsafes) {
                v.defined(options.localizedMonthNamesFailsafe, "when requesting to always localize, you have to actually provide the localized month names array and week names array");
                v.defined(options.localizedWeekDayNamesFailsafe, "when requesting to always localize, you have to actually provide the localized month names array and week names array");
            }

            // if you do not provide failsafes, then on browsers not supporting localized Date.toLocaleString it will not display month name and week day names in calendar header
            if (options.localizedMonthNamesFailsafe) {
                v.arrayHasLength(options.localizedMonthNamesFailsafe, 12, "When providing fail safe for localized month names, you have to provide names for all 12 months..");
            }

            if (options.localizedWeekDayNamesFailsafe) {
                v.arrayHasLength(options.localizedWeekDayNamesFailsafe, 7, "When providing fail safe for localized names of days of week, you have to provide all 7 of them..");
            }
        }

        /** accepts moment date */
        DateFormatter.prototype.getMonthLocalizedName = function(date) {
            if (options.alwaysUseLocalizedFailsafes) {
                return (options.localizedMonthNamesFailsafe)[date.month()];
            }
            if (browser_features.localizedToLocaleStringSupported()) {
                var monthStartDate = date.toDate();
                var monthName = monthStartDate.toLocaleString(options.locale, {month: "long"});
                // Remove the left-to-right marks that IE puts in the output of toLocaleString(). Only IE behaviour
                if (browser_features.isIE()) {
                    monthName = monthName.replace(/\u200E/g, '');
                }
                return monthName;
            }
            if (options.localizedMonthNamesFailsafe) {
                return (options.localizedMonthNamesFailsafe)[date]; // if this option is not defined then month name will nto be shown
            }
            // if localization not supported and there is no fail safe, then try to format according to current locale:
            return date.format(FULL_MONTH_FORMAT);
        };

        /**
         * @return {Array} Array of localized strings representing days of week
         */
        DateFormatter.prototype.getLocalizedWeekDayNames = function() {
            if (options.alwaysUseLocalizedFailsafes) {
                return options.localizedWeekDayNamesFailsafe;
            }

            if (browser_features.localizedToLocaleStringSupported()) {
                var localizedWeekDayNames = [];
                var mondayDate = new Date(2015, 5, 1); // 1 June 2015 is Mon
                var currentWeekDay = mondayDate;
                for (var i = 0; i < 7; i++) {
                    var weekLocalizedStr = currentWeekDay.toLocaleString(options.locale, {weekday: 'short'});
                    // Remove the left-to-right marks that IE puts in the output of toLocaleString()
                    if (browser_features.isIE()) {
                        weekLocalizedStr = weekLocalizedStr.replace(/\u200E/g, '');
                    }
                    localizedWeekDayNames.push(weekLocalizedStr);
                    currentWeekDay.setDate(currentWeekDay.getDate() + 1);
                }
                return localizedWeekDayNames;
            }
            return options.localizedWeekDayNamesFailsafe; // if not provided then week day names in header will not be displayed
        };
    }

    return DateFormatter;

});