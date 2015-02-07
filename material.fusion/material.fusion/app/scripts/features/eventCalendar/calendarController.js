'use strict';

var calendarController = angular.module('features.calendarController', []);

var ui = {};
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

	function setHandlers() {
		$scope.onDayClick = onDayClick;
	}

	function onDayClick(date, jsEvent, view) {
		var myPopup = $ionicPopup.show({
		    template: '<input type="password" ng-model="data.wifi">',
		    title: 'Enter Wi-Fi Password',
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
			          	
		        	}
		      	}
		    ]
	  	});

	  	myPopup.then(function(res) {
	    	console.log('Tapped!', res);
	  	});
	  	
	  	// $timeout(function() {
	   //   	myPopup.close(); //close the popup after 3 seconds for some reason
	  	// }, 3000);
	}

	function addEvent() {
		var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();

		$scope.events.push({
	        title: 'Open Sesame',
	        start: new Date(y, m, 28),
	        end: new Date(y, m, 29),
	        className: ['openSesame']
      	});
	}

	ui.init = init;
})();


var pageLoad = {};
(function() {
	var $scope, eventCalendarService;

	function init(_scope, _eventCalendarService) {
		$scope = _scope;
		eventCalendarService = _eventCalendarService;

		loadData();
	}

	function loadData() {
		//$scope.events = EventCalendarService.getAll(); 			

		$scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    	};

    	var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
		$scope.events = [
	      {title: 'All Day Event',start: new Date(y, m, 1)},
	      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    	];
	}

	pageLoad.init = init;
})();

calendarController.controller('CalendarCtrl', [
	'$scope', '$timeout', '$ionicPopup', 'EventCalendarService',
	
	function($scope, $timeout, $ionicPopup, EventCalendarService) {
		$scope.events = [];
		$scope.eventSource = [];

		pageLoad.init($scope, EventCalendarService);
		ui.init($scope, $timeout, $ionicPopup, EventCalendarService);	

		$scope.eventSources = [$scope.events, $scope.eventSource];	
	}
]);