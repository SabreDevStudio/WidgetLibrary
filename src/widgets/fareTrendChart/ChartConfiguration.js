define([
          'angular'
        , 'widgets/SDSWidgets'
    ],
    function (
          ng
        , SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('chartConfigurationOptions', { //TODO: when each widget is NG module make it configuration, not constant
                type: 'historicalBarChart',
                height: 160,
                margin: {
                    top: 15,
                    right: 30,
                    bottom: 60,
                    left: 40
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    },
                    rotateLabels: 50,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabelDistance: 35,
                    tickFormat: function (d) {
                        return d3.format(',f')(d);
                    }
                },
                tooltipContent: function(seriesKey, date, price) {
                    var departureDate = d3.time.format('%a %d %b')(new Date(date)); //Fri, 31 Jul
                    return departureDate + ', from ' + price;
                }
            });
    });
