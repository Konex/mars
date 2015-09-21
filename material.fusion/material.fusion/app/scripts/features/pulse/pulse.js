(function() {
  'use strict';

  var pulse = angular.module('features.pulse', [
  ]);

  pulse.config([
  	'$stateProvider',
    '$urlRouterProvider',
    'ACCESS_LEVEL',

    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

  	$stateProvider
  	.state('tab.pulse', {
        url: '/pulse',
        views: {
          'pulse-tab': {
            templateUrl: 'templates/features/pulse/pulse.html'
          }
        },
        data: {
          accessLevel: ACCESS_LEVEL.ALL
        }
      })	
  }]);
})();