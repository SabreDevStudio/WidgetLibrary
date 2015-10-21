define([
        'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/Itinerary.tpl.html'
        , 'util/DOMManipulationUtils'
        , 'util/CommonDirectives'
    ],
    function (moment
        , angular
        , angular_bootstrap
        , SDSWidgets
        , ItineraryTemplate
        , domUtils
        , CommonDirectives
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
                            domUtils.addToggleOnClickHandler(element, '.SDSItineraryTogglePriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addShowOnClickHandler(element, '.SDSItineraryShowPriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addHideOnClickHandler(element, '.SDSItineraryHidePriceDetails', '.SDSItineraryPriceDetails');

                            domUtils.addToggleOnClickHandler(element, '.SDSItineraryToggleFlightDetails', '.SDSItineraryFlightDetails');
                            domUtils.addShowOnClickHandler(element, '.SDSItineraryShowFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                            domUtils.addHideOnClickHandler(element, '.SDSItineraryHideFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                        }

                        addClickEventHandlers(element);
                    }
                }
            });
    });
