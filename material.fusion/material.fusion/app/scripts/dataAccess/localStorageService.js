'use strict';

var localStorageService = angular.module('dataAccess.localStorageService', []);

localStorageService.factory('LocalStorageService', ['$localForage', 

	function($localForage) {

		function getItem(modelName, key) {
			var res;
			$localForage.getItem(modelName + key).then(function(data) {
				res = data;
			});

			return res;
		}

		function setItem(modelName, key, value) {
			$localForage.setItem(modelName + key);			
		}

		return {
			getItem: getItem,
			setItem: setItem
		}
}]);