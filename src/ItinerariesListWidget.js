define(['WidgetBase', 'jquery', 'lodash', 'stache!view-templates/ItinerariesListWidget.html', 'util/AirlineNameLookup', 'util/AirportNameLookup', 'datamodel/ItinerariesList'],
    function (WidgetBase, $, _, viewTemplate, AirlineNameLookup, AirportNameLookup, ItinerariesList) {
    "use strict";

    function ItinerariesListWidget() {

        WidgetBase.apply(this, arguments);

        var model = {
            uuid: this.uuid,
            itineraries: new ItinerariesList()
        };

        this.requiredFiltersBoundsSpecifications = [];

        var airlineNameLookup = (window.SDS)? window.SDS.airlineNameLookup() : new AirlineNameLookup();
        var airportNameLookup = (window.SDS)? window.SDS.airportNameLookup() : new AirportNameLookup();

        this.applyFilters = function (filters) {
            model.itineraries.getItineraries().forEach(function(itin) {
                itin.filteredOut = ! filters.every(function(filter) {
                    return filter(itin);
                });
            });
            this.reRender();
            // After re-rendering itineraries list (after applying the filters) we may want to to reset the filters as well (as applying one filter very probably changes bounds for other filters)
            // As it is not the pattern for OTA, it is not enabled (next line)
            // this.filteringWidgetAttached.resetFiltersBounds.call(this.filteringWidgetAttached, this.getCurrentValuesBounds());
        };

        this.updateModel = function(itinerariesList) {
            model.itineraries = itinerariesList;
            // augment model with properties necessary for FlightList presentation
            model.itineraries.getItineraries().forEach(_.flow(
                updateLegsDepartureDateFormatted,
                updateFlightTimes,
                updateLegDepartureAndArrivalAirport,
                updateAirlineNames,
                updateAirportNames));
        };

        function updateLegsDepartureDateFormatted(itinerary) {
            itinerary.legs.forEach(function (leg) {
                leg.departureDateFormatted = _.first(leg.segments).departureDateTime.format('ddd, DD MMM'); // Sun, 05 Dec
            });
            return itinerary;
        }


        function updateFlightTimes(itinerary) {
            itinerary.legs.forEach(function (leg) {
                leg.segments.forEach(function (segment) {
                    segment.departureTime = segment.departureDateTime.format('HH:mm'); // 14:34
                    segment.arrivalTime   = segment.arrivalDateTime.format('HH:mm'); // 14:34
                });
                leg.departureTime = _.first(leg.segments).departureTime;
                leg.arrivalTime   = _.last(leg.segments).arrivalTime;
            });
            return itinerary;
        }

        function updateLegDepartureAndArrivalAirport(itinerary) {
            itinerary.legs.forEach(function (leg) {
                leg.departureAirport = leg.segments[0].departureAirport;
                leg.arrivalAirport   = leg.segments[leg.segments.length - 1].arrivalAirport;
            });
            return itinerary;
        }

        function updateAirlineNames(itinerary) {
            itinerary.legs.forEach(function (leg) {
                leg.segments.forEach(function (segment) {
                    segment.marketingAirlineName = airlineNameLookup.getName(segment.marketingAirline);
                });
            });
            return itinerary;
        }

        function updateAirportNames(itinerary) {
            itinerary.legs.forEach(function (leg) {
                leg.segments.forEach(function (segment) {
                    segment.departureAirportName = airportNameLookup.getName(segment.departureAirport);
                    segment.arrivalAirportName = airportNameLookup.getName(segment.arrivalAirport);
                });
            });
            return itinerary;
        }

        this.createDOM = function() {
            // sort model according to current criteria before rendering
            model.itineraries.sort();
            var html = viewTemplate(model);
            var dom = $(html);
            addInternalEventHandlers(dom);
            return dom;
        };

        this.getItinerariesList = function() {
            return model.itineraries;
        };

        this.getItineraries = function(excludeFilteredOut) {
            return this.getItinerariesList().getItineraries().filter(function (itin) {
                if (excludeFilteredOut === true) {
                    return !itin.filteredOut;
                }
                return true;
            });
        };

        function addInternalEventHandlers(dom) {
            var allFlightDetailsLinks = $(dom).find('.SDSLegList .SDSShowDetailsLink');
            $(allFlightDetailsLinks).click(function (event) {
                event.preventDefault();
                $(this).parents('.SDSLegList').find('> .SDSLeg > .SDSLegDetails').toggle(250);
            });

            var allPriceDetailsLinks = $(dom).find('.SDSPriceSummary .SDSShowDetailsLink');
            $(allPriceDetailsLinks).click(function (event) {
                event.preventDefault();
                var priceDetailItems = $(this).parents('.SDSPriceSummary').find('.SDSPriceDetailItem');
                priceDetailItems.show('fast');
                // on click show price details and hide the link itself
                $(this).hide();
                var priceDetailsLink = this;
                // upon click on price details, they will be hidden and the link will be shown again
                priceDetailItems.click(function (event) {
                    event.preventDefault();
                    priceDetailItems.hide();
                    $(priceDetailsLink).show();
                });
            });
        }
    }

    ItinerariesListWidget.prototype = Object.create(WidgetBase.prototype);
    ItinerariesListWidget.prototype.constructor = ItinerariesListWidget;


    ItinerariesListWidget.prototype.update = function(itinerariesList) {
        this.updateModel(itinerariesList);
        this.reRender();
        this.trigger('itinerariesListUpdated', this.getItinerariesList().getCurrentValuesBounds(this.requiredFiltersBoundsSpecifications));
    };

    ItinerariesListWidget.prototype.addFilterWidget = function(filterPaneWidget) {
        this.filteringWidgetAttached = filterPaneWidget;

        // itineraries list will listen to the filtering criteria changed event and will update itself (applying new filtering criteria)
        filterPaneWidget.bind('filteringCriteriaChanged', this.applyFilters, this);

        this.requiredFiltersBoundsSpecifications = filterPaneWidget.getFiltersBoundsSpecifications();

        // reset filter bounds based on current itineraries in the model
        if (this.getItinerariesList().size() > 0) {
            var currentValuesBounds = this.getItinerariesList().getCurrentValuesBounds(this.requiredFiltersBoundsSpecifications);
            filterPaneWidget.resetFiltersBounds.call(filterPaneWidget, currentValuesBounds);
        }
        // in turn the filtering pane widget will receive bounds and allowed (discrete) values for its filters from the itineraries list.
        this.bind('itinerariesListUpdated', filterPaneWidget.resetFiltersBounds, filterPaneWidget);
    };

    return ItinerariesListWidget;

});