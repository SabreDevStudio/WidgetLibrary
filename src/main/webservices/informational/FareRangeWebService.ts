// jshint ignore: start

import WebService = require("../WebService");
class FareRangeWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/historical/flights/fares'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource().get(request);
    }
}

export = FareRangeWebService;