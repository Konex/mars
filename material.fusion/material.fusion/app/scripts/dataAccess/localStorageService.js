'use strict';

var localStorageService = angular.module('dataAccess.localStorageService', []);

localStorageService.factory('LocalStorageService', ['$localForage', 

	function($localForage) {

		function getItem(modelName, key) {
			$localForage.getItem(modelName + key).then(function(data) {
				return data;
			});
		}

		function setItem(modelName, key, value) {
			storeKey(modelName, key);			
			$localForage.setItem(modelName + key, value);
		}

		function getAll(modelName) {
			var keyStore = $localForage.getItem(modelName);
			var res = [];

			for(var prop in keyStore) {
				if (keyStore.hasOwnProperty(prop)) {
					var key = keyStore[prop];
                      
					$localForage.getItem(modelName + key).then(function(data) {
						res.push(data);
					});
				}
			}

			return res;	
		}

		function storeKey(modelName, key) {
			var keyStore = $localForage.getItem(modelName);

			if (_.isUndefined(keyStore)) {
				keyStore = {};
			}

			keyStore[key] = key;							 			
			$localForage.setItem(modelName, keyStore);
		}

		return {
			getItem: getItem,
			setItem: setItem,
			getAll: getAll
		}
}]);