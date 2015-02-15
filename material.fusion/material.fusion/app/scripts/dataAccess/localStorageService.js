'use strict';

var localStorageService = angular.module('dataAccess.localStorageService', []);

localStorageService.factory('LocalStorageService', ['$localForage', '$q', 

	function($localForage, $q) {

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
			var promises = [];
			$localForage.getItem(modelName).then(function(data) {
				var keyStore = data;
				
				// for(var prop in keyStore) {
				// 	if (keyStore.hasOwnProperty(prop)) {
				// 		//var deferred = $q.defer();
				// 		var key = keyStore[prop];
	                      
				// 		$localForage.getItem(modelName + key).then(function(data) {
				// 			deferred.resolve(data);
				// 		});

				// 		promises.push(deferred);
				// 	}
				// }

				_.each(keyStore, function(prop) {
					if (keyStore.hasOwnProperty(prop)) {
						var key = keyStore[prop];
						var promise = $localForage.getItem(modelName + key);
						promises.push(promise);
					}
				});
			});

			return $q.all(promises);
		}

		function removeItem(modelName, key) {
			__removeKey(modelName, key);
			$localForage.removeItem(modelName + key);
		}

		function __removeKey(modelName, key) {
			$localForage.getItem(modelName).then(function(data) {
				var keyStore = data;
				
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
			});
		}

		function __storeKey(modelName, key) {
			$localForage.getItem(modelName).then(function(data) {
				var keyStore = data;

				if (!keyStore)
					keyStore = {};

				keyStore[key] = key;							 			
				$localForage.setItem(modelName, keyStore);	
			});
		}

		return {
			getItem: getItem,
			setItem: setItem,
			getAll: getAll,
			removeItem: removeItem
		}
}]);