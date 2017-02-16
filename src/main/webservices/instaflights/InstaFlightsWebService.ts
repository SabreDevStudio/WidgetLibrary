// jshint ignore: start

import WebService = require("../WebService");
class InstaFlightsWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/shop/flights'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource().get(request);
    }
}

export = InstaFlightsWebService;
