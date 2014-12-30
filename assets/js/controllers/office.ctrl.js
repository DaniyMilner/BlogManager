"use strict";

angular
  .module('blogApp')
  .controller('officeCtrl',
  ['$scope', '$state', '$sails', function($scope, $state, $sails){
    $scope.newPost = '';
    $scope.posts = [];


    $scope.createPost = function(){
      $sails.post('/post/create', {text: $scope.newPost})
        .then(function(data){
          $scope.newPost = '';
          $scope.posts.unshift(data);
        })
    };

    $scope.limitCount = 10;
    $scope.loadMore = function(){
      $scope.busy = true;
      $sails.post(
        '/post/getall', {
          current: true,
          limit: $scope.limitCount
        }
      ).then(function(data){
          $scope.posts = data;
          $scope.busy = false;
          $scope.limitCount += 10;
          for(var i = 0; i < $scope.posts.length; i++){
            (function(e){
              $sails.post(
                '/user/get', {
                  id: $scope.posts[e].owner
                }
              ).then(function(user){
                  $scope.posts[e].user = user;
                });
            })(i);
          }
        });
    };
  }]
);
