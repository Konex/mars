'use strict';

var eventCalendarModel = angular.module('models.eventCalendarModel', []);

eventCalendarModel.factory('EventCalendarService', [
	'DataAccessService',

	function(DataAccessService) {
		var events = {};

		function getByKey(key) {
			if (!events[key]) {
				var event = DataAccessService.get('EventCalendar', key);
				events[key] = event;
			}

			return events[key];
		}

		function getAll() {
			if (!events || events.length === 0) {
				events = DataAccessService.getAll('EventCalendar');
			}

			return events;
		}

		function setByKey(key, value) {
			if (!events[key]) {
				events[key] = value;
			}

			DataAccessService.set('EventCalendar', key, value);
		}

		function removeByKey(key) {
			if (events[key]) {
				events[key] = null;
				DataAccessService.remove('EventCalendar', key);
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