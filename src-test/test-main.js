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
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min"
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