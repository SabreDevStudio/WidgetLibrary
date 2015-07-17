require([
          'webservices/SabreDevStudioWebServicesWrapper'
        , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest.json'
        , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest_404.json'
        , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest_big_number_of_options_requested.json'
    ], function (
          SabreDevStudioWebServicesWrapper
        , advancedCalendarSampleRequest
        , advancedCalendarSampleRequest_404
        , advancedCalendarSampleRequest_big_number_of_options_requested
    ) {
    'use strict';

    xdescribe('Sabre Dev Studio Web Services Wrapper', function () {

        var credentials = {
            clientId: 'V1:pe6myrbaa021f2br:DEVCENTER:EXT',
            clientSecret: 'DUaEf51f',
            apiURL: 'https://api.test.sabre.com'
        };

        var sabreServices = new SabreDevStudioWebServicesWrapper(credentials);

        function verifyResponseContainsAtLeastOneItinerary(response) {
            expect(response.OTA_AirLowFareSearchRS.PricedItinCount).toBeGreaterThan(0);
            expect(response.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.length).toBeGreaterThan(0);
        }

        xit('positive', function (done) {
            sabreServices.advancedCalendarSearch(advancedCalendarSampleRequest, function (err, response) {
                expect(err).toBeUndefined();
                verifyResponseContainsAtLeastOneItinerary(response);
                done();
            })
        });

        xit('negative: 404 from web service', function (done) {
            sabreServices.advancedCalendarSearch(advancedCalendarSampleRequest_404, function (err, response) {
                expect(err.textStatus).toBe('error');
                expect(err.error).toBe('Not Found');
                expect(response).toBeUndefined();
                done();
            })
        });

        xit('performance test', function (done) {
            var t0 = performance.now();
            sabreServices.advancedCalendarSearch(advancedCalendarSampleRequest_big_number_of_options_requested, function (err, response) {
                var t1 = performance.now();
                console.log("Communication time: " + Math.round(t1 - t0) + " millis");
                expect(err).toBeUndefined();
                verifyResponseContainsAtLeastOneItinerary(response);
                done();
            })
        });

    });
});