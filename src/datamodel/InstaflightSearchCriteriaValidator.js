define([
          'util/LodashExtensions'
        , 'moment'
        , 'datamodel/BasicSearchCriteriaValidator'],
    function (
          _
        , moment
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
            var errors = [];

            if (searchCriteria.isAlternateDatesRequest()) {
                errors.push("Instaflight does not support alt dates requests (date flexibility");
            }

            if (!searchCriteria.isRoundTripTravel()) {
                errors.push("Instaflight supports only round trip travel");
                return errors;
            }

            var roundTripTravelValidationErrors = this.basicValidator.validateRoundTripTravelSpecification(searchCriteria);
            _.pushAll(errors, roundTripTravelValidationErrors);

            var lengthOfStayValidationErrors = this.validateLengthOfStay(searchCriteria.departureDate, searchCriteria.returnDate, searchCriteria.lengthOfStay);
            _.pushAll(errors, lengthOfStayValidationErrors);

            if (errors.length > 0) {
                return errors;
            }
            return errors; 
        };


        return InstaflightSearchCriteriaValidator;
    });
