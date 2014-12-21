"use strict";

angular
	.module('blogApp')
	.controller('navbarCtrl',
		['$scope', '$sails', function($scope, $sails){
			$scope.createUser = function(){
				$sails.post('/user/create', {
					'email': 'alo@qapint.com',
					'password': '111111'
				}).success(function(data){
					console.log(data);
				});
			};
			$scope.login = function(){
				$sails.post('/user/login', {
					'email': 'alo@qapint.com',
					'password': '111111'
				}).success(function(data){
					console.log(data);
				});
			};
		}]
	);
