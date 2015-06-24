define(['WidgetBase', 'lodash', 'jquery', 'jquery-ui', 'stache!view-templates/SearchFormWidget.html', 'util/AirportNameLookup', 'datamodel/SearchCriteria', 'util/feature_detection', 'AirportNameBestSuggestionComparator'],
    function (WidgetBase, _, $, jqueryUIDummy, viewTemplate, AirportNameLookup, SearchCriteria, feature_detection, AirportNameBestSuggestionComparator) {
        'use strict';

        function SearchFormWidget() {

            WidgetBase.apply(this, arguments);

            var that = this;

            this.AIRPORT_CODE_DATA_ATTR_KEY = 'airport';

            this.getModel = function () {
                return {
                    uuid: this.uuid
                };
            };

            function displayTripTypesAsButtonset(dom) {
                $(that.dom).find('.SDSTripTypeTabGroup').buttonset();
                $(that.dom).find('.SDSTripTypeTabGroup').buttonset("refresh"); // it cannot be done in one call as jQuery complains: cannot call methods on buttonset prior to initialization; attempted to call method 'refresh'
            }

            function makeFirstTabPreselected() {
                $(that.dom).find('.SDSTripTypeTab:first').attr('checked', true);
            }

            function addDatePickers(dom) {
                var datePickerOptions = _.assign({}, SearchFormWidget.prototype.datePickerGlobalOptions, that.options);
                $(that.dom).find('.SDSHasDatePicker').datepicker(datePickerOptions);
            }

            function setDefaultTripDates(dom) {
                $(that.dom).find('.SDSDatePickerDepartureDate').datepicker("setDate", SearchFormWidget.prototype.DEFAULT_ADVANCE_PURCHASE_DAYS);
                $(that.dom).find('.SDSDatePickerReturnDate').datepicker("setDate", SearchFormWidget.prototype.DEFAULT_ADVANCE_PURCHASE_DAYS + SearchFormWidget.prototype.DEFAULT_LENGTH_OF_STAY);
            }

            function resetSelectedAndMaxDates(datepicker, dateCurrentlySelected) {
                datepicker.datepicker('option', 'minDate', dateCurrentlySelected);

                var newDate = $.datepicker.parseDate(SearchFormWidget.prototype.DATE_FORMAT_DISPLAYED, dateCurrentlySelected);
                newDate.setDate(newDate.getDate() + SearchFormWidget.prototype.DEFAULT_LENGTH_OF_STAY);
                datepicker.datepicker('setDate', newDate);
            }

            function resetAndOpenReturnDatePickerWhenDepartureDateSelected() {
                var DEFAULT_JQUERY_ANIMATE_INTERVAL = 16;
                //$(that.dom).find('.SDSDatePickerDepartureDate').datepicker('option', 'onSelect', function (dateCurrentlySelected) {
                $(that.dom).find('.SDSDatePickerDepartureDate').datepicker('option', 'onSelect', function (dateCurrentlySelected) {
                        var matchingReturnDateDatePicker = $(this).parentsUntil('.SDSSearchFormWidget').find('.SDSDatePickerReturnDate');
                        resetSelectedAndMaxDates(matchingReturnDateDatePicker, dateCurrentlySelected);
                        // we have to use very small delay here to make sure that 'show' command occurs after previous command (setting dates), otherwise this command conflicts with the previous one.
                        // see http://stackoverflow.com/questions/11653528/jquery-datepicker-activate-another-datepicker-on-select
                        setTimeout(function() {
                            $(matchingReturnDateDatePicker).datepicker('show');
                        },  DEFAULT_JQUERY_ANIMATE_INTERVAL);
                    }
                );
            }

            function addAutocompleteForOriginAndDestination(dom) {
                var onSelectOrFocusFn = function (event, ui) {
                    event.preventDefault();
                    $(this).val(ui.item.label);
                    $(this).data(that.AIRPORT_CODE_DATA_ATTR_KEY, ui.item.value);
                };

                var autocompleteOptions = {
                    delay: 50,
                    minLength: 2,
                    source: SearchFormWidget.prototype.autocompleteMatchingFn,
                    select: onSelectOrFocusFn,
                    focus: onSelectOrFocusFn
                };
                $(that.dom).find('.SDSAirportInput').autocomplete(autocompleteOptions);
            }

            function showAdvancedSearchParametersOnLinkClick(dom) {
                var showAdvancedSearchOptionsLink = $(that.dom).find('.SDSShowDetailsLink');
                $(showAdvancedSearchOptionsLink).click(function (event) {
                    event.preventDefault();
                    $(this).nextAll('.SDSAdvancedSearchCriteriaItems').toggle(100);
                });
            }

            function showReturnDatePickerBasedOnTripType(dom) {
                $(that.dom).find('.SDSTripTypeTab').change(function() {
                    switch (this.value) {
                        case 'RoundTrip':
                            $(this).closest('.SDSWidget').find('.SDSDatePickerReturnDate').show();
                            break;
                        case 'OneWay':
                            $(this).closest('.SDSWidget').find('.SDSDatePickerReturnDate').hide();
                            break;
                    }
                });
            }

            function getAirportFromNode(domRoot, nodeSelector) {
                var airportNode = domRoot.find(nodeSelector);
                return airportNode.data(that.AIRPORT_CODE_DATA_ATTR_KEY) || airportNode.val();
            }

            function getFormSearchCriteria(domRoot) {
                var searchCriteria = new SearchCriteria();

                searchCriteria.tripType = domRoot.find('.SDSTripTypeTab:checked').val();

                searchCriteria.origin = getAirportFromNode(domRoot, '#SDSSearchForm_Origin');
                searchCriteria.destination = getAirportFromNode(domRoot, '#SDSSearchForm_Destination');

                var departureDateString = domRoot.find('#SDSSearchForm_DepartureDate').val();
                searchCriteria.departureDate = $.datepicker.parseDate(SearchFormWidget.prototype.DATE_FORMAT_DISPLAYED, departureDateString);

                var returnDateString = domRoot.find('#SDSSearchForm_ReturnDate').val();
                searchCriteria.returnDate = $.datepicker.parseDate(SearchFormWidget.prototype.DATE_FORMAT_DISPLAYED, returnDateString);

                searchCriteria.ADTPaxNumber = Number(domRoot.find('#SDSSearchForm_ADTPaxNumber').val());

                searchCriteria.isPlusMinus3DaysFlexible = domRoot.find('#SDSSearchForm_IsPlusMinus3DaysFlexible').is(':checked');
                searchCriteria.directFlightsOnly = domRoot.find('#SDSSearchForm_DirectFlightsOnly').is(':checked');

                searchCriteria.preferredAirline = domRoot.find('#SDSSearchForm_PreferredAirline').val();
                searchCriteria.preferredCabin = domRoot.find('#SDSSearchForm_PreferredCabin').val();

                return searchCriteria;
            }

            function triggerCustomEventOnFormSubmit(dom) {
                $(that.dom).find('.SDSSubmitButton').click(function (ev) {
                    ev.preventDefault();
                    var domRoot = $(this).parents('.SDSSearchFormWidget');
                    try {
                        var searchCriteria = getFormSearchCriteria(domRoot);

                        if (!_.isUndefined(that.options.searchCriteriaValidator)) {
                            that.options.searchCriteriaValidator.validate(searchCriteria);
                        }

                        deactivateSearchButton(); // deactivate must be before triggering searchCriteriaUpdated event: as event handlers for this event may call onSearchComplete and reactivate the button before it is deactivated.
                        that.trigger('searchCriteriaUpdated', searchCriteria);
                    } catch (validationError) {
                        alertDialog(validationError.message);
                        that.reactivateSearchButton();
                    }
                });
            }

            function deactivateSearchButton() {
                var searchButton = $(that.dom).find('.SDSSubmitButton');
                $(searchButton).prop('disabled', true);
            }

            this.reactivateSearchButton = function() {
                var searchButton = $(that.dom).find('.SDSSubmitButton');
                $(searchButton).prop('disabled', false);
            };

            function alertDialog(errorMessage) {
                that.dialog.text(errorMessage);
                $(that.dialog).dialog('open');
            }

            function prepareDialogForFormValidationErrorMessages(dom) {
                that.dialog = $(that.dom).find('#SDSSearchForm_DialogPlaceholder');

                $(that.dialog).dialog({
                    autoOpen: false,
                    dialogClass: "error",
                    buttons: {
                        OK: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
            }

            function addSpinnerPolyfillIfNumberInputNotAvailable(dom) {
                if (feature_detection.numberInputTypeSupported === false) {
                    $(that.dom).find('input[type=number]').spinner();
                }
            }

            this.addInternalEventHandlers = function () {
                makeFirstTabPreselected();
                displayTripTypesAsButtonset();
                addDatePickers();
                setDefaultTripDates();
                resetAndOpenReturnDatePickerWhenDepartureDateSelected();
                addAutocompleteForOriginAndDestination();
                showAdvancedSearchParametersOnLinkClick();
                showReturnDatePickerBasedOnTripType();
                triggerCustomEventOnFormSubmit();
                prepareDialogForFormValidationErrorMessages();
                addSpinnerPolyfillIfNumberInputNotAvailable();
            };
        }


        SearchFormWidget.prototype = Object.create(WidgetBase.prototype);
        SearchFormWidget.prototype.constructor = SearchFormWidget;

        SearchFormWidget.prototype.DATE_FORMAT_DISPLAYED = 'D, d M yy';

        SearchFormWidget.prototype.DEFAULT_ADVANCE_PURCHASE_DAYS = 14;
        SearchFormWidget.prototype.DEFAULT_LENGTH_OF_STAY = 14;

        SearchFormWidget.prototype.datePickerGlobalOptions = {
            numberOfMonthsToShow: 2
            , minDate: 0
            , dateFormat: SearchFormWidget.prototype.DATE_FORMAT_DISPLAYED // Thu, 18 Jun 2015
            , showButtonPanel: true
            , closeText: 'Close'
            , duration: 'fast'
        };

        /**
         * loads all mappings of airport code into full name, into array of objects expected by jQuery Autocomplete widget: [ {label: 'Krakow (KRK)', code: 'KRK'}, {label: 'Amsterdam Schiphol (AMS)', code: 'AMS'}, .... ]
         * We want the label to be displayed to user, while aiport code must be passed as field value.
         */
        SearchFormWidget.prototype.loadLabelsForAutocomplete = function () {
            var airportNameLookup = (window.SDS)? window.SDS.airportNameLookup() : new AirportNameLookup();
            var output = [];
            _.each(airportNameLookup.getAllMappings(), function (airportFullName, airportCode) {
                output.push({label: airportFullName + ' (' + airportCode + ')', value: airportCode});
            });
            return output;
        };

        SearchFormWidget.prototype.autocompleteMatchingFn = function (input, responseFn) {
            var airports = SearchFormWidget.prototype.loadLabelsForAutocomplete();
            var regex = $.ui.autocomplete.escapeRegex(input.term);
            var matcher = new RegExp( regex, "i" );
            var bestSuggestionComparator = new AirportNameBestSuggestionComparator(input.term);
            responseFn( $.grep( airports, function(item) {
                    return matcher.test(item.label) || matcher.test(item.value);
                }).sort(bestSuggestionComparator).reverse()
            ); // reverse is done, as the most preferable matches got higher scoring, so ended up at the end of array, (which is presented at the bottom of suggestions list)
        };

        SearchFormWidget.prototype.createDOM = function() {
            var model = this.getModel();
            var html = viewTemplate(model);
            this.dom = $(html);
            this.addInternalEventHandlers();
            return this.dom;
        };

        SearchFormWidget.prototype.onSearchComplete = function () {
          this.reactivateSearchButton();
        };

        return SearchFormWidget;
});