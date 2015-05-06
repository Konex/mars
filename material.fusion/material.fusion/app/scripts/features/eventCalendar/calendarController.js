'use strict';

var calendarController = angular.module('features.calendarController', []);

var uiControl = {};
(function() {
	var $scope, $timeout, $ionicModal, $ionicPopup, eventCalendarService;

	function init(_scope, _timeout, _ionicModal, _ionicPopup, _EventCalendarService) {
		$scope = _scope;
		$timeout = _timeout;
		$ionicModal = _ionicModal;
		$ionicPopup = _ionicPopup;
		eventCalendarService = _EventCalendarService;

		setHandlers();
		setConfigs();
	}

	function setHandlers () {
		$scope.dayClick = dayClick;
		$scope.eventClick = eventClick;
	}
	function setConfigs () {
		$scope.clockPickerOptions = {
			autoclose: true
		};

		$scope.uiConfig = {
			calendar:{
		        editable: true,
		        header:{
		          	left: 'month basicWeek basicDay agendaWeek agendaDay',
		         	center: 'title',
		          	right: 'today prev,next'
		        },
		        dayClick: $scope.dayClick,
		        eventClick: $scope.eventClick,
		        eventDrop: $scope.alertOnDrop,
		        eventResize: $scope.alertOnResize
	      	}
		};
	}
	function eventClick (date, jsEvent, view) {
		$scope.editEvent = _.find($scope.events, 'id', date.id);
		
		var myPopup = $ionicPopup.show({
		    templateUrl: '/templates/features/eventCalendar/editEvent.html',
		    title: date.title,
		    subTitle: 'Please use normal things',
		    scope: $scope,
		    buttons: [
		      	{ text: 'Cancel' },
		      	{
		        	text: '<b>Save</b>',
		        	type: 'button-positive',
		        	onTap: function(e) {
			          	saveEvent(date, jsEvent, view);
			          	return;
		        	}
		      	}
		    ]
	  	});
	}
 	function dayClick (date, jsEvent, view) {
		$scope.newEvent = getNewEvent(date);
 
		var myPopup = $ionicPopup.show({
		    templateUrl: '/templates/features/eventCalendar/newEvent.html',
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
		
		// Can't push an empty events array into eventSources in pageLoad,
		// as it will always reference the empty event array!  
		if (_.isEmpty($scope.eventSources)) $scope.eventSources.push($scope.events);

        eventCalendarService.set(eventKey, calendarEvent);

        delete $scope.newEvent;
	}
	function saveEvent (date, jsEvent, view) {  
		
		eventCalendarService.set($scope.editEvent.id, $scope.editEvent);
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

	uiControl.init = init;
})();



var pageLoad = {};
(function() {
	var $scope, $q, eventCalendarService;

	function init(_scope, _q, _eventCalendarService) {
		$scope = _scope;
		$q = _q;
		eventCalendarService = _eventCalendarService;
		$scope.eventSources = [];
		$scope.events = [];
		loadData();
	}

	function loadData () {
		var promise = eventCalendarService.getAll();
		promise.then(function(data) {
			if (!_.isEmpty(data)) {
				$scope.events = data;
				$scope.eventSources.push($scope.events);	
			}
		});
	}

	pageLoad.init = init;
})();

calendarController.controller('CalendarCtrl', [
	'$scope', '$q', '$timeout', 'uiCalendarConfig', '$ionicModal', '$ionicPopup', 'EventCalendarService',
	
	function($scope, $q, $timeout, uiCalendarConfig, $ionicModal, $ionicPopup, EventCalendarService) {
		pageLoad.init($scope, $q, EventCalendarService);
		uiControl.init($scope, $timeout, $ionicModal, $ionicPopup, EventCalendarService);
	}
]);