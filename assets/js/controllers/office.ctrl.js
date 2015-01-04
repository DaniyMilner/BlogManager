"use strict";

angular
  .module('blogApp')
  .controller('officeCtrl',
  ['$scope', '$state', '$sails', '$http', function($scope, $state, $sails, $http){
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
              $http.get(
                '/user/' + $scope.posts[e].owner
              ).then(function(response){
                  $scope.posts[e].user = response.data;
                });
            })(i);
          }
        });
    };

    $scope.remove = function(id){
      $http.delete(
        '/post/' + id
      ).then(function(){
          for(var i = 0; i < $scope.posts.length; i++){
            if($scope.posts[i].id == id){
              $scope.posts.splice(i, 1);
              break;
            }
          }
        });
    };

    $scope.edit = function(post){
      post.editEnable = true;
    };

    $scope.editPost = function(post){
      $sails.put(
        '/post/' + post.id + '?text=' + post.text
      ).then(function(data){
          post.updatedAt = data.updatedAt;
          delete post.editEnable;
        });
    };
  }]
);
