define(['moment', 'datamodel/SearchCriteria']
    , function (moment, SearchCriteria) {
        "use strict";

        describe('validate destination code', function () {
            it('positive', function () {
                var searchCriteria = new SearchCriteria();
                expect(function() { searchCriteria.destination = 'LAS';}).not.toThrow();
            });
            it('negative', function () {
                var searchCriteria = new SearchCriteria();
                expect(function() { searchCriteria.destination = 'tooLong'}).toThrow();
            });

        });
});