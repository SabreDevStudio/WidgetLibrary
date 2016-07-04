define([], function () {
    "use strict"

    TripOriginChangedBroadcastingService.$inject = ['$rootScope', 'tripOriginChangedEvent'];
    function TripOriginChangedBroadcastingService ($rootScope, tripOriginChangedEvent) {
            var service = {
                origin: undefined,
                broadcast: function () {
                    $rootScope.$broadcast(tripOriginChangedEvent);
                }
            };
            return service;
    }
    return TripOriginChangedBroadcastingService
});