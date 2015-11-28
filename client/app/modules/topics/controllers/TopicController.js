/* global angular */

'use strict';

angular.module('myApp.topics')

        /**
         * Zobrazení příspěvků v daném tématu.
         */
        .controller('TopicController', ['$scope', '$stateParams', 'toastr', 'PostModel', 'HttpErrorService', '$rootScope', function ($scope, $stateParams, toastr, PostModel, HttpErrorService, $rootScope) {

                /**
                 * Načtení příspěvků v tématu.
                 */
                PostModel.get({topic_id: $stateParams.topicId}, function (topic) {
                    $scope.topic = topic;
                }, HttpErrorService.handler);

                /**
                 * Uložení nového příspěvku.
                 */
                $scope.save = function (newPost) {
                    var post = new PostModel;
                    post.subject = newPost.subject;
                    post.content = newPost.content;
                    post.$save({topic_id: $stateParams.topicId}, function (topic) {
                        $scope.topic = topic;
                        toastr.success('Nový příspěvek byl úspěšně přidán.', 'Hotovo!');
                    }, HttpErrorService.handler);
                };
            }]);