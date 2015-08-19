define([
          'lodash'
        , 'datamodel/SearchCriteria'
    ],
    function (
          _
        , SearchCriteria
    ) {
        'use strict';

        function BaseController(args) {
            var that = this;

            this.scope = args.scope;
            this.searchService = args.searchService;
            this.validationErrorsReportingService = args.validationErrorsReportingService;

            this.scope.executeLifeSearchOnPredefinedCriteriaIfPresent = function (origin, destination, departureDateString, returnDateString) {
                if (origin && destination && departureDateString && returnDateString) {
                    var searchCriteria = SearchCriteria.prototype.buildRoundTripTravelSearchCriteria(origin, destination, departureDateString, returnDateString);
                    that.processSearchCriteria(searchCriteria);
                }
            };

            this.scope.$on(args.newSearchCriteriaEvent, function () {
                var newSearchCriteria = args.searchCriteriaBroadcastingService.searchCriteria;
                that.processSearchCriteria(newSearchCriteria);
            });

            this.anyBusinessErrorMessagesPresent = function () {
                return !_.isEmpty(this.businessErrorMessages);
            };

            this.processSearchCriteria = function (searchCriteria) {
                if (_.isFunction(this.searchService.validateSearchCriteria)) {
                    var validationErrors = this.searchService.validateSearchCriteria(searchCriteria);
                    if (validationErrors.length > 0) {
                        this.validationErrorsReportingService.reportErrors(validationErrors, 'Unsupported search criteria');
                        return;
                    }
                }

                this.searchService.executeSearch(searchCriteria).then(
                    function (searchResults) {
                        that.updateModelWithSearchCriteria(searchCriteria);
                        that.processSearchResults(searchResults);
                        that.clearErrorMessages();
                    }, function (errors) {
                        that.updateModelWithSearchCriteria(searchCriteria);
                        that.processServiceErrorMessages(errors);
                    }
                );
            };

            this.clearErrorMessages = function () {
                _.remove(that.businessErrorMessages);
            };

            this.processServiceErrorMessages = function (businessErrorMessages) { //accepts array or just one string
                // array holding error messages from processing of last search criteria sent.
                // like error messages from validation of search criteria or errors returned from the last web service call
                if (_.isString(businessErrorMessages)) {
                    businessErrorMessages = [businessErrorMessages];
                }
                this.businessErrorMessages = businessErrorMessages;
                // clear model from previous search
                this.clearModel();
            };
        }

        return BaseController;
    });
