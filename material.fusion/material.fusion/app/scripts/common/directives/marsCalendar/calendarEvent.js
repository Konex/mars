'use strict';

function calendarEventConstructor () {
	function formatDateTime (date, time) {
        return new Date(date + ' ' + time);
    }

	var CalendarEvent = function(event) {
			this.id: event.id,
            this.eventKey: event.key,
            this.title: event.title,
            this.startDate: event.startDate,
            this.startTime: event.startTime,
            this.endDate: event.endDate,
            this.endTime: event.endTime,
            this.start: formatDateTime(event.startDate, event.startTime),
            this.end: formatDateTime(event.endDate, event.endTime),
            this.allDay: event.allDay,
            this.location: event.location,
            this.note: event.note,
            this.colour: event.colour,
            this.type: event.type,
            this.accessLevel: event.accessLevel
	};

	return {
		CalendarEvent: CalendarEvent;
	};
}


angular.module('marsCalendar.calendarEvent', [])
.value('CalendarEvent', calendarEventConstructor);