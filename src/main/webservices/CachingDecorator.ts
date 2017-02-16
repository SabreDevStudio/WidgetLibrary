import _ = require('lodash')

function CachingDecorator (
    $q
    , $cacheFactory
) {
    var uniqueId = 0;

    return {
        /**
         * This function adds caching feature to the resource. Angular allows to configure caching for resources only for GET service.
         * If you need to use caching for other HTTP methods (like Sabre Dev Studio POST that is actually a 'get' method)
         * then you have to handle it manually - and this wrapper adds this functionality to your resource.
         *
         *
         * It is also possible (the optional second parameter) to instruct the wrapper to cache responses not only for successful HTTP responses, but also for HTTP error responses (like 404).
         * This might be useful when we assume that next call to endpoint will not return any different data (like most probably we get another 404 again).
         *
         * @param resourceMethod NG resource method to wrap
         * @param [httpErrorCodesToCacheResponseFor] array of HTTP error codes to cache response for (for example [404])
         * @returns {Function} wrapped function
         */
        addCaching: function (resourceMethod, httpErrorCodesToCacheResponseFor) {
            var responseCache = $cacheFactory('CachingDecoratorCache_' + uniqueId++);
            return function (request) {
                var cacheKey = JSON.stringify(request);
                return $q(function(resolve, reject) {
                    var cached = responseCache.get(cacheKey);
                    if (cached && cached.success) {
                        return resolve(cached.success);
                    }
                    if (cached && cached.error) {
                        return reject(cached.error);
                    }
                    resourceMethod({}, request).$promise.then(
                        function (response) {
                            responseCache.put(cacheKey, {
                                success: response
                            });
                            return resolve(response);
                        },
                        function (error) {
                            if (_.contains(httpErrorCodesToCacheResponseFor, error.status)) {
                                responseCache.put(cacheKey, {
                                    error: error
                                });
                            }
                            return reject(error);
                        }
                    );
                });
            };
        }
    };
}
export = CachingDecorator;