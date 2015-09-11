define([
          'angular'
        , 'moment'
        , 'datamodel/AlternateDatesRoundTripPriceMatrix'
        , 'webservices/LeadPriceCalendarSearchCriteriaValidator'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/WebServicesResourceDefinitions'
        , 'datamodel/ShoppingData'
    ],
    function (
          angular
        , moment
        , AlternateDatesRoundTripPriceMatrix
        , LeadPriceCalendarSearchCriteriaValidator
        , SabreDevStudioWebServicesModule
        , WebServicesResourceDefinitions
        , ShoppingData
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('LeadPriceCalendarResponseParser', function () {
                return {
                    parse: function (response) {

                        function isAtLeastOnePricePresent(fareInfo) {
                            return !isNaN(parseFloat(fareInfo.LowestFare)) && isFinite(fareInfo.LowestFare)
                                || !isNaN(parseFloat(fareInfo.LowestNonStopFare)) && isFinite(fareInfo.LowestNonStopFare);
                        }

                        return response.FareInfo
                            .filter(isAtLeastOnePricePresent)
                            .map(function (fareInfo) {
                                return {
                                    departureDateTime: fareInfo.DepartureDateTime
                                    , lowestFare: fareInfo.LowestFare
                                    , lowestNonStopFare: fareInfo.LowestNonStopFare
                                    , currency: fareInfo.CurrencyCode
                                };
                            });
                    },
                    extractAlternateDatesPriceMatrix: function (response) {
                        return response.FareInfo
                            .map(function (fareInfo) {
                                return {
                                    departureDate: moment(fareInfo.DepartureDateTime, moment.ISO_8601)
                                    , returnDate: moment(fareInfo.ReturnDateTime, moment.ISO_8601)
                                    , price: fareInfo.LowestFare
                                    , currency: fareInfo.CurrencyCode
                                };
                            }).reduce(function (altDatePriceMatrix, travelDatesWithLeadPrice) {
                                altDatePriceMatrix.addLeadFareForDate(travelDatesWithLeadPrice);
                                return altDatePriceMatrix;
                            }, new AlternateDatesRoundTripPriceMatrix());
                    },
                    getBusinessErrorMessages: function (response) {
                        return response;
                    }
                };
            })
            .factory('LeadPriceCalendarDataService', [
                '$q'
                , '$cacheFactory'
                , 'LeadPriceCalendarWebService'
                , 'LeadPriceCalendarResponseParser'
                , 'pointOfSaleCountry'
                , 'StandardErrorHandler'
                , function (
                    $q
                    , $cacheFactory
                    , LeadPriceCalendarWebService
                    , parser
                    , pointOfSaleCountry
                    , StandardErrorHandler
                ) {

                    var leadFaresCache = $cacheFactory('leadPricesCache');

                    var validator = new LeadPriceCalendarSearchCriteriaValidator();

                    function translateSearchCriteriaIntoRequestOptions(searchCriteria) {
                        var requestOptions = {
                            origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , lengthofstay: searchCriteria.getLengthOfStay()
                        };
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    function translateSearchCriteriaIntoAlternateDatesRequestOptions(searchCriteria) {
                        var departureDates = searchCriteria.getRequestedDepartureDates();
                        var lengthOfStays = searchCriteria.getRequestedLengthOfStayValues();
                        lengthOfStays = lengthOfStays.filter(travelInsightsEngineAcceptedLengthOfStayValues);

                        var centralDateRequestLengthOfStay = searchCriteria.getLengthOfStay();
                        var MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS = 10;
                        if (lengthOfStays.length > MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS) {
                            lengthOfStays = filterOutMostDistantLoS(lengthOfStays, centralDateRequestLengthOfStay, MAX_LEAD_PRICE_CALENDAR_ACCEPTED_LENGTHOFSTAY_SPECIFICATIONS);
                        }
                        // Note that such combining of departure dates with all length of stays is the superset of what search criteria specified
                        // (we are producing more combinations), but the interface to Lead Price Calendar does not allow specifying length of stays per departure date
                        var requestOptions = {
                            origin: searchCriteria.getFirstLeg().origin
                            , destination: searchCriteria.getFirstLeg().destination
                            , departuredate: departureDates.map(function (date) {
                                return date.format('YYYY-MM-DD');
                            }).join(',')
                            , lengthofstay: lengthOfStays.join(',')
                        };
                        if (pointOfSaleCountry.length > 0) {
                            _.extend(requestOptions, {
                                pointofsalecountry: pointOfSaleCountry
                            });
                        }
                        return requestOptions;
                    }

                    function travelInsightsEngineAcceptedLengthOfStayValues(LoS) {
                        return (LoS <=16);
                    }

                    function filterOutMostDistantLoS(candidatesIncludingOriginal, original, maxCount) {

                        function distanceToOriginalLengthOfStay(candidate) {
                            return Math.abs(original - candidate);
                        }

                        var sorted = _.sortBy(candidatesIncludingOriginal, distanceToOriginalLengthOfStay);
                        return _.slice(sorted, 0, maxCount);
                    }

                    function sliceLeadFares(leadFares, range) { //TODO into data model object: LeadPrices
                        return leadFares.filter(function (leadFare) {
                            var date = moment(leadFare.departureDateTime, moment.ISO_8601);
                            return range.contains(date);
                        });
                    }

                    function getMinDateAndPricePair(leadFares, maxStops) {
                        var minLeadFare = _.min(leadFares, function (leadFare) {
                            return (maxStops === 0)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                        });
                        return { //todo into model
                              totalFareAmount: (maxStops === 0)? minLeadFare.lowestNonStopFare: minLeadFare.lowestFare
                            , currency: minLeadFare.currency
                            , date: moment(minLeadFare.departureDateTime, moment.ISO_8601)
                        };
                    }

                    function getMaxAvailableDate(leadFares) {
                        var maxAvailableDateString = leadFares.reduce(function (maxAvailableDate, leadFare) {
                            if (_.isUndefined(maxAvailableDate) || (leadFare.departureDateTime > maxAvailableDate)) {
                                return leadFare.departureDateTime;
                            }
                        });
                        return moment(maxAvailableDateString, moment.ISO_8601);
                    }

                    function buildLeadPrices(leadFaresForRange, maxStops) {
                        return leadFaresForRange.reduce(function (acc, leadFare) {
                            var dateKey = moment(leadFare.departureDateTime, moment.ISO_8601).format(ShoppingData.prototype.DATE_FORMAT_FOR_KEYS);
                            var leadPrice = (maxStops === 0)? leadFare.lowestNonStopFare: leadFare.lowestFare;
                            acc[dateKey] = {
                                  price: leadPrice
                                , currency: leadFare.currency
                            };
                            return acc;
                        }, {});
                    }

                    return {
                        getLeadPricesForRange: function (searchCriteria, range) {
                            return $q(function(resolve, reject) {
                                var dataFromCache = leadFaresCache.get(searchCriteria);
                                if (dataFromCache) {
                                    var leadFaresForRange = sliceLeadFares(dataFromCache, range);
                                    var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.maxStops);
                                    return resolve(leadPrices);
                                }
                                var webServiceRequestOptions = translateSearchCriteriaIntoRequestOptions(searchCriteria);
                                LeadPriceCalendarWebService.get(webServiceRequestOptions).$promise.then(
                                    function(response) {
                                        var leadFares = parser.parse(response); //TODO variables naming
                                        leadFaresCache.put(searchCriteria, leadFares);
                                        var leadFaresForRange = sliceLeadFares(leadFares, range);
                                        var leadPrices = buildLeadPrices(leadFaresForRange, searchCriteria.maxStops);
                                        return resolve(leadPrices);
                                    },
                                    function(error) {
                                        //TODO? put result of 404 in cache also?
                                        return reject(StandardErrorHandler.handleError(error));
                                    }
                                );
                            });
                        },
                        getAlternateDatesPriceMatrix: function(searchCriteria) {
                            if (!searchCriteria.isAlternateDatesRequest()) {
                                throw new Error('Calling Alternative Dates service for non alternative dates request');
                            }
                            var webServiceRequestOptions = translateSearchCriteriaIntoAlternateDatesRequestOptions(searchCriteria);
                            return $q(function(resolve, reject) {
                                LeadPriceCalendarWebService.get(webServiceRequestOptions).$promise.then(
                                    function (response) {
                                        var alternateDatesPriceMatrix = parser.extractAlternateDatesPriceMatrix(response);
                                        resolve(alternateDatesPriceMatrix);
                                    },
                                    function (reason) {
                                        var businessErrorMessages = parser.getBusinessErrorMessages(reason.data.message);
                                        reject(businessErrorMessages);
                                    }
                                );
                            });
                        },
                        validateSearchCriteria: function (searchCriteria) {
                            return validator.validate(searchCriteria);
                        },
                        getMinDateAndPricePair: function (searchCriteria) { //todo for now assume it is called after getLeadPricesForRange
                            var dataFromCache = leadFaresCache.get(searchCriteria);
                            if (_.isUndefined(dataFromCache)) {
                                throw new Error('trying to get aggregate from lead prices data while first call not done yet'); //TODO handle
                            }
                            return getMinDateAndPricePair(dataFromCache, searchCriteria.maxStops);
                        },
                        getMaxAvailableDate: function (searchCriteria) {
                            var dataFromCache = leadFaresCache.get(searchCriteria);
                            if (_.isUndefined(dataFromCache)) {
                                throw new Error('trying to get aggregate from lead prices data while first call not done yet'); //TODO handle
                            }
                            return getMaxAvailableDate(dataFromCache);
                        }

                    };
                }
            ])

    });
