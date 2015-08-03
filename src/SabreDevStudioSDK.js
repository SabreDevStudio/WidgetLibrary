require.config({
    paths: {
        'jquery': "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        'jquery-ui': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        //'jquery-mobile': 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min',
        mustache: '../bower_components/mustache/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: '../bower_components/moment/min/moment-with-locales',
        moment_range: '../bower_components/moment-range/dist/moment-range',
        validator_lib: '../bower_components/validator-js/validator',
        async: '../bower_components/async/lib/async',
        lodash: '../bower_components/lodash/lodash',
        angular: '../bower_components/angular/angular',
        'd3': '../bower_components/d3/d3',
        'nvd3': '../bower_components/nvd3/nv.d3',
        'angular_nvd3': '../bower_components/angular-nvd3/dist/angular-nvd3',
        'angular_resource': '../bower_components/angular-resource/angular-resource',
        'angular_moment': '../bower_components/angular-moment/angular-moment',
        'angular_bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular_animate': '../bower_components/angular-animate/angular-animate',
        'angular-ui-select': '../bower_components/angular-ui-select/dist/select',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-img-fallback': '../bower_components/angular-img-fallback/angular.dcb-img-fallback',
        'angular-rangeslider': '../bower_components/angular-rangeslider/angular.rangeSlider'
    },
    //map: { // disabled, with it angular is not using jquery but its jqLite
    //    '*': {'jquery': 'util/jquery-loader'},
    //    'util/jquery-loader': {'jquery': 'jquery'}
    //},
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        angular_resource: {
            deps: ['angular'], 'exports': 'ngResource'
        },
        d3: {
            exports: 'd3' //todo: all these libs export global symbols...
        },
        nvd3: {
            exports: 'nvd3',
            deps: ['d3']
        },
        angular_nvd3: {
            exports: 'angular_nvd3',
            deps: ['nvd3', 'angular']
        },
        angular_bootstrap: {
            deps: ['angular']
        },
        angular_animate: {
            deps: ['angular']
        },
        'angular-ui-select': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-img-fallback': {
            deps: ['angular']
        },
        'angular-rangeslider': {
            deps: ['angular']
        }
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

require([
          "jquery"
        , "widgets/calendar/CalendarWidget"
        , 'moment'
        , 'util/CalendarTestPricesGenerator'
        , 'util/DateFormatter'
        , 'util/currencyFormatter'
        , 'datamodel/ShoppingData'
        , 'datamodel/ItinerariesList'
        , 'util/AirlineNameLookup'
        , 'util/AirportNameLookup'
        , 'datamodel/TestItineraryBuilder'
        , 'datamodel/BasicSearchCriteriaValidator'
        , 'datamodel/InstaflightSearchCriteriaValidator'
        , 'lodash'
        , 'angular'
        , 'widgets/fareTrendChart/FareTrendChartWidget'
        , 'widgets/searchForm/SearchFormWidgetNG'
        , 'widgets/fareForecast/FareForecastWidget'
        , 'widgets/FareRangeWidget'
        , 'widgets/FareNabberWidget'
        , 'widgets/ItineraryListWidget'
        , 'widgets/filters/FiltersPanelWidget'
        , 'widgets/filters/ValuesFilterDirective'
        , 'Configuration'
    ], function (
          $
        , Calendar
        , moment
        , testPricesGenerator
        , DateFormatter
        , CurrencyFormatter
        , ShoppingData
        , ItinerariesList
        , AirlineNameLookup
        , AirportNameLookup
        , TestItineraryBuilder
        , BasicSearchCriteriaValidator
        , InstaflightSearchCriteriaValidator
        , _
        , angular
        , FareTrendChartWidget
        , SearchFormWidgetNG
        , FareForecastWidget
        , FareRangeWidget
        , FareNabberWidget
        , ItineraryListWidget
        , FiltersPanelWidget
        , DiscreteFilterWidget
        , Configuration
    ) { // we have to list all files with angular components as dependencies, so that they are recognized?
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
                    var endMonth = startMonth.clone().add(calendar.options.numberOfMonthsToShow, 'month');
                    moment().range(startMonth, endMonth).by('months', function (month) {
                        monthSpecifications.push(month);
                    });
                    calendar.options.testPrices = testPricesGenerator.generatePrices(monthSpecifications);
                }

                return calendar;
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

            SDS.testItineraryBuilder = function (numberOfItins) {
                testItineraryBuilder = testItineraryBuilder || new TestItineraryBuilder();
                return testItineraryBuilder;
            };

            /**
             * as options you can pass any option acceptable by jQuery UI Datepicker
             * @param DOMSelector
             * @param options
             */
            SDS.searchForm = function (DOMSelector, options) {

                options.searchCriteriaValidator = options.searchCriteriaValidator || SDS.instaflightSearchCriteriaValidator(); //TODO hardcode for now

                var searchFormWidget = new SearchFormWidget(options);

                searchFormWidget.render(function (searchFormWidgetDOM) {
                    $(DOMSelector).append(searchFormWidgetDOM);
                });
                return searchFormWidget;
            };

            SDS.basicSearchCriteriaValidator = new BasicSearchCriteriaValidator(); //TODO to factories

            SDS.instaflightSearchCriteriaValidator = new InstaflightSearchCriteriaValidator();

            window.SDS = SDS;

            bootstrapNG();
        }

        function bootstrapNG() {
            angular.element(document).ready(function () { // TODO: we cannot compile on whole document level..
            //$(document).ready(function() {
                angular.bootstrap(document, ['sdsWidgets']);
            });
        }

        initializeSDK();
        runCustomerCode();

    });
