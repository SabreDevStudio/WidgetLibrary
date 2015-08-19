define([
          'lodash'
        , 'webservices/OTARequestFactory'
    ],
    function (
          _
        , OTARequestFactory
    ) {
        'use strict';

        function BargainFinderMaxRequestFactory() {
        }

        BargainFinderMaxRequestFactory.prototype = Object.create(OTARequestFactory.prototype);
        BargainFinderMaxRequestFactory.prototype.constructor = BargainFinderMaxRequestFactory;


        BargainFinderMaxRequestFactory.prototype.createOriginDestinationInfos = function(legs, lengthOfStay, preferredAirlines, dateFlexibilityDays) {
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
                    "TPA_Extensions": that.createLegTPAExtensions(preferredAirlines, dateFlexibilityDays)
                };
            });
        };

        BargainFinderMaxRequestFactory.prototype.createLegTPAExtensions = function(preferredAirlines, dateFlexibilityDays) {
            var tpaExtensions = {
                "IncludeVendorPref": preferredAirlines.map(function (airline) {
                    return {
                        "Code": airline
                    };
                })
            };
            dateFlexibilityDays = parseInt(dateFlexibilityDays);
            if (dateFlexibilityDays > 0) {
                _.extend(tpaExtensions, {
                    "DateFlexibility": {
                        "NbrOfDays": dateFlexibilityDays
                    }
                });
            }
            return tpaExtensions;
        };

        BargainFinderMaxRequestFactory.prototype.getRequestType = function (requestedItinsCount, dateFlexibilityDays) {
            if (dateFlexibilityDays > 0) {
                return "AD1";
            }
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
            };
        };

        return BargainFinderMaxRequestFactory;
    });
