/* returns patched (utility functions added), local version of lodash */
define(['lodash'], function (_) {

    var lodash = _.runInContext();

    lodash.mixin({
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
        }
        //isDefined: _.negate(_.isUndefined)
    });

    return lodash;
});