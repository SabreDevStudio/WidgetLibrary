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

            this.scope = args.scope; //TODO all into private vars
            this.searchService = args.searchService;
            this.validationErrorsReportingService = args.validationErrorsReportingService;
            this.noResultsFoundBroadcastingService = args.noResultsFoundBroadcastingService || { broadcast: _.noop };

            this.lastSearchCriteriaAirports = {};

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
                        saveLastSearchCriteria(searchCriteria);
                        that.processSearchResults(searchResults);
                        that.clearErrorMessages();
                    }, function (errors) {
                        saveLastSearchCriteria(searchCriteria);
                        that.processServiceErrorMessages(errors);
                        // clear model from previous search
                        that.clearModel();
                        that.noResultsFoundBroadcastingService.broadcast();
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
            };

            function saveLastSearchCriteria(searchCriteria) {
                that.lastSearchCriteria = searchCriteria;
                that.lastSearchCriteriaAirports.departureAirport = searchCriteria.getFirstLeg().origin;
                that.lastSearchCriteriaAirports.arrivalAirport = searchCriteria.getFirstLeg().destination;
            }
        }

        return BaseController;
    });
