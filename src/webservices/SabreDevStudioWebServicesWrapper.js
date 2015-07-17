define(['webservices/SabreDevStudioAuthService', 'lodash', 'jquery'],
    function (AuthService, _, $) {
        'use strict';

        function SabreDevStudioWebServicesWrapper(credentials) {
            var authService = new AuthService(credentials);

            var cachedToken;

            this.getToken = function (callback) {
                if (_.isUndefined(cachedToken)) {
                    authService.getToken(function (err, authToken) { //TODO: token timeout, renew
                        cachedToken = authToken;
                        callback(cachedToken);
                    });
                } else {
                    callback(cachedToken);
                }
            };

            this.getApiURL = function () {
              return credentials.apiURL;
            };
        }

        SabreDevStudioWebServicesWrapper.prototype.advancedCalendarSearch = function (request, callback) {
            var that = this;
            var endpoint = '/v1.8.1/shop/calendar/flights';
            this.getToken(function (authToken) {
                $.ajax({  //TODO post call
                    url: that.getApiURL() + endpoint,
                    type: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + authToken
                        // 'Accept-Encoding': 'gzip' http://stackoverflow.com/questions/3778706/is-it-possible-to-force-jquery-to-make-ajax-calls-for-urls-with-gzip-deflate-ena
                        // but we can try with calling SOAP, request compressed response on intellisell business api level and try to decompress in JS
                        // http://stackoverflow.com/questions/124269/simplest-soap-example
                    },
                    data: request,
                    success: function (responseObject) {
                        callback(undefined, responseObject);
                    },
                    error: function (qXHR, textStatus, error) {
                        callback({
                            textStatus: textStatus,
                            error: error,
                            responseText: qXHR.responseText,
                            statusCode: status
                        });
                    }
                });
            });
        };

        return SabreDevStudioWebServicesWrapper;
    });
