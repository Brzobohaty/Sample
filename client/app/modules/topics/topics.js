/* global angular */

'use strict';

angular.module('myApp.topics', [
    'toastr',
    'ngAnimate',
    'ui.bootstrap'
])

        .config(function ($stateProvider) {
            $stateProvider
                    .state('main.home', {
                        url: "",
                        templateUrl: "/app/modules/topics/views/topics.html",
                        controller: 'AllTopicsController',
                        data: {
                            authenticate: true
                        }
                    })
                    .state('main.topics', {
                        url: "/topics",
                        templateUrl: "/app/modules/topics/views/topics.html",
                        controller: 'AllTopicsController',
                        data: {
                            authenticate: true
                        }
                    })
                    .state('main.topic', {
                        url: "/topic/:topicId",
                        templateUrl: "/app/modules/topics/views/topic.html",
                        controller: 'TopicController',
                        data: {
                            authenticate: true
                        }
                    });
        });