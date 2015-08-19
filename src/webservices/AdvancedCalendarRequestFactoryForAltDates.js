define([
          'moment'
        , 'webservices/OTARequestFactory'
        , 'webservices/AdvancedCalendarRequestFactory' //TODO dependency
    ],
    function (
          moment
        , OTARequestFactory
        , AdvancedCalendarRequestFactory
    ) {
        'use strict';

        /* factory method which builds objects that perform translation of user search criteria (origin, destination, travel dates) into Advanced Calendar web service request options (first day to search, last day to search, calculate length of stay)
         So this is the business logic what to present to customer upon their search criteria (what date ranges to present in particular).
         */

        function AdvancedCalendarRequestFactoryForAltDates() {
        }

        AdvancedCalendarRequestFactoryForAltDates.prototype = Object.create(OTARequestFactory.prototype);
        AdvancedCalendarRequestFactoryForAltDates.prototype.constructor = AdvancedCalendarRequestFactoryForAltDates;

        AdvancedCalendarRequestFactoryForAltDates.prototype.MAX_ADVANCE_PURCHASE_DAYS_FROM_NOW = 192;

        AdvancedCalendarRequestFactoryForAltDates.prototype.dateFormat = 'YYYY-MM-DD';


        AdvancedCalendarRequestFactoryForAltDates.prototype.createOriginDestinationInfos = function(legs, lengthOfStay, preferredAirlines, dateFlexibilityDays) {

            var that = this;

            var departureDateFrom = legs[0].departureDateTime.clone().subtract(dateFlexibilityDays, 'days'); //TODO into SearchCriteria object?
            var departureDateTo = legs[0].departureDateTime.clone().add(dateFlexibilityDays, 'days'); //TODO into SearchCriteria object?

            var firstOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "dayOrDaysRange": [
                        {
                            "DaysRange": {
                                "FromDate": departureDateFrom.format(AdvancedCalendarRequestFactory.prototype.dateFormat),
                                "ToDate": departureDateTo.format(AdvancedCalendarRequestFactory.prototype.dateFormat)
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

            var returnDateFrom = legs[1].departureDateTime.clone().subtract(dateFlexibilityDays, 'days'); //TODO into SearchCriteria object?
            var returnDateTo = legs[1].departureDateTime.clone().add(dateFlexibilityDays, 'days'); //TODO into SearchCriteria object?

            var secondOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "dayOrDaysRange": [
                        {
                            "DaysRange": {
                                "FromDate": returnDateFrom.format(AdvancedCalendarRequestFactory.prototype.dateFormat),
                                "ToDate": returnDateTo.format(AdvancedCalendarRequestFactory.prototype.dateFormat)
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


        AdvancedCalendarRequestFactoryForAltDates.prototype.getRequestType = function (requestedItinsCount) {
            return "ADC1000";
        };

        AdvancedCalendarRequestFactoryForAltDates.prototype.createNumTrips = function (requestedItinsCount) {
            return {
                  "PerDateMin": 1
                , "PerDateMax": "" + requestedItinsCount
            };
        };

        return AdvancedCalendarRequestFactoryForAltDates;
    });
