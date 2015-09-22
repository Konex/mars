(function() {
	'use strict';

	var uiControl = {};
	(function() {
		var $scope;

		function init(_scope) {
			$scope = _scope;			
			setConfigs();
		}

		function setConfigs () {
			$scope.calendarConfig = {eventType: 'personal'};
		}

		uiControl.init = init;
	})();

	angular.module('features.calendarController', [])
	.controller('CalendarCtrl', [
		'$scope', function($scope) {uiControl.init($scope);
		}
	]);
})();