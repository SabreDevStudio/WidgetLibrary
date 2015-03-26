define(function () {

    return function CurrencyFormatter(locale, currency) {
        "use strict";

        var formatter;

        /**
         * function to check if locale currency formatting is done correctly
         */
        function formatsCorrectly() {
            var tmpFormatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
            return ('' + tmpFormatter.format(123456.78) === '$123,456.78');
        }

        if (window.Intl && window.Intl.NumberFormat && formatsCorrectly()) {
            formatter = Intl.NumberFormat(locale, {style: 'currency', currency: currency});
        }

        this.format = function(string) {
            return (formatter)? formatter.format(string): string;
        };
    };

});