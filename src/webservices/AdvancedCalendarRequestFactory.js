define([
          'moment'
        , 'webservices/OTARequestFactory'
    ],
    function (
          moment
        , OTARequestFactory
    ) {
        'use strict';

        /* factory method which builds objects that perform translation of user search criteria (origin, destination, travel dates) into Advanced Calendar web service request options (first day to search, last day to search, calculate length of stay)
         So this is the business logic what to present to customer upon their search criteria (what date ranges to present in particular).
         */

        function AdvancedCalendarRequestFactory() {
        }

        AdvancedCalendarRequestFactory.prototype = Object.create(OTARequestFactory.prototype);
        AdvancedCalendarRequestFactory.prototype.constructor = AdvancedCalendarRequestFactory;

        AdvancedCalendarRequestFactory.prototype.MAX_ADVANCE_PURCHASE_DAYS_FROM_NOW = 192;

        AdvancedCalendarRequestFactory.prototype.dateFormat = 'YYYY-MM-DD';

        AdvancedCalendarRequestFactory.prototype.createOriginDestinationInfos = function(legs, lengthOfStay, preferredAirlines) {

            var that = this;

            var today = moment().startOf('day');
            var lastTravelDateAvailableInWebService = today.clone().add(this.MAX_ADVANCE_PURCHASE_DAYS_FROM_NOW, 'days');

            var firstOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "dayOrDaysRange": [
                        {
                            "DaysRange": {
                                "FromDate": today.format(this.dateFormat),
                                "ToDate": lastTravelDateAvailableInWebService.format(this.dateFormat)
                            }
                        }
                    ]
                },
                "DestinationLocation" :
                {
                    "LocationCode" : legs[0].destination
                },

                "OriginLocation": {
                    "LocationCode": legs[0].origin
                },
                "RPH": "1",
                "TPA_Extensions": that.createLegTPAExtensions(preferredAirlines)
            };

            var secondOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "lengthOfStayOrLengthOfStayRange": [
                        {
                            "LengthOfStayRange": {
                                "MinDays": "" + lengthOfStay,
                                "MaxDays": "" + lengthOfStay
                            }
                        }
                    ]
                },
                "DestinationLocation" :
                {
                    "LocationCode" : legs[1].destination
                },
                "OriginLocation" :
                {
                    "LocationCode" : legs[1].origin
                },
                "RPH" : 2,
                "TPA_Extensions": that.createLegTPAExtensions(preferredAirlines)
            };

            return [firstOriginDestinationInfo, secondOriginDestinationInfo];
        };




        AdvancedCalendarRequestFactory.prototype.getRequestType = function (requestedItinsCount) {
            return "ADC1000";
        };

        AdvancedCalendarRequestFactory.prototype.createNumTrips = function (requestedItinsCount) {
            return {
                  "PerDateMin": 1
                , "PerDateMax": "" + requestedItinsCount
            };
        };

        return AdvancedCalendarRequestFactory;
    });
