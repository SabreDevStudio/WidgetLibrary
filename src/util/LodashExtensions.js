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
        /**
         * This function does group by groupingProperty and for every calculates also the minimum value of the propertyToGetMinValue.
         * example input: var collection = [
         *      {from: 'LAX', to: 'NYC', numberOfStops: 1, price: 100}
         *      {from: 'LAX', to: 'NYC', numberOfStops: 1, price: 120}
         *      {from: 'LAX', to: 'NYC', numberOfStops: 0, price: 200}
         *  ]
         *
         *  call groupByAndGetCountAndMin(collection, 'numberOfStops', 'price')
         *
         *  output: [
         *      {value: 1, count: 2, min: 100}
         *      {value: 0, count: 1, min: 200}
         *  ]
         *
         *  Please note the format: array is returned, and the value of the groupingProperty is a value of the 'value' key, not the key itself (not a mapping of groupingProperty value into record of count and min).
         *  We have to use this format because otherwise (if we returned mapping of groupingProperty values into min and count) the values of groupingProperty, as being the object keys, would be coerced to String,
         *  which is not desirable for groupingProperty of type other than String.
         *
         */
        groupByAndGetCountAndMin: function(collection, groupingProperty, propertyToGetMinValue) {

            function processGroupingKey(acc, groupingKey, next) {
                if (_.isUndefined(acc.keysAcc[groupingKey])) {
                    acc.keysAcc[groupingKey] = groupingKey;
                    acc.valuesAcc[groupingKey] = {min: Infinity, count: 0};
                }
                acc.valuesAcc[groupingKey].count++;
                var nextValue = _.result(next, propertyToGetMinValue);
                if (nextValue < acc.valuesAcc[groupingKey].min) {
                    acc.valuesAcc[groupingKey].min = nextValue;
                }
                return acc;
            }

            /**
             * The implementation is complex for the reasons described above in method usage comments.
             *
             * We are temporarily storing two mappings (the accumulatorsPair):
             *  1. accumulatorsPair.keysAcc is the mapping of groupingProperty value (object key, as String), into the value itself
             *  2. accumulatorsPair.valuesAcc is the mapping of groupingProperty value (object key, as String), into minimum value and count
             *
             *  Then both maps are merged into one array (matching is done by the both maps keys)
             *
             *  WARN: works for groupingProperty of String and number type. if groupingProperty is any other object type, then in the first method it will be coerced to string (we have to use its value as object key). So in such case make sure groupingProperty type has discriminating toString method.
             *
             *  Supports also groupingProperty accessor returning also lists (not only scalars).
             */

            var accumulatorsPair = collection.reduce(function (acc, next) {
                var groupingKey = _.result(next, groupingProperty);
                if (_.isArray(groupingKey)) { // support for groupingProperty accessor returning list
                    return groupingKey.reduce(function (localAcc, localGroupingKey) {
                        return processGroupingKey(localAcc, localGroupingKey, next);
                    }, acc);
                } else {
                    return processGroupingKey(acc, groupingKey, next);
                }
            }, {keysAcc: {}, valuesAcc: {}});

            var merged = _.map(accumulatorsPair.keysAcc, function (key) {
                return {
                    value: accumulatorsPair.keysAcc[key],
                    count: accumulatorsPair.valuesAcc[key].count,
                    min: accumulatorsPair.valuesAcc[key].min
                }
            });

            return merged;
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