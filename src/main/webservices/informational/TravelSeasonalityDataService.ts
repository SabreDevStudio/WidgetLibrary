function TravelSeasonalityDataService(
    $q
    , TravelSeasonalityWebService
    , ErrorReportingService
    , businessMessagesErrorHandler
) {

    /**
     * searchCriteria is one property object, that has to have 'destination' key, for example: {
             *  destination: 'LAX'
             * }
     */
    function getSeasonality(searchCriteria) {
        return $q(function(resolve, reject) {
            var destination = searchCriteria.destination;
            getDestinationSeasonality(destination).then(resolve, reject);
        });
    }

    function getDestinationSeasonality(destination) {
        return $q(function(resolve, reject) {
            var requestOptions = {
                destination: destination
            };
            TravelSeasonalityWebService.get(requestOptions).$promise.then(
                function (response) {
                    resolve(response);
                },
                function (reason) {
                    ErrorReportingService.reportError('Could not get seasonality information for destination: ' + destination);
                    businessMessagesErrorHandler.handle(reject, reason);
                }
            );
        });
    }

    return {
        getDestinationSeasonality: getDestinationSeasonality
        , getSeasonality: getSeasonality
    };
}

export = TravelSeasonalityDataService;