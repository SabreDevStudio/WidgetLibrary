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
        'jasmine-jquery': '../src-test/lib/jasmine-jquery',
        mustache: 'lib/mustache',
        text: 'lib/text',
        stache: 'lib/stache',
        moment: 'lib/moment-with-locales',
        validator: "util/validator",
        validator_lib: '../node_modules/validator/validator',
        async: '../node_modules/async/lib/async',
        lodash: 'lib/lodash'
    },
    shim: {
        'jasmine-jquery': {
            deps: ['jquery']
        }
        //lodash: {
        //    exports: '_' // TODO: will loadash be loaded into customer global namespace?
        //}
    },
    stache: {
        extension: '.mst'
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