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

var ACCESS_MODE = {
	api:   'api',
	local: 'local'
};

dataAccessConfig.constant('MODEL_DATA_ACCESS_MODE', {
	EventCalendarModel: ACCESS_MODE.api
	//TODO: add model access mode here
});