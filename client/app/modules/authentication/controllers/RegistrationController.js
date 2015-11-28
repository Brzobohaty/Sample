'use strict';

angular.module('myApp.authentication')

        /**
         * Registrace uživatele
         * http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
         */
        .controller('RegistrationController', ['$scope', '$location', 'AuthenticationService', 'UserModel', 'toastr', function ($scope, $location, AuthenticationService, UserModel, toastr) {
                AuthenticationService.logout();

                $scope.registerData = new UserModel();

                $scope.register = function () {
                    $scope.disabled = true;
                    $scope.dataLoading = true;
                    $scope.registerData.$save(function (response) {
                        toastr.success('', 'Registration successful');
                        $location.path('login');
                        $scope.registerData = {};
                        $scope.disabled = false;
                        $scope.dataLoading = false;
                    }, function (response) {
                        $scope.registerForm.$setPristine();
                        $scope.error = response.data.errorMessage;
                        $scope.registerData = {};
                        $scope.disabled = false;
                        $scope.dataLoading = false;
                    });
                };
            }]);
