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

		setHandlers();
		setConfig();
	}

	function setHandlers() {
		$scope.onDayClick = onDayClick;
	}

	function setConfig() {
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
		var myPopup = $ionicPopup.show({
		    template: '<input type="password" ng-model="data.wifi">',
		    title: 'Enter New Event',
		    subTitle: 'Please use normal things',
		    scope: $scope,
		    buttons: [
		      	{ text: 'Cancel' },
		      	{
		        	text: '<b>Save</b>',
		        	type: 'button-positive',
		        	onTap: function(e) {
			          	// if (!$scope.data.wifi) {
			           //  	//don't allow the user to close unless he enters wifi password
			           //  	e.preventDefault();
			          	// } else {
			           //  	return $scope.data.wifi;
			          	// }
			          	addEvent();
			          	return;
		        	}
		      	}
		    ]
	  	});

	  	myPopup.then(function(res) {
	    	console.log('Tapped!', res);
	  	});
	}

	function addEvent() {
		var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
	    var eventID = $scope.events.length + 1;
	    var calendarEvent = {
			id: '1',
	        title: 'Yini Test',
	        start: new Date(y, m, d),
	        end: new Date(y, m, d),
	        className: ['openSesame'],
	        eventID: eventID
      	};  

		$scope.events.push(calendarEvent);
		
		if ($scope.eventSources.length == 0)
			$scope.eventSources = [$scope.events];

      	eventCalendarService.set(eventID, calendarEvent);
	}

	uiControl.init = init;
})();


var pageLoad = {};
(function() {
	var $scope, $q, uiCalendarConfig, eventCalendarService;

	function init(_scope, _q, _uiCalendarConfig, _eventCalendarService) {
		$scope = _scope;
		$q = _q;
		uiCalendarConfig = _uiCalendarConfig;
		eventCalendarService = _eventCalendarService;

		loadData();
	}

	function loadData() {
		$scope.eventSources = [];
		
		var promise = eventCalendarService.getAll();
		promise.then(function(data) {
			$scope.eventSources.push(data);
		});
	}

	pageLoad.init = init;
})();

calendarController.controller('CalendarCtrl', [
	'$scope', '$q', '$timeout', 'uiCalendarConfig', '$ionicPopup', 'EventCalendarService',
	
	function($scope, $q, $timeout, uiCalendarConfig, $ionicPopup, EventCalendarService) {
		pageLoad.init($scope, $q, uiCalendarConfig, EventCalendarService);
		uiControl.init($scope, $timeout, $ionicPopup, EventCalendarService);
	}
]);