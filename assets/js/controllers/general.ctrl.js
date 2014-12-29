"use strict";

angular
  .module('blogApp')
  .controller('generalCtrl',
  ['$scope', '$state', '$sails', function($scope, $state, $sails){
    $scope.posts = [];
    $sails.post(
      '/post/getall', {}
    ).then(function(data){
        $scope.posts = data;
      });

  }]
);
