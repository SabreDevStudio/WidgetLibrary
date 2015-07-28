define([
        'webservices/OTARequestFactory'
    ],
    function (
        OTARequestFactory
    ) {
        'use strict';

        function BargainFinderMaxRequestFactory() {
        }

        BargainFinderMaxRequestFactory.prototype = Object.create(OTARequestFactory.prototype);
        BargainFinderMaxRequestFactory.prototype.constructor = BargainFinderMaxRequestFactory;


        BargainFinderMaxRequestFactory.prototype.createOriginDestinationInfos = function(legs, lengthOfStay, preferredAirlines) {
            var that = this;
            return legs.map(function (leg, legIdx) {
                return {
                    "DepartureDateTime": leg.departureDateTime.format(that.dateTimeFormat),
                    "DestinationLocation": {
                        "LocationCode": leg.destination
                    },
                    "OriginLocation": {
                        "LocationCode": leg.origin
                    },
                    "RPH": "" + legIdx + 1,
                    "TPA_Extensions": that.createLegTPAExtensions(preferredAirlines)
                };
            });
        };

        BargainFinderMaxRequestFactory.prototype.getRequestType = function (requestedItinsCount) {
            if(requestedItinsCount <= 50) {
                return "50ITINS";
            }
            if (requestedItinsCount <= 100) {
                return  "100ITINS";
            }
            return "200ITINS";
        };

        BargainFinderMaxRequestFactory.prototype.createNumTrips = function (requestedItinsCount) {
            return {
                "Number": requestedItinsCount
            }
        };

        return BargainFinderMaxRequestFactory;
    });
