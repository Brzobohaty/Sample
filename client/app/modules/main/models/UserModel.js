/* global angular */

'use strict';
angular.module('myApp')

        /**
         * Model uživatele
         */
        .factory('UserModel', ['$resource', '$rootScope', function ($resource, $rootScope) {
                return $resource($rootScope.serverURL+'/user/:id');
            }]);