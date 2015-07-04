'use strict';

angular.module('common.services.auth', [
	'common.services.auth.constants',
	'common.services.auth.authInterceptor',
	'common.services.auth.session',
	'common.services.auth.authService'
]);