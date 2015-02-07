'use strict';

var dataAccess = angular.module('dataAccess', [
	'LocalForageModule',
	'dataAccess.apiService',
	'dataAccess.localStorageService',
	'dataAccess.dataAccessService'
]);