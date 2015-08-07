define([
          'lodash'
        , 'moment'
        , 'datamodel/SearchCriteriaLeg'
    ], function (
          _
        , moment
        , SearchCriteriaLeg
    ) {
    "use strict";

    function SearchCriteria() {

        var that = this;

        this.legs = [];

        // Preferred airline are defined on whole travel level, not on particular leg level.
        this.preferredAirlines = [];

        // Preferred cabin are defined on whole travel level, not on particular leg level. By default Economy
        var _preferredCabin = this.CabinEnum.Economy;
        Object.defineProperty(this, 'preferredCabin', {
            enumerable: true,
            get: function() { return _preferredCabin},
            set: function(preferredCabin) {
                switch (preferredCabin) {
                    case 'Economy': {
                        _preferredCabin = that.CabinEnum.Economy;
                        break;
                    }
                    case 'PremiumEconomy': {
                        _preferredCabin = that.CabinEnum.PremiumEconomy;
                        break;
                    }
                    case 'Business': {
                        _preferredCabin = that.CabinEnum.Business;
                        break;
                    }
                    case 'First': {
                        _preferredCabin = that.CabinEnum.First;
                        break;
                    }
                    default: throw new Error('unrecognized cabin code: ' + preferredCabin);
                }
            }
        });

        // 0 means direct flights only. undefined means no restriction on number of stops
        var _maxStops;
        Object.defineProperty(this, 'maxStops', {
            enumerable: true,
            get: function() { return _maxStops},
            set: function(maxStops) { _maxStops = maxStops}
        });

        this.passengerSpecifications = [];

        // date flexibility defined on whole travel level, not per leg. So if defined, the same number applies to all legs.
        // possible to define only same + and minus days
        var _dateFlexibilityDays;
        Object.defineProperty(this, 'dateFlexibilityDays', {
            enumerable: true,
            get: function() { return _dateFlexibilityDays},
            set: function(dateFlexibilityDays) { _dateFlexibilityDays = dateFlexibilityDays}
        });

        Object.defineProperty(this, 'returnAlternateDatesOnly', {
            enumerable: true
        });


        this.optionsPerDay;
    }

    SearchCriteria.prototype.addLeg = function (leg) {
        this.legs.push(leg);
    };

    SearchCriteria.prototype.getLeg = function (legIdx) {
        return this.legs[legIdx];
    };

    SearchCriteria.prototype.getFirstLeg = function () {
        return this.getLeg(0);
    };

    SearchCriteria.prototype.getSecondLeg = function () {
        return this.getLeg(1);
    };

    /**
     * @param airlineCode as two alphanumeric IATA airline code
     */
    SearchCriteria.prototype.addPreferredAirline = function (airlineCode) {
      this.preferredAirlines.push(airlineCode);
    };

    SearchCriteria.prototype.getPreferredAirlines = function () {
        return this.preferredAirlines;
    };

    SearchCriteria.prototype.addPassenger = function(passengerTypeCode, count) {
        this.passengerSpecifications.push({
              passengerTypeCode: passengerTypeCode
            , count: count
        });
    };

    SearchCriteria.prototype.getTotalPassengerCount = function () {
        return this.passengerSpecifications.reduce(function (acc, next) {
            return acc + next.count;
        }, 0);
    };

    // returns length of stay for round trip travels
    SearchCriteria.prototype.getLengthOfStay = function () {
        if (this.legs.length === 1) { // There is no length of stay for one way travel
            return undefined;
        }
        var firstLegDepartureDateTime = this.legs[0].departureDateTime;
        var secondLegDepartureDateTime = this.legs[1].departureDateTime;
        return this.lengthOfStay || secondLegDepartureDateTime.diff(firstLegDepartureDateTime, 'days');
    };

    SearchCriteria.prototype.toString = function () {
        return JSON.stringify(this);
    };

    SearchCriteria.prototype.isRoundTripTravel = function () {
        return ((this.legs.length === 2) && (this.getFirstLeg().origin === this.getSecondLeg().destination) && (this.getFirstLeg().destination === this.getSecondLeg().origin));
    };

    SearchCriteria.prototype.TripTypeEnum = Object.freeze({
        'OneWay': 'OneWay',
        'RoundTrip': 'RoundTrip',
        'MultiStop': 'MultiStop'
    });

    SearchCriteria.prototype.CabinEnum = Object.freeze({
        'Economy': {
              name: 'Economy'
            , code: 'Y'
        },
        'PremiumEconomy': {
              name: 'PremiumEconomy'
            , code: 'S'
        },
        'Business': {
              name: 'Business'
            , code: 'C'
        },
        'First': {
              name: 'First'
            , code: 'F'
        }
    });

    SearchCriteria.prototype.getCopyAdjustedToOtherDepartureDate = function(date) {
        var newCriteria = _.extend(Object.create(SearchCriteria.prototype), this);
        var daysOffset = date.diff(this.getFirstLeg().departureDateTime, 'days');
        newCriteria.legs.forEach(function (leg) {
            leg.moveDates(daysOffset);
        });
        return newCriteria;
    };

    SearchCriteria.prototype.getCopyWithoutDateFlexibility = function () {
        var copy = _.extend(Object.create(SearchCriteria.prototype), this);
        copy.dateFlexibilityDays = undefined;
        copy.returnAlternateDatesOnly = undefined;
        return copy;
    };

    SearchCriteria.prototype.isAlternateDatesRequest = function () {
        return this.dateFlexibilityDays > 0;
    };

    // utility static factory method
    SearchCriteria.prototype.buildRoundTripTravelSearchCriteria = function (origin, destination, departureDateString, returnDateString) {
        var departureDateTime = moment(departureDateString, moment.ISO_8601);
        var returnDateTime = moment(returnDateString, moment.ISO_8601);


        var firstLeg = new SearchCriteriaLeg(origin, destination, departureDateTime, returnDateTime);
        var secondLeg = new SearchCriteriaLeg(destination, origin, returnDateTime, departureDateTime);

        var searchCriteria = new SearchCriteria();
        searchCriteria.addLeg(firstLeg);
        searchCriteria.addLeg(secondLeg);

        searchCriteria.addPassenger('ADT', 1);

//        searchCriteria.maxStops = 1;

        return searchCriteria;
    };

    SearchCriteria.prototype.buildMultidestinationSearchCriteria = function (originDestinationPairs) {
        var lengthOfStay = 7;
        var searchCriteria = new SearchCriteria();
        originDestinationPairs.forEach(function (originDestinationPair, idx) {
            var departureDateTime = moment().add((idx) * lengthOfStay, 'days');
            var returnDateTime = departureDateTime.clone().add(lengthOfStay, 'days');
            var leg = new SearchCriteriaLeg(originDestinationPair.origin, originDestinationPair.destination, departureDateTime, returnDateTime);
            searchCriteria.addLeg(leg);
        });

        searchCriteria.addPassenger('ADT', 1);

        return searchCriteria;
    };

    return SearchCriteria;
});
