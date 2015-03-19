define(function () {
    function IllegalArgumentException(sMessage) {
        "use strict";
        this.name = "IllegalArgumentException";
        this.message = sMessage;
    }

    IllegalArgumentException.prototype = Object.create(Error.prototype);
    IllegalArgumentException.prototype.constructor = IllegalArgumentException;

    return {
        IllegalArgumentException: IllegalArgumentException
    };
});