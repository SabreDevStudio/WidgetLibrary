define([
          'lodash'
        , 'chartjs'
    ],
    function (
          _
        , chartjs
    ) {

        var globalChartConfiguration = {
            responsive: true
        };

        var chartjsNoConflict = chartjs.noConflict();

        _.extend(chartjsNoConflict.defaults.global, globalChartConfiguration);

        return chartjsNoConflict;
    }
);
