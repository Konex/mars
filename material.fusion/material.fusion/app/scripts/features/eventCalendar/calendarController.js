'use strict';

var calendarController = angular.module('features.calendarController', []);






calendarController.controller('CalendarCtrl', [
	'$scope',
	
	function($scope) {
		$scope.uiConfig = {
	      calendar:{
	        editable: true,
	        header:{
	          left: 'month basicWeek basicDay agendaWeek agendaDay',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        dayClick: $scope.alertEventOnClick,
	        eventDrop: $scope.alertOnDrop,
	        eventResize: $scope.alertOnResize
	      }
	    };

		$scope.eventSources = [];
	}
]);