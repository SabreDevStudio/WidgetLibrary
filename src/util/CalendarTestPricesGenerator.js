define(['moment', 'datamodel/ShoppingData'], function (moment, ShoppingData) {

    function generatePrices(monthSpecifications, calculatePricePerDayFn) {
        calculatePricePerDayFn = calculatePricePerDayFn || function (currentDay) {
            return currentDay.date() * 100 + 0.05;
        };
        var allMonthsPrices = {};
        monthSpecifications.forEach(function (monthSpec) {
            var month = moment({year: monthSpec.year, month: monthSpec.month});
            var monthKey = month.format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
            var monthPrices = [];
            if (!monthSpec.emptyPrices) {
                moment().range(month, month.clone().endOf('month')).by('days', function (currentDay) {
                    var currentDayKey = currentDay.format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                    monthPrices[currentDayKey] = calculatePricePerDayFn(currentDay);
                });
            }
            allMonthsPrices[monthKey] = monthPrices;
        });
        return allMonthsPrices;
    }

    return {
        generatePrices: generatePrices
    };
});