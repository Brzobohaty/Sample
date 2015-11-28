/* global angular */

'use strict';

angular.module('myApp.topics')
        /**
         * Zobrazení menu se všemi tématy.
         */
        .controller('AllTopicsController', ['$scope', 'toastr', 'TopicModel', 'HttpErrorService', '$rootScope', function ($scope, toastr, TopicModel, HttpErrorService, $rootScope) {
                $scope.dataLoadingg = true;

                /**
                 * Načtení témat.
                 */
                TopicModel.query(function (topics) {
                    $scope.dataLoadingg = false;
                    $scope.topics = topics;
                }, HttpErrorService.handler);

                /**
                 * Uložení nového tématu.
                 */
                $scope.save = function (newTopicName) {
                    var topic = new TopicModel;
                    topic.name = newTopicName;
                    topic.$save(function (topic) {
                        $scope.topics.push(topic);
                        toastr.success('Nové téma bylo úspěšně založeno.', 'Hotovo!');
                    }, HttpErrorService.handler);
                };
            }]);