define([
        'lodash'
        , 'moment'
    ], function (
        _
        , moment
    ) {
    "use strict";

    function DiversityModelOptions() {

        this.lowFareBucketMode = this.LowFareBucketModeEnum.OPTION;
        this.lowFareBucket = undefined;
        this.fareCutOff = undefined;
        this.priceWeight = this.PRICE_WEIGHT_DEFAULT_VALUE;
        this.travelTimeWeight = undefined;

        this.carrier = {
            weight: undefined,
            onlineIndicator: false,
            default: {
                options: undefined
            },
            override: []
        };

        this.operatingDuplicate = {
            weight: undefined,
            preferredCarriers: {
                selected: []
            }
        };

        this.inboundOutboundPairing = {
            weight: undefined,
            duplicates: this.INBOUND_OUTBOUND_PAIRING_DUPLICATES_DEFAULT_VALUE
        };

        this.timeOfDay = {
            weight: undefined,
            distribution: []
        };

        this.numberOfStopsWeight = undefined;
    }

    DiversityModelOptions.prototype.PRICE_WEIGHT_DEFAULT_VALUE = 10;
    DiversityModelOptions.prototype.INBOUND_OUTBOUND_PAIRING_DUPLICATES_DEFAULT_VALUE = 1;

    DiversityModelOptions.prototype.addCarrierOverriding = function () {
        this.carrier.override.push({
            code: {},
            options: undefined
        });
    };

    DiversityModelOptions.prototype.removeCarrierOverriding = function () {
        this.carrier.override.pop();
    };

    DiversityModelOptions.prototype.addDistribution = function () {
        this.timeOfDay.distribution.push({
            direction: undefined,
            endpoint: undefined,
            range: [{
                begin: moment("6:00", "HH:mm").toDate(),
                end: moment("12:00", "HH:mm").toDate(),
                options: undefined
            }]
        });
    };

    DiversityModelOptions.prototype.removeDistribution = function () {
        this.timeOfDay.distribution.pop();
    };

    DiversityModelOptions.prototype.addRangeToDistribution = function (distributionIndex) {
        this.timeOfDay.distribution[distributionIndex].range.push({
            begin: moment("6:00", "HH:mm").toDate(),
            end: moment("12:00", "HH:mm").toDate(),
            option: undefined
        });
    };

    DiversityModelOptions.prototype.removeLastRangeFromDistribution = function (distributionIndex) {
        this.timeOfDay.distribution[distributionIndex].range.pop();
    };

    DiversityModelOptions.prototype.LowFareBucketModeEnum = Object.freeze({
        OPTION: 0,
        FARE_CUT_OFF: 1
    });

    DiversityModelOptions.prototype.AvailableDirectionsEnum = Object.freeze({

        INBOUND: {id: 1, description: 'Inbound'},
        OUTBOUND: {id: 2, description: 'Outbound'},
        values: function () {
            return [this.INBOUND, this.OUTBOUND];
        }
    });

    DiversityModelOptions.prototype.AvailableEndpointsEnum = Object.freeze({

        DEPARTURE: {id: 1, description: 'Departure'},
        ARRIVAL: {id: 2, description: 'Arrival'},
        values: function () {
            return [this.DEPARTURE, this.ARRIVAL];
        }
    });

    return DiversityModelOptions;
});