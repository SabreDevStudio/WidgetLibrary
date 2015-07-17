define(['util/currencyFormatter', 'util/feature_detection'],
    function (CurrencyFormatter, browser_features) {
        "use strict";

        describe('formatting', function () {
            if (!browser_features.localizedNumberFormattingSupported()) {
                return;
            }
            var formatter = new CurrencyFormatter({locale: "en-US", currency: 'USD'});

            it('dot as decimal separator in input', function () {
                expect(formatter.format(500.05)).toBe('$500.05')
            });
        });

    }
);