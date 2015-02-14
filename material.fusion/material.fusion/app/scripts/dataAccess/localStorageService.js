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
			__storeKey(modelName, key);			
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

		function removeItem(modelName, key) {
			__removeKey(modelName, key);
			$localForage.removeItem(modelName + key);
		}

		function __removeKey(modelName, key) {
			var keyStore = $localForage.getItem(modelName);

			if (keyStore && keyStore.length > 0) {
				var index = keyStore.indexOf(key);
				if (index > -1) {
					keyStore.splice(index, 1);

					if(keyStore.length <= 0)
						$localForage.removeItem(modelName);
					else
						$localForage.setItem(modelName, keyStore);
				}
			}
		}

		function __storeKey(modelName, key) {
			var keyStore = $localForage.getItem(modelName);

			if (!keyStore)
				keyStore = {};

			keyStore[key] = key;							 			
			$localForage.setItem(modelName, keyStore);
		}

		return {
			getItem: getItem,
			setItem: setItem,
			getAll: getAll,
			removeItem: removeItem
		}
}]);