'use strict';

angular.module('myApp.authentication')

        /**
         * Přihlášení uživatele
         * http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
         */
        .controller('LoginController', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {
                AuthenticationService.logout();
                
                $scope.login = function () {
                    $scope.disabled = true;
                    $scope.dataLoading = true;

                    AuthenticationService.login($scope.loginData)
                            .then(function (response) {
                                $location.path('/');
                                $scope.loginData = {};
                                $scope.disabled = false;
                                $scope.dataLoading = false;
                            })
                            .catch(function (response) {
                                $scope.loginForm.$setPristine();
                                $scope.error = response.data.errorMessage;
                                $scope.loginData = {};
                                $scope.disabled = false;
                                $scope.dataLoading = false;
                            });
                };
            }]);

