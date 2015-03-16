$( document ).ready(function() {
        var SabreDevStudioFlight = require('sabre-dev-studio-flight');
        $("#CalendarSearchResults").append(createCalendar(2015, 1, 'EUR'));
        var options = {
            origin                : 'JFK',
            destination           : 'LAX',
            earliestdeparturedate : '2015-03-01',
            latestdeparturedate   : '2015-05-01',
            lengthofstay          : 7
        };
        SabreDevStudioFlight.advanced_calendar_search(options, function() {

        });
    }
);

