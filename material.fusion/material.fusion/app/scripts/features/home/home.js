'use strict';

var home = angular.module('home', [
	'homeController'
]);

home.config([
	'$stateProvider',
    '$urlRouterProvider',
    'ACCESS_LEVEL',

    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

	$stateProvider
	.state('tab.home', {
			url: '/home',
			views: {
				'home-tab': {
  					templateUrl: 'templates/features/home/home.html',
  					controller: 'HomeCtrl'
				}
			},
			data: {
				accessLevel: ACCESS_LEVEL.ALL
			}
		}
	)
}]);