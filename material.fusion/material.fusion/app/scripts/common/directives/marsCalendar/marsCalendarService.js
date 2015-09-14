'use strict';

angular.module('marsCalendar.marsCalendarService', [])
.factory('MarsCalendarService', ['$q', 'DataAccessService',	function($q, DataAccessService) {
		
		function loadEevntsOnDemand(eventType, start, end, timezone) {
			var deferred = $q.defer();
			
			DataAccessService.getAll(getModelNameBy(eventType))
				.then(function(allEvents) {
					var events = getEventsBetween(start, end, allEvents);
					deferred.resolve(events);
				});

			return deferred.promise;
		}

		function getEventsBetween(start, end, allEvents) {
			var events = getNormalEvents(start, end, allEvents); 
			var repeatitiveEvents = getRepeatitiveEvents(start, end, allEvents);
			events.push.apply(events, repeatitiveEvents);
			return events;
		}

		function getNormalEvents(start, end, allEvents) {
			return _.filter(allEvents, function(eventItem) {
				return  (start <= eventItem.start && eventItem.start <= end) ||
						(start <= eventItem.end && eventItem.end <= end);
			});
		}

		function getRepeatitiveEvents(start, end, allEvents) {
			var repeatableEvents = _.filter(allEvents, function(eventItem){ 
				return !(end < eventItem.repeat.start || eventItem.repeat.end < start);  
			});

			var repeatitiveEvents = [];
			_.each(repeatableEvents, function(repeatableEvent) {
				var repeats = repeatWeekly(start, end, repeatableEvent);
				repeatitiveEvents.push(repeats); 
			});

			return repeatitiveEvents;
		}

		function repeatWeekly(start, end, eventToRepeat) {
			var firstDayToRepeat = getFirstDayToRepeat(start, end, eventToRepeat);
			var repeatRate = 7;
			return repeatFrom(firstDayToRepeat, repeatRate, end);
		}

		function getFirstDayToRepeat(start, end, eventToRepeat) {
			var firstDayToRepeat = eventToRepeat.repeat.start;
			var oneDayInSeconds = 86400000;
			while(firstDayToRepeat < start) {
				firstDayToRepeat = new Date(firstDayToRepeat.getTime() + oneDayInSeconds);
			}
			return firstDayToRepeat;
		}

		function repeatFrom(firstDayToRepeat, repeatRate, end) {
			var repeats = [];
			var repeatDate = angular.copy(firstDayToRepeat);
			while(repeatDate <= end) {
				repeats.push(repeatDate);
				repeatDate = new Date(firstDayToRepeat.getTime() + repeatRate * 86400000);
			}
			return repeats;
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
	        newEvent.repeat = {};
	        newEvent.repeat.repeatType = '';
		    newEvent.repeat.start = '';
		    newEvent.repeat.end = '';	
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
    		return calendarEvent;
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

		return {
			loadEevntsOnDemand: loadEevntsOnDemand,
			getNewEventBy: getNewEventBy,
			updateEvent: updateEvent,
			addEvent: addEvent,
			getAllBy: getAllBy,
			remove: remove   
		};
	}
]);