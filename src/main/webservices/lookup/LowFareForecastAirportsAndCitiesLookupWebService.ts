// jshint ignore: start

import WebService = require("../WebService");
class LowFareForecastAirportsAndCitiesLookupWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/lists/supported/forecast/flights/origins-destinations/'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource().get(request);
    }
}
export = LowFareForecastAirportsAndCitiesLookupWebService;