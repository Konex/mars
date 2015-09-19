'use strict';

angular.module('marsCalendar.marsCalendarService', [])
.factory('MarsCalendarService', ['$q', 'DataAccessService',	function($q, DataAccessService) {
		
		function getNewEventBy(date, eventType) {
	        var newEvent = {};
	        newEvent.repeat = {};
	        newEvent.title = "";
	        newEvent.allDay = false;
	        newEvent.startDate = date.format('LL');
	        newEvent.startTime = '00:00';
	        newEvent.endDate = date.format('LL');
	        newEvent.endTime = '01:00';
	        newEvent.location = 'Devonport Primary School';
	        newEvent.note = '';
	        newEvent.eventType = eventType;
	        newEvent.repeatable = false;  
		    newEvent.repeat.start = date.format('LL');
		    newEvent.repeat.end = date.format('LL');	
	        return newEvent; 
    	}

    	function updateEvent(events, calendarEvent) {
			var index = _.indexOf(events, _.find(events, '_id', calendarEvent._id));
	        calendarEvent.start = formatDateTime(calendarEvent.startDate, calendarEvent.startTime);
	        calendarEvent.end = formatDateTime(calendarEvent.endDate, calendarEvent.endTime);
	        events[index] = calendarEvent;
	        save(calendarEvent);
		}

    	function addEvent(eventSources, events, dateEvent) {    		
	        var calendarEvent = getNewCalendarEventFrom(dateEvent); 
	        save(calendarEvent);
	        addEventToCalendar(eventSources, events, calendarEvent);
    	}

    	function getAllBy(eventType) {
			var deferred = $q.defer();
			var result = DataAccessService.getAll(getModelNameBy(eventType));
			
			result.then(function(data) {
				deferred.resolve(data);
			});
			
			return deferred.promise;	
		}

		function remove(key) {
			DataAccessService.remove(modelName, key);
		}

    	function addEventToCalendar(eventSources, events, calendarEvent) {
    		events.push(calendarEvent);
	        
	        // If we push an empty events array into eventSources in loadEvents
	        // it will always reference the empty event array!
	        // So we have to do a null check here upon first event create.  
	        if (_.isEmpty(eventSources)) eventSources.push(events);
    	}

    	function getNewCalendarEventFrom(dateEvent) {
    		var calendarEvent = angular.copy(dateEvent);
    		var eventKey = getUniqueIdFromTimeStamp();
    		calendarEvent._id = calendarEvent.id = eventKey;
    		calendarEvent.start = formatDateTime(dateEvent.startDate, dateEvent.startTime);
    		calendarEvent.end = formatDateTime(dateEvent.endDate, dateEvent.endTime);

    		if (calendarEvent.repeatable) {
    			calendarEvent.dow = getDow(calendarEvent.startDate);
    		}

    		return calendarEvent;
    	}

    	function getDow(repeatDay) {
    		var dow = [];
    		var repeatDate = moment(repeatDay, 'LL');
			dow.push(repeatDate.day());
    		return dow;	
    	}

    	function save(calendarEvent) {
			DataAccessService.set(getModelNameBy(calendarEvent.eventType), calendarEvent._id, calendarEvent);
		}

		function getModelNameBy(eventType) {
			return eventType + 'CalendarEvent';
		}

		function formatDateTime (date, time) {
        	return new Date(date + ' ' + time);
    	}
    	
    	var c = 1;
		function getUniqueIdFromTimeStamp() {
		    var d = new Date(),
		        m = d.getMilliseconds() + "",
		        u = ++d + m + (++c === 10000 ? (c = 1) : c);
		    return u;
		}

		function onEventRender(calendarEvent) {
			 return calendarEvent.start.isBefore(calendarEvent.repeat.end) &&
			 		calendarEvent.end.isAfter(calendarEvent.repeat.start);
		}

		return {
			onEventRender: onEventRender,
			getNewEventBy: getNewEventBy,
			updateEvent: updateEvent,
			addEvent: addEvent,
			getAllBy: getAllBy,
			remove: remove   
		};
	}
]);