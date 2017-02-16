import angular = require('angular');

function TimePickerPop ($document, timepickerState) {

    return {
        restrict : 'E',
        transclude : false,
        scope : {
            inputTime : "=",
            showMeridian : "=",
            minuteStep: "=",
            disabled : "="
        },
        controller : ['$scope', '$element', function($scope, $element) {
            $scope.isOpen = false;

            $scope.disabledInt = angular.isUndefined($scope.disabled)? false : $scope.disabled;

            $scope.toggle = function() {
                if ($scope.isOpen) {
                    $scope.close();
                } else {
                    $scope.open();
                }
            };
        }],
        link : function(scope, element, attrs) {
            var picker = {
                open : function () {
                    timepickerState.closeAll();
                    scope.isOpen = true;
                },
                close: function () {
                    scope.isOpen = false;
                }

            }
            timepickerState.addPicker(picker);

            scope.open = picker.open;
            scope.close = picker.close;

            scope.$watch("disabled", function(value) {
                scope.disabledInt = angular.isUndefined(scope.disabled)? false : scope.disabled;
            });

            scope.$watch("inputTime", function(value) {
                if (!scope.inputTime) {
                    element.addClass('has-error');
                } else {
                    element.removeClass('has-error');
                }

            });

            element.bind('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $document.bind('click', function(event) {
                scope.$apply(function() {
                    scope.isOpen = false;
                });
            });

        },
        templateUrl : '../src/main/widgets/searchForm/timePickerPopup/timePickerPop.tpl.html'
    };
}

export = TimePickerPop;
