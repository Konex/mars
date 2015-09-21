(function() {
	'use strict';

	var homeUi = {};
	(function (){
		var $scope, $state;

		function init(_$scope, _$state) {
			$scope = _$scope;
			$state = _$state;
			
			setDefaults();
			wireHandlers();
		}

		function setDefaults() {
			
		}

		function wireHandlers() {
			$scope.createOrganization = createOrganization;
			$scope.organizationClick =  organizationClick;
		}

		function createOrganization () {
		}

		function organizationClick () {
			$state.go('tab.organization');
		}

		homeUi.init = init;
	})();

	function homeCtrl ($scope, $state) {
		homeUi.init($scope, $state);
	}

	angular.module('features.home.homeController', []).controller('HomeCtrl', homeCtrl);
})();