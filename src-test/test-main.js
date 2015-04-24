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
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min",
        'jquery-ui': 'http://code.jquery.com/ui/1.11.4/jquery-ui',
        //'jquery-mobile': 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min',
        'jasmine-jquery': '../src-test/lib/jasmine-jquery',
        mustache: 'lib/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: 'lib/moment-with-locales',
        moment_range: '../node_modules/moment-range/lib/moment-range',
        validator_lib: '../node_modules/validator/validator',
        async: '../node_modules/async/lib/async',
        lodash: 'lib/lodash'
    },
    shim: {
        'jasmine-jquery': {
            deps: ['jquery']
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