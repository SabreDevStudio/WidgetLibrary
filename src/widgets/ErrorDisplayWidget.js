define([
          'moment'
        , 'angular'
        , 'lodash'
        , 'util/LodashExtensions'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'text!view-templates/widgets/ErrorDisplayWidget.tpl.html'
    ],
    function (
        moment
        , angular
        , _
        , __
        , angular_bootstrap
        , SDSWidgets
        , ErrorDisplayWidgetTemplate
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .directive('errorDisplay', [
                      'errorEvent'
                    , 'newSearchCriteriaEvent'
                    , 'newInspirationalSearchCriteriaEvent'
                , function (
                        errorEvent
                      , newSearchCriteriaEvent
                      , newInspirationalSearchCriteriaEvent
                ) {
                return {
                    replace: true,
                    template: ErrorDisplayWidgetTemplate,
                    link: function (scope) {

                        function resetErrorModel() {
                            scope.errors = [];
                            scope.lastSearchCriteriaAirports = {};
                        }

                        resetErrorModel();

                        scope.$on(errorEvent, function (event, errorsArray, searchCriteria) {
                            __.pushAll(scope.errors, errorsArray);
                            if (searchCriteria) {
                                scope.lastSearchCriteriaAirports.departureAirport = (_.isFunction(searchCriteria.getFirstLeg))? searchCriteria.getFirstLeg().origin: searchCriteria.origin;
                                scope.lastSearchCriteriaAirports.arrivalAirport = (_.isFunction(searchCriteria.getFirstLeg))? searchCriteria.getFirstLeg().destination: searchCriteria.destination;
                            }
                        });

                        scope.$on(newSearchCriteriaEvent, function () {
                            resetErrorModel();
                        });
                        scope.$on(newInspirationalSearchCriteriaEvent, function () {
                            resetErrorModel();
                        });

                        scope.anyErrorPresent = function () {
                            return scope.errors && scope.errors.length > 0;
                        };
                    }
                }
            }]);
    });
