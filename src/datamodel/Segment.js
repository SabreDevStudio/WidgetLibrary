define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        function Segment(segmentDescriptorObj) {
            this.departureAirport = segmentDescriptorObj.departureAirport;
            this.departureDateTime = segmentDescriptorObj.departureDateTime;
            this.arrivalAirport = segmentDescriptorObj.arrivalAirport;
            this.arrivalDateTime = segmentDescriptorObj.arrivalDateTime;
            this.elapsedTime = segmentDescriptorObj.elapsedTime;
            this.equipment = segmentDescriptorObj.equipment;
            this.marketingFlightNumber = segmentDescriptorObj.marketingFlightNumber;
            this.marketingAirline = segmentDescriptorObj.marketingAirline;
            this.operatingFlightNumber = segmentDescriptorObj.operatingFlightNumber;
            this.operatingAirline = segmentDescriptorObj.operatingAirline;
        }


        Segment.prototype.getFlightStructure = function () {
            return [this.departureDateTime.format(), this.departureAirport, this.arrivalDateTime, this.arrivalAirport, this.cabin, this.marketingAirline, this.marketingFlightNumber, this.operatingAirline, this.operatingFlightNumber].join('|')
        };

        Segment.prototype.flightTimeCrossesMidnight = function () {
            var firstMidnight = this.departureDateTime.clone().endOf('day');
            return this.arrivalDateTime.isAfter(firstMidnight); //TODO WARN timezone changes!! flight times in local time
        };

        return Segment;
    });
