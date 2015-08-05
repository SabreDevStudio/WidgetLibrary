define(['util/validator'],
    function (v) {
        'use strict';

        function BasicSearchCriteriaValidator() {

            this.validateRoundTripTravelSpecification = function(searchCriteria) {
                this.errors = [];

                //TODO change validator to not throw exceptions
                v.airportCode(searchCriteria.getFirstLeg().origin,
                    "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");
                v.airportCode(searchCriteria.getFirstLeg().destination,
                    "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");

                v.airportCode(searchCriteria.getSecondLeg().origin,
                    "You have to specify origin location, and it must be valid 3 letter airport or city code, for example LAX");
                v.airportCode(searchCriteria.getSecondLeg().destination,
                    "You have to specify destination location, and it must be valid 3 letter airport or city code, for example LAX");

                var departureDateTime = searchCriteria.getFirstLeg().departureDateTime;
                var returnDateTime = searchCriteria.getSecondLeg().departureDateTime;

                if (_.isUndefined(departureDateTime)) {
                    this.errors.push('departureDate is not defined for round trip travel');
                }
                if (_.isUndefined(returnDateTime)) {
                    this.errors.push('return date is not defined for round trip travel');
                }

                _.isDate(departureDateTime);
                _.isDate(returnDateTime);

                if (_.isUndefined(returnDateTime) && _.isUndefined(searchCriteria.lengthOfStay)) {
                    this.errors.push('returnDate or lengthOfStay is not defined for round trip travel. You must define one of them.');
                }
                if (!_.isUndefined(returnDateTime)) {
                    _.isDate(departureDateTime);
                }

                if (returnDateTime.isBefore(departureDateTime) || returnDateTime.isSame(departureDateTime) ) {
                    this.errors.push('return date must be after departureDate');
                }
                return (this.errors.length > 0)? this.errors: undefined;
            }
            
        }

        return BasicSearchCriteriaValidator;
});
