define(['filters/DiscreteValuesFilter', 'jquery', 'lodash'], function (DiscreteValuesFilter, $, _) {
    "use strict";

    describe('on checkbox change: verify onChangeHandler called and returned filtering function filters as expected', function () {

        /**
         * Function that checks if on change handler was called and it was passed correct function and this function works as defined in specifications (passFailSpecs)
         * @param eventHandlerSpy
         * @param filterableProperty
         * @param passFailSpecs: an object: {
         *       shouldPass: ['value1ToPass'],
         *       shouldFail: ['value1ToFail', 'value2ToFail', etc.]
         *      }
         * The result of executing filtering function on shouldPass elements must be truthy, and the result of executing it on shouldFail elements must be falsy
         */
        function verifyTheFilteringFunctionPassed(eventHandlerSpy, filterableProperty, passFailSpecs) {
            // verify event handler was called and it was function passed to the event handler
            expect(eventHandlerSpy).toHaveBeenCalled();

            var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
            var filterablePropertyPassed = argsPassedToEventHandler[0];
            expect(filterablePropertyPassed).toBe(filterableProperty);

            var filteringFunctionPassed = argsPassedToEventHandler[1];
            expect(_.isFunction(filteringFunctionPassed)).toBeTruthy();

            // verify filtering function passed works as expected
            passFailSpecs.shouldPass.forEach(function (val) {
                var candidateObj = {};
                candidateObj[filterablePropertyPassed] = val;
                expect(filteringFunctionPassed(candidateObj)).toBeTruthy();
            });
            passFailSpecs.shouldFail.forEach(function (val) {
                var candidateObj = {};
                candidateObj[filterablePropertyPassed] = val;
                expect(filteringFunctionPassed(candidateObj)).toBeFalsy();
            });
        }

        it('default filtering function constructor', function () {
            var eventHandlerSpy = jasmine.createSpy('spy');

            var filter = new DiscreteValuesFilter({
                headerText: 'dummy',
                filterablePropertyName: 'propX',
                selectableValues: [{
                    value: 'val1',
                    count: 2
                },
                {
                    value: 'val2',
                    count: 10

                }]
            }, eventHandlerSpy);

            var filterDom = filter.createDOM();

            // select checkbox, change it to unchecked and trigger change event on this checkbox
            // the other checkboxes stay checked.
            $(filterDom).find('input[data-itemvalue="val1"]').prop('checked', false);
            $(filterDom).find('input[data-itemvalue="val1"]').trigger('change');

            verifyTheFilteringFunctionPassed(eventHandlerSpy, 'propX', {
                shouldPass: ['val2'],
                shouldFail: ['val1', 'val3'] // unknown value val3 should be also failed
            });
        });

        it('disable one discrete value and then re-enable it', function () {
            var eventHandlerSpy = jasmine.createSpy('spy');

            var filter = new DiscreteValuesFilter({
                headerText: 'dummy',
                filterablePropertyName: 'propX',
                selectableValues: [{
                    value: 'val1',
                    count: 20
                },
                    {
                        value: 'val2',
                        count: 30

                    }]
            }, eventHandlerSpy);

            var filterDom = filter.createDOM();

            // select checkbox, change it to unchecked and trigger change event on this checkbox
            // the other checkboxes stay checked.
            $(filterDom).find('input[data-itemvalue="val1"]').prop('checked', false);
            $(filterDom).find('input[data-itemvalue="val1"]').trigger('change');

            verifyTheFilteringFunctionPassed(eventHandlerSpy, 'propX', {
                shouldPass: ['val2'],
                shouldFail: ['val1']
            });

            // re-enable val1
            $(filterDom).find('input[data-itemvalue="val1"]').prop('checked', true);
            $(filterDom).find('input[data-itemvalue="val1"]').trigger('change');

            verifyTheFilteringFunctionPassed(eventHandlerSpy, 'propX', {
                shouldPass: ['val1', 'val2'],
                shouldFail: []
            });
        })

    });
});