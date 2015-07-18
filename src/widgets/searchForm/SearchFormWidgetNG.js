define([
          'moment'
        , 'util/LodashExtensions'
        , 'angular'
        , 'angular_bootstrap'
        , 'widgets/SDSWidgets'
        , 'datamodel/SearchCriteria'
        , 'text!view-templates/SearchFormWidget.tpl.html'
        , 'util/AirportNameLookup'
        , 'AirportNameBestSuggestionComparator'
    ],
    function (
          moment
        ,  _
        , angular
        , angular_bootstrap
        , SDSWidgets
        , SearchCriteria
        , SearchFormWidgetTemplate
        , AirportNameLookup
        , AirportNameBestSuggestionComparator
    ) {
        'use strict';

        return angular.module('sdsWidgets')
            .constant('newSearchCriteriaEvent', 'newSearchCriteria')
            .filter('airportNameWithIATACode', function () {
                return function (airportAndIATACode) {
                    if (_.isDefined(airportAndIATACode)) {
                        return airportAndIATACode.fullName + ' (' + airportAndIATACode.airportCode + ')';
                    }
                };
            })
            .filter('airportNameBestSuggestionComparator', function () {
                return function (allMatches, userCurrentInput) {
                    return allMatches.sort(new AirportNameBestSuggestionComparator(userCurrentInput)).reverse();
                };
            })
            .service('SearchCriteriaBroadcastingService', [
                '$rootScope'
                , 'newSearchCriteriaEvent'
                , function ($rootScope, newSearchCriteriaEvent) {
                    var service = {};
                    service.searchCriteria = undefined;
                    service.broadcast = function () {
                        $rootScope.$broadcast(newSearchCriteriaEvent);
                    };
                    return service;
            }])
            .controller('SearchFormCtrl' , [
                  '$scope'
                , 'DateService'
                , 'WidgetIdGeneratorService'
                , 'SearchCriteriaBroadcastingService'
            , function (
                  $scope
                , $DateService
                , widgetIdGenerator
                , SearchCriteriaBroadcastingService) {

                var DEFAULT_ADVANCE_PURCHASE_DAYS = 14;
                var DEFAULT_LENGTH_OF_STAY = 14;

                $scope.datepickerOptions = {
                      format: 'dd-MMM-yyyy'
                    , earliestTravelStart: $DateService.now().startOf('day').toDate()
                };

                $scope.widgetId = widgetIdGenerator.next();

                $scope.tripType = 'returnTrip';

                function setReturnDateToDefaultLengthOfStay() {
                    $scope.ReturnDate = moment($scope.DepartureDate).add(DEFAULT_LENGTH_OF_STAY, 'days').toDate();
                }

                var returnDateWasEverChanged = false;

                $scope.onDepartureDateChange = function () {
                    if (!returnDateWasEverChanged) {
                        setReturnDateToDefaultLengthOfStay();
                    }
                };

                $scope.onReturnDateChange = function () {
                    returnDateWasEverChanged = true;
                };

                $scope.DepartureDate = $DateService.now().startOf('day').add(DEFAULT_ADVANCE_PURCHASE_DAYS, 'days').toDate();
                setReturnDateToDefaultLengthOfStay();

                $scope.openDepartureDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isDepartureDatePickerOpened = true;
                };

                $scope.openReturnDatePicker = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isReturnDatePickerOpened = true;
                };

                /**
                 * loads all mappings of airport code into full name, into array of objects expected by jQuery Autocomplete widget: [ {label: 'Krakow (KRK)', code: 'KRK'}, {label: 'Amsterdam Schiphol (AMS)', code: 'AMS'}, .... ]
                 * We want the label to be displayed to user, while aiport code must be passed as field value.
                 */
                var loadLabelsForAutocomplete = function () {
                    var airportNameLookup = (window.SDS)? window.SDS.airportNameLookup() : new AirportNameLookup();
                    var output = [];
                    _.each(airportNameLookup.getAllMappings(), function (airportFullName, airportCode) {
                        output.push({fullName: airportFullName, airportCode: airportCode});
                    });
                    return output;
                };

                $scope.airports = loadLabelsForAutocomplete();

                $scope.onNewSearchCriteria = function () {
                    var searchCriteria = new SearchCriteria();
                    searchCriteria.origin = $scope.Origin.airportCode;
                    searchCriteria.destination = $scope.Destination.airportCode;
                    searchCriteria.departureDate = $scope.DepartureDate;
                    searchCriteria.returnDate = $scope.ReturnDate;
                    searchCriteria.directFlightsOnly = $scope.directFlightsOnly;

                    SearchCriteriaBroadcastingService.searchCriteria = searchCriteria;
                    SearchCriteriaBroadcastingService.broadcast();
                };
            }])
            .directive('searchForm', function () {
               return {
                   restrict: 'A',
                   template: SearchFormWidgetTemplate,
                   controller: 'SearchFormCtrl'
               };
            });
    });
