'use strict';

var calendarController = angular.module('features.calendarController', []);

var uiControl = {};
(function() {
	var $scope, $timeout, $ionicPopup, eventCalendarService;

	function init(_scope, _timeout, _ionicPopup, _EventCalendarService) {
		$scope = _scope;
		$timeout = _timeout;
		$ionicPopup = _ionicPopup;
		eventCalendarService = _EventCalendarService;

		setDefaults();
		setHandlers();
		setConfig();
	}

	function setDefaults () {
		$scope.currentDate = new Date();
	}
	function setHandlers () {
		$scope.onDayClick = onDayClick;
	}
	function setConfig () {
		$scope.datePickerOptions = {
			format: 'ddd, dd-mm-yyyy'
		};

		$scope.uiConfig = {
			calendar:{
		        editable: true,
		        header:{
		          	left: 'month basicWeek basicDay agendaWeek agendaDay',
		         	center: 'title',
		          	right: 'today prev,next'
		        },
		        dayClick: $scope.onDayClick,
		        eventDrop: $scope.alertOnDrop,
		        eventResize: $scope.alertOnResize
	      	}
		};
	}
	function onDayClick(date, jsEvent, view) {
		$scope.newEvent = {};
		$scope.newEvent.startDate = date.format();
		$scope.newEvent.startTime = '00:00';
		$scope.newEvent.endDate = date.format();
		$scope.newEvent.endTime = '01:00';
 
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
	    var eventID = $scope.events ? $scope.events.length + 1 : 1;
	    var eventKey = $scope.events ? $scope.events.length + 1 : 1;
	    var calendarEvent = {
			id: eventID,
	        title: 'Yini Test',
	        start: date,
	        end: date,
	        className: ['openSesame'],
	        eventKey: eventKey
      	};  

		$scope.events.push(calendarEvent);
		
		if ($scope.eventSources.length == 0)
			$scope.eventSources.push($scope.events);

        eventCalendarService.set(eventKey, calendarEvent);
	}

	uiControl.init = init;
})();


var eventHelper = {};
(function () {

	function getEventID () {

	}

	function getEventKey (maxNum) {

	}

	eventHelper.getEventID = getEventID;
	eventHelper.getEventKey = getEventKey;
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
	'$scope', '$q', '$timeout', 'uiCalendarConfig', '$ionicPopup', 'EventCalendarService',
	
	function($scope, $q, $timeout, uiCalendarConfig, $ionicPopup, EventCalendarService) {
		pageLoad.init($scope, $q, EventCalendarService);
		uiControl.init($scope, $timeout, $ionicPopup, EventCalendarService);
	}
]);