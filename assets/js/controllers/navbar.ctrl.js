"use strict";

angular
	.module('blogApp')
	.controller('navbarCtrl',
		['$scope', '$sails', function($scope, $sails){
      $scope.logout = function(){
        $sails.post(
          '/user/logout', {}
        ).then(function(){
            location.reload();
          });
      };
		}]
	);
