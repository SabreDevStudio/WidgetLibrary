define(function () {
    "use strict"
    var SabreDevStudio = require('sabre-dev-studio');


    var sabre_dev_studio = new SabreDevStudio({
        client_id:     'V1:pe6myrbaa021f2br:DEVCENTER:EXT',
        client_secret: 'DUaEf51f',
        uri:           'https://api.test.sabre.com'
    });

    //var options = {
    //    origin                : 'JFK',
    //    destination           : 'LAX',
    //    earliestdeparturedate : '2015-04-01',
    //    latestdeparturedate   : '2015-05-01',
    //    lengthofstay          : 7
    //};
    //
    //SabreDevStudioFlight.advanced_calendar_search(options, function(error, data) {
    //    var fares = JSON.parse(data);
    //});

    return {
        advanced_calendar_search: function (options, callback) {
            sabre_dev_studio.get('v1.8.1/shop/calendar/flights', options, callback);
        }
    };

});