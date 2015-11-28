'use strict';

angular.module('myApp.authentication')
        .config(['$stateProvider', function ($stateProvider) {
                $stateProvider
                        .state('main.login', {
                            url: "/login",
                            templateUrl: "/app/modules/authentication/views/login.html",
                            controller: 'LoginController',
                            data: {
                                authenticate: false
                            }
                        })
                        .state('main.registration', {
                            url: "/registration",
                            templateUrl: "/app/modules/authentication/views/registration.html",
                            controller: 'RegistrationController',
                            data: {
                                authenticate: false
                            }
                        });
            }]);

