define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
    ],
    function (
        moment
        , angular
        , _
        , angular_bootstrap
        , SDSWidgets
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('validationErrorDisplay', [
                    'validationErrorEvent',
                    '$modal'
                , function (
                    validationErrorEvent,
                    $modal
                ) {
                return {
                    link: function (scope) {
                        scope.$on(validationErrorEvent, function (event, errors, errorsCategory) {
                            $modal.open({
                                animation: true,
                                templateUrl: '../widgets/view-templates/partials/ErrorsModal.tpl.html',
                                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                                    $scope.errorsList = errors;
                                    $scope.modalTitle = errorsCategory;

                                    $scope.ok = function () {
                                        $modalInstance.close();
                                    };
                                }]
                            });
                        });
                    }
                }
            }]);
    });
