'use strict';

angular.module('features.organization', [
	'features.organization.organizationController',
	'features.organization.createOrganizationService'
])
.config(['$stateProvider','$urlRouterProvider','ACCESS_LEVEL',
    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

	$stateProvider
	.state('tab.organization', {
			url: '/organization',
			views: {
				'home-tab': {
  					templateUrl: 'templates/features/organization/organization.html',
  					controller: 'OrganizationCtrl'
				}
			},
			data: {
				accessLevel: ACCESS_LEVEL.ALL
			}
		}
	)
}]);