// jshint ignore: start

import WebService = require("../WebService");
class BargainFinderMaxWebService extends WebService{

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator: any)
    {
        super('/v1.9.5/shop/flights?mode=live'
            ,$resource
            ,selectedCountryConfigs
            ,requestHeadersFactory
            ,cachingDecorator);
    }

    sendRequest(request) {
        return this.createPostResource()(request);
    }
}

export = BargainFinderMaxWebService;