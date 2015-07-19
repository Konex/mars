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
		$scope.instructors = getInstructors();
		$scope.calendarEventSource = [];
	}

	function wireHandlers() {
		$scope.createOrganization = createOrganization;
	}

	function createOrganization () {
		
	}

	function getInstructors() {
		var instructors = [];
		for(var i=1; i<=3; i++) {
			var instructor = {
				name: format('name{}', i),
				desc: format('instructor{}', i),
				image: format('images/profile{}.jpg', i)
			};

			instructors.push(instructor);
		}
		return instructors;
	}

	function format() {
	  var fmtstring = arguments[0],
	      length = arguments.length,
	      args = Array(length ? length - 1 : 0);

	  while (--length > 0) {
	    args[length - 1] = arguments[length];
	  }
	  args = args.reverse();

	  return fmtstring.replace(/{}/g, function() {
	    return args.pop();
	  });
	}

	organizationUi.init = init;
})();

function organizationCtrl ($scope) {
	organizationUi.init($scope);
}

angular.module('features.organization.organizationController', []).controller('OrganizationCtrl', organizationCtrl);