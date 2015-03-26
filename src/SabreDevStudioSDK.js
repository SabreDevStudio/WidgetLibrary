require.config({
    paths: {
        'jquery': "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min",
        // for loading mustache text templates as AMD
        mustache: 'lib/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: 'lib/moment-with-locales',
        validator: "util/validator",
        validator_lib: '../node_modules/validator/validator',
        lodash: 'lib/lodash'
    },
    map: {
        '*': { 'jquery': 'util/jquery-loader' },
        'util/jquery-loader': { 'jquery': 'jquery' }
    },
    stache: {
        extension: '.mst'
    }
});

require(["jquery", "Calendar", 'moment'], function($, Calendar, moment) {
    "use strict";

    function runCustomerCode() {
        if (window.SDS_onload) {
            for (var i = 0; i < window.SDS_onload.length; i++) {
                var func = window.SDS_onload[i];
                if (typeof func === 'function') {
                    func();
                }
            }
        }
    }

    function initializeSDK() {
        var SDS = {};
        SDS.initializedSuccessful = false;

        if (window.SDS) {
            return;
        }

        SDS.init = function (options) {
            if (typeof options.apiKey === 'undefined') {
                new Error("You have to specify apiKey to use Sabre Dev Studio");
            }
            this.initializedSuccessful = true;
        };

        SDS.calendar = function (targetDomElementId, options, doNotCallWebServiceAndUseFakePrices) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }

            function generatePricesForTest(year, month) {
                var prices = {};
                var currentDay = moment({year: year, month: month - 1});
                var endOfMonthDay = currentDay.clone().endOf('month');
                while(currentDay.isBefore(endOfMonthDay) || currentDay.isSame(endOfMonthDay)) {
                    prices[currentDay] = currentDay.date() * 100 + 0.05;
                    currentDay.add(1, 'day');
                }
                return prices;
            }

            var clientCallback = function (calendarNode) {
                $("#" + targetDomElementId).append(calendarNode);
            };

            var calendar = new Calendar(options);
            if (doNotCallWebServiceAndUseFakePrices) {
                calendar.render(clientCallback, generatePricesForTest(options.year, options.month));
            } else {
                calendar.render(clientCallback);
            }
        };

        window.SDS = SDS;
    }

    initializeSDK();
    runCustomerCode();

});
