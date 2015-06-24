require.config({
    paths: {
        'jquery': "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        'jquery-ui': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        //'jquery-mobile': 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min',
        mustache: 'lib/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: 'lib/moment-with-locales',
        moment_range: '../node_modules/moment-range/lib/moment-range',
        validator_lib: '../node_modules/validator/validator',
        async: '../node_modules/async/lib/async',
        lodash: 'lib/lodash',
        'sabre-dev-studio': '../node_modules/sabre-dev-studio/lib/sabre-dev-studio'
        //'simple-errors': '../node_modules/sabre-dev-studio/node_modules/simple-errors/index'

    },
    map: {
        '*': { 'jquery': 'util/jquery-loader' },
        'util/jquery-loader': { 'jquery': 'jquery' }
    },
    stache: {
        extension: '.mst'
    },
    'jquery-ui': {
        deps: ['jquery']
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

require(["jquery", "widgets/calendar/CalendarWidget", 'ItinerariesListWidget', 'FiltersPaneWidget', 'SearchFormWidget', 'moment', 'util/CalendarTestPricesGenerator', 'util/DateFormatter', 'util/currencyFormatter', 'datamodel/ShoppingData', 'datamodel/ItinerariesList', 'util/AirlineNameLookup', 'util/AirportNameLookup', 'datamodel/TestItineraryBuilder'
    ,'datamodel/BasicSearchCriteriaValidator', 'datamodel/InstaflightSearchCriteriaValidator', 'lodash'],
    function($, Calendar, ItinerariesListWidget, FiltersPaneWidget, SearchFormWidget, moment, testPricesGenerator, DateFormatter, CurrencyFormatter, ShoppingData, ItinerariesList, AirlineNameLookup, AirportNameLookup, TestItineraryBuilder
    , BasicSearchCriteriaValidator
    , InstaflightSearchCriteriaValidator, _) {
    "use strict";

    function runCustomerCode() {
        if (_.isUndefined(window.SDS_onload)) {
            throw new Error('Trying to use the SDK, but actually no SDK API calls detected. Is the window.SDS_onload array populated with functions that execute API calls?');
        }
        window.SDS_onload.filter(_.isFunction).forEach(function (func) {
            func();
        });
    }

    function initializeSDK() {

        var dateFormatter;

        var currencyFormatter;

        var airlineNameLookup;

        var airportNameLookup;

        var testItineraryBuilder;

        if (window.SDS) {
            return;
        }

        var SDS = {};

        SDS.initializedSuccessful = false;

        var globalCache = new ShoppingData();

        SDS.init = function (options) {
            if (typeof options.apiKey === 'undefined') {
                new Error("You have to specify apiKey to use Sabre Dev Studio");
            }
            SDS.options = $.extend(true, {}, options);
            this.initializedSuccessful = true;
        };

        SDS.calendar = function (targetDomElementId, options, doNotCallWebServiceAndUseFakePrices) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }

            options.globalOptionsCache = globalCache; // TODO: since we deep copy all options in widgets, the cache will not be shared..?

            var clientCallback = function (calendarNode) {
                $("#" + targetDomElementId).append(calendarNode);
            };

            options.callbackOnViewCreate = clientCallback;

            var calendar = new Calendar(options);

            if (doNotCallWebServiceAndUseFakePrices) {
                var monthSpecifications = [];
                var startMonth = moment({year: calendar.options.year, month: calendar.options.month});
                var endMonth   = startMonth.clone().add(calendar.options.numberOfMonthsToShow, 'month');
                moment().range(startMonth, endMonth).by('months', function (month) {
                    monthSpecifications.push(month);
                });
                calendar.options.testPrices = testPricesGenerator.generatePrices(monthSpecifications);
            }

            return calendar;
        };

        SDS.itinerariesList = function(targetDomElementId) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }

            var itinerariesListWidget = new ItinerariesListWidget();

            itinerariesListWidget.render(function (itinerariesListDom) {
                $("#" + targetDomElementId).append(itinerariesListDom);
            });

            return itinerariesListWidget;
        };

        SDS.filtersPaneWidget = function(targetDomElementId) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }

            var filtersPaneWidget = new FiltersPaneWidget();

            filtersPaneWidget.render(function (filtersPaneWidgetDOM) {
                $("#" + targetDomElementId).append(filtersPaneWidgetDOM);
            });

            return filtersPaneWidget;
        };

        // returns localized dates formatter, for use of widgets, or SDK user
        SDS.dateFormatter = function () {
            dateFormatter = dateFormatter || new DateFormatter(SDS.options);
            return dateFormatter;
        };

        SDS.currencyFormatter = function () {
            currencyFormatter = currencyFormatter || new CurrencyFormatter(SDS.options);
            return currencyFormatter;
        };

        SDS.airlineNameLookup = function () {
            airlineNameLookup = airlineNameLookup || new AirlineNameLookup();
            return airlineNameLookup;
        };

        SDS.airportNameLookup = function () {
            airportNameLookup = airportNameLookup || new AirportNameLookup();
            return airportNameLookup;
        };

        SDS.testItineraryBuilder = function(numberOfItins) {
            testItineraryBuilder = testItineraryBuilder || new TestItineraryBuilder();
            return testItineraryBuilder;
        };

        /**
         * as options you can pass any option acceptable by jQuery UI Datepicker
         * @param DOMSelector
         * @param options
         */
        SDS.searchForm = function (DOMSelector, options) {

            var searchFormWidget = new SearchFormWidget(options);

            searchFormWidget.render(function (searchFormWidgetDOM) {
                $(DOMSelector).append(searchFormWidgetDOM);
            });
            return searchFormWidget;
        };

        SDS.basicSearchCriteriaValidator = new BasicSearchCriteriaValidator(); //TODO to factories

        SDS.instaflightSearchCriteriaValidator = new InstaflightSearchCriteriaValidator();

        window.SDS = SDS;
    }

    initializeSDK();
    runCustomerCode();

});
