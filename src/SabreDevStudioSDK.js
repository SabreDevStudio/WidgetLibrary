require.config({
    paths: {
          'jquery': "../bower_components/jquery/dist/jquery"
        , 'jquery_loader': 'util/jquery-loader'
        , text: '../bower_components/text/text'
        , moment: '../bower_components/moment/min/moment-with-locales'
        , moment_range: '../bower_components/moment-range/dist/moment-range'
        , validator_lib: '../bower_components/validator-js/validator'
        , lodash: '../bower_components/lodash/lodash'
        , angular: '../bower_components/angular/angular'
        , 'angular_resource': '../bower_components/angular-resource/angular-resource'
        , 'angular_moment': '../bower_components/angular-moment/angular-moment'
        , 'angular_bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
        , 'angular_animate': '../bower_components/angular-animate/angular-animate'
        , 'angular-ui-select': '../bower_components/angular-ui-select/dist/select'
        , 'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize'
        , 'angular-img-fallback': '../bower_components/angular-img-fallback/angular.dcb-img-fallback'
        , 'angular-rangeslider': '../bower_components/angular-rangeslider/angular.rangeSlider'
        , 'ngStorage': '../bower_components/ngstorage/ngStorage'
        , 'ngPromiseExtras': '../bower_components/angular-promise-extras/angular-promise-extras'
        ,  chartjs: '../bower_components/Chart.js/Chart'
        , 'bootstrap_switch': 'lib/bootstrap-switch-AMD'
        , 'angular_bootstrap_switch': '../bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch'
        , 'angular_iso_currency': '../bower_components/iso-currency/dist/isoCurrency'
    },
    //map: { // disabled, with it angular is not using jquery but its jqLite
    //    '*': {'jquery': 'util/jquery-loader'},
    //    'util/jquery-loader': {'jquery': 'jquery'}
    //},
    map: {
        '*': {
              'chartjs': 'chartjs-noConflict'
  //           ,'jquery': 'jquery_loader'
        }
        , 'chartjs-noConflict': { 'chartjs': 'chartjs'}
//         ,'jquery_loader': {'jquery': 'jquery'}
    },
    shim: {
        //'jquery': {
        //    exports: '$'
        //},
        // angular does not support AMD out of the box, put it in a shim
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        angular_resource: {
            deps: ['angular'], 'exports': 'ngResource'
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
        },
        'ngStorage': {
            deps: ['angular']
        },
        'ngPromiseExtras': {
            deps: ['angular']
        },
        'angular_currency_filter': {
            deps: ['angular']
        },
        'angular_iso_currency': {
            deps: ['angular']
        },
        'bootstrap_switch': {
            deps: ['jquery']
        },
        'angular_bootstrap_switch': {
            deps: ['angular', 'bootstrap_switch']
        }
    },
    config: {
        moment: {
            noGlobal: true
        }
    },
    waitSeconds: 15
});

require([
          "jquery"
        , 'moment'
        , 'datamodel/ItinerariesList'
        , 'webservices/BasicSearchCriteriaValidator'
        , 'webservices/InstaflightSearchCriteriaValidator'
        , 'lodash'
        , 'angular'
        , 'widgets/calendar/CalendarWidget'
        , 'widgets/AlternateDatesMatrixWidget'
        , 'widgets/leadPriceChart/LeadPriceChartWidget'
        , 'widgets/LowFareHistoryWidget'
        , 'widgets/searchForm/SearchFormWidget'
        , 'widgets/searchForm/SearchFormInputControls'
        , 'widgets/ItinerariesList/InputSortBy'
        , 'widgets/fareForecast/FareForecastWidget'
        , 'widgets/FareRangeWidget'
        , 'widgets/FareNabberWidget'
        , 'widgets/ItinerariesList/ItinerariesListWidget'
        , 'widgets/filters/FiltersPanelWidget'
        , 'widgets/filters/ValuesFilterDirective'
        , 'Configuration'
    ], function (
          $
        , moment
        , ItinerariesList
        , BasicSearchCriteriaValidator
        , InstaflightSearchCriteriaValidator
        , _
        , angular
        , CalendarWidget
        , AlternateDatesMatrixWidget
        , LeadPriceChartWidget
        , LowFareHistoryWidget
        , SearchFormWidget
        , SearchFormInputControls
        , InputSortBy
        , FareForecastWidget
        , FareRangeWidget
        , FareNabberWidget
        , ItinerariesListWidget
        , FiltersPanelWidget
        , DiscreteFilterWidget
        , Configuration
    ) { // we have to list all files with angular components as dependencies, so that they are recognized?
        "use strict";

        function bootstrapNG() {
            angular.element(document).ready(function () { // TODO: we cannot compile on whole document level..
            //$(document).ready(function() {
                angular.bootstrap(document, ['sdsWidgets'], {
                    strictDi: true
                });
            });
        }

        bootstrapNG();

    });
