'use strict';

var dataAccessService = angular.module('dataAccess.dataAccessService', []);

var ACCESS_MODE = {
	api:   'api',
	local: 'local'
};

var DATA_ACCESS_MODE = {
	organizationCalendarEvent: ACCESS_MODE.local,
	personalCalendarEvent: ACCESS_MODE.local
	//TODO: here is a connascence of location where model name here 
	//      has to matcch to the model name that a feature saves via
	//      DataAccessService.
	//      
};	

dataAccessService.factory('DataAccessService', [
	'LocalStorageService', 'ApiService', '$q',
	function (localStorageService, ApiService, $q) {

		function get(modelName, key) {
			if (DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				return localStorageService.getItem(modelName, key);
			} else {
				// TODO: api call
			}
		}

		function set(modelName, key, value) {
			if (DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
				localStorageService.setItem(modelName, key, value);
			} else {
				// TODO: api call
			}
		}

		function getAll(modelName) {
			var deferred = $q.defer();

			if (DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
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
			if (DATA_ACCESS_MODE[modelName] == ACCESS_MODE.local) {
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