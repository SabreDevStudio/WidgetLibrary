define([
          'widgets/SDSWidgets'
    ],
    function (
          SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('globalBarChartConfiguration', {
                  scaleShowVerticalLines: false
                , barValueSpacing: 2 //the default for this value is 5. It is set to 2 to make bars wider. WARN: if you, on the other hand set it to values greater than 5 (like 10), then the getBarsAtEvent will not work correctly ( will not be able to map bar to event click coordinates).
            })
            .constant('globalChartStyleConfiguration', {
                // storing style information in JS code, as it needs to be passed to charting library Chart.js initialization.
                // Chart.js does not handle external css.
                // This color is the Bootstrap color for primary buttons, text, labels
                  fillColor: "#337ab7"

                // Chart.js charts are drawn on canvas and we need to set width of this canvas dynamically based on the parent element width.
                // For this calculation we need to include padding (because of the border-box sizing model)
                , leftPadding: 10
            })
            ;
    });
