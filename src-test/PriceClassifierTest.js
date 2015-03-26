define(['util/PriceClassifier'], function (PriceClassifier) {
    "use strict";
    describe('classifies correctly', function () {
        var classifier = new PriceClassifier([100.1, 200, 100.1, 200, 500, 500, 100.1]);

        it('classfies correctly existing values', function () {
            expect(classifier.tier(100.1)).toBe(1);
            expect(classifier.tier(200)).toBe(2);
            expect(classifier.tier(500)).toBe(3);
        });
        it('unknown value, returns 0', function () {
            expect(classifier.tier(50)).toBe(0);
        });
    });
});