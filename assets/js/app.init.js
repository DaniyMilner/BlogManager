angular
	.module('blogApp')
	.directive('appInit', ['$timeout', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, element){
				$timeout(function(){
					$(element).addClass('inited');
				}, 50);
			}
		};
	}]);
