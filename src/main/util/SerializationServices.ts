define([
    'angular',
    'lodash',
    'moment',
    'datamodel/Itinerary',
    'datamodel/Leg',
    'datamodel/Segment',
    'datamodel/ItineraryPricingInfo',
    'datamodel/SearchCriteria'
], function (
    angular,
    _,
    moment,
    Itinerary,
    Leg,
    Segment,
    ItineraryPricingInfo,
    SearchCriteria
) {
    'use strict';
    return angular.module('SDSWidgets.SerializationServices', [])
        .factory('ItinerarySerializer', function () {
            return {
                deserialize: function (itinJsonObj) {
                    var itin = new Itinerary();
                    itin.legs = deserializeLegs(itinJsonObj.legs);
                    itin.itineraryPricingInfo = deserializeItineraryPricingInfo(itinJsonObj.itineraryPricingInfo);
                    itin.pricingSource = itinJsonObj.pricingSource;
                    itin.id = itinJsonObj.id;
                    return itin;
                }
            };

            function deserializeLegs(legsJsonObj) {
                return legsJsonObj.map(function (legObj) {
                    var leg = new Leg();
                    leg.segments = deserializeSegments(legObj.segments);
                    leg.duration = legObj.duration;
                    leg.hasAirportChangeAtDeparture = legObj.hasAirportChangeAtDeparture;
                    leg.hasAirportChangeAtArrival = legObj.hasAirportChangeAtArrival;
                    return leg;
                });
            }

            function deserializeSegments(segmentsJsonObj) {
                return segmentsJsonObj.map(function (seg) {
                    seg.departureDateTime = moment(new Date(seg.departureDateTime));
                    seg.arrivalDateTime = moment(new Date(seg.arrivalDateTime));
                    return new Segment(seg);
                });
            }

            function deserializeItineraryPricingInfo(pricingInfoJsonObj) {
                var pricingInfo = new ItineraryPricingInfo();
                return _.extend(pricingInfo, pricingInfoJsonObj);
            }

        })
    .factory('SearchCriteriaSerializer', function () {
            return {
                deserialize: function (jsonObj) {
                    return SearchCriteria.prototype.buildRoundTripTravelSearchCriteria(jsonObj.origin, jsonObj.destination, jsonObj.outboundDepartureDateTime, jsonObj.inboundDepartureDateTime);
                }
            };
        });
});
