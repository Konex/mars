'use strict';

var marsCalendarControl = {};
(function() {
    var $scope, $ionicPopup, uiCalendarConfig, calendarService;

    function init(_scope, _ionicPopup, _uiCalendarConfig, _MarsCalendarService) {
        initValues(_scope, _ionicPopup, _uiCalendarConfig, _MarsCalendarService);
        setDefaults();
        loadEvents();
        setConfigs();
    }

    function initValues(_scope, _ionicPopup, _uiCalendarConfig, _MarsCalendarService) {
        $scope = _scope;
        $ionicPopup = _ionicPopup;
        uiCalendarConfig = _uiCalendarConfig;
        calendarService = _MarsCalendarService;
    }

    function setDefaults() {
        $scope.events = [];
        $scope.eventSources = [];
    }

    function setConfigs() {
        setClockPickerConfig();
        setDatePickerConfig();
        setCalendarConfig();
    }

    function loadEvents () {
        var promise = calendarService.getAll();

        promise.then(function(data) {
          if (!_.isEmpty(data)) { // TODO: remove null check.
            $scope.events = data;
            $scope.eventSources.push($scope.events);
          }
        });
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

        $ionicPopup.show({
            templateUrl: 'scripts/common/directives/marsCalendar/html/edit-event.html',
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
 
        $ionicPopup.show({
            templateUrl: 'scripts/common/directives/marsCalendar/html/new-event.html',
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

        calendarService.set(eventKey, calendarEvent);
        
        delete $scope.newEvent;
    }
    function saveEvent (date, jsEvent, view, editEvent) {
        var index = _.indexOf($scope.events, _.find($scope.events, 'id', editEvent.id));
        editEvent.start = formatDateTime(editEvent.startDate, editEvent.startTime);
        editEvent.end = formatDateTime(editEvent.endDate, editEvent.endTime);
        $scope.events[index] = editEvent;
        calendarService.set(editEvent.id, editEvent);
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

function calendarCtrl($scope, $ionicPopup, uiCalendarConfig, MarsCalendarService) {
    marsCalendarControl.init($scope, $ionicPopup, uiCalendarConfig, MarsCalendarService);
}

function marsCalendar ($q, $ionicPopup, uiCalendarConfig, MarsCalendarService) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/common/directives/marsCalendar/html/event-calendar.html',
    scope: {
        calendarConfig: '@'
    },
    controller: calendarCtrl
  };
}
angular
  .module('common.directives.marsCalendar', 
    ['ui.calendar', 'angular-datepicker', 'marsClockPicker', 'marsCalendar.marsCalendarService'])
  .directive('marsCalendar', marsCalendar);