define([
          'angular'
        , 'moment'
        , 'lodash'
        , 'datamodel/AlternateDatesRoundTripPriceMatrix'
    ],
    function (
          angular
        , moment
        , _
        , AlternateDatesRoundTripPriceMatrix
    ) {
        'use strict';

        function LeadPriceCalendarResponseParser (

        ) {

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
            }
        }

        return LeadPriceCalendarResponseParser;
    });
