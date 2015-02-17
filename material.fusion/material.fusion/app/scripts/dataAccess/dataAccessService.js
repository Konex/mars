'use strict';

var dataAccessService = angular.module('dataAccess.dataAccessService', []);

var ACCESS_MODE = {
	api:   'api',
	local: 'local'
};

var MODEL_DATA_ACCESS_MODE = {
	EventCalendarModel: ACCESS_MODE.local
	//TODO: add model access mode here
};	

dataAccessService.factory('DataAccessService', [
	'LocalStorageService', 'ApiService', '$q',
	function (localStorageService, ApiService, $q) {

		function get(modelName, key) {
			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				return localStorageService.getItem(modelName, key);
			} else {
				// TODO: api call
			}
		}

		function set(modelName, key, value) {
			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				localStorageService.setItem(modelName, key, value);
			} else {
				// TODO: api call
			}
		}

		function getAll(modelName) {
			var deferred = $q.defer();

			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				var result = localStorageService.getAll(modelName);
				result.then(function(data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			} else {
				// TODO: api call
			}	
		}

		function remove() {
			if (MODEL_DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				localStorageService.removeItem(modelName, key);
			} else {
				// TODO: api call
			}
		}

		return {
			get: get,
			set: set,
			getAll: getAll,
			remove: remove
		};
}]);