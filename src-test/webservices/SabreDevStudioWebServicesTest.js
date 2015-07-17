require([
      'angular'
    , 'angularMocks'
    , 'moment'
    , 'webservices/SabreDevStudioWebServices'
    , 'datamodel/SearchCriteria'
    , 'datamodel/ShoppingData'
    , 'datamodel/TestItineraryBuilder'
    , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest.json'
    , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest_404.json'
    , 'text!../src-test/webservices/fixtures/AdvancedCalendarSampleRequest_big_number_of_options_requested.json'
], function (
      NG
    , angularMocks
    , moment
    , SabreDevStudioWebServices
    , SearchCriteria
    , ShoppingData
    , TestItineraryBuilder
    , advancedCalendarSampleRequest
    , advancedCalendarSampleRequest_404
    , advancedCalendarSampleRequest_big_number_of_options_requested

) {
    'use strict';

    var createSampleSearchCriteria = function () {
        var searchCriteria = new SearchCriteria();
        searchCriteria.origin = 'LAX';
        searchCriteria.destination = 'DFW';
        searchCriteria.departureDate = moment().startOf('day');
        searchCriteria.returnDate = moment().add(1, 'months').startOf('day');
        return searchCriteria;
    };

    describe('ShoppingDataService', function () {

        var makeSureCacheIsPopulated = function (searchCriteria) {
            var rangeStart = moment().startOf('day');
            var rangeEnd = rangeStart.clone().add(1, 'months').startOf('day');
            var pricesPromise = ShoppingDataService.getLeadPricesForRange(searchCriteria, rangeStart, rangeEnd);
            return pricesPromise;
        };

        var ShoppingDataService;
        //var ShoppingOptionsCacheServiceSpy;

        var webServiceSpy = jasmine.createSpy('sendRequestSpy');

        beforeEach(function () {
            module('baseServices');
            module('sabreDevStudioWebServices');
            //TODO
            //inject(function (_ShoppingOptionsCacheService_) {
            //    ShoppingOptionsCacheServiceSpy = jasmine.spyOn(_ShoppingOptionsCacheService_).and.callThrough();
            //});
            module(function ($provide) {
                $provide.factory('AdvancedCalendarSearchService', function ($q) {
                    return {
                        sendRequest: webServiceSpy.and.callFake(function () {
                            return $q.when(new ShoppingData());
                        })
                    };
                });
            });
            inject(function (_ShoppingDataService_) {
                ShoppingDataService = _ShoppingDataService_;
            });
        });

        it('on new search criteria event and empty global cache: does new web service call', function () {

            var searchCriteria = createSampleSearchCriteria();

            var rangeStart = moment().startOf('day');
            var rangeEnd = rangeStart.clone().add(1, 'months').startOf('day');

            var pricesPromise = ShoppingDataService.getLeadPricesForRange(searchCriteria, rangeStart, rangeEnd);

            expect(webServiceSpy).toHaveBeenCalled();
        });

        xit('on new search criteria event and data already in global cache: takes data from cache and does not do web service call', function (done) {
            var searchCriteria = createSampleSearchCriteria();

            var cachePopulatePromise = makeSureCacheIsPopulated(searchCriteria);

            cachePopulatePromise.then(function () {
                webServiceSpy.calls.reset();
                var rangeStart = moment().startOf('day');
                var rangeEnd = rangeStart.clone().add(1, 'months').startOf('day');
                var pricesPromise = ShoppingDataService.getLeadPricesForRange(searchCriteria, rangeStart, rangeEnd);
                expect(webServiceSpy).not.toHaveBeenCalled();
                //expect(ShoppingOptionsCacheServiceSpy).not.toHaveBeenCalled();
                done();
            });
        });
    });

    describe('AdvancedCalendarSearchService', function () {

        var AdvancedCalendarSearchService;

        function verifyResponseContainsAtLeastOneItinerary(response) {
            expect(response.OTA_AirLowFareSearchRS.PricedItinCount).toBeGreaterThan(0);
            expect(response.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary.length).toBeGreaterThan(0);
        }

        beforeEach(function () {
            module('sabreDevStudioWebServices');
            inject(function (_AdvancedCalendarSearchService_) {
                AdvancedCalendarSearchService = _AdvancedCalendarSearchService_;
            });
        });

        xit('positive', function (done) {
            AdvancedCalendarSearchService.sendRequest(advancedCalendarSampleRequest).$promise.then(function (response) {
                console.log(response);
                verifyResponseContainsAtLeastOneItinerary(response);
                done();
            }, function (error) {
                fail(error);
            });
        });

        xit('negative: 404 from web service', function (done) {
            AdvancedCalendarSearchService.sendRequest(advancedCalendarSampleRequest_404).$promise.then(
                  function (response) {
                      fail('should not get success response');
                  }
                , function (error) {
                    expect(err.textStatus).toBe('error');
                    expect(err.error).toBe('Not Found');
                    expect(response).toBeUndefined();
                    done();
            });
        });

        xit('performance test', function (done) {
            var t0 = performance.now();
            AdvancedCalendarSearchService.sendRequest(advancedCalendarSampleRequest_big_number_of_options_requested).$promise.then(function (err, response) {
                var t1 = performance.now();
                console.log("Communication time: " + Math.round(t1 - t0) + " millis");
                verifyResponseContainsAtLeastOneItinerary(response);
                done();
            }, function (error) {
                fail(error);
            });
        });

    });

    xdescribe('FareForecastWebService', function () {

        function verifyFarePredictionPresent(rs) {
          expect(rs.Forecast).toBeDefined();
          expect(rs.Forecast.LowestPredictedFare).toBeDefined();
          expect(rs.Forecast.Recommendation).toBeDefined();
          expect(rs.Forecast.Recommendation).toBeDefined();
          expect(rs.Forecast.Recommendation.length).toBeGreaterThan(1);
          expect(rs.Forecast.LowestFare).toBeDefined();
        };

        var FareForecastWebService;

        beforeEach(function () {
            module('sabreDevStudioWebServices');
            inject(function (_FareForecastWebService_) {
                FareForecastWebService = _FareForecastWebService_;
            });
        });

        it('positive', function (done) {
            var requestParams = {
                  origin: 'ATL'
                , destination: 'LAS'
                , departuredate: '2015-07-15'
                , returndate: '2015-07-25'
            };
            FareForecastWebService.sendRequest(requestParams).$promise.then(function (response) {
                console.log(response);
                verifyFarePredictionPresent(response);
                done();
            }, function (error) {
                fail(error);
            });
        });
    })
});