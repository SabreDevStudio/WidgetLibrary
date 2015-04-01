$(document).ready(function () {
    "use strict";
    $.datepicker.setDefaults($.datepicker.regional["pt-br"]);

    var onSelectFnForDivs = function (dateText, inst) {
        $(this).find('div.ui-datepicker').remove();
        $(this).removeClass("hasDatepicker");
        $(this).click(function () {
            $(this).datepicker(datePickerDefaultOptions);
        });
    };

    var datePickerDefaultOptions = {
        closeText: "Fechar",
        prevText: "&#x3c;Anterior",
        nextText: "Pr&oacute;ximo&#x3e;",
        currentText: "Hoje",
        monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        weekHeader: "Sm",
        firstDay: 0,
        dateFormat: 'yy-mm-dd'
    };

    var createDatePickerOptionsForDiv = function(altField) {
        // copy defaults first
        var options = {};
        for (var prop in datePickerDefaultOptions) {
            if (datePickerDefaultOptions.hasOwnProperty(prop)) {
                options[prop] = datePickerDefaultOptions[prop];
            }
        }
        options['onSelect'] = onSelectFnForDivs;
        options['altField'] = altField;
        return options;
    };

    $('#txtDataIda').datepicker(datePickerDefaultOptions);
    $('#txtDataVolta').datepicker(datePickerDefaultOptions);

    $('#CalendarIconFrom').click(function () {
        var matchingInputField = $(this).prev('input');
        $(this).datepicker(createDatePickerOptionsForDiv(matchingInputField));
    });
    $('#CalendarIconTo').click(function () {
        var matchingInputField = $(this).prev('input');
        $(this).datepicker(createDatePickerOptionsForDiv(matchingInputField));
    });

    $("#remakeSearch_btnSearch").click(function (event) {
        event.preventDefault();
        var pseudoFormWrapper = $(this).prevAll('div.campo-origem-destino');
        var origin = pseudoFormWrapper.find('div.box-origem > input#txtOrigem').val();
        var destination = pseudoFormWrapper.find('div.box-destino > input#txtDestino').val();
        var departureDate = pseudoFormWrapper.nextAll('div.campo-data-ida').find('#txtDataIda').val();
        var returnDate = pseudoFormWrapper.nextAll('div.campo-data-volta').find('#txtDataVolta').val();

        SDS.calendar("CalendarSearchResults", {
             origin: origin
            , destination: destination
            , departureDate: departureDate
            , arrivalDate: returnDate
            , currency: "BRL"
            , numberOfMonths: 2
            , showDayNumbersPrevAndNextMonth: true
            , maxDate: "2018-01-01"
            , localizedMonthNamesFailsafe: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            , localizedWeekDayNamesFailsafe: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
        });

    });
});
