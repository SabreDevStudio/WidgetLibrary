define([
        'angular'
        , 'widgets/searchForm/timePickerPopup/timeFormat.drv'
        , 'widgets/searchForm/timePickerPopup/timepickerPop.drv'
        , 'widgets/searchForm/SearchForm.drv'
        , 'widgets/searchForm/SearchForm.ctrl'
    ],
    function (
        angular
        , TimeFormat
        , TimePickerPop
        , SearchFormDrv
        , SearchFormCtrl
    ) {
        'use strict';

        angular.module('sdsWidgets.searchForm', [])

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

            .constant('newSearchCriteriaEvent', 'newSearchCriteria')

            .controller('SearchFormCtrl' , [
                '$scope'
                , 'WidgetIdGeneratorService'
                , 'SearchCriteriaBroadcastingService'
                , SearchFormCtrl
            ])

            .directive('searchForm', [
                'DateService'
                , '$timeout'
                , SearchFormDrv
            ]);
    }
)


