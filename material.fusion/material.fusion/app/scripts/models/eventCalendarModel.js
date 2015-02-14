'use strict';

var eventCalendarModel = angular.module('models.eventCalendarModel', []);

eventCalendarModel.factory('EventCalendarService', [
	'DataAccessService',

	function(DataAccessService) {
		var eventArrayObj = {};
		var modelName = 'EventCalendarModel';

		function get(key) {
			if (!eventArrayObj[key]) {
				var calenderEvent = DataAccessService.get(modelName, key);
				eventArrayObj[key] = calenderEvent;
			}

			return eventArrayObj[key];
		}

		function getAll() {
			var events = DataAccessService.getAll(modelName);
			__updateModel(events);
			return events;
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