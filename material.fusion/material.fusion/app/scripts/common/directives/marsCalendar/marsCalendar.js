'use strict';

var marsCalendarInit = {};
(function() {
  var $scope, $q, eventCalendarService;

  function init(_scope, _q, _eventCalendarService) {
    $scope = _scope;
    $q = _q;
    eventCalendarService = _eventCalendarService;
    $scope.eventSources = $scope.events = [];
     
    loadData();
  }

  function loadData () {
    var promise = eventCalendarService.getAll();
    
    promise.then(function(data) {
      if (!_.isEmpty(data)) { // TODO: remove null check.
        $scope.events = data;
        $scope.eventSources.push($scope.events);  
      }
    });
  }

  marsCalendarInit.init = init;
})();



var marsCalendarControl = {};
(function() {
    var $scope, $ionicPopup, uiCalendarConfig, eventCalendarService;

    function init(_scope, _ionicPopup, _uiCalendarConfig, _EventCalendarService) {
        $scope = _scope;
        $ionicPopup = _ionicPopup;
        uiCalendarConfig = _uiCalendarConfig;
        eventCalendarService = _EventCalendarService;

        setConfigs();
    }

    function setConfigs () {
        setClockPickerConfig();
        setDatePickerConfig();
        setCalendarConfig();
    }

    function setClockPickerConfig() {
        $scope.clockPickerOptions = { autoclose: true };
    }

    function setDatePickerConfig() {
        $scope.datePickerOptions = {
            closeOnSelect: false,
            today: 'Today',
            clear: 'Clear',
            close: 'Close'
        };
    }

    function setCalendarConfig() {
        $scope.uiConfig = {
            calendar:{
                editable: true,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: dayClick,
                eventClick: eventClick,
                eventDrop: eventDrop
            }
        };
    }

    function eventClick (date, jsEvent, view) {
        var editEvent = _.find($scope.events, 'id', date.id)
        $scope.editEvent = angular.copy(editEvent);

        var myPopup = $ionicPopup.show({
            templateUrl: 'scripts/common/directives/marsCalendar/edit-event.html',
            title: date.title,
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        saveEvent(date, jsEvent, view, $scope.editEvent);

                        return;
                    }
                }
            ]
        });
    }
    function eventDrop () {

    }
    function dayClick (date, jsEvent, view) {
        $scope.newEvent = getNewEvent(date);
 
        var myPopup = $ionicPopup.show({
            templateUrl: 'scripts/common/directives/marsCalendar/new-event.html',
            title: 'New Event',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        addEvent(date, jsEvent, view);
                        return;
                    }
                }
            ]
        });
    }
    function addEvent(date, jsEvent, view) {
        var eventKey = $scope.events ? $scope.events.length + 1 : 1;
        
        var calendarEvent = {
            id: eventKey,
            eventKey: eventKey,
            title: $scope.newEvent.title,
            startDate: $scope.newEvent.startDate,
            startTime: $scope.newEvent.startTime,
            endDate: $scope.newEvent.endDate,
            endTime: $scope.newEvent.endTime,
            start: formatDateTime($scope.newEvent.startDate, $scope.newEvent.startTime),
            end: formatDateTime($scope.newEvent.endDate, $scope.newEvent.endTime),
            allDay: $scope.newEvent.allDay,
            location: $scope.newEvent.location,
            note: $scope.newEvent.note
        };

        $scope.events.push(calendarEvent);
        
        // Can't push an empty events array into eventSources in initCalender,
        // as it will always reference the empty event array!  
        if (_.isEmpty($scope.eventSources)) $scope.eventSources.push($scope.events);

        eventCalendarService.set(eventKey, calendarEvent);
        $scope.refreshEventCount();

        delete $scope.newEvent;
    }
    function saveEvent (date, jsEvent, view, editEvent) {
        var index = _.indexOf($scope.events, _.find($scope.events, 'id', editEvent.id));
        editEvent.start = formatDateTime(editEvent.startDate, editEvent.startTime);
        editEvent.end = formatDateTime(editEvent.endDate, editEvent.endTime);
        $scope.events[index] = editEvent;
        eventCalendarService.set(editEvent.id, editEvent);
        delete $scope.editEvent;
    }
    function formatDateTime (date, time) {
        return new Date(date + ' ' + time);
    }
    function getNewEvent (date) {
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

    marsCalendarControl.init = init;
})();




function marsCalendar ($q, $ionicPopup, uiCalendarConfig, EventCalendarService) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/common/directives/marsCalendar/event-calendar.html',
    scope: {
        eventSources: '='
    },
    link: function ($scope, $element, $attrs) {
        marsCalendarInit.init($scope, $q, EventCalendarService);  
         marsCalendarControl.init($scope, $ionicPopup, uiCalendarConfig, EventCalendarService);
    }
  };
}
angular
  .module('common.directives.marsCalendar', ['ui.calendar', 'angular-datepicker', 'marsClockPicker'])
  .directive('marsCalendar', marsCalendar);