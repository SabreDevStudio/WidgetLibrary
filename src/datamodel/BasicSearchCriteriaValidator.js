define(['util/validator'],
    function (v) {
        'use strict';

        function BasicSearchCriteriaValidator() {

            this.validate = function(searchCriteria) {
                v.airportCode(searchCriteria.origin,
                    "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");
                v.airportCode(searchCriteria.destination, //TODO inspirational travel : no dest or origin
                    "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");
                return true;
            };
            
        }

        BasicSearchCriteriaValidator.prototype.validateIsRoundTripTravel = function (searchCriteria) {
            if (_.isUndefined(searchCriteria.departureDate)) {
                throw new Error('departureDate is not defined for round trip travel');
            }
            _.isDate(searchCriteria.departureDate);

            if (_.isUndefined(searchCriteria.returnDate) && _.isUndefined(searchCriteria.lengthOfStay)) {
                throw new Error('returnDate or lengthOfStay is not defined for round trip travel. You must define one of them.');
            }
            if (!_.isUndefined(searchCriteria.returnDate)) {
                _.isDate(searchCriteria.departureDate);
            }

            v.onlyOneDefined(searchCriteria.lengthOfStay, searchCriteria.returnDate, "You have to specify either lengthOfStay or returnDate (not both)"); // TODO: for one ways request you will not have LoS

            if (searchCriteria.returnDate < searchCriteria.departureDate) {
                throw new Error('returnDate cannot be before departureDate');
            }
        };

        return BasicSearchCriteriaValidator;
});
