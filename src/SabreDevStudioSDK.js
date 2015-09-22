require.config({
    paths: {
          text: '../bower_components/text/text'
        , moment: '../bower_components/moment/moment'
        , moment_range: '../bower_components/moment-range/dist/moment-range'
        , lodash: '../bower_components/lodash/lodash'
        , angular: '../bower_components/angular/angular'
        , 'angular_resource': '../bower_components/angular-resource/angular-resource'
        , 'angular_moment': '../bower_components/angular-moment/angular-moment'
        , 'angular_bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
        , 'angular-ui-select': '../bower_components/angular-ui-select/dist/select'
        , 'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize'
        , 'angular-img-fallback': '../bower_components/angular-img-fallback/angular.dcb-img-fallback'
        , 'angular-rangeslider': '../bower_components/angular-rangeslider/angular.rangeSlider'
        , 'ngStorage': '../bower_components/ngstorage/ngStorage'
        , 'ngPromiseExtras': '../bower_components/angular-promise-extras/angular-promise-extras'
        ,  chartjs: '../bower_components/Chart.js/Chart'
        , 'angular_iso_currency': '../bower_components/iso-currency/dist/isoCurrency'
        , 'elementQuery': 'lib/elementQuery' //TODO elementQuery exposing functions on windows... AMD support already requested, see: https://github.com/tysonmatanich/elementQuery/pull/9/commits
    },
    map: {
        '*': {
              'chartjs': 'chartjs-noConflict'
        }
        , 'chartjs-noConflict': { 'chartjs': 'chartjs'}
    },
    shim: {
        // angular does not support AMD out of the box, put it in a shim
        'angular': {
            exports: 'angular'
        },
        angular_resource: {
            deps: ['angular'], 'exports': 'ngResource'
        },
        angular_bootstrap: {
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
        'elementQuery': {
            exports: 'elementQuery'
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
          'moment'
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
        , 'widgets/DestinationPricerWidget'
        , 'widgets/ItinerariesList/ItinerariesListWidget'
        , 'widgets/filters/FiltersPanelWidget'
        , 'widgets/filters/ValuesFilterDirective'
        , 'Configuration'
        , 'elementQuery'
    ], function (
          moment
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
        , DestinationPricerWidget
        , ItinerariesListWidget
        , FiltersPanelWidget
        , DiscreteFilterWidget
        , Configuration
        , elementQuery
    ) { // we have to list all files with angular components as dependencies, so that they are recognized?
        "use strict";

    bootstrapNG();

    function bootstrapNG() {
        angular.element(document).ready(function () {
            var beforeNG = performance.now();
            angular.bootstrap(document, ['sdsWidgets'], { // TODO: we cannot compile on whole document level..
                strictDi: true
            });
            var afterNG = performance.now();
            console.log('NG load: ' + (afterNG - beforeNG));
            parseCssStylesheetsForElementQueries();
            // var afterCSS = performance.now();
            // console.log('CSS RWD parse: ' + (afterCSS - afterNG));
        });
    }

    function parseCssStylesheetsForElementQueries() {
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('SDS') > -1) { //TODO: having file part name constant in JS code to limit processing to only own stylesheets. But this infix should be overwritten by build system (Grunt), while doing minfication. Changing the name of minified file in grunt will not change here...
                // TODO: becasue of how elementQuery script is writted it will parse all stylesheets later anyway itself. And will act on it.
                elementQuery(document.styleSheets[i], true);
            }
        }
    }

});
