// jshint ignore: start

import WebService = require("../WebService");
class GeoCodeWebService extends WebService {

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator: any)
    {
        super('/v1/lists/utilities/geocode/locations'
            ,$resource
            ,selectedCountryConfigs
            ,requestHeadersFactory
            ,cachingDecorator);
    }

    sendRequest(request) {
        return this.createPostResource()(request);
    }

}
export = GeoCodeWebService;