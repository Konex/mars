(function() {
	'use strict';

	angular.module('features.signin', [
	  'features.signinController',
	  'features.signinDirectives'
	])
	.config(['$stateProvider','$urlRouterProvider','ACCESS_LEVEL',
		
	  	function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {
	  		$stateProvider
		    .state('signin', {
				url: '/signin',
				templateUrl: 'templates/features/signin/signin.html',
				controller: 'SignInCtrl',
				data: {
					accessLevel: ACCESS_LEVEL.ALL
				}
		    })
		}
	]);
})();