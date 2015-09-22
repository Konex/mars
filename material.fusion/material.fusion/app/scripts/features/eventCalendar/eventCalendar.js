'use strict';

angular.module('features.eventCalendar', [
	'features.calendarController'
])
.config([
	'$stateProvider', '$urlRouterProvider', 'ACCESS_LEVEL',
    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {

	$stateProvider
	.state('tab.eventCalendar', {
			url: '/eventCalendar',
			views: {
				'pulse-tab': {
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