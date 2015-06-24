define(['SearchFormWidget', 'jquery', 'jquery-ui', 'moment'], function (SearchFormWidget, $, $_UI_dummy, moment) {
    "use strict";

    var searchFormWidget = new SearchFormWidget();

    describe('view rendering', function () {

        it('view elements present', function () {
            searchFormWidget.render(function (dom) {
                validateFormElements(dom);
            });
        });

        it('view elements initial values set', function () {
            searchFormWidget.render(function (dom) {
                var today = new Date();

                var departureDate = getFormDate(dom, 'DepartureDate');
                var returnDate = getFormDate(dom, 'ReturnDate');

                expect(departureDate).toBeGreaterThan(today);
                expect(returnDate).not.toBeLessThan(departureDate);
            });
        });

    });

    describe('view behavior', function () {

        function selectDateOnDatepicker(elementWithDatepicker, futureDate) {
            futureDate = futureDate || new Date(2100, 1, 10);
            elementWithDatepicker.datepicker("setDate", futureDate);
            return futureDate;
        }

        it('return date is reset when departure date is selected', function () {

            searchFormWidget.render(function (dom) {
                /* We have to attach the SearchForm widget dom to the current Document, before we access the datepickers programatically.
                   It is because jQuery UI adds datepicker elements to the end of the current document, not to the widget dom (not to the form containing inputs that have datepicker declared).
                   So before the widget dom is attached to the document jQuery is missing this link.
                   Without the link, for example the call $('.ui-datepicker-current-day').click() is returning the exception: 'Missing instance data for this datepicker thrown' */
                attachToCurrentDocument(dom);

                var elementWithDatepicker = $(dom).find('.SDSDatePickerDepartureDate');
                var departureDateSelected  = selectDateOnDatepicker(elementWithDatepicker);
                clickOnDatePickerCurrentlySelectedDate();

                checkValueOfTheReturnDatePicker(dom, departureDateSelected);
            });

            function attachToCurrentDocument(dom) {
                $('body').append(dom);
            }

            function checkValueOfTheReturnDatePicker(dom, departureDateSelected) {
                var returnDateFromForm = getFormDate(dom, 'ReturnDate');
                var expectedReturnDate = new Date(departureDateSelected);
                expectedReturnDate.setDate(departureDateSelected.getDate() + searchFormWidget.DEFAULT_LENGTH_OF_STAY);
                expect(returnDateFromForm).toEqual(expectedReturnDate);
            }

            function clickOnDatePickerCurrentlySelectedDate() {
                var currentlySelectedDateDatepickerCSSClass = '.ui-datepicker-current-day';
                $(currentlySelectedDateDatepickerCSSClass).click();
            }
        });

        it('verify custom event sent when submit button clicked', function () {
            // prepare and bind spy to the custom event
            var eventHandlerSpy = jasmine.createSpy('eventHandlerSpy');
            searchFormWidget.bind('searchCriteriaUpdated', eventHandlerSpy);

            searchFormWidget.render(function (dom) {
                // given:
                var requestedSearchCriteria = {
                    origin: 'LAX',
                    destination: 'NYC',
                    departureDate: '2100-01-01',
                    returnDate: '2100-02-01'
                };
                setFormSearchCriteria(dom, requestedSearchCriteria);

                // when:
                clickSubmitButton(dom);

                // then: submit button is disabled for next clicks and search criteria are sent thru the custom event
                verifySubmitButtonDisabledState(dom);

                verifySearchCriteriaSentInCustomEvent(requestedSearchCriteria);

            });

            function setFormSearchCriteria(dom, requestedSearchCriteria) {
                dom.find('#SDSSearchForm_Origin').val(requestedSearchCriteria.origin);
                dom.find('#SDSSearchForm_Destination').val(requestedSearchCriteria.destination);
                selectDateOnDatepicker(dom.find('#SDSSearchForm_DepartureDate'), new Date(requestedSearchCriteria.departureDate));
                selectDateOnDatepicker(dom.find('#SDSSearchForm_ReturnDate'), new Date(requestedSearchCriteria.returnDate));
            }

            function clickSubmitButton(dom) {
                var submitButton = $(dom).find('.SDSSubmitButton');
                submitButton.click();
            }

            function verifySubmitButtonDisabledState(dom) {
                var submitButton = $(dom).find('.SDSSubmitButton');
                expect(submitButton.prop('disabled')).toBeTruthy();
            }

            function verifySearchCriteriaSentInCustomEvent(requestedSearchCriteria) {
                expect(eventHandlerSpy).toHaveBeenCalled();
                var argsPassedToEventHandler = eventHandlerSpy.calls.mostRecent().args;
                var newSearchCriteria = argsPassedToEventHandler[0];

                expect(newSearchCriteria.origin).toEqual(requestedSearchCriteria.origin);
                expect(newSearchCriteria.destination).toEqual(requestedSearchCriteria.destination);

                expect(moment(newSearchCriteria.departureDate).isSame(requestedSearchCriteria.departureDate));
                expect(moment(newSearchCriteria.returnDate).isSame(requestedSearchCriteria.returnDate));

                expect(newSearchCriteria.ADTPaxNumber).toBe(1);
                expect(newSearchCriteria.isPlusMinus3DaysFlexible).toBeTruthy();
                expect(newSearchCriteria.directFlightsOnly).toBeFalsy();
            }
        });

    });

    function getFormDate(dom, dateHtmlName) {
        var dateStringPresented = $(dom).find('form.SDSSearchForm input[name="' + dateHtmlName + '"]').val();
        var date = $.datepicker.parseDate(searchFormWidget.DATE_FORMAT_DISPLAYED, dateStringPresented);
        return date;
    }


    function validateFormElements(dom) {
        hasTabs(dom, 3);

        hasOrigin(dom);
        hasDestination(dom);

        hasDepartureDate(dom);
        hasReturnDate(dom);

        hasNumberOfADTPax(dom);
        hasDateflexibilityCheckbox(dom);
        hasDirectFlightsOnlycheckbox(dom);

        hasDropdown(dom, 'PreferredAirline', 1);
        hasDropdown(dom, 'PreferredCabin', 1);

        submitButton(dom);
    }

    function hasTabs(dom, numberOfTabs) {
        expect($(dom).find('form input.SDSTripTypeTab').size()).toBe(numberOfTabs);
    }

    function hasOrigin(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:text[name="Origin"][required]');
    }

    function hasDestination(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:text[name="Destination"][required]');
    }

    function hasDepartureDate(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:text[name="DepartureDate"][required]');
    }

    function hasReturnDate(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:text[name="ReturnDate"][required]');
    }

    function hasNumberOfADTPax(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input[name="ADTPaxNumber"][required]');
    }

    function hasDateflexibilityCheckbox(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:checkbox[name="IsPlusMinus3DaysFlexible"]');
    }

    function hasDirectFlightsOnlycheckbox(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('input:checkbox[name="DirectFlightsOnly"]');
    }

    function hasDropdown(dom, htmlFormElementName, minNumberOfOptions) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('select[name="' + htmlFormElementName + '"]');
        expect($(dom).find('form.SDSSearchForm select[name="' + htmlFormElementName + '"] > option').size()).toBeGreaterThan(minNumberOfOptions);
    }

    function submitButton(dom) {
        expect($(dom).find('form.SDSSearchForm')).toContainElement('button:submit');
    }
});