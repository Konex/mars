'use strict';

var eventCalendarModel = angular.module('models.eventCalendarModel', []);

eventCalendarModel.factory('EventCalendarService', [
	'DataAccessService',

	function(DataAccessService) {
		var events = [];
		var modelName = 'EventCalendarModel';

		function getByKey(key) {
			if (!events[key]) {
				var event = DataAccessService.get(modelName, key);
				events[key] = event;
			}

			return events[key];
		}

		function getAll() {
			events = DataAccessService.getAll(modelName);
			if (!events) events = [];
			return events;
		}

		function setByKey(key, value) {
			if (!events[key]) {
				events[key] = value;
			}

			DataAccessService.set(modelName, key, value);
		}

		function removeByKey(key) {
			if (events[key]) {
				events[key] = null;
				DataAccessService.remove(modelName, key);
			}
		}

		return {
			getByKey: getByKey,
			getAll:   getAll,
			setByKey: setByKey,
			removeByKey: removeByKey   
		};
	}
]);