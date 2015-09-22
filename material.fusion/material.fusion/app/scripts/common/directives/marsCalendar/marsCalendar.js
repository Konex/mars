(function() {
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

        function eventOnDemand(start, end, timezone, callback) {
            var promise = calendarService.loadEevntsOnDemand($scope.eventType, start, end, timezone); 
            promise.then(function(data) {
                if (!_.isEmpty(data)) {
                    callback(data);    
                }     
            });
        }

        function loadEvents () {
            var promise = calendarService.getAllBy($scope.eventType);

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
                    eventDrop: eventDrop,
                    eventRender: eventRender
                }
            };
        }

        function eventRender(event, element, view) {
            return calendarService.onEventRender(event);
        }

        function eventClick (date, jsEvent, view) {
            var editEvent = _.find($scope.events, 'id', date.id)
            $scope.editEvent = angular.copy(editEvent);

            $ionicPopup.show({
                templateUrl: 'scripts/common/directives/marsCalendar/html/edit-event.html',
                title: date.title,
                scope: $scope,
                buttons: [
                    { 
                        text: 'Delete',
                        type: 'button-assertive',
                        onTap: function(e) {
                            deleteEvent(date, jsEvent, view, $scope.editEvent);
                            return;
                        } 
                    },
                    { text: 'Cancel' },
                    {
                        text: '<b>Update</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            updateEvent(date, jsEvent, view, $scope.editEvent);
                            return;
                        }
                    }
                ]
            });
        }

        function dayClick (date, jsEvent, view) {
            $scope.newEvent = calendarService.getNewEventBy(date, $scope.eventType);
     
            $ionicPopup.show({
                templateUrl: 'scripts/common/directives/marsCalendar/html/new-event.html',
                title: 'New Event',
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
            calendarService.addEvent($scope.eventSources, $scope.events, $scope.newEvent);
        }

        function updateEvent (date, jsEvent, view, modifiedEvent) {
            calendarService.updateEvent($scope.events, modifiedEvent);
        }


        function deleteEvent (date, jsEvent, view, modifiedEvent) {
            
        }

        function eventDrop () {
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
            eventType: '@'
        },
        controller: calendarCtrl
      };
    }

    angular
      .module('common.directives.marsCalendar', 
        ['ui.calendar', 'angular-datepicker', 'marsClockPicker', 'marsCalendar.marsCalendarService'])
      .directive('marsCalendar', marsCalendar);


    marsCalendar.$inject = ['$q', '$ionicPopup', 'uiCalendarConfig', 'MarsCalendarService'];

    calendarCtrl.$inject = ['$scope', '$ionicPopup', 'uiCalendarConfig', 'MarsCalendarService'];  
})();  