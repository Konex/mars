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
	        title: $scope.newEvent.title,
	        start: formatDateTime($scope.newEvent.startDate, $scope.newEvent.startTime),
	        end: formatDateTime($scope.newEvent.endDate, $scope.newEvent.endTime),
	        allDay: $scope.newEvent.allDay.checked,
	        eventKey: eventKey
      	};  

		$scope.events.push(calendarEvent);
		
		if ($scope.eventSources.length == 0)
			$scope.eventSources.push($scope.events);

        eventCalendarService.set(eventKey, calendarEvent);
	}

	function formatDateTime (date, time) {
		var timeDelimited = time.split(':');
		var dateDelimited = date.split('-');
		return new Date(dateDelimited[0], dateDelimited[1]-1, dateDelimited[2], timeDelimited[0], timeDelimited[1]);
	}

	function getNewEvent (date) {
		var newEvent = {};
		newEvent.title = "";
		newEvent.allDay = { text: 'All Day', checked: false};
		newEvent.startDate = date.format();
		newEvent.startTime = '00:00';
		newEvent.endDate = date.format();
		newEvent.endTime = '01:00';
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
		
		loadData();
	}

	function loadData () {
		var promise = eventCalendarService.getAll();
		promise.then(function(data) {
			$scope.events = data;
			$scope.eventSources.push(data);
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