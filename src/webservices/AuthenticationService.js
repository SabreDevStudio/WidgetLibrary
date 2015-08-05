define([
          'angular'
        , 'angular_resource'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'util/LodashExtensions'
    ],
    function (
          angular
        , angular_resource
        , SabreDevStudioWebServicesModule
        , _
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('AuthenticationService', [
                      '$q'
                    , '$resource'
                    , 'credentials'
                    , 'apiURL'
                , function (
                      $q
                    , $resource
                    , credentials
                    , apiURL
                ) {

                var cachedToken;

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

                var endpointURL = apiURL + '/v1/auth/token';

                var authResource = $resource(endpointURL, null, {
                    sendRequest: {
                        method: 'POST'
                        , headers: {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                            , 'Authorization': 'Basic ' + createAPIkey(credentials.clientId, credentials.clientSecret)
                        }
                        , transformRequest: function(data, headers) {
                            return 'grant_type=client_credentials';
                        }
                        , transformResponse: function(response) {
                            return {token: angular.fromJson(response).access_token};
                        }
                        , responseType: 'text'
                    } //TODO transformRequest here and here request building from skeleton!
                });

                return {
                    getToken: function () {
                        return $q(function(resolve) {
                            if (_.isDefined(cachedToken)) {
                                return resolve(cachedToken);
                            }
                            authResource.sendRequest().$promise.then(
                                function (response) {
                                    cachedToken = response.token;
                                    resolve(cachedToken);
                                },
                                function (reason) {
                                    console.log(reason); // TODO: handle retries here
                                }
                            );
                        });
                    }
                };
            }]);
    });
