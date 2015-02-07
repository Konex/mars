'use strict';

var follow = angular.module('features.follow', [
]);

follow.config([
	'$stateProvider',
  '$urlRouterProvider',
  'ACCESS_LEVEL',
  function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

	$stateProvider
	.state('tab.follow', {
      url: '/follow',
      views: {
        'follow-tab': {
          templateUrl: 'templates/features/follow/follow.html'
        }
      },
      data: {
        accessLevel: ACCESS_LEVEL.ALL
      }
    })	
}]);