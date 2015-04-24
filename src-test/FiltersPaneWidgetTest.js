define(['FiltersPaneWidget', 'jasmine-jquery'], function (FiltersPaneWidget, JasmineJqueryDummy) {

    describe('FiltersPaneWidget creation', function () {
        it('no options provided, widget DOM created', function () {
            var filtersPaneWidget = new FiltersPaneWidget();
            filtersPaneWidget.render(function (dom) {
                expect(dom.find('.SDSFilterPaneWidget').addBack().size()).toBe(1);
            });
        });
    });

    describe('On any filter change, the custom event filteringCriteriaChanged is called and passed all current filtering functions', function () {
        it('change price slider', function () {
            // create filter pane and subscribe to its filteringCriteriaChanged event
            var filtersPaneWidget = new FiltersPaneWidget();

            // set filter initial state (normally it is done when filters pane is attached to the itineraries list widget ):
            filtersPaneWidget.resetFiltersBounds([{
                filterablePropertyName: 'totalFareAmount',
                statistics: {
                    min: 0,
                    max: 100
                }
            }]);

            var filteringCriteriaChangedSpy = jasmine.createSpy('filteringCriteriaChangedSpy');
            filtersPaneWidget.bind('filteringCriteriaChanged', filteringCriteriaChangedSpy);

            // trigger change on one of filters:
            var filtersPaneDom = filtersPaneWidget.createDOM();
            $(filtersPaneDom).find('.SDSRangeFilter[data-filterablepropertyname="totalFareAmount"] .SDSRangeFilterSlider').trigger('slide', [{values: [10, 20]}]);

            expect(filteringCriteriaChangedSpy).toHaveBeenCalled();
            var argsPassedToEventHandler = filteringCriteriaChangedSpy.calls.mostRecent().args;
            var filteringFunctions = argsPassedToEventHandler[0];
            expect(filteringFunctions.length).toBe(1);
        });
    });

    describe('Resetting filter bounds', function () {
       it('it', function () {
           var filtersPaneWidget = new FiltersPaneWidget();
           var newBounds = [{
               filterablePropertyName: 'totalFareAmount',
               statistics: {
                   min: 155,
                   max: 255
               }
           }];
           filtersPaneWidget.resetFiltersBounds(newBounds);

           // verify current slider min and max
           expect(filtersPaneWidget.filters.totalFareAmount.options.min).toBe(155);
           expect(filtersPaneWidget.filters.totalFareAmount.options.max).toBe(255);
       });
    });

});