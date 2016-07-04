define([],
    function (
    ) {
        'use strict';

        ChangeOriginSelectDirective.$inject = ['TripOriginChangedBroadcastingService'];
        function ChangeOriginSelectDirective(
            TripOriginChangedBroadcastingService
        ) {
            return {
                scope: {
                    originPreset: '@?'
                },
                templateUrl: '../widgets/view-templates/widgets/ChangeOriginSelect.tpl.html',
                link: function (scope) {
                    if (scope.originPreset) {
                        scope.origin = {}; // initialize this main model object only here, and not outside of this if, because otherwise, if there is no originPreset, the input-airport directive will render undefined (undefined) in the input airport field (as object does not have airport code or airport full name yet
                        scope.origin.airportCode = scope.originPreset;
                    }

                    scope.newOriginSelected = function () {
                        TripOriginChangedBroadcastingService.origin = scope.origin.airportCode;
                        TripOriginChangedBroadcastingService.broadcast();
                    };
                }
            }
        }
        return ChangeOriginSelectDirective;
    });
