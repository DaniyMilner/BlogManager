"use strict";

angular
	.module('blogApp')
	.controller('registrationCtrl',
		['$scope', '$rootScope', '$sails', function($scope, $rootScope, $sails){
			$scope.user = {
				firstName: '',
				secondName: '',
				email: '',
				password: '',
				confirmPass: ''
			};

			$scope.register = function(){
				$sails.get(
					'/user/create?first_name=' + $scope.user.firstName + '&' +
						'last_name=' + $scope.user.secondName + '&' +
						'email=' + $scope.user.email + '&' +
						'password=' + $scope.user.password
				).then(function(){
						$scope.isRegistered = true;
					});

			};
		}]
	);
