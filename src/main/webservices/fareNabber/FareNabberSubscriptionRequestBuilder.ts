define([
        'angular'
        , 'moment'
        , 'lodash'
        , 'webservices/SabreDevStudioWebServicesModule'
        , 'webservices/common/WebServiceSerializationUtils'
    ],
    function (
        angular
        , moment
        , _
        , SabreDevStudioWebServicesModule
        , WebServiceSerializationUtils
    ) {
        'use strict';

        return angular.module('sabreDevStudioWebServices')
            .factory('FareNabberSubscriptionRequestBuilder', ['fareNabberRegistrationPCC', function (fareNabberRegistrationPCC) {
                const dateFormat = 'YYYY-MM-DD';
                const timeFormat = 'HHmm';

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
                        expiryDate: moment(formSubscriptionData.subscriptionExpiryDate).format(dateFormat)
                        , maxPrice: parseFloat(formSubscriptionData.maximumAcceptablePrice)
                        , priceCurrency: formSubscriptionData.maximumAcceptablePriceCurrency
                        , pcc: fareNabberRegistrationPCC
                        , PreferredAirlines: createPreferredAirlines(formSubscriptionData)
                        , SubscriptionPassengers: [
                            {
                                passengerType: formSubscriptionData.passengerType
                                , numberOfPassengers: parseInt(formSubscriptionData.passengerCount)
                            }
                        ]
                        , SubscriptionLegs: []
                    };
                    if(formSubscriptionData.directFlightsOnly) {
                        fareNabberRequest.nonstop = formSubscriptionData.directFlightsOnly;
                    }
                    return fareNabberRequest;
                }

                function createPreferredAirlines(formSubscriptionData) {
                    return formSubscriptionData.preferredAirlines.selected;
                }

                function addLegs(fareNabberRequest, formSubscriptionData) {

                    var outboundLeg:any = {};
                    outboundLeg.origin = formSubscriptionData.origin;
                    outboundLeg.destination = formSubscriptionData.destination;
                    if(formSubscriptionData.flexibleDepartureDate === false){
                        outboundLeg.departureDateFrom = moment(formSubscriptionData.departureDate).format(dateFormat);
                    } else {
                        outboundLeg.departureDateFrom = moment(formSubscriptionData.departureDateFrom).format(dateFormat);
                        outboundLeg.departureDateTo = moment(formSubscriptionData.departureDateTo).format(dateFormat);
                    }
                    outboundLeg.departureTimeFrom = moment(formSubscriptionData.departureDate).format(timeFormat)
                    fareNabberRequest.SubscriptionLegs[0] = outboundLeg;

                    var inboundLeg:any = {};
                    inboundLeg.origin = formSubscriptionData.destination;
                    inboundLeg.destination = formSubscriptionData.origin;
                    if(formSubscriptionData.flexibleReturnDate === false){
                        inboundLeg.departureDateFrom = moment(formSubscriptionData.returnDate).format(dateFormat);
                    } else {
                        inboundLeg.departureDateFrom = moment(formSubscriptionData.returnDateFrom).format(dateFormat);
                        inboundLeg.departureDateTo = moment(formSubscriptionData.returnDateTo).format(dateFormat);
                    }
                    inboundLeg.departureTimeFrom = moment(formSubscriptionData.departureDate).format(timeFormat)
                    fareNabberRequest.SubscriptionLegs[1] = inboundLeg;

                }

                function addTravelTimeWindowPreferences(fareNabberRequest, formSubscriptionData) {
                    var outboundLeg = fareNabberRequest.SubscriptionLegs[0];
                    var inboundLeg = fareNabberRequest.SubscriptionLegs[1];

                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.outboundTravelTimeRange.departure)) {
                        outboundLeg.departureTimeWindow = createTimeWindowString(formSubscriptionData.outboundTravelTimeRange.departure);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.outboundTravelTimeRange.arrival)) {
                        outboundLeg.arrivalTimeWindow = createTimeWindowString(formSubscriptionData.outboundTravelTimeRange.arrival);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.inboundTravelTimeRange.departure)) {
                        inboundLeg.departureTimeWindow = createTimeWindowString(formSubscriptionData.inboundTravelTimeRange.departure);
                    }
                    if (isTimeOfDatePreferenceDefined(formSubscriptionData.inboundTravelTimeRange.arrival)) {
                        inboundLeg.arrivalTimeWindow = createTimeWindowString(formSubscriptionData.inboundTravelTimeRange.arrival);
                    }
                }

                function addDayOfTravelPreferences(fareNabberRequest, formSubscriptionData) {
                    var outboundLeg = fareNabberRequest.SubscriptionLegs[0];
                    var inboundLeg = fareNabberRequest.SubscriptionLegs[1];

                    if(isAnyDayOfWeekDefined(formSubscriptionData.daysOfTravelPreference.outbound)) {
                        outboundLeg.days = WebServiceSerializationUtils.createWeekDaysString(formSubscriptionData.daysOfTravelPreference.outbound);
                    }
                    if(isAnyDayOfWeekDefined(formSubscriptionData.daysOfTravelPreference.inbound)) {
                        inboundLeg.days = WebServiceSerializationUtils.createWeekDaysString(formSubscriptionData.daysOfTravelPreference.inbound);
                    }
                }

                return {
                    build: function (formSubscriptionData) {
                        var fareNabberRequest: any = buildRequestSkeleton(formSubscriptionData);

                        addLegs(fareNabberRequest, formSubscriptionData);
                        addTravelTimeWindowPreferences(fareNabberRequest, formSubscriptionData);
                        addDayOfTravelPreferences(fareNabberRequest, formSubscriptionData);

                        return fareNabberRequest;
                    }
                };
            }])
    });