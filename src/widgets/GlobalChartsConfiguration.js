define([
          'widgets/SDSWidgets'
        , 'chartjs'
    ],
    function (
          SDSWidgets
        , Chart
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('globalChartStyleConfiguration', {
                // storing style information in JS code, as it needs to be passed to charting library Chart.js initialization.
                // Chart.js does not handle external css.
                // This color is the Bootstrap color for primary buttons, text, labels
                  fillColor: "#337ab7"
            })
            .factory('ChartsFactory', function () {

                var globalBarChartConfiguration = {
                      scaleShowVerticalLines: false
                    , barValueSpacing: 2 //the default for this value is 5. It is set to 2 to make bars wider. WARN: if you, on the other hand set it to values greater than 5 (like 10), then the getBarsAtEvent will not work correctly ( will not be able to map bar to event click coordinates).
                };

                function createBarChart(element, chartData) {
                    var canvas = angular.element(element).find('canvas'); //WARN: template must have canvas element already.
                    var ctx = canvas.get(0).getContext("2d");

                    adjustCanvasCSSStyleToMatchParent(canvas);

                    return new Chart(ctx).Bar(chartData, globalBarChartConfiguration);
                }

                /** Need to dynamically adjust width of canvas to match the parent element width.
                 * Left padding is also added for better look.
                 * @param canvas
                 */
                function adjustCanvasCSSStyleToMatchParent(canvas) {
                    // Chart.js charts are drawn on canvas and we need to set width of this canvas dynamically based on the parent element width.
                    // For this calculation we need to include padding (because of the border-box sizing model)
                    var leftPadding = 10;

                    var parentWidth = parseInt(canvas.parent().width());
                    canvas.css('max-width', (parentWidth - leftPadding) + 'px'); //setting max-width, as width is them overwritten
                    canvas.css('padding-left', leftPadding + 'px');
                }

                return {
                    createBarChart: createBarChart
                };
            })
            .constant('xAxisDateFormat', 'D MMM') // for example: 17 Aug)
            .factory('customToStringFunction', ['xAxisDateFormat', function(xAxisDateFormat) {
                // returns copy of original date, with the toString method overwritten.
                // custom toString is needed to the Chart.js library to display label in the format we wish.
                // Otherwise the default toString method would be used, which prints too much information (whole date time).
                // Other solution would be to pass as label the already formatted date string, but then, in the click event handler,
                // we would get just string from the helper getBarsAtEvent method (and would need to parse this back string into date object).
                return {
                    toString: function (date) {
                        var copy = date.clone();
                        copy.toString = function () {
                            return this.format(xAxisDateFormat);
                        };
                        return copy;
                    }
                };
            }]);
    });
