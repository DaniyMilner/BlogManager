'use strict';

angular
	.module('blogApp')
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider){
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
		//$httpProvider.interceptors.push('appHttp');
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				views: {
					content: {
						templateUrl: '/views/wall/general'
					}
				}
			}).state('office', {
				url: '/office',
				views: {
					content: {
						templateUrl: '/views/office/office'
					}
				}
			}).state('registration', {
				url: '/registration',
				views: {
					content: {
						templateUrl: '/views/common/registration'
					}
				}
			}).state('login', {
				url: '/login',
				views: {
					content: {
						templateUrl: '/views/common/login'
					}
				}
			})
	}]);
