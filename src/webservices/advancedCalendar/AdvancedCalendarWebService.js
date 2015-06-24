define(['stache!request-templates/AdvancedCalendarRequest.json', '../../lib/commWrapper', 'moment'],
    function (requestTemplate, SDSServicesWrapper, moment) {
        'use strict';

        function AdvancedCalendarWebService(options) {
            var options = options || {};
            var dateFormat = options.dateFormat || this.OPTIONS_DEFAULT_DATE_FORMAT;
            var currentDate = (options.currentDate)? moment(options.currentDate, dateFormat) : moment(); // for (unit) testing: exposing dependency on current time, which is used to determine start and end dates for call to the web service. See lastTravelDateAvailableInWebService
            var lastTravelDateAvailableInWebService = currentDate.clone().add(this.MAX_ADVANCE_PURCHACE_DAYS_FROM_NOW, 'days');

            this.setRequestOptionsDetails = function (requestOptions) {
                requestOptions.requestStartDate = requestOptions.requestStartDate ||  currentDate;
                requestOptions.requestEndDate = requestOptions.requestEndDate || lastTravelDateAvailableInWebService;
                return requestOptions;
            };

            this.maxRequestedTravelOutboundDate = function () {
                return lastTravelDateAvailableInWebService;
            };
        }

        AdvancedCalendarWebService.prototype.OPTIONS_DEFAULT_DATE_FORMAT = 'YYYY-M-D';

        AdvancedCalendarWebService.prototype.MAX_ADVANCE_PURCHACE_DAYS_FROM_NOW = 192;

        /**
         * Function to fetch data from web service.
         * This function takes two arguments:
         *  1. request, as string  function (err, data)
         *  2. callback function, and pass to it two arguments: error and response data.
         */
        AdvancedCalendarWebService.prototype.sendRequest = function (requestOptions, callback) {
            requestOptions = this.setRequestOptionsDetails(requestOptions);
            var webServiceRequestJson = this.createWebServiceRequest(requestOptions);
            return SDSServicesWrapper.advanced_calendar_search(webServiceRequestJson, callback);
        };


        AdvancedCalendarWebService.prototype.createWebServiceRequest = function (requestOptions) { // public for unit testing
            requestOptions.fromDate = requestOptions.requestStartDate.format('YYYY-MM-DD');
            requestOptions.toDate = requestOptions.requestEndDate.format('YYYY-MM-DD');
            return requestTemplate(requestOptions);
        };


        return AdvancedCalendarWebService;
    });
