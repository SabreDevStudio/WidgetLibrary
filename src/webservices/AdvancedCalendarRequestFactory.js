define([
          'moment'
        , 'webservices/OTARequestFactory'
    ],
    function (
          moment
        , OTARequestFactory
    ) {
        'use strict';

        function AdvancedCalendarRequestFactory(requestDatesExpander) {
            this.requestDatesExpander = requestDatesExpander;
        }

        AdvancedCalendarRequestFactory.prototype = Object.create(OTARequestFactory.prototype);
        AdvancedCalendarRequestFactory.prototype.constructor = AdvancedCalendarRequestFactory;

        AdvancedCalendarRequestFactory.prototype.dateFormat = 'YYYY-MM-DD';

        AdvancedCalendarRequestFactory.prototype.createOriginDestinationInfos = function(searchCriteria) {

            function createWeekDaysString(selectedDaysOfWeekArray) {
                // WARN: locale specific: we base on first day being Sunday
                var DAY_SYMBOLS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                var DAY_NOT_SELECTED_MARKER = '_';
                return selectedDaysOfWeekArray.map(function (isDaySelected, dayIndex) {
                    return (isDaySelected)? DAY_SYMBOLS[dayIndex]: DAY_NOT_SELECTED_MARKER;
                }).join('');
            }

            function dayIndexIntoWeekDaysString(dayIndex) {
                var DAYS_IN_WEEK = 7;
                var selectedDaysOfWeekArray = [];
                for (var i = 0; i < DAYS_IN_WEEK; i++) {
                    selectedDaysOfWeekArray.push(false);
                }
                selectedDaysOfWeekArray[dayIndex] = true;
                return createWeekDaysString(selectedDaysOfWeekArray);
            }

            var that = this;

            var departureDaysRange = {
                FromDate: searchCriteria.getDepartureDateFrom(),
                ToDate: searchCriteria.getDepartureDateTo()
            };
            if (this.requestDatesExpander) {
                departureDaysRange = this.requestDatesExpander.expandDepartureDaysRange(departureDaysRange);
            }

            var departureDaysRangeFormatted = {
                FromDate: departureDaysRange.FromDate.format(this.dateFormat),
                ToDate: departureDaysRange.ToDate.format(this.dateFormat)
            };

            if (searchCriteria.hasAnyDepartureDaysOfWeekDefined()) { // to cale do getDepartureDaysOfWeek na Search Criteria
                departureDaysRangeFormatted.WeekDays = createWeekDaysString(searchCriteria.getDepartureDaysOfWeek());
            } else if (searchCriteria.hasAnyDaysAtDestinationDefined()) {
                var departureAndReturnDaysOfWeekIndexes = searchCriteria.departureAndReturnDaysOfWeekIndexes();
                departureDaysRangeFormatted.WeekDays = dayIndexIntoWeekDaysString(departureAndReturnDaysOfWeekIndexes.departureDayOfWeekIndex);
            }

            var firstOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "DaysRange": [departureDaysRangeFormatted]
                },
                "DestinationLocation" :
                {
                    "LocationCode" : searchCriteria.legs[0].destination
                },

                "OriginLocation": {
                    "LocationCode": searchCriteria.legs[0].origin
                },
                "RPH": "1",
                "TPA_Extensions": that.createLegTPAExtensions(searchCriteria.preferredAirlines)
            };


            var returnDaysRange = {
                FromDate: searchCriteria.getReturnDateFrom(),
                ToDate: searchCriteria.getReturnDateTo()
            };

            if (this.requestDatesExpander) {
                returnDaysRange = this.requestDatesExpander.expandReturnDaysRange(returnDaysRange);
            }

            var returnDaysRangeFormatted = {
                FromDate: returnDaysRange.FromDate.format(this.dateFormat),
                ToDate: returnDaysRange.ToDate.format(this.dateFormat)
            };

            if (searchCriteria.hasAnyReturnDaysOfWeekDefined()) {
                returnDaysRangeFormatted.WeekDays = createWeekDaysString(searchCriteria.getReturnDaysOfWeek());
            } else if (searchCriteria.hasAnyDaysAtDestinationDefined()) {
                var departureAndReturnDaysOfWeekIndexes = searchCriteria.departureAndReturnDaysOfWeekIndexes();
                returnDaysRangeFormatted.WeekDays = dayIndexIntoWeekDaysString(departureAndReturnDaysOfWeekIndexes.returnDayOfWeekIndex);
            }

            var secondOriginDestinationInfo = {
                "DepartureDates" :
                {
                    "DaysRange": [returnDaysRangeFormatted]
                },
                "DestinationLocation" :
                {
                    "LocationCode" : searchCriteria.legs[1].destination
                },
                "OriginLocation" :
                {
                    "LocationCode" : searchCriteria.legs[1].origin
                },
                "RPH" : "2",
                "TPA_Extensions": that.createLegTPAExtensions(searchCriteria.preferredAirlines)
            };

            if (!searchCriteria.isPlusMinusDaysDateFlexibilityRequest()) {
                secondOriginDestinationInfo.DepartureDates.LengthOfStayRange = [{
                    "MinDays": searchCriteria.getMinLengthOfStay() || searchCriteria.getLengthOfStay(),
                    "MaxDays": searchCriteria.getMaxLengthOfStay() || searchCriteria.getLengthOfStay()
                }];
            }
            return [firstOriginDestinationInfo, secondOriginDestinationInfo];
        };


        AdvancedCalendarRequestFactory.prototype.getRequestType = function (requestedItinsCount) {
            return "ADC1000";
        };

        AdvancedCalendarRequestFactory.prototype.createNumTrips = function (requestedItinsCount) {
            return {
                  "PerDateMin": 1
                , "PerDateMax": requestedItinsCount
            };
        };

        return AdvancedCalendarRequestFactory;
    });