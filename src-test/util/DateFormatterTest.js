define(['util/DateFormatter', 'util/feature_detection', 'moment'],
    function (DateFormatter, browser_features, moment) {
        "use strict";

        describe('localization', function () {

            var localizedMonthNamesFailsafe = [];
            for (var i = 0; i < 12; i++) {
                localizedMonthNamesFailsafe.push("localizedMonthName" + i);
            }

            it('month name displayed correctly: no fail safe for month names', function () {
                var formatter = new DateFormatter({locale: "en-US"});
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(formatter.getMonthLocalizedName(moment({year: 2015, month: 2}))).toEqual('March');
                }
            });

            it('month name displayed correctly: no fail safe for month names, other locale supported', function () {
                var formatter = new DateFormatter({locale: "pt-BR"}); // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(formatter.getMonthLocalizedName(moment({year: 2015, month: 1}))).toEqual('fevereiro'); // February
                }
            });

            it('month name displayed correctly: fail safe for month name used', function () {
                var formatter = new DateFormatter({
                    alwaysUseLocalizedFailsafes: true,
                    localizedMonthNamesFailsafe: localizedMonthNamesFailsafe,
                    localizedWeekDayNamesFailsafe: ['1String', '2String', '3String', '4String', '5String', '6String', '7String']
                });

                expect(formatter.getMonthLocalizedName(moment({year: 2015, month: 2}))).toEqual('localizedMonthName2');
            });

            it('short days of week displayed correctly in header: other locale, fail safe provided', function () {
                var formatter = new DateFormatter({
                    locale: "pt-BR", // Brazilian-portuguese, testing it on purpose on locale other than default browser or OS
                    localizedMonthNamesFailsafe: localizedMonthNamesFailsafe,
                    localizedWeekDayNamesFailsafe: ['1String', '2String', '3String', '4String', '5String', '6String', '7String']
                });

                var weekDayNames = formatter.getLocalizedWeekDayNames();
                if (browser_features.localizedToLocaleStringSupported()) {
                    expect(weekDayNames[6]).toEqual('dom'); // 'dom' is portuguese for Sun
                } else {
                    expect(weekDayNames[6]).toEqual('7String');
                }
            });

        });

    }
);