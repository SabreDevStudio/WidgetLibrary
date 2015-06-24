define(['jquery'], function ($) {
        'use strict';

        function defineExtensions() {

            $.fn.extend({
                /**
                 * Returns self and all the succeeding siblings of the current element and all first level cousins (the children of all the succeeding siblings of the current element parent).
                 * It is intended to be invoked on one element only.
                 * No selectors supported
                 * @param maxElements
                 */
                nextAllAndFirstLevelCousins: function (maxElements) {
                    var succeedingSiblings = this.nextAll().toArray();

                    var parentSucceedingSiblings = this.parent().nextAll();
                    var firstLevelSucceedingCousins = parentSucceedingSiblings.children().toArray();

                    var selfAndNextAllAndFirstLevelSucceedingCousins = $.merge($.merge(this.toArray(), succeedingSiblings), firstLevelSucceedingCousins);

                    if (_.isUndefined(maxElements)) {
                        return selfAndNextAllAndFirstLevelSucceedingCousins;
                    }
                    //TODO: this does not return jQuery object but just array. Cannot chain results.
                    return selfAndNextAllAndFirstLevelSucceedingCousins.slice(0, maxElements);
                }
            });
            return $;
        }
    return defineExtensions();
});