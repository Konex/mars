'use strict';

var marsCalendarControl = {};
(function() {
    var $scope, $ionicPopup, uiCalendarConfig, calendarService;

    function init(injectedValues) {
        initWith(injectedValues);
        setDefaults();
        loadEvents();
        setConfigs();
    }

    function initWith(injectedValues) {
        $scope = injectedValues._scope;
        $ionicPopup = injectedValues._ionicPopup;
        uiCalendarConfig = injectedValues._uiCalendarConfig;
        calendarService = injectedValues._MarsCalendarService;
        calendarService.setEventType($scope.calendarConfig.eventType);
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
                        updateEvent(date, jsEvent, view, $scope.editEvent);
                        return;
                    }
                }
            ]
        });
    }

    function eventDrop () {

    }

    function dayClick (date, jsEvent, view) {
        $scope.newEvent = calendarService.getNewEventBasedOn(date);
 
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
        var calendarEvent = calendarService.addEvent($scope.newEvent);
        calendarService.addNewEventToCalendar($scope.eventSources, $scope.events, calendarEvent);
    }
    function updateEvent (date, jsEvent, view, modifiedEvent) {
        calendarService.updateEvent(modifiedEvent);
        calendarService.updateCalendar($scope, modifiedEvent);
    }
    
    marsCalendarControl.init = init;
})();



function calendarCtrl($scope, $ionicPopup, uiCalendarConfig, MarsCalendarService) {
    var injectedValues = {
        _scope: $scope,
        _ionicPopup: $ionicPopup,
        _uiCalendarConfig: uiCalendarConfig, 
        _MarsCalendarService: MarsCalendarService
    };
    marsCalendarControl.init(injectedValues);
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