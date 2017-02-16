// jshint ignore: start

import WebService = require("../WebService");
class GeoSearchWebService extends WebService{

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator: any)
    {
        super('/v1/lists/utilities/geosearch/locations'
            ,$resource
            ,selectedCountryConfigs
            ,requestHeadersFactory
            ,cachingDecorator);
    }

    sendRequest(request) {
        return this.createPostResource()(request);
    }
}
export = GeoSearchWebService;