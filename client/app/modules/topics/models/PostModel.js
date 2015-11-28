/* global angular */

'use strict';
angular.module('myApp.topics')

        /**
         * Model příspěvku v tématu
         */
        .factory('PostModel', ['$resource', '$rootScope', function ($resource, $rootScope) {
                return $resource($rootScope.serverURL+'/topic/:topic_id/post');
            }]);