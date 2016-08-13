define([
    'widgets/WidgetGlobalCallbacks'
    ],
    function (
    WidgetGlobalCallbacks
    ) {
        'use strict';
        return function () {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                transclude: true,
                templateUrl: '../widgets/view-templates/widgets/FiltersPanelWidget.tpl.html',
                controller: 'FiltersPanelCtrl',
                link: function (scope, element) {
                    WidgetGlobalCallbacks.linkComplete(scope, element);
                }
            }
        }
    });
