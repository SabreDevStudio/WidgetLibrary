define(function () {

    var isIE = (function(userAgent) {
        userAgent = userAgent || navigator.userAgent;
        return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
    })();

    var localizedToLocaleStringSupported = (function () {
        var mondayDate = new Date(2015, 5, 1); // 1 June 2015 is with Mon
        var mondayStr = mondayDate.toLocaleString('en-US', {weekday: 'short'});
        return (mondayStr === 'Mon');
    })();

    /**
     * function to check if locale currency formatting is done correctly
     */
    var localizedNumberFormattingSupported = (function () {
        var tmpFormatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        return ('' + tmpFormatter.format(123456.78) === '$123,456.78');
    })();

    var numberInputTypeSupported = (function () { // or Modernizr.inputtypes.number
        var input = document.createElement('input');
        input.setAttribute('type', 'number');
        return (input.type === 'number');
    })();

    return {
        isIE: function () {
            return isIE;
        },
        localizedToLocaleStringSupported: function () {
            return localizedToLocaleStringSupported;
        },
        localizedNumberFormattingSupported: function () {
            return localizedNumberFormattingSupported;
        },
        numberInputTypeSupported: numberInputTypeSupported
    };

});