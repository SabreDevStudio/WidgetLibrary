// jshint ignore: start

class ShoppingProfileService{

    private shoppingProfiles: {
        description: string
        , shoppingProfileName: string
        , displayable: boolean
        , activeSearchWebService: string
    }[];

    constructor(){

        this.shoppingProfiles = [
            {
                description: "InstaFlights Search (public cache)",
                shoppingProfileName: "INSTAFLIGHTS",
                displayable: true,
                activeSearchWebService: "instaflights"
            },
            {
                description: "Meta (public cache with avail. filters)",
                shoppingProfileName: "META",
                displayable: true,
                activeSearchWebService: "bfm"
            },
            {
                description: "BFM optimized (public cache with reprice 2nd wash and live fallback)",
                shoppingProfileName: "BFMOPTIMIZED",
                displayable: true,
                activeSearchWebService: "bfm"
            },
            {
                description: "Diversity Swapper",
                shoppingProfileName: "DIVERSITYSWAPPER",
                displayable: false,
                activeSearchWebService: "bfm"
            },
            {
                description: "Branded Fares",
                shoppingProfileName: "BRANDEDFARES",
                displayable: false,
                activeSearchWebService: "bfm"
            }
        ]
    }

    public getShoppingProfies (displayable?: boolean){

        var result = this.shoppingProfiles;
        if(displayable !== undefined){
            result = result.filter(e => e.displayable === displayable);
        }
        return result;
    }

    public enhanceSearchCriteriaProcessingShoppingProfile(shoppingProfileName: string, searchCriteria){

        var searchCriteriaClone =  _.create(Object.getPrototypeOf(searchCriteria), searchCriteria)

        switch (shoppingProfileName){

            case undefined:
                break;
            case "INSTAFLIGHTS":
                break;
            case "META":
                searchCriteriaClone.additionalParameters = {ServiceTag: {Name: "META"}};
                break;
            case "BFMOPTIMIZED":
                searchCriteriaClone.additionalParameters = {ServiceTag: {Name: "BFMOPTIMIZED"}};
                break;
            case "DIVERSITYSWAPPER":
                break;
            case "BRANDEDFARES":
                break;
            default:
                throw new Error('Unsuported shopping profile: ' + shoppingProfileName);
        }

        return searchCriteriaClone;
    }
}
export = ShoppingProfileService;