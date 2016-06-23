define([
        'widgets/WidgetGlobalCallbacks'
    ],
    function (
          WidgetGlobalCallbacks
    ) {
        'use strict';

        function TilesThemedDestinationFinderWidgetDirective() {
            return {
                scope: {
                    closestAirport: '@?'
                },
                templateUrl: '../widgets/view-templates/widgets/TilesThemedDestinationFinderWidget.tpl.html',
                controller: 'TilesThemedDestinationFinderWidgetController',
                link: function () {
                    WidgetGlobalCallbacks.linkComplete();
                }
            }
        }
        return TilesThemedDestinationFinderWidgetDirective;
});
