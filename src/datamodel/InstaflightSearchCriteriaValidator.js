define([
          'moment'
        , 'datamodel/BasicSearchCriteriaValidator'],
    function (
          moment
        , BasicSearchCriteriaValidator
    ) {
        'use strict';

        function InstaflightSearchCriteriaValidator() {

            this.basicValidator = new BasicSearchCriteriaValidator();

            this.validateLengthOfStay = function(departureDate, returnDate, lengthOfStay) {
                var errors = [];
                var lengthOfStay = lengthOfStay || moment(returnDate).diff(moment(departureDate), 'days');
                if (lengthOfStay < 0) {
                    errors.push("Length of stay must be non-negative");
                }
                if (lengthOfStay > this.MAX_LENGTH_OF_STAY_DAYS) {
                    errors.push("Length of stay over " + this.MAX_LENGTH_OF_STAY_DAYS + " not supported. Please select other travel dates");
                }
            };
        }

        InstaflightSearchCriteriaValidator.prototype.MAX_LENGTH_OF_STAY_DAYS = 16;

        InstaflightSearchCriteriaValidator.prototype.validate = function (searchCriteria) {
            this.errors = [];

            if (!searchCriteria.isRoundTripTravel()) {
                this.errors.push("Instaflight supports only round trip travel");
                return this.errors;
            }

            var roundTripTravelValidationErrors = this.basicValidator.validateRoundTripTravelSpecification(searchCriteria);
            this.errors.push.apply(this.errors, roundTripTravelValidationErrors);

            var lengthOfStayValidationErrors = this.validateLengthOfStay(searchCriteria.departureDate, searchCriteria.returnDate, searchCriteria.lengthOfStay);
            this.errors.push.apply(this.errors, lengthOfStayValidationErrors);

            if (this.errors.length > 0) {
                return this.errors;
            }
        };


        return InstaflightSearchCriteriaValidator;
    });
