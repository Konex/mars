'use strict';

angular.module('marsCalendar.marsCalendarService', [])
.factory('MarsCalendarService', ['$q', 'DataAccessService',

	function($q, DataAccessService) {
		var _events = {};
		var modelName = 'EventCalendarModel';
		var eventType;

		function formatDateTime (date, time) {
        	return new Date(date + ' ' + time);
    	}

		function setEventType(type) {
			eventType = type;
		}

		function updateEvent(event) {
	        event.start = formatDateTime(event.startDate, event.startTime);
	        event.end = formatDateTime(event.endDate, event.endTime);
	        saveEvent(event);
		}

		function updateCalendar(scope, modifiedEvent) {
			var index = _.indexOf(scope.events, _.find(scope.events, 'id', modifiedEvent.id));
	        modifiedEvent.start = formatDateTime(modifiedEvent.startDate, modifiedEvent.startTime);
	        modifiedEvent.end = formatDateTime(modifiedEvent.endDate, modifiedEvent.endTime);
	        scope.events[index] = modifiedEvent;
		}

		function getNewEventBasedOn(date) {
	        var newEvent = {};
	        newEvent.title = "";
	        newEvent.allDay = false;
	        newEvent.startDate = date.format('LL');
	        newEvent.startTime = '00:00';
	        newEvent.endDate = date.format('LL');
	        newEvent.endTime = '01:00';
	        newEvent.location = 'Devonport Primary School',
	        newEvent.note = ''
	        return newEvent; 
    	}

    	function addEvent(dateEvent) {    		
	        var calendarEvent = getEventFrom(dateEvent);  
	        saveEvent(calendarEvent);
	        return calendarEvent;
    	}

    	function getEventFrom(dateEvent) {
    		var eventKey = Object.keys(_events).length++;

    		return {
    			id: eventKey, 
    			eventKey: eventKey,
	            title: dateEvent.title,
	            startDate: dateEvent.startDate,
	            startTime: dateEvent.startTime,
	            endDate: dateEvent.endDate,
	            endTime: dateEvent.endTime,
	            start: formatDateTime(dateEvent.startDate, dateEvent.startTime),
	            end: formatDateTime(dateEvent.endDate, dateEvent.endTime),
	            allDay: dateEvent.allDay,
	            location: dateEvent.location,
	            note: dateEvent.note
	        };
    	}

    	function addNewEventToCalendar(eventSources, events, calendarEvent) {
    		events.push(calendarEvent);
	        // If we push an empty events array into eventSources in loadEvents
	        // it will always reference the empty event array!
	        // So we have to do a null check here upon first event create.  
	        if (_.isEmpty(eventSources)) eventSources.push(events);
    	}

		function get(key) {
			if (!_events[key]) {
				var calenderEvent = DataAccessService.get(modelName, key);
				_events[key] = calenderEvent;
			}
			return _events[key];
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

		function saveEvent(event) {
			_events[event.id] = event;
			DataAccessService.set(modelName, event.id, event);
		}

		function remove(key) {
			if (_events[key]) {
				delete _events[key];
				DataAccessService.remove(modelName, key);
			}
		}

		function __updateModel(events) {
			_.each(events, function(calenderEvent) {
				_events[calenderEvent.eventID] = calenderEvent;
			});
		}

		return {
			setEventType: setEventType,
			getNewEventBasedOn: getNewEventBasedOn,
			updateEvent: updateEvent,
			updateCalendar: updateCalendar,
			addEvent: addEvent,
			addNewEventToCalendar: addNewEventToCalendar,
			get: get,
			getAll: getAll,
			set: saveEvent,
			remove: remove   
		};
	}
]);