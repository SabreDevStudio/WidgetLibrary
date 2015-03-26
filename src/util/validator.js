/**
 Air travel domain specific validators.

 Use: call validator.validateIsSomething(arg, 'error message'); If this is not true, then exception (IllegalArgumentException) will be thrown will the specified error message.
 If validation is true, then true will be also returned (but the concept is that we rely on exception to be thrown, not on return value)
 **/
define(['util/exceptions', 'validator_lib', 'moment'], function (ex, v, moment) {
    "use strict";

    var CURRENCY_REGEX = new RegExp("^[A-Z]{3}$");
    var AIRPORT_OR_CITY_CODE_REGEX = new RegExp("^[A-Z]{3}$");

    var definedAndMatches = function(arg, regex, err) {
        defined(arg, err);
        if (!regex.test(arg)) {
            throw new ex.IllegalArgumentException(err);
        }
        return true;
    };

    var defined = function(arg, err) {
        if (typeof arg === 'undefined') {
            throw new ex.IllegalArgumentException(err);
        }
        return true;
    };

    var notEmpty = function(arg, err) {
        defined(arg, err);
        if (Object.keys(arg).length === 0) {
            throw new ex.IllegalArgumentException(err);
        }
        return true;
    };

    return {
        notEmpty: notEmpty,
        defined: defined,
        definedAndMatches: definedAndMatches,
        isDefined: function (arg, err) {
            return (typeof arg !== 'undefined');
        },
        /**
         * one and only one must be defined, not both
         */
        onlyOneDefined: function(arg1, arg2, err) { //TODO: more fluent interface: either.isDefined(arg1).or.isDefined(arg2)
            if ((typeof arg1 === 'undefined') && (typeof arg2 === 'undefined')) {
                throw new ex.IllegalArgumentException(err);
            }
            if (arg1 && arg2) {
                throw new ex.IllegalArgumentException(err);
            }
            return true;
        },
        currencySymbol: function(arg1, err) {
            return definedAndMatches(arg1, CURRENCY_REGEX, err);
        },
        airportCode: function(arg1, err) {
            return definedAndMatches(arg1, AIRPORT_OR_CITY_CODE_REGEX, err);
        },
        arrayHasLength: function (arg, len, err) {
            defined(arg, err);
            if (arg.length !== len) {
                throw new ex.IllegalArgumentException(err);
            }
            return true;
        },
        year: function (year, err) {
            defined(year);
            if (!moment([year, 0, 1]).isValid()) {
                throw new ex.IllegalArgumentException(err);
            }
            return true;
        },
        month: function (month, err) {
            defined(month);
            if (!moment([2000, month, 1]).isValid()) {
                throw new ex.IllegalArgumentException(err);
            }
            return true;
        }
    };
});