/* global angular */

'use strict';

angular.module('myApp.topics')

/**
 * Directiva pro kontrolu unikátnosti tématu.
 */
.directive('isunique', function() {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, elemnt, attributes, ngModel) {
      ngModel.$validators.isunique = function (modelValue) {
          var nameIsUnique = true;
          angular.forEach(scope.topics, function(value, key) {
                if (value.name === modelValue) {
                  nameIsUnique = false;
                }
          });
          return nameIsUnique;
      };
    }
  };
});

