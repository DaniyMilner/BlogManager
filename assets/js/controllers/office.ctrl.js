"use strict";

angular
  .module('blogApp')
  .controller('officeCtrl',
  ['$scope', '$state', '$sails', function($scope, $state, $sails){
    $scope.posts = [];
    $sails.post(
      '/post/getall', {
        current: true
      }
    ).then(function(data){
        $scope.posts = data;
        console.log($scope.posts);
      });

    $scope.createPost = function(){
      $sails.post('/post/create', {text: 'ololo'})
        .then(function(data){
          console.log(data);
        })
    };
  }]
);
