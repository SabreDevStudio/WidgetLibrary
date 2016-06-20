define([
        'moment'
        , 'angular'
        , 'lodash'
        , 'util/LodashExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'util/DOMManipulationUtils'
        , 'util/CommonDirectives'
        , 'widgets/WidgetGlobalCallbacks'
    ],
    function (moment
        , angular
        , _
        , __
        , angular_bootstrap
        , SDSWidgets
        , domUtils
        , CommonDirectives
        , WidgetGlobalCallbacks
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('itinerary', ['$location', function ($location) {
                return {
                    restrict: 'E',
                    scope: {
                          itinerary: '=itin'
                        , targetOnItinerarySelected: '@?'
                        , itinerarySelectedCallback: '&?'
                        , flightDetailsAlwaysShown: '@?'
                        , priceDetailsAlwaysShown: '@?'
                        , hideItinerarySelectButton: '@?'
                        , standaloneWidget: '@?'
                    },
                    templateUrl: '../widgets/view-templates/widgets/Itinerary.tpl.html',
                    link: function (scope, element) {
                        scope.selectItineraryClicked = function (itinerary) {
                            if (_.isFunction(scope.itinerarySelectedCallback)) {
                                scope.itinerarySelectedCallback(itinerary);
                            }
                            if(__.isDefined(scope.targetOnItinerarySelected)) {
                                $location.path(scope.targetOnItinerarySelected);
                            }
                        };

                        function addClickEventHandlers(el) {
                            if (!scope.priceDetailsAlwaysShown) {
                                domUtils.addToggleOnClickHandler(el, '.SDSItineraryTogglePriceDetails', '.SDSItineraryPriceDetails');
                                domUtils.addShowOnClickHandler(el, '.SDSItineraryShowPriceDetails', '.SDSItineraryPriceDetails');
                                domUtils.addHideOnClickHandler(el, '.SDSItineraryHidePriceDetails', '.SDSItineraryPriceDetails');
                            }

                            if (!scope.flightDetailsAlwaysShown) {
                                domUtils.addToggleOnClickHandler(el, '.SDSItineraryToggleFlightDetails', '.SDSItineraryFlightDetails');
                                domUtils.addShowOnClickHandler(el, '.SDSItineraryShowFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                                domUtils.addHideOnClickHandler(el, '.SDSItineraryHideFlightDetails', '.SDSItineraryFlightDetails', '.SDSItineraryHideWhenFlightDetailsShown');
                            }

                            domUtils.addToggleOnClickHandler(el, '.SDSItineraryToggleBrandDetails', '.SDSItineraryBrandDetails');
                        }

                        addClickEventHandlers(element);
                        if (scope.standaloneWidget === "true") {
                        // WidgetGlobalCallbacks linkComplete must be called only for standalone widgets, not for partials. Most often this directive is used as partial that is why by default it is not called.
                            WidgetGlobalCallbacks.linkComplete();
                        }

                    }
                }
            }]);
    });
