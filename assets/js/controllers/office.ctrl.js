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

    $scope.page = 1;
    $scope.loadMore = function(){
      $scope.busy = true;
      $sails.post(
        '/post/getAllByPage', {
          current: true,
          paginate: $scope.page
        }
      ).then(function(data){
          for(var j = 0; j < data.length; j++){
            (function(e){
              var element = $scope.posts.filter(function(item){
                return item.id == data[e].id;
              })[0];
              if(!element){
                $scope.posts.push(data[e]);
              }
            })(j);
          }
          $scope.busy = false;
          if(data.length){
            $scope.page++;
            for(var i = 0; i < data.length; i++){
              (function(e){
                $http.get(
                  '/user/' + data[e].owner
                ).then(function(response){
                    var post = data.filter(function(item){
                      return item.id == data[e].id;
                    })[0];
                    post.user = response.data;
                  });
              })(i);
            }
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
