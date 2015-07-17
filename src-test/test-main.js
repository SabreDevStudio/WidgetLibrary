/*global requirejs */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Test.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        'jquery-ui': 'http://code.jquery.com/ui/1.11.4/jquery-ui',
        //'jquery-mobile': 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min',
        'jasmine-jquery': '../node_modules/jasmine-jquery/lib/jasmine-jquery',
        mustache: '../bower_components/mustache/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: '../bower_components/moment/min/moment-with-locales',
        moment_range: '../bower_components/moment-range/dist/moment-range',
        validator_lib: '../bower_components/validator-js/validator',
        async: '../bower_components/async/lib/async',
        lodash: '../bower_components/lodash/lodash',
        angular: '../bower_components/angular/angular',
        'angular_resource': '../bower_components/angular-resource/angular-resource',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        'angular_moment': '../bower_components/angular-moment/angular-moment',
        'd3': '../bower_components/d3/d3',
        'nvd3': '../bower_components/nvd3/nv.d3',
        'angular_nvd3': '../bower_components/angular-nvd3/dist/angular-nvd3'
    },
    shim: {
        'jasmine-jquery': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular'
        },
        angular_resource : {
            deps : ['angular'], 'exports' : 'ngResource'
        },
        'angularMocks': {
            deps: ['angular']
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
    },
    //map: {
    //    '*': { 'jquery': 'util/jquery-loader' },
    //    'util/jquery-loader': { 'jquery': 'jquery' }
    //},


    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});