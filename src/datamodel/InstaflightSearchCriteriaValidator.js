define(['moment', 'datamodel/BasicSearchCriteriaValidator'],
    function (moment, BasicSearchCriteriaValidator) {
        'use strict';

        function InstaflightSearchCriteriaValidator() {
            this.basicValidator = new BasicSearchCriteriaValidator();
        }

        InstaflightSearchCriteriaValidator.prototype.MAX_LENGTH_OF_STAY_DAYS = 16;

        InstaflightSearchCriteriaValidator.prototype.validate = function (searchCriteria) {
            this.basicValidator.validate(searchCriteria);
            try {
                this.basicValidator.validateIsRoundTripTravel(searchCriteria);
            } catch (err) {
                throw new Error("Instaflight supports only round trip travel: " + err.message);
            }
            this.validateLengthOfStay(searchCriteria.departureDate, searchCriteria.returnDate, searchCriteria.lengthOfStay);
        };

        InstaflightSearchCriteriaValidator.prototype.validateLengthOfStay = function(departureDate, returnDate, lengthOfStay) {
            var lengthOfStay = lengthOfStay || moment(returnDate).diff(moment(departureDate), 'days');
            if (lengthOfStay < 0) {
                throw new Error("Length of stay must be non-negative");
            }
            if (lengthOfStay > this.MAX_LENGTH_OF_STAY_DAYS) {
                throw new Error("Length of stay over " + this.MAX_LENGTH_OF_STAY_DAYS + " not supported. Please select other travel dates");
            }
        };

        return InstaflightSearchCriteriaValidator;
    });
