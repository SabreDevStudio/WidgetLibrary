define(['util/LodashExtensions'], function (_) {
    "use strict";
    describe('groupByAndGetCountAndMin', function () {
        it('it', function () {
            var employees = [
                  {name: 'fred', department: 'sales', salary: 200}
                , {name: 'john', department: 'sales', salary: 150}
                , {name: 'anna', department: 'finance', salary: 300}
            ];
            // get number of employees per department and minimum salary per department
            var results = _.groupByAndGetCountAndMin(employees, 'department', 'salary');

            expect(results.sales.count).toBe(2);
            expect(results.sales.min).toBe(150);

            expect(results.finance.count).toBe(1);
            expect(results.finance.min).toBe(300);
        });
    })
});