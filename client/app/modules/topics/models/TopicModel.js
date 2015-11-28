/* global angular */

'use strict';
angular.module('myApp.topics')

        /**
         * Model tématu
         */
        .factory('TopicModel', ['$resource', '$rootScope', function ($resource, $rootScope) {
                return $resource($rootScope.serverURL+'/topic');
            }]);