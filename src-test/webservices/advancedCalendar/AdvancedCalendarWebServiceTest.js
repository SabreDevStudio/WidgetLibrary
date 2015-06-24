require(['webservices/advancedCalendar/AdvancedCalendarWebService', 'moment'], function (AdvancedCalendarWebService, moment) {
    'use strict';

    var webService = new AdvancedCalendarWebService();

    describe('create request from template', function () {

        it('web service request JSON elements present', function () {
            var april2015 = moment({year: 2015, month: 3});
            var requestOptions = {
                  origin: 'DFW'
                , destination: 'LAX'
                , requestStartDate: april2015
                , requestEndDate: april2015
                , lengthOfStay: 14
                , optionsPerDay: 1
            };

            var rqJson = JSON.parse(webService.createWebServiceRequest(requestOptions));

            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DestinationLocation.LocationCode).toEqual('LAX');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].OriginLocation.LocationCode).toEqual('DFW');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.FromDate).toEqual('2015-04-01');
            // we set ToDate to 192 days plus start date (max number of days we have in the service)
            //expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[0].DepartureDates.dayOrDaysRange[0].DaysRange.ToDate).toEqual('2015-04-30');

            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DestinationLocation.LocationCode).toEqual('DFW');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].OriginLocation.LocationCode).toEqual('LAX');
            expect(rqJson.OTA_AirLowFareSearchRQ.OriginDestinationInformation[1].DepartureDates.lengthOfStayOrLengthOfStayRange[0].LengthOfStayRange.MinDays).toEqual('14');
        });

    });
});