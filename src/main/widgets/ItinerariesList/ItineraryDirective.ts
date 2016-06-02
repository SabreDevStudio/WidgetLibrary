define([
        'moment'
        , 'angular'
        , 'util/LodashExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'util/DOMManipulationUtils'
        , 'util/CommonDirectives'
    ],
    function (moment
        , angular
        , __
        , angular_bootstrap
        , SDSWidgets
        , domUtils
        , CommonDirectives
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerary', ['$location', function ($location) {
                return {
                    restrict: 'E',
                    scope: {
                          itinerary: '=itin'
                        , targetOnItinerarySelected: '@?'
                        , selectedItineraryStore: '=?'
                    },
                    templateUrl: '../widgets/view-templates/widgets/Itinerary.tpl.html',
                    link: function (scope, element) {

                        scope.selectItineraryClicked = function (itinerary) {
                            if (__.isDefined(scope.selectedItineraryStore)) {
                                scope.selectedItineraryStore = itinerary;
                            }
                            if(__.isDefined(scope.targetOnItinerarySelected)) {
                                $location.path(scope.targetOnItinerarySelected);
                            }
                        };

                        function addClickEventHandlers(el) {
                            domUtils.addToggleOnClickHandler(el, '.SDSItineraryTogglePriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addShowOnClickHandler(el, '.SDSItineraryShowPriceDetails', '.SDSItineraryPriceDetails');
                            domUtils.addHideOnClickHandler(el, '.SDSItineraryHidePriceDetails', '.SDSItineraryPriceDetails');

                            domUtils.addToggleOnClickHandler(el, '.SDSItineraryToggleFlightDetails', '.SDSItineraryFlightDetails');
                            domUtils.addShowOnClickHandler(el, '.SDSItineraryShowFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                            domUtils.addHideOnClickHandler(el, '.SDSItineraryHideFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');

                            domUtils.addToggleOnClickHandler(el, '.SDSItineraryToggleBrandDetails', '.SDSItineraryBrandDetails');
                        }

                        addClickEventHandlers(element);
                    }
                }
            }]);
    });
