(function() {
  'use strict';

  angular.module('features.me', [
  ])
  .config(['$stateProvider','$urlRouterProvider','ACCESS_LEVEL',
    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {
  	
    $stateProvider
  	.state('tab.me', {
        url: '/me',
        views: {
          'me-tab': {
            templateUrl: 'templates/features/me/me.html'
          }
        },
        data: {
          accessLevel: ACCESS_LEVEL.ALL
        }
      })	
  }]);
})();