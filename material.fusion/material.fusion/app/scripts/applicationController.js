(function() {
	'use strict';

	angular.module('applicationController', [])
	.controller('ApplicationController', ['$scope','USER_ROLES','AuthService','EventCalendarService',
	  	function ($scope, USER_ROLES, AuthService, EventCalendarService) {
			$scope.currentUser = null;
			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized;
	 		$scope.eventCount = '';
	 		
			$scope.setCurrentUser = function(user) {
				$scope.currentUser = user;
			};

			$scope.refreshEventCount = function(){
				 EventCalendarService
				 	.getAll()
				 	.then(function(data) {
				 		if (!_.isEmpty(data)) 
				 			$scope.eventCount = data.length;
				 		else
				 			$scope.eventCount = '';
				 	});
			}
		}
	]);
})();