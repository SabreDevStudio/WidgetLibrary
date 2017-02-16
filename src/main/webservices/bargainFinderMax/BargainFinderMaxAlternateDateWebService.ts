// jshint ignore: start

import WebService = require("../WebService");
class BargainFinderMaxAlternateDateWebService extends WebService{

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator: any)
    {
        super('/v1.8.6/shop/altdates/flights?mode=live'
            ,$resource
            ,selectedCountryConfigs
            ,requestHeadersFactory
            ,cachingDecorator);
    }

    sendRequest(request) {
        return this.createPostResource()(request);
    }
}

export = BargainFinderMaxAlternateDateWebService;