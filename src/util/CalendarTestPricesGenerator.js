define(['moment'], function (moment) {

    function generatePrices(monthSpecifications, calculatePricePerDayFn) {
        calculatePricePerDayFn = calculatePricePerDayFn || function (currentDay) {
            return currentDay.date() * 100 + 0.05;
        };
        var allMonthsPrices = {};
        monthSpecifications.forEach(function (monthSpec) {
            var monthKey = moment({year: monthSpec.year, month: monthSpec.month});
            var monthPrices = [];
            if (!monthSpec.emptyPrices) {
                moment().range(monthKey, monthKey.clone().endOf('month')).by('days', function (currentDay) {
                    monthPrices[currentDay] = calculatePricePerDayFn(currentDay);
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