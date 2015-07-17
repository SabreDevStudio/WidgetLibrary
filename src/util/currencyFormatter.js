define(['util/validator', 'lodash', 'util/feature_detection'], function (v, _, feature_detection) {

    return function CurrencyFormatter(currencyOptions) {
        "use strict";

        var formatter;

        var options = _.defaults(currencyOptions, {
            locale: window.navigator.language // if locale not defined in options then we default to browser settings. for example "en-US"
        });

        validateOptions();

        function validateOptions() {
            v.currencySymbol(options.currency, "You have to specify currency, and options.currency must be valid 3 letter currency code, for example USD");
        }

        if (window.Intl && window.Intl.NumberFormat && feature_detection.localizedNumberFormattingSupported()) {
            formatter = Intl.NumberFormat(options.locale, {style: 'currency', currency: options.currency});
        }

        this.format = function(string) {
            return (formatter)? formatter.format(string): string;
        };

        CurrencyFormatter.prototype.getCurrency = function () {
            return options.currency;
        };
    };

});