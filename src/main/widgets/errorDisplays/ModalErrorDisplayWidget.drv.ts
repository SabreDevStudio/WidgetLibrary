define([],
    function (
    ) {
        'use strict';

        return function ModalErrorDisplayWidget (
                    errorEvent,
                    $uibModal
                ) {
                return {
                    link: function (scope, element, attrs) {
                        var deduplicateSameMessages = attrs.dedup;
                        var receivedMessagesRegistry = {};
                        scope.$on(errorEvent, function (event, errors, errorsCategory) {
                            if (deduplicateSameMessages) {
                                var receivedMessagesKey = JSON.stringify({
                                    errors: errors,
                                    errorsCategory: errorsCategory
                                }) ;
                                if (receivedMessagesRegistry[receivedMessagesKey]) {
                                    return;
                                }
                                receivedMessagesRegistry[receivedMessagesKey] = true;
                            }
                            $uibModal.open({
                                animation: true,
                                templateUrl: '../widgets/view-templates/partials/ErrorsModal.tpl.html',
                                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                    $scope.errorsList = errors;
                                    $scope.modalTitle = errorsCategory;

                                    $scope.ok = function () {
                                        $uibModalInstance.close();
                                    };
                                }]
                            });
                        });
                    }
                }
            };
});
