/* global angular */

'use strict';

angular.module('myApp.topics', []);
angular.module('myApp.authentication', []);

angular.module('myApp', [
    'angular-loading-bar',
    'ui.router',
    'ngCookies',
    'angularLoad',
    'myApp.topics',
    'myApp.authentication',
    'ngResource',
    'ngStorage'
]);


