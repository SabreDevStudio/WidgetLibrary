/// <reference path="../../../../typings/tsd.d.ts" />
define([
    'angular',
    'lodash',
    'webservices/SabreDevStudioWebServicesModule',
    'webservices/inspirational/DestinationFinderSummaryServiceGeoCoordsDecorator',
    'util/TiersPriceClassifier'
    ],
    function (
    angular,
    _,
    SabreDevStudioWebServicesModule,
    DestinationFinderSummaryServiceGeoCoordsDecorator,
    TiersPriceClassifier
    ) {
        'use strict';

    return angular.module('sabreDevStudioWebServices')
        .constant('priceTiers', 3)
        .factory('DestinationFinderSummaryServicePriceClassifierDecorator', [
            '$q',
            'DestinationFinderSummaryServiceGeoCoordsDecorator',
            'priceTiers'
            , function (
              $q,
              DestinationFinderSummaryDataService,
              priceTiers
            ) {
                const classifier = new TiersPriceClassifier();

                function getOffersOrderedSummary(searchCriteria) {
                    return $q(function(resolve, reject) {
                        DestinationFinderSummaryDataService.getOffersOrderedSummary(searchCriteria)
                            .then(function(pricesForDestinations) {
                                resolve({
                                    pricesForDestinationsGrouped: addPriceTiers(pricesForDestinations.pricesForDestinationsGrouped),
                                    originForPricesForDestinations: pricesForDestinations.originForPricesForDestinations
                            });
                            }, reject)
                    });
                }

                function addPriceTiers(objectsWithPricesArray) {
                    var pricesArray = objectsWithPricesArray.map((item) => item.lowestFare.amount);
                    classifier.train(pricesArray);
                    var inputWithPriceTiers = objectsWithPricesArray.map((item) => {
                        var priceTier = classifier.classifyIntoTier(item.lowestFare.amount, priceTiers);
                        return _.extend(item, {priceTier: priceTier});
                    });
                    return inputWithPriceTiers;
                }

                return {
                    getOffersOrderedSummary: getOffersOrderedSummary
                };
            }]);

    });