define(['lodash'], function (_) {
    return function PriceClassifier(priceArray) {

        var uniquePrices = _.uniq(priceArray);

        this.tier = function (price) {
            return _.indexOf(uniquePrices, price, true) + 1;
        };
    };
});