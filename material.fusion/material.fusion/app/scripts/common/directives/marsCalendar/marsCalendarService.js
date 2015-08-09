'use strict';

angular.module('marsCalendar.marsCalendarService', [])

.factory('MarsCalendarService', [
	'$q',
	'DataAccessService',

	function($q, DataAccessService) {
		var eventArrayObj = {};
		var modelName = 'EventCalendarModel';

		function get(key) {
			if (!eventArrayObj[key]) {
				var calenderEvent = DataAccessService.get(modelName, key);
				eventArrayObj[key] = calenderEvent;
			}

			return eventArrayObj[key];
		}

		function getByType() {

		}

		function getAll() {
			var deferred = $q.defer();
			var result = DataAccessService.getAll(modelName);
			result.then(function(data) {
				__updateModel(data);
				deferred.resolve(data);
			});
			return deferred.promise;
		}

		function set(key, value) {
			eventArrayObj[key] = value;
			DataAccessService.set(modelName, key, value);
		}

		function remove(key) {
			if (eventArrayObj[key]) {
				delete eventArrayObj[key];
				DataAccessService.remove(modelName, key);
			}
		}

		function __updateModel(events) {
			_.each(events, function(calenderEvent) {
				eventArrayObj[calenderEvent.eventID] = calenderEvent;
			});
		}

		return {
			get: get,
			getAll: getAll,
			set: set,
			remove: remove   
		};
	}
]);