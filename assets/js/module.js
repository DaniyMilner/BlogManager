'use strict';

angular.module('blogApp', [
		'ui.router',
		'ngSails',
		'validation.match'
	])
	.run(
		['$rootScope', '$state', '$stateParams', '$sails',
			function($rootScope, $state, $stateParams, $sails){
				var checkAuth = function(toState){
					$sails.post('/user/is-auth',{}).success(function(data){
						if (data.error){
							if (toState && toState.name != 'registration' && toState.name != 'login'){
								$state.go('home');
							}
						}
					});
				};
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
				checkAuth();

				$rootScope.$on('$stateChangeStart',
					function(event, toState, toParams, fromState, fromParams){
						checkAuth(toState);
					});
			}]);
