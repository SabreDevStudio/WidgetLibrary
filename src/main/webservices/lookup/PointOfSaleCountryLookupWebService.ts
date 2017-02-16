// jshint ignore: start

import WebService = require("../WebService");
class PointOfSaleCountryLookupWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any)
    {
        super('/v1/lists/supported/pointofsalecountries/'
            , $resource
            , selectedCountryConfigs
            , requestHeadersFactory
            , {});
    }

    get(request) {
        return this.createGetResource().get(request);
    }
}
export = PointOfSaleCountryLookupWebService;