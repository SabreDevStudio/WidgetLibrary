/**
 * This loader checks it jQuery in required version is already registered in global namespace (is already loaded).
 * If yes then it uses the already loaded version.
 *
 * If jQuery was not detected in global namespace then it loads it from CDN, but registers in noConflict mode.
 */
        define(['jquery'], function (jq) {
            // console.log("loading jQuery from CDN");
            return jq.noConflict( true );
        });
