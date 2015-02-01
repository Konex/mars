'use strict';

var dataAccessConfig = angular.module('dataAccessConfig', [
	'dataAccess.apiService',
	'dataAccess.localStorageService',
	'dataAccess.dataAccessService'
]);

dataAccessConfig.constant('ACCESS_MODE', {
	api:   'api',
	local: 'local'
});

dataAccessConfig.constant('DATA_ACCESS_LEVEL', {
	eventCalendarModel: ACCESS_MODE.api
	//TODO: add model access mode here
});