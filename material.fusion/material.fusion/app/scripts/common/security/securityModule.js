'use strict';

angular.module('common.security', [
	'common.security.constants',
	'common.security.authInterceptor',
	'common.security.session',
	'common.security.auth'
]);