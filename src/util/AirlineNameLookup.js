define(['text!dictionaries/carrier.csv', 'lodash'], function (dictionaryFile, _) {
    "use strict";
    return function AirlineNameLookup() {
        var dictionary = parseDictionaryFile(dictionaryFile);

        function parseDictionaryFile(dictionaryFile) {
            return _.object(
                dictionaryFile
                .split(/\r\n|\n/)
                .map(function (entry) {
                    var keyAndValAry = entry.split(',');
                    // values in dictionary file come as uppercase. We need them to start with upper case, rest lowercase
                    keyAndValAry[1] = _.startCase(keyAndValAry[1].toLowerCase());
                    return keyAndValAry;
                })
            );
        }

        AirlineNameLookup.prototype.getName = function(airlineCode) {
            return dictionary[airlineCode];
        };

        AirlineNameLookup.prototype.getAllMappings = function() {
            return dictionary;
        };

    };
});