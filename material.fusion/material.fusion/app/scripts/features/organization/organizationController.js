'use strict';

var organizationUi = {};
(function (){
	var $scope;

	function init(_$scope) {
		$scope = _$scope;
		
		setDefaults();
		wireHandlers();
	}

	function setDefaults() {
		
	}

	function wireHandlers() {
		$scope.createOrganization = createOrganization;
	}

	function createOrganization () {
		
	}

	organizationUi.init = init;
})();

function organizationCtrl ($scope) {
	organizationUi.init($scope);
}

angular.module('features.organization.organizationController', []).controller('OrganizationCtrl', organizationCtrl);