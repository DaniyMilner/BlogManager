"use strict";

angular
  .module('blogApp')
  .controller('generalCtrl',
  ['$scope', '$state', '$sails', '$http', function($scope, $state, $sails, $http){
    $scope.posts = [];

    $scope.page = 1;
    $scope.loadMore = function(){
      $scope.busy = true;
      $sails.post(
        '/post/getAllByPage', {
          paginate: $scope.page
        }
      ).then(function(data){
          $scope.posts = $scope.posts.concat(data);
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

  }]
);
