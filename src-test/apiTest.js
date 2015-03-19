/*global jasmine*/
define(['lib/commWrapper'], function(comm) {

    xdescribe('themes API', function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
        it('themes returned', function(done) {
            comm.travel_theme_lookup(function(error, data) {
                //console.log(error);
                //console.log(data);
                if (error) {
                    expect(true).toBeFalsy();
                } else {
                    var themes = JSON.parse(data);
                    expect(themes.Themes.length).toBeGreaterThan(1);
                    expect(themes.Themes[0].Theme).toContain('BEACH');
                    //console.log(JSON.parse(data));
                }
                done();
            });


            //var prevMonthLastDays = comm.advanced_calendar_search(options, request, callback);

        });
    });
});
