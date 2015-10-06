define([
          'util/LodashExtensions'
        , 'webservices/BasicSearchCriteriaValidator'
    ],
    function (
          _
        , BasicSearchCriteriaValidator
    ) {
        'use strict';

        function TravelInsightEngineSearchCriteriaValidator() {
            this.basicValidator = new BasicSearchCriteriaValidator();

        }

        TravelInsightEngineSearchCriteriaValidator.prototype.validateLengthOfStay = function(lengthOfStay) {
            var errors = [];
            if (lengthOfStay < 0) {
                errors.push("Length of stay must be non-negative");
            }
            if (lengthOfStay > this.MAX_LENGTH_OF_STAY_DAYS) {
                errors.push("Length of stay over " + this.MAX_LENGTH_OF_STAY_DAYS + " not supported. Please select other travel dates");
            }
            return errors;
        };

        TravelInsightEngineSearchCriteriaValidator.prototype.validate = function (searchCriteria) {
            var errors = [];

            if (!searchCriteria.isRoundTripTravel()) {
                errors.push("Travel Insight Engine services support only round trip travel");
                return errors;
            }
            var roundTripTravelValidationErrors = this.basicValidator.validateRoundTripTravelSpecification(searchCriteria);
            _.pushAll(errors, roundTripTravelValidationErrors);

            _.pushAll(errors, this.validateLengthOfStay(searchCriteria.getLengthOfStay()));
            _.pushAll(errors, this.validateLengthOfStay(searchCriteria.getMinLengthOfStay()));
            _.pushAll(errors, this.validateLengthOfStay(searchCriteria.getMaxLengthOfStay()));

            if (!searchCriteria.isEconomyCabinRequested()) {
                errors.push('Travel Insight Engine services support only Economy cabin requests, or requests without cabin preference - then economy fares will be returned)');
            }

            return errors;
        };

        TravelInsightEngineSearchCriteriaValidator.prototype.MAX_LENGTH_OF_STAY_DAYS = 16;

        return TravelInsightEngineSearchCriteriaValidator;
    });
