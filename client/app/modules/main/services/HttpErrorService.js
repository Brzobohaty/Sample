/* global angular */

'use strict';

angular.module('myApp')

        /**
         * Handler pro chybové HTTP statusy. Vyhodí modal s chybovou hláškou.
         */
        .factory('HttpErrorService', ['$rootScope', function ($rootScope) {
                return {
                    handler: errorHandler
                };

                /**
                 * Handler pro chybové HTTP statusy. Vyhodí modal s chybovou hláškou.
                 * @param {Object} response
                 */
                function errorHandler(response) {
                    switch (response.status) {
                        case 404:
                            if (response.data.errorMessage) {
                                $rootScope.openErrorModal(response.data.errorMessage); break;
                            }
                        case -1:
                            $rootScope.openErrorModal("Nepodařilo se načíst data ze serveru.");
                            break;
                        default:
                            $rootScope.openErrorModal(response.data.errorMessage);
                    }
                }
            }
        ]);