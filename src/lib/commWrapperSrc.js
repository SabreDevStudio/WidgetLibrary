define(function () {
    "use strict";
    var SabreDevStudio = require('sabre-dev-studio');

    var sabre_dev_studio = new SabreDevStudio({
        client_id:     'V1:pe6myrbaa021f2br:DEVCENTER:EXT',
        client_secret: 'DUaEf51f',
        uri:           'https://api.test.sabre.com',
        loglevel: 'fatal' // TODO: maybe better remove all calls to logger with strip_code?
    });

    return {
        advanced_calendar_search: function (request, callback) {
            var endpoint = '/v1.8.1/shop/calendar/flights';
            var options = {
                'Content-Type': 'application/json'
            };
            sabre_dev_studio.post(endpoint, request, options, callback);
        }
    };

});