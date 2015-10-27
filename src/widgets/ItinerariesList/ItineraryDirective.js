define([
        'moment'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'util/DOMManipulationUtils'
        , 'util/CommonDirectives'
    ],
    function (moment
        , angular
        , angular_bootstrap
        , SDSWidgets
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
                    templateUrl: '../src/view-templates/widgets/Itinerary.tpl.html',
                    link: function (scope, element) {

                        function addClickEventHandlers(element) {
                            domUtils.addToggleOnClickHandler(element, '.SDSItineraryTogglePriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addShowOnClickHandler(element, '.SDSItineraryShowPriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addHideOnClickHandler(element, '.SDSItineraryHidePriceDetails', '.SDSItineraryPriceDetails');

                            domUtils.addToggleOnClickHandler(element, '.SDSItineraryToggleFlightDetails', '.SDSItineraryFlightDetails');
                            domUtils.addShowOnClickHandler(element, '.SDSItineraryShowFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                            domUtils.addHideOnClickHandler(element, '.SDSItineraryHideFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');

                            domUtils.addToggleOnClickHandler(element, '.SDSItineraryToggleBrandDetails', '.SDSItineraryBrandDetails');
                            //domUtils.addShowOnClickHandler(element, '.SDSItineraryShowBrandDetails', '.SDSItineraryBrandDetails');
                            domUtils.addHideOnClickHandler(element, '.SDSItineraryHideBrandDetails', '.SDSItineraryBrandDetails');
                        }

                        addClickEventHandlers(element);
                    }
                }
            });
    });
