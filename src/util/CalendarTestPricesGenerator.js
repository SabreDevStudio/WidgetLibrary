define(['moment'], function (moment) {

    function generatePrices(monthSpecifications, calculatePricePerDayFn) {
        var allMonthsPrices = {};
        monthSpecifications.forEach(function (monthSpec) {
            var monthKey = moment({year: monthSpec.year, month: monthSpec.month});
            var monthPrices = [];
            if (!monthSpec.emptyPrices) {
                var currentDay = monthKey.clone();
                var endOfMonthDay = currentDay.clone().endOf('month');
                while (currentDay.isBefore(endOfMonthDay) || currentDay.isSame(endOfMonthDay)) {
                    if (calculatePricePerDayFn) {
                        monthPrices[currentDay] = calculatePricePerDayFn(currentDay);
                    } else {
                        monthPrices[currentDay] = currentDay.date() * 100 + 0.05;
                    }
                    currentDay.add(1, 'day');
                }
            }
            allMonthsPrices[monthKey] = monthPrices;
        });
        return allMonthsPrices;
    }

    return {
        generatePrices: generatePrices
    };
});