'use strict';

angular.module('marsCalendar.marsCalendarService', [])
.factory('MarsCalendarService', ['$q', 'DataAccessService',

	function($q, DataAccessService) {
		var c = 1;
		
		function formatDateTime (date, time) {
        	return new Date(date + ' ' + time);
    	}
    	
		function getUniqueIdFromTimeStamp() {
		    var d = new Date(),
		        m = d.getMilliseconds() + "",
		        u = ++d + m + (++c === 10000 ? (c = 1) : c);
		    return u;
		}

		function updateEvent(events, calendarEvent) {
			var index = _.indexOf(events, _.find(events, 'id', calendarEvent.id));
	        calendarEvent.start = formatDateTime(calendarEvent.startDate, calendarEvent.startTime);
	        calendarEvent.end = formatDateTime(calendarEvent.endDate, calendarEvent.endTime);
	        events[index] = calendarEvent;
	        save(calendarEvent);
		}

		function getNewEventBy(date, eventType) {
	        var newEvent = {};
	        newEvent.title = "";
	        newEvent.allDay = false;
	        newEvent.startDate = date.format('LL');
	        newEvent.startTime = '00:00';
	        newEvent.endDate = date.format('LL');
	        newEvent.endTime = '01:00';
	        newEvent.location = 'Devonport Primary School';
	        newEvent.note = '';
	        newEvent.eventType = eventType;
	        return newEvent; 
    	}

    	function addEvent(eventSources, events, dateEvent) {    		
	        var calendarEvent = getCalendarEventFrom(dateEvent);  
	        save(calendarEvent);
	        
	        events.push(calendarEvent);
	        
	        // If we push an empty events array into eventSources in loadEvents
	        // it will always reference the empty event array!
	        // So we have to do a null check here upon first event create.  
	        if (_.isEmpty(eventSources)) eventSources.push(events);
    	}

    	function getCalendarEventFrom(dateEvent) {
    		var calendarEvent = angular.copy(dateEvent);
    		var eventKey = getUniqueIdFromTimeStamp();
    		calendarEvent._id = calendarEvent.id = eventKey;
    		calendarEvent.eventKey = eventKey;
    		calendarEvent.start = formatDateTime(dateEvent.startDate, dateEvent.startTime);
    		calendarEvent.end = formatDateTime(dateEvent.endDate, dateEvent.endTime);
    		
    		return calendarEvent;
    	}

		function getAllBy(eventType) {
			var deferred = $q.defer();
			var result = DataAccessService.getAll(getModelNameBy(eventType), eventType);
			result.then(function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;	
		}

		function save(calendarEvent) {
			DataAccessService.set(getModelNameBy(calendarEvent.eventType), calendarEvent.id, calendarEvent);
		}

		function remove(key) {
			DataAccessService.remove(modelName, key);
		}

		function getModelNameBy(eventType) {
			return eventType + 'CalendarEvent';
		}

		return {
			getNewEventBy: getNewEventBy,
			updateEvent: updateEvent,
			addEvent: addEvent,
			getAllBy: getAllBy,
			remove: remove   
		};
	}
]);