define(['text!dictionaries/market.csv', 'lodash'], function (dictionaryFile, _) {
    "use strict";

    // TODO: make all lookups singletons
    return function AirportNameLookup() {
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

        AirportNameLookup.prototype.getName = function(airlineCode) {
            return dictionary[airlineCode];
        };
    };
});