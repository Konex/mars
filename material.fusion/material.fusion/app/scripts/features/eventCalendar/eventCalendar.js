'use strict';

var eventCalendar = angular.module('features.eventCalendar', [
	'ui.calendar',
	'features.calendarController'
]);

eventCalendar.config([
	'$stateProvider',
    '$urlRouterProvider',
    'ACCESS_LEVEL',

    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

	$stateProvider
	.state('tab.eventCalendar', {
			url: '/eventCalendar',
			views: {
				'home-tab': {
  					templateUrl: 'templates/features/eventCalendar/eventCalendar.html',
  					controller: 'CalendarCtrl'
				}
			},
			data: {
				accessLevel: ACCESS_LEVEL.ALL
			}
		}
	)
}]);