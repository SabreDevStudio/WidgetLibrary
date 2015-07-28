/* returns patched (utility functions added), local version of lodash */
define(['lodash'], function (_) {

    var lodash = _.runInContext();

    // base64 methods taken from undermore.js
    // chars for base64 methods
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /* jshint ignore:start */
    function utf8_encode(str) {
        return unescape(encodeURIComponent(str));
    }
    /* jshint ignore:end */

    lodash.mixin({
        isDefined: _.negate(_.isUndefined),
        /**
         * Selects minimum from all values of object enumerable properties.
         * Returns undefined if there are no enumerable properties
         * @param object
         * @returns {number}
         */
        minOfValues: function(object) {
            var allValues = _.values(object);
            return Math.min.apply(undefined, allValues);
        },
        groupByAndGetCountAndMin: function(collection, groupingProperty, propertyToGetMinValue) {
            return collection.reduce(function (acc, next) {
                var groupingKey = _.result(next, groupingProperty);
                if (_.isUndefined(acc[groupingKey])) {
                    acc[groupingKey] = {min: Infinity, count: 0};
                }
                acc[groupingKey].count++;
                var nextValue = _.result(next, propertyToGetMinValue);
                if (nextValue < acc[groupingKey].min) {
                    acc[groupingKey].min = nextValue;
                }
                return acc;
            }, {});
        },
        /**
         * base64_decode decode a string. This is not a strict polyfill for window.atob
         * because it handles unicode characters
         *
         * @function module:undermore.base64_decode
         * @link https://github.com/davidchambers/Base64.js
         * @param {string} str The string to decode
         * @return {string}
         * @example _.base64_decode('4pyI') => '✈'
         */
        /* jshint ignore:start */
        base64_decode: function(str) {

            // allow browser implementation if it exists
            // https://developer.mozilla.org/en-US/docs/Web/API/window.btoa
            if (typeof atob!=='undefined') {
                // utf8 decode after the fact to make sure we convert > 0xFF to ascii
                return _.utf8_decode(atob(str));
            }
            // allow node.js Buffer implementation if it exists
            if (Buffer) {
                return new Buffer(str, 'base64').toString('binary');
            }
            // now roll our own
            // decoder
            // [https://gist.github.com/1020396] by [https://github.com/atk]
            str = str.replace(/=+$/, '');
            for (
                // initialize result and counters
                var bc = 0, bs, buffer, idx = 0, output = '';
                // get next character
                buffer = str.charAt(idx++);
                // character found in table? initialize bit storage and add its ascii value;
                ~ buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
            }
            return output;
        },
        /**
         * base64_encode encode a string. This is not a strict window.btoa polyfill
         * because it handles utf8 strings (unlike the window.btoa spec)
         *
         * Note: it might be work including an urlsafe flag
         * (see https://github.com/knowledgecode/base64.js)
         *
         * @function module:undermore.base64_encode
         * @link https://github.com/davidchambers/Base64.js
         * @param {string} str The string to encode
         * @return {string}
         * @example _.base64_decode('✈') => '4pyI'
         */
        base64_encode: function(str) {
            // allow browser implementation if it exists
            // https://developer.mozilla.org/en-US/docs/Web/API/window.btoa
            if (typeof btoa!=='undefined') {
                // first utf8 encode to keep from throwing an error if we are out of 0xFF
                return btoa(utf8_encode(str));
            }
            // allow node.js Buffer implementation if it exists
            if (Buffer) {
                var buffer = (str instanceof Buffer) ? str : new Buffer(str.toString(), 'binary');
                return buffer.toString('base64');
            }
            // now roll our own
            // [https://gist.github.com/999166] by [https://github.com/nignag]
            for (
                // initialize result and counter
                var block, charCode, idx = 0, map = chars, output = '';
                // if the next input index does not exist:
                //   change the mapping table to "="
                //   check if d has no fractional digits
                str.charAt(idx | 0) || (map = '=', idx % 1);
                // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
                output += map.charAt(63 & block >> 8 - idx % 1 * 8)
            ) {
                charCode = str.charCodeAt(idx += 3 / 4);
                block = block << 8 | charCode;
            }
            return output;
        },
        /* jshint ignore:end */
        median: function median(values) {

            values.sort( function(a,b) {return a - b;} );

            var half = Math.floor(values.length/2);

            if(values.length % 2) {
                return values[half];
            } else {
                return (values[half-1] + values[half]) / 2.0;
            }
        }

    });

    return lodash;
});