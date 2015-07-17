define(['jquery', 'util/LodashExtensions'],
    function ($, _) {
        'use strict';

        function SabreDevStudioAuthService(credentials) {

            var apiKey = createAPIkey(credentials.clientId, credentials.clientSecret);

            function createAPIkey(clientId, clientSecret) {
                //base64 encode clientId and clientSecret
                var encodedClientId = _.base64_encode(clientId);
                var encodedClientSecret = _.base64_encode(clientSecret);

                //Concatenate encoded client and secret strings, separated with colon
                var encodedClientIdSecret = encodedClientId + ':' + encodedClientSecret;

                //Convert the encoded concatenated string to a single base64 encoded string.
                encodedClientIdSecret = _.base64_encode(encodedClientIdSecret);
                return encodedClientIdSecret;
            }

            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + apiKey,
                'Accept': '*/*'
            };

            /* the callback will be passed the auth token */
            this.getToken = function (callback) {
                $.ajax({ //TODO post call
                    url: credentials.apiURL + this.ENDPOINT,
                    type: 'POST',
                    headers: headers,
                    data: 'grant_type=client_credentials',
                    success: function (response) {
                        callback(undefined, response.access_token);
                    },
                    error: function (qXHR, textStatus, error) {
                        callback(textStatus + ':' + error);
                    }
                });
            };
        }

        SabreDevStudioAuthService.prototype.ENDPOINT = '/v1/auth/token';

        return SabreDevStudioAuthService;
});
