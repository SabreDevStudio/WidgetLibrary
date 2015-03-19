/**
 * This loader checks it jQuery in required version is already registered in global namespace (is already loaded).
 * If yes then it uses the already loaded version.
 *
 * If jQuery was not detected in global namespace then it loads it from CDN, but registers in noConflict mode.
 */
(function () {
    "use strict";

    var REQUIRED_JQUERY_VERSION = '1.11.2';

    if ((window.jQuery) && (window.jQuery.fn.jquery === REQUIRED_JQUERY_VERSION)) {
        // console.log("required jQuery already loaded, window.jQuery version = " + window.jQuery.fn.jquery);
        define(function () {
            return window.jQuery;
        });

    } else {
        define(['jquery'], function (jq) {
            // console.log("loading jQuery from CDN");
            return jq.noConflict( true );
        });
    }
})();