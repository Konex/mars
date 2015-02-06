'use strict';

var dataAccessService = angular.module('dataAccess.dataAccessService', []);

dataAccessService.factory('DataAccessService', [
	'MODEL_DATA_ACCESS_MODE', 'ACCESS_MODE', 'LocalStorageService', 'ApiService',
	function (MODEL_DATA_ACCESS_MODE, ACCESS_MODE, localStorageService, ApiService) {

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