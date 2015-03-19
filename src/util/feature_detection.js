define(function () {

    var isIE = function(userAgent) {
        userAgent = userAgent || navigator.userAgent;
        return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
    };

    var localizedToLocaleStringSupported = function () {
        var mondayDate = new Date(2015, 5, 1); // 1 June 2015 is with Mon
        var mondayStr = mondayDate.toLocaleString('en-US', {weekday: 'short'});
        return (mondayStr === 'Mon');
    };

    return {
        isIE: isIE,
        localizedToLocaleStringSupported : localizedToLocaleStringSupported
    };

});