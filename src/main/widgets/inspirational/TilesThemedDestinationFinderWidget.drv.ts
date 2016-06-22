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
                controller: 'ThemedDestinationFinderWidgetController',
                link: function () {
                    WidgetGlobalCallbacks.linkComplete();
                }
            }
        }
        return TilesThemedDestinationFinderWidgetDirective;
});
