require(['webservices/SabreDevStudioAuthService'], function (SabreDevStudioAuthService) {
    'use strict';

    describe('get auth token', function () {

        it('positive', function (done) { //TODO: mock web service communication
            var credentials = {
                clientId: 'V1:pe6myrbaa021f2br:DEVCENTER:EXT',
                clientSecret: 'DUaEf51f',
                apiURL: 'https://api.test.sabre.com'
            };

            var authService = new SabreDevStudioAuthService(credentials);

            var token = authService.getToken(function (err, authToken) {
                expect(err).toBeUndefined();
                expect(authToken).toBeDefined();
                expect(authToken.length).toBeGreaterThan(0);
                done();
            });
        });

    });
});