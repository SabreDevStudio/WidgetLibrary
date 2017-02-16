// jshint ignore: start

import WebService = require("../WebService");
class TravelSeasonalityWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/historical/flights/:destination/seasonality'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource({destination: '@_destination'}).get(request);
    }
}
export = TravelSeasonalityWebService;