define(['util/currencyFormatter'],
    function (CurrencyFormatter) {
        "use strict";

        describe('formatting', function () {
            var formatter = new CurrencyFormatter({locale: "en-US", currency: 'USD'});

            it('dot as decimal separator in input', function () {
                expect(formatter.format(500.05)).toBe('$500.05')
            });
        });

    }
);