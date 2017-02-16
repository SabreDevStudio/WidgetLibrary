// jshint ignore: start

import WebService = require('../WebService')
class AdvancedCalendarSearchService extends WebService{

    constructor(protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator: any)
    {
        super('/v1.9.4/shop/calendar/flights'
        ,$resource
        ,selectedCountryConfigs
        ,requestHeadersFactory
        ,cachingDecorator);
    }

    sendRequest(request) {
        return this.createPostResource()(request);
    }
}

export = AdvancedCalendarSearchService;