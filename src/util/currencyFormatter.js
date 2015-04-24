define(['util/validator', 'lodash'], function (v, _) {

    return function CurrencyFormatter(currencyOptions) {
        "use strict";

        var formatter;

        var options = _.defaults(currencyOptions, {
            locale: window.navigator.language // for example "en-US"
        });

        validateOptions();

        function validateOptions() {
            v.currencySymbol(options.currency, "You have to specify currency, and options.currency must be valid 3 letter currency code, for example USD");
        }

        /**
         * function to check if locale currency formatting is done correctly
         */
        function formatsCorrectly() {
            var tmpFormatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
            return ('' + tmpFormatter.format(123456.78) === '$123,456.78');
        }

        if (window.Intl && window.Intl.NumberFormat && formatsCorrectly()) {
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