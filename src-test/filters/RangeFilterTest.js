define(['filters/RangeFilter', 'jquery', 'lodash'],function (RangeFilter, $, _) {
    "use strict";

    describe('construction', function () {
        it('construct range filter using default filtering function constructor, providing filterable property name', function () {
            var rangeFilter = new RangeFilter({
                headerText: 'dummy',
                filterablePropertyName: 'propertyX'
            }, function () {});
            expect(rangeFilter).toBeDefined();
        });

        it('construct range filter overwriting default filtering function constructor, use empty function', function () {
            var rangeFilter = new RangeFilter({
                headerText: 'dummy',
                filteringFunctionConstructorFn: function () {}
            }, function () {});
            expect(rangeFilter).toBeDefined();
        });
    });

    describe('on slide change: verify onChangeHandler called and returned filtering function filters as expected', function () {
        it('default filtering function constructor', function () {
            var eventHandlerSpy = jasmine.createSpy('spy');

            var rangeFilter = new RangeFilter({
                headerText: 'dummy',
                filterablePropertyName: 'propX',
                min: 0,
                max: 100
            }, eventHandlerSpy);

            var filterDom = rangeFilter.createDOM();

            // select slider and trigger slide event, with min value set to 10 and max set to 20
            $(filterDom).find('.SDSRangeFilterSlider').trigger('slide', [{values: [10, 20]}]);

            // verify event handler was called and it was function passed to the event handler
            expect(eventHandlerSpy).toHaveBeenCalled();

            var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
            var filterablePropertyPassed = argsPassedToEventHandler[0];
            expect(filterablePropertyPassed).toEqual('propX');

            var filteringFunctionPassed = argsPassedToEventHandler[1];
            expect(_.isFunction(filteringFunctionPassed)).toBeTruthy();

            // verify filtering function passed works as expected: only values between 10 and 20 (both inclusive) should pass
            expect(filteringFunctionPassed({propX: 9})).toBeFalsy();

            expect(filteringFunctionPassed({propX: 10})).toBeTruthy();
            expect(filteringFunctionPassed({propX: 19})).toBeTruthy();
            expect(filteringFunctionPassed({propX: 20})).toBeTruthy();

            expect(filteringFunctionPassed({propX: 21})).toBeFalsy();
        });

        it('custom filtering function constructor', function () {
            var eventHandlerSpy = jasmine.createSpy('spy');

            // define filtering function that will pass only even values
            var passOnlyEvenNumbersFilteringFunction = function(element) {
                return (element % 2 === 0);
            };

            var rangeFilter = new RangeFilter({
                headerText: 'dummy',
                filteringFunctionConstructorFn: function (min, max, propertyName) {
                    return passOnlyEvenNumbersFilteringFunction;
                },
                min: 0,
                max: 100
            }, eventHandlerSpy);

            var filterDom = rangeFilter.createDOM();

            // select slider and trigger slide event, with min value set to 10 and max set to 20: here these values should not matter
            $(filterDom).find('.SDSRangeFilterSlider').trigger('slide', [{values: [10, 20]}]);

            // verify event handler was called and it was function passed to the event handler
            expect(eventHandlerSpy).toHaveBeenCalled();
            var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
            var filteringFunctionPassed = argsPassedToEventHandler[1];
            expect(_.isFunction(filteringFunctionPassed)).toBeTruthy();

            // verify the function passed was exactly the one we had set in range filer filtering function constructor
            expect(filteringFunctionPassed).toBe(passOnlyEvenNumbersFilteringFunction);
        });

    });
    
});