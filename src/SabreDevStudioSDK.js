require.config({
    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min",
        // for loading mustache text templates as AMD
        templates: 'templates',
        mustache: 'lib/mustache',
        text: 'lib/text',
        stache: 'lib/stache'
    },
    map: {
        '*': { 'jquery': 'util/jquery-loader' },
        'util/jquery-loader': { 'jquery': 'jquery' }
    },
    stache: {
        extension: '.mst'
        //path: 'templates/'
    }
});

require(["jquery", "Calendar"], function($, Calendar) {
    "use strict";

    function runCustomerCode() {
        if (window.SDS_onload) {
            for (var i = 0; i < window.SDS_onload.length; i++) {
                var func = window.SDS_onload[i];
                if (typeof func === 'function') {
                    func();
                }
            }
        }
    }

    function initializeSDK() {
        var SDS = {};
        SDS.initializedSuccessful = false;

        if (window.SDS) {
            return;
        }

        SDS.init = function (options) {
            if (typeof options.apiKey === 'undefined') {
                new Error("You have to specify apiKey to use Sabre Dev Studio");
            }
            this.initializedSuccessful = true;
        };

        SDS.calendar = function (targetDomElementId, options) {
            if (!SDS.initializedSuccessful) {
                throw new Error("You have to initialize Sabre Dev Studio first, call init");
            }
            var calendarNode = (new Calendar(options)).render();
            $("#" + targetDomElementId).append(calendarNode);
        };

        window.SDS = SDS;
    }

    initializeSDK();
    runCustomerCode();

});
