define([
          'lodash'
        , 'util/validator'
    ],
    function (
          _
        , v
    ) {
        'use strict';

        function BasicSearchCriteriaValidator() {

            this.validateRoundTripTravelSpecification = function(searchCriteria) {
                var errors = [];

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
                var earliestDepartureDateTime = searchCriteria.getEarliestDepartureDateTime();
                var latestReturnDateTime = searchCriteria.getLatestReturnDateTime();

                if (_.isUndefined(departureDateTime) && _.isUndefined(earliestDepartureDateTime)) {
                    errors.push('departureDateTime or earliestDepartureDateTime must be defined for round trip travel');
                }
                if (_.isUndefined(returnDateTime) && _.isUndefined(latestReturnDateTime)) {
                    errors.push('return date or latest return date must be defined for round trip travel');
                }

                _.isDate(departureDateTime);
                _.isDate(returnDateTime);

                if (_.isUndefined(returnDateTime) && _.isUndefined(latestReturnDateTime) && _.isUndefined(searchCriteria.lengthOfStay)) {
                    errors.push('returnDate or latestReturnDateTime or lengthOfStay is not defined for round trip travel. You must define one of them.');
                }
                if (!_.isUndefined(returnDateTime)) {
                    _.isDate(departureDateTime);
                }

                if (returnDateTime && departureDateTime) {
                    if (returnDateTime.isBefore(departureDateTime) || returnDateTime.isSame(departureDateTime)) {
                        errors.push('return date must be after departureDate');
                    }
                }

                if (latestReturnDateTime && earliestDepartureDateTime) {
                   if (latestReturnDateTime.isBefore(earliestDepartureDateTime) || latestReturnDateTime.isSame(earliestDepartureDateTime)) {
                       errors.push('latest return date must be after earliest departureDate');
                   }
                }

                return errors;
            };
            
        }

        return BasicSearchCriteriaValidator;
});
