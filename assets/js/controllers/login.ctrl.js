"use strict";

angular
  .module('blogApp')
  .controller('loginCtrl',
  ['$scope', '$state', '$sails', function($scope, $state, $sails){
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function(){
      $sails.post(
        '/user/login', $scope.user
      ).then(function(data){
          if (data.error){
            $scope.isError = true;
            $scope.errorText = data.error;
          }else{
            $scope.isError = false;
            $state.go('home');
          }

        });
    };
  }]
);
