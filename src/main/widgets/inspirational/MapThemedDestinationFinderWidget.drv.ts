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
                controller: 'ThemedDestinationFinderWidgetController',
                link: function ($scope) {
                    $scope.controllerOptions = {
                        lookupDestinationsGeoCoordinates: true
                    };

                    $scope.map = {
                        center: {
                            latitude: 45,
                            longitude: -73
                        },
                        zoom: 4
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

                    $scope.getOptionsForDestination = function (destinationLowestFare, pricesForDestinationsGrouped) {
                        return markerOpts[_.random(2)];
                    };

                    //uiGmapGoogleMapApi.then(function(maps) {
                    //});
                    //WidgetGlobalCallbacks.linkComplete();
                }
            }
        }
        return MapThemedDestinationFinderWidgetDirective;
});
