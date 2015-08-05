require([
       'widgets/leadPriceChart/LeadPriceChartWidget'
     , 'datamodel/SearchCriteria' //todo angular-mock module??
    ], function (
        LeadPriceChartWidget
      , SearchCriteria
    ) {
    'use strict';

    describe('LeadPriceChartCtrl', function () {

        var scope, searchCriteriaBroadcastingServiceMock, controller, mockShoppingDataService;

        beforeEach(inject(function(
              $scope
            , SearchCriteriaBroadcastingService
            , ShoppingDataService
            ){
            scope = $scope;
            searchCriteriaBroadcastingServiceMock = SearchCriteriaBroadcastingService; //todo mock??
            mockShoppingDataService = ShoppingDataService;
            spyOn(mockShoppingDataService, 'getLeadPricesForRange').and.returnValue({ //TODO: mock callback!!!
                  'Mon Aug 03 2015 00:00:00 GMT+0200': 200.6
                , 'Sat Jul 04 2015 00:00:00 GMT+0200': 290.6
                , 'Wed Aug 05 2015 00:00:00 GMT+0200': 198.1
            });

            controller = $controller('LeadPriceChartCtrl', {
                $scope: scope,
                SearchCriteriaBroadcastingService: searchCriteriaBroadcastingServiceMock,
                ShoppingDataService: mockShoppingDataService
            });
        }));


        function createSearchCriteriaForTest() {
            var searchCriteria = new SearchCriteria();

            searchCriteria.origin = 'DFW';
            searchCriteria.destination = 'MUC';
            searchCriteria.departureDate = new Date();
            searchCriteria.returnDate = new Date();
            return searchCriteria;
        }

        it('on new search criteria: populates the model with Shopping data', function (done) {

            //TODO: mock callback!!!

            var searchCriteria = createSearchCriteriaForTest();

            expect(1).toEqual(2);

            expect(scope.isAnyDataToDisplayAvailable()).toBeFalsy();

            searchCriteriaBroadcastingServiceMock.searchCriteria = searchCriteria;
            searchCriteriaBroadcastingServiceMock.broadcast();
            scope.$digest(); //todo ???
            expect(mockShoppingDataService).toHaveBeenCalled();

            expect(scope.isAnyDataToDisplayAvailable()).toBeTruthy();

            expect(scope.minDateAndPricePair).toBe({'Wed Aug 05 2015 00:00:00 GMT+0200': 198.1});
            expect(scope.departureAirport).toBe(searchCriteria.origin);
            expect(scope.arrivalAirport).toBe(searchCriteria.destination);

            var firstDataSeries = _.first(scope.prices).values;
            expect(firstDataSeries).toHaveLength(3);

            var firstDataPoint = _.first(firstDataSeries);
            expect(firstDataPoint[0]).toBe('Mon Aug 03 2015 00:00:00 GMT+0200');
            expect(firstDataPoint[1]).toBe(200.6);

            var lastDataPoint = _.last(firstDataSeries);
            expect(lastDataPoint[0]).toBe('Wed Aug 05 2015 00:00:00 GMT+0200');
            expect(lastDataPoint[1]).toBe(198.1);

            done();
        });

        it('on new search criteria: correctly sets navigation links states', function () {

        });

        it('on later dates requested from navigation: populates the model with data for next dates', function () {

        });

        it('on later dates requested from navigation: updates state of navigation links', function () {

        });

        it('when 2 weeks are displayed and we request later data till the point when only one week more is available' +
           ': present the 1 week more and one week from current weeks. ' +
           'This prevents the situation when for example we have 5 weeks of data, 2 weeks data presentation window, so without this functinality, the weeks would be presented [[first, second], [third, forth], [fifth <-- only one week instead of two, should be [forth, fifth]]]', function () {

        });

        it('by default 2 weeks of data are displayed', function () {

        });

    });
});