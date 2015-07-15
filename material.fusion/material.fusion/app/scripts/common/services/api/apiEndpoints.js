'use strict';

angular.module('common.services.api.endpoint', [])
		.constant('API_ENV_BASE_URI', {
			stub: 'scripts/common/stubs/me/signin/data.json',
			dev: 'http://localhost:3000',
			prod: 'https://azure.mars/api'
		})
	   .constant('API_ROUTE', {
	   		signin: '/auth/signin',
	   		signup: '/auth/signup',
	   		createOrganization: '/organizations',
	   		getAllOrganization: '/organizations'
		})
	   .constant('API_NAME', {
	   		signin: 'signin',
	   		signup: 'signup',
	   		createOrganization: 'createOrganizations',
	   		getAllOrganization: 'getAllOrganization'
	   });