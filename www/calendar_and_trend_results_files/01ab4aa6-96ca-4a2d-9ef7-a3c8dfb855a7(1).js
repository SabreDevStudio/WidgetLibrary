// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// PID: 12369
// Generated on: 3/1/2015 8:38:19 AM (UTC 3/1/2015 2:38:19 PM)

;
(function () {

    // Safe gaurd from errors
    try {

        // Utils: Using 'Facade' Pattern to provide a persistent interface for DOM.Ready, Selectors, etc..
        var Utils = {};

        // Fn: Checks if the browser is supported. 'true' for native or jQuery support. 'false' otherwise
        Utils.BrowserSupported = function () {

            // For modern browsers
            if (
                document.readyState &&
                document.addEventListener &&
                document.querySelectorAll)
                return true;

            // Fallback on jQuery
            else if (jQuery)
                return true;

            // Browser not supported
            else
                return false;
        }

        /* Early finish if the browser isn't supported */
        if (!Utils.BrowserSupported())
            return;

        // Fn: Attaches 'Handler' to run on DOM.Ready. If DOM.Ready already happend, just runs Handler
        Utils.DOMReady = function (Handler) {

            // Modern browsers
            document.addEventListener &&
            document.readyState == 'loading' &&
            document.addEventListener('DOMContentLoaded', Handler, false);

            // Modern browsers - after DOM.Ready
            document.addEventListener &&
            document.readyState != 'loading' &&
            Handler();

            // Fallback on jQuery
            !document.addEventListener &&
            jQuery &&
            jQuery(Handler);
        }

        // Fn: Adds 'Handler' for 'Event' on 'Element'
        Utils.AddEventHandler = function (Event, Element, Handler) {

            // Modern browsers
            Element.addEventListener &&
            Element.addEventListener(Event, Handler, false);

            // Fallback on jQuery
            !Element.addEventListener &&
            jQuery &&
            jQuery(Element)[Event](Handler);
        }

        // Fn: Runs 'Handler' only when ClickTale is recording (times out after 5 seconds)
        Utils.WhenRecording = function (Handler) {

            // Prepare a timeout counter
            var TimeoutCounter = 0;

            // Wait with setup until ClickTale is recording (or cancel after a 5 seconds timeout)
            var Interval = setInterval(function () {

                if (jQuery(".box-conteudo-hotel").length > 0) {
                    jQuery(".ProductSearch a").click(function () {
                        ClickTaleEvent("Search Hotels")
                    });


                }

                // On DOM.Ready
                Utils.DOMReady(function () {

                    // Make sure ClickTale is recording, and run 'Setup'
                    Utils.WhenRecording(Setup);
                });

            }
            catch
            (e)
            {
            }
            ;
        }
    )
        ();



