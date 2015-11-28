/* global angular */

'use strict';

angular.module('myApp')

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            //přesměrování na témata při adrese "/"
            $urlRouterProvider.when("", ['$state', '$match', function ($state, $match) {
                    $state.go('main.topics');
                }]);
            $urlRouterProvider.when("/", ['$state', '$match', function ($state, $match) {
                    $state.go('main.topics');
                }]);

            $urlRouterProvider.otherwise('/404');

            $stateProvider
                    .state("otherwise", {
                        url: '/404',
                        templateUrl: "/app/modules/main/views/404.html",
                        data: {
                            authenticate: false
                        }
                    })
                    .state('main', {
                        templateUrl: "/app/modules/main/views/main.html",
                        data: {
                            authenticate: false
                        }
                    });

            /**
             * Při každém HTTP requestu tohle podstrčí do hlavičky token uživatele
             */
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                    return {
                        'request': function (config) {
                            config.headers = config.headers || {};
                            if ($localStorage.token) {
                                config.headers.Authorization = 'Bearer ' + $localStorage.token;
                            }
                            return config;
                        },
                        'responseError': function (response) {
                            if (response.status === 401 || response.status === 403) {
                                $location.path('/login');
                            }
                            return $q.reject(response);
                        }
                    };
                }]);
        })

        .run(function ($rootScope, $location, $uibModal, $state, AuthenticationService) {
            //$rootScope.serverURL = "http://private-16e96f-forum6.apiary-mock.com";
            $rootScope.serverURL = "rest-api";

            $rootScope.$state = $state;

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                /**
                 * Přehození na login, pokud stránka vyžaduje autentizaci a uživatel není přihlášen.
                 */
                if (toState.data.authenticate && !AuthenticationService.isLoggedIn()) {
                    event.preventDefault();
                    try {
                        $state.transitionTo('main.login');
                        $state.reload();
                    } catch (err) {
                        $location.path('/login');
                    }
                    $rootScope.logedIn = false;
                } else {
                    $rootScope.logedIn = true;
                }
            });

            /**
             * Otevře modal s danou chybovou hláškou.
             * @param {string} message zpráva
             */
            $rootScope.openErrorModal = function (message) {
                $rootScope.errorMessage = message;

                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalContent.html'
                });

                $rootScope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
            };
        });