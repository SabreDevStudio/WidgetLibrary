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
        async: '../node_modules/async/lib/async',
        lodash: 'lib/lodash'
    },
    map: {
        '*': { 'jquery': 'util/jquery-loader' },
        'util/jquery-loader': { 'jquery': 'jquery' }
    },
    stache: {
        extension: '.mst'
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

require(["jquery", "Calendar", 'moment', 'util/CalendarTestPricesGenerator'], function($, Calendar, moment, testPricesGenerator) {
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
        if (window.SDS) {
            return;
        }

        var SDS = {};

        SDS.initializedSuccessful = false;

        var globalCache = {};

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

            options.globalPriceCache = globalCache;

            var clientCallback = function (calendarNode) {
                $("#" + targetDomElementId).empty().append(calendarNode);
            };

            var calendar = new Calendar(options);

            if (doNotCallWebServiceAndUseFakePrices) {
                var monthSpecifications = (function () {
                    var specs = [];
                    var currMonth = moment({year: calendar.options.year, month: calendar.options.month - 1});
                    for (var i = 0; i < calendar.options.numberOfMonths; i++) {
                        specs.push({year: currMonth.year(), month: currMonth.month()});
                        currMonth.add(1, 'month');
                    }
                    return specs;
                })();
                calendar.options.testPrices = testPricesGenerator.generatePrices(monthSpecifications);
            }

            calendar.render(clientCallback);
        };

        window.SDS = SDS;
    }

    initializeSDK();
    runCustomerCode();

});
