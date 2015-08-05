require(['datamodel/BasicSearchCriteriaValidator'], function (BasicSearchCriteriaValidator) {
    'use strict';

    var validator = new BasicSearchCriteriaValidator();

    describe('validate round trip travel', function () {

        it('arrivalDate cannot be before departure date', function () {
            expect(function () {
                validator.validateRoundTripTravelSpecification({
                        origin: 'LAX'
                        , destination: 'NYC'
                        , departureDate: '2015-04-15'
                        , arrivalDate: '2015-04-14' // <--- 14 Apr before 15 Apr
                        , currentDate: '2015-01-01'
                });
            }).toThrow();
        });

        it('you cannot specify both return date and length of stay', function () {
            var searchOptions = {
                origin: 'DFW',
                destination: 'LAX',
                departureDate: '2015-05-05',
                returnDate: '2015-05-06', //<--
                lengthOfStay: 14 //<--
            };
            expect(function () {
                validator.validateRoundTripTravelSpecification(searchOptions);
            }).toThrow();
        });

    });
});