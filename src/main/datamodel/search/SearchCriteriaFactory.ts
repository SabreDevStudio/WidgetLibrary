define([
          'lodash'
        , 'util/LodashExtensions'
        , 'moment'
        , 'datamodel/search/SearchCriteria'
        , 'datamodel/search/SearchCriteriaLeg'
    ], function (
          _
        , __
        , moment
        , SearchCriteria
        , SearchCriteriaLeg
    ) {
    "use strict";

    /**
     * Static factory producing simple, minimal SearchCriteria for round trip travel  
     * @param origin 3 letter alphanumeric IATA airport or city code
     * @param destination
     * @param departureDateString
     * @param returnDateString
     * @returns {SearchCriteria}
     */
    function buildRoundTripTravelSearchCriteria(origin, destination, departureDateString, returnDateString) {
        var departureDateTime = moment(departureDateString, moment.ISO_8601);
        var returnDateTime = moment(returnDateString, moment.ISO_8601);

        var firstLeg = new SearchCriteriaLeg({
              origin: origin
            , destination: destination
            , departureDateTime: departureDateTime
            , returnDateTime: returnDateTime
        });
        var secondLeg = new SearchCriteriaLeg({
            origin: destination
            , destination: origin
            , departureDateTime: returnDateTime
            , returnDateTime: departureDateTime
        });

        var searchCriteria = new SearchCriteria();
        searchCriteria.addLeg(firstLeg);
        searchCriteria.addLeg(secondLeg);

        searchCriteria.addPassenger('ADT', 1);

        return searchCriteria;
    };

    function buildRoundTripTravelSearchCriteriaWithDateFlexibility(origin, destination, departureDateString, returnDateString, dateFlexibilityDays) {
        var searchCriteria = SearchCriteria.prototype.buildRoundTripTravelSearchCriteria(origin, destination, departureDateString, returnDateString);
        searchCriteria.dateFlexibilityDays = dateFlexibilityDays;
        return searchCriteria;
    };

    function buildMultidestinationSearchCriteria(originDestinationPairs) {
        var lengthOfStay = 7;
        var searchCriteria = new SearchCriteria();
        originDestinationPairs.forEach(function (originDestinationPair, idx) {
            var departureDateTime = moment().add((idx) * lengthOfStay, 'days');
            var returnDateTime = departureDateTime.clone().add(lengthOfStay, 'days');
            var leg = new SearchCriteriaLeg({
                  origin: originDestinationPair.origin
                , destination: originDestinationPair.destination
                , departureDateTime: departureDateTime
                , returnDateTime: returnDateTime
            });
            searchCriteria.addLeg(leg);
        });

        searchCriteria.addPassenger('ADT', 1);

        return searchCriteria;
    };

    return {
        buildRoundTripTravelSearchCriteria: buildRoundTripTravelSearchCriteria,
        buildRoundTripTravelSearchCriteriaWithDateFlexibility: buildRoundTripTravelSearchCriteriaWithDateFlexibility,
        buildMultidestinationSearchCriteria: buildMultidestinationSearchCriteria
    };
});
