'use strict';

angular.module('blogApp', [
		'ui.router',
		'ngSails'
	])
	.run(
		['$rootScope', '$state', '$stateParams',
			function($rootScope, $state, $stateParams){
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}]);
