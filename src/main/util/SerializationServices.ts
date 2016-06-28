define([
    'angular',
    'lodash',
    'moment',
    'datamodel/Itinerary',
    'datamodel/Leg',
    'datamodel/Segment',
    'datamodel/ItineraryPricingInfo',
    'datamodel/search/SearchCriteriaFactory'
], function (
    angular,
    _,
    moment,
    Itinerary,
    Leg,
    Segment,
    ItineraryPricingInfo,
    SearchCriteriaFactory
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
                    const searchCriteriaOptions = {
                        totalPassengerCount: jsonObj.totalPassengerCount,
                        preferredCabin: jsonObj.preferredCabin,
                        preferredAirlines: jsonObj.preferredAirlines
                    };
                    return SearchCriteriaFactory.buildRoundTripTravelSearchCriteria(jsonObj.origin, jsonObj.destination, jsonObj.outboundDepartureDateTime, jsonObj.inboundDepartureDateTime, searchCriteriaOptions);
                },
				serialize: function (searchCriteria) {
                    const jsonObj = {
                        origin: searchCriteria.getFirstLeg().origin,
                        destination: searchCriteria.getFirstLeg().destination,
                        outboundDepartureDateTime: searchCriteria.getFirstLeg().departureDateTime.format(),
                        inboundDepartureDateTime: searchCriteria.getSecondLeg().departureDateTime.format(),
                        totalPassengerCount: searchCriteria.getTotalPassengerCount(),
                        preferredCabin: searchCriteria.preferredCabin.name,
                        preferredAirlines: searchCriteria.getPreferredAirlines()
                    };
                    return jsonObj;
				}
            };
        });
});
