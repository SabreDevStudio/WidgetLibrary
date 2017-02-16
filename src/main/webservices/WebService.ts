abstract class WebService{

    protected constructor(protected url:string
        , protected $resource: ng.resource.IResourceService
        , protected selectedCountryConfigs: any
        , protected requestHeadersFactory: any
        , protected cachingDecorator?: any)
    {}

    createPostResource(timeout:number = 30000){
        var endpointURL = this.selectedCountryConfigs.apiURL + this.url;
        var resource:any = this.$resource(endpointURL, null, {
            sendRequest: {
                method: 'POST'
                , headers: this.requestHeadersFactory.getHeaders()
                , timeout: timeout
            }
        });
        return this.cachingDecorator.addCaching(resource.sendRequest, [404]);

    }

    createGetResource(paramDefaults:Object = {}, timeout:number = 20000){
        var endpointURL = this.selectedCountryConfigs.apiURL + this.url;
        return this.$resource(endpointURL, paramDefaults, {
            get: {
                method:'GET'
                , cache: true
                , headers: this.requestHeadersFactory.getHeaders()
                , timeout: timeout
            }
        });
    }
}
export = WebService