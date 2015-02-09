'use strict';

var dataAccessService = angular.module('dataAccess.dataAccessService', []);

var ACCESS_MODE = {
	api:   'api',
	local: 'local'
};

var MODEL_DATA_ACCESS_MODE = {
	EventCalendarModel: ACCESS_MODE.api
	//TODO: add model access mode here
};	

dataAccessService.factory('DataAccessService', [
	'LocalStorageService', 'ApiService',
	function (localStorageService, ApiService) {

		function get(modelName, key) {
			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				return localStorageService.getItem(modelName, key);
			} else {
				// TODO: api call
			}
		}

		function set(modelName, key, value) {
			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				localStorageService(modelName, key, value);
			} else {
				// TODO: api call
			}
		}

		function getAll() {
			
		}

		function remove() {

		}

		return {
			get: get,
			set: set,
			getAll: getAll,
			remove: remove
		};
}]);