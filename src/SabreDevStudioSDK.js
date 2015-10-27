require.config({
    paths: {
          moment: '../bower_components/moment/moment'
        , moment_range: '../bower_components/moment-range/dist/moment-range'
        , lodash: '../bower_components/lodash/lodash'
        , angular: '../bower_components/angular/angular'
        , 'angular_resource': '../bower_components/angular-resource/angular-resource'
        , 'angular_bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
        , 'angular-ui-select': '../bower_components/angular-ui-select/dist/select'
        , 'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize'
        , 'angular-img-fallback': '../bower_components/angular-img-fallback/angular.dcb-img-fallback'
        , 'angular-rangeslider': '../bower_components/angular-rangeslider/angular.rangeSlider'
        , 'ngStorage': '../bower_components/ngstorage/ngStorage'
        , 'ngPromiseExtras': '../bower_components/angular-promise-extras/angular-promise-extras'
        , 'chartjs': '../bower_components/Chart.js/Chart'
        , 'angular_iso_currency': '../bower_components/iso-currency/dist/isoCurrency'
        , 'elementQuery': '../bower_components/elementQuery/elementQuery' //WARN: elementQuery is exposing functions on windows... AMD support already requested, see: https://github.com/tysonmatanich/elementQuery/pull/9/commits
    },
    map: {
        '*': {
              'chartjs': 'util/chartjs-noConflict'
        }
        , 'util/chartjs-noConflict': { 'chartjs': 'chartjs'}
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
    }
});

define([
          'moment'
        , 'datamodel/ItinerariesList'
        , 'webservices/common/validators/BasicSearchCriteriaValidator'
        , 'webservices/instaflights/InstaflightSearchCriteriaValidator'
        , 'lodash'
        , 'angular'
        , 'widgets/calendar/CalendarWidget'
        , 'widgets/AlternateDatesMatrixWidget'
        , 'widgets/leadPriceChart/LeadPriceChartWidget'
        , 'widgets/LowFareHistoryWidget'
        , 'widgets/searchForm/SearchFormWidget'
        , 'widgets/searchForm/SearchFormInspirationalWidget'
        , 'widgets/searchForm/SearchFormInputControls'
        , 'widgets/ItinerariesList/InputSortBy'
        , 'widgets/fareForecast/FareForecastWidget'
        , 'widgets/fareRange/FareRangeWidget'
        , 'widgets/FareNabberWidget'
        , 'widgets/DestinationPricerWidget'
        , 'widgets/ItinerariesList/ItinerariesListWidget'
        , 'widgets/filters/FiltersPanelWidget'
        , 'widgets/filters/ValuesFilterDirective'
        , 'widgets/ErrorDisplayWidget'
        , 'Configuration'
        , 'elementQuery'
        , 'widgets/templateCacheCharger'
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
        , SearchFormInspirationalWidget
        , SearchFormInputControls
        , InputSortBy
        , FareForecastWidget
        , FareRangeWidget
        , FareNabberWidget
        , DestinationPricerWidget
        , ItinerariesListWidget
        , FiltersPanelWidget
        , DiscreteFilterWidget
        , ErrorDisplayWidget
        , Configuration
        , elementQuery
        , templateCacheCharger
    ) { // we have to list all files with angular components as dependencies, so that they are recognized?
        "use strict";

    //>>excludeStart('excludeWhenBuiltAsLibraryOnly', pragmas.excludeWhenBuiltAsLibraryOnly);
    bootstrapNG();
    //>>excludeEnd('excludeWhenBuiltAsLibraryOnly');

    function bootstrapNG() {
        angular.element(document).ready(function () {
            var beforeNG = performance.now();
            angular.bootstrap(document, ['sdsWidgets'], { // TODO: we cannot compile on whole document level..
                strictDi: true
            });
            var afterNG = performance.now();
            console.log('NG load: ' + parseInt(afterNG - beforeNG));

            var initInjector = angular.injector(["ng"]);
            var $timeout = initInjector.get("$timeout");
            $timeout(function () {
                parseAllStylesheetsToMakeWidgetsResponsive();
            }, 0);
            // var afterCSS = performance.now();
            // console.log('CSS RWD parse: ' + (afterCSS - afterNG));
        });
    }

    function parseAllStylesheetsToMakeWidgetsResponsive() {
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('SDS') > -1) { //TODO: having file part name constant in JS code to limit processing to only own stylesheets. But this infix should be overwritten by build system (Grunt), while doing minfication. Changing the name of minified file in grunt will not change here...
                // TODO: becasue of how elementQuery script is written it will parse all stylesheets later anyway itself. And will act on it.
                elementQuery(document.styleSheets[i], true);
            }
        }
    }

    return {
        parseAllStylesheetsToMakeWidgetsResponsive: parseAllStylesheetsToMakeWidgetsResponsive
    }

});
