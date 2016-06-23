define([
        //'widgets/WidgetGlobalCallbacks',
        'lodash'
    ],
    function (
        //WidgetGlobalCallbacks,
        _
    ) {
        'use strict';

        MapThemedDestinationFinderWidgetDirective.$inject = ['uiGmapGoogleMapApi'];
        function MapThemedDestinationFinderWidgetDirective(
            uiGmapGoogleMapApi
        ) {
            return {
                scope: {
                    closestAirport: '@?'
                },
                templateUrl: '../widgets/view-templates/widgets/MapThemedDestinationFinderWidget.tpl.html',
                controller: 'MapThemedDestinationFinderWidgetController',
                link: function ($scope) {
                    $scope.map = {
                        center: {
                            latitude: 45,
                            longitude: -30
                        },
                        zoom: 5
                    };

                    var markerOpts = [
                        {
                            icon: '../widgets/img/icons/bullets/bullet_sm_green.png'
                        },
                        {
                            icon: '../widgets/img/icons/bullets/bullet_sm_yellow.png'
                        },
                        {
                            icon: '../widgets/img/icons/bullets/bullet_sm_red.png'
                        }
                    ];

                    $scope.getOptionsForDestination = function (priceTier) {
                        return markerOpts[priceTier - 1];
                    };

                    //uiGmapGoogleMapApi.then(function(maps) {
                    //});
                    //WidgetGlobalCallbacks.linkComplete();
                }
            }
        }
        return MapThemedDestinationFinderWidgetDirective;
});
