define([
        'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/Itinerary.tpl.html'
        , 'util/DOMManipulationUtils'
    ],
    function (moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryTemplate
        , domUtils
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerary', function () {
                return {
                    restrict: 'E',
                    scope: {
                        itinerary: '=itin'
                    },
                    template: ItineraryTemplate,
                    link: function (scope, element) {

                        function addClickEventHandlers(element) {
                            domUtils.addToggleOnClickHandler(element, '.SDSItinListTogglePriceDetails', '.SDSItinListPriceDetails');
                            domUtils.addShowOnClickHandler(element, '.SDSItinListShowPriceDetails', '.SDSItinListPriceDetails');
                            domUtils.addHideOnClickHandler(element, '.SDSItinListHidePriceDetails', '.SDSItinListPriceDetails');
                        };

                        addClickEventHandlers(element);
                    }
                }
            });
    });
