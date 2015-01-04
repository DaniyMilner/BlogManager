"use strict";

angular
  .module('blogApp')
  .controller('generalCtrl',
  ['$scope', '$state', '$sails', '$http', function($scope, $state, $sails, $http){
    $scope.posts = [];

    $scope.limitCount = 10;
    $scope.loadMore = function(){
      $scope.busy = true;
      $sails.post(
        '/post/getall', {
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

  }]
);
