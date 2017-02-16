import angular = require('angular');

import TimeFormat = require('./timeFormat.drv');
import TimePickerPop = require('./timepickerPop.drv');

angular.module('sdsWidgets.timePickerPop', [])
    .factory('timepickerState', function() {
        var pickers : any[] = [];
        return {
            addPicker: function(picker) {
                pickers.push(picker);
            },
            closeAll: function() {
                for (var i=0; i<pickers.length; i++) {
                    pickers[i].close();
                }
            }
        };
    })
    .directive("timeFormat", ['$filter', TimeFormat])
    .directive('timepickerPop', ['$document', 'timepickerState', TimePickerPop])