define([
        'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/common/WebServiceSerializationUtils'
        , 'x2js'
    ],
    function (
        angular
        , moment
        , _
        , SabreDevStudioWebServicesModule
        , WebServiceSerializationUtils
        , X2JS
    ) {
        'use strict';

        var x2js = new X2JS();

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionRequestBuilder', ['fareNabberRegistrationPCC', function (fareNabberRegistrationPCC) {
                const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
                const dateFormat = 'YYYY-MM-DD';

                function isTimeOfDatePreferenceDefined(timeOfDayRange) {
                    return ((timeOfDayRange.start.hours() !== 0) || (timeOfDayRange.start.minutes() !== 0)) ||
                        ((timeOfDayRange.end.hours() !== 0) || (timeOfDayRange.end.minutes() !== 0))
                }

                function createTimeWindowString(timeOfDayRange) {
                    return timeOfDayRange.start.format('HHmm') + timeOfDayRange.end.subtract(1, 'minutes').format('HHmm');
                }

                function isAnyDayOfWeekDefined(daysOfWeek) {
                    return daysOfWeek && daysOfWeek.some(_.identity);
                }

                function buildRequestSkeleton(formSubscriptionData) {
                    var fareNabberRequest: any = {
                        FNB_Subscription: {
                            _expiryDate: moment(formSubscriptionData.subscriptionExpiryDate).format(dateTimeFormat)
                            , _maxPrice: formSubscriptionData.maximumAcceptablePrice
                            , _priceCurrency: formSubscriptionData.maximumAcceptablePriceCurrency
                            , _pcc: fareNabberRegistrationPCC
                            , PreferredAirlines: {
                                preferredAirline: formSubscriptionData.preferredAirlines.selected
                            } //WARN: service XSD schema requires to provide FNB_Subscription child elements in order (sequence). They are defined 'in order' in this object, but iteration order over javascript object properties is not guaranteed - and x2js library does exactly (for prop in obj)...
                            , SubscriptionPassenger: {
                                _passengerType: formSubscriptionData.passengerType
                                , _numberOfPassengers: formSubscriptionData.passengerCount
                            }
                            , SubscriptionLeg: undefined
                        }
                    };
                    if(formSubscriptionData.directFlightsOnly) {
                        fareNabberRequest.FNB_Subscription._nonstop = formSubscriptionData.directFlightsOnly;
                    }
                    return fareNabberRequest;
                }

                function addLegs(fareNabberRequest, formSubscriptionData) {
                    fareNabberRequest.FNB_Subscription.SubscriptionLeg = [
                        {
                            _origin: formSubscriptionData.origin
                            , _destination: formSubscriptionData.destination
                            , _departureDateTimeFrom: moment(formSubscriptionData.departureDate).format(dateFormat)
                        },
                        {
                            _origin: formSubscriptionData.destination
                            , _destination: formSubscriptionData.origin
                            , _departureDateTimeFrom: moment(formSubscriptionData.returnDate).format(dateFormat)
                        }
                    ]

                }

                function addTravelTimeWindowPreferences(fareNabberRequest, formSubscriptionData) {
                    var outboundLeg = fareNabberRequest.FNB_Subscription.SubscriptionLeg[0];
                    var inboundLeg = fareNabberRequest.FNB_Subscription.SubscriptionLeg[1];

                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.outboundTravelTimeRange.departure)) {
                        outboundLeg._departureTimeWindow = createTimeWindowString(formSubscriptionData.outboundTravelTimeRange.departure);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.outboundTravelTimeRange.arrival)) {
                        outboundLeg._arrivalTimeWindow = createTimeWindowString(formSubscriptionData.outboundTravelTimeRange.arrival);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.inboundTravelTimeRange.departure)) {
                        inboundLeg._departureTimeWindow = createTimeWindowString(formSubscriptionData.inboundTravelTimeRange.departure);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.inboundTravelTimeRange.arrival)) {
                        inboundLeg._arrivalTimeWindow = createTimeWindowString(formSubscriptionData.inboundTravelTimeRange.arrival);
                    }
                }

                function addDayOfTravelPreferences(fareNabberRequest, formSubscriptionData) {
                    var outboundLeg = fareNabberRequest.FNB_Subscription.SubscriptionLeg[0];
                    var inboundLeg = fareNabberRequest.FNB_Subscription.SubscriptionLeg[1];

                    if(isAnyDayOfWeekDefined(formSubscriptionData.daysOfTravelPreference.outbound)) {
                        outboundLeg._days = WebServiceSerializationUtils.createWeekDaysString(formSubscriptionData.daysOfTravelPreference.outbound);
                    }
                    if(isAnyDayOfWeekDefined(formSubscriptionData.daysOfTravelPreference.inbound)) {
                        inboundLeg._days = WebServiceSerializationUtils.createWeekDaysString(formSubscriptionData.daysOfTravelPreference.inbound);
                    }
                }

                return {
                    build: function (formSubscriptionData) {
                        var fareNabberRequest: any = buildRequestSkeleton(formSubscriptionData);

                        addLegs(fareNabberRequest, formSubscriptionData);
                        addTravelTimeWindowPreferences(fareNabberRequest, formSubscriptionData);
                        addDayOfTravelPreferences(fareNabberRequest, formSubscriptionData);

                        var xmlRequest = x2js.json2xml(fareNabberRequest);
                        console.log(xmlRequest);
                        return xmlRequest;
                    }
                };
            }])
    });