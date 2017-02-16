// jshint ignore: start

import WebService = require("../WebService");
class DestinationPricerWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/shop/flights/cheapest/fares/:destination'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource({destination: '@_destination'}).get(request);
    }
}

export = DestinationPricerWebService;