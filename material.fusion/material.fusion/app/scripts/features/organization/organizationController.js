'use strict';

var organizationCalendar = {};
(function() {
	var $scope, $q, eventCalendarService;

	function init(_scope, _q, _eventCalendarService) {
		setValues(_scope, _q, _eventCalendarService);
		//setDefaults(); 
		//loadData();
	}

	function setValues(_scope, _q, _eventCalendarService) {
		$scope = _scope;
		$q = _q;
		eventCalendarService = _eventCalendarService;
	}

	function setDefaults() {
		$scope.eventSources = $scope.events = [];
	}

	function loadData () {
		var promise = eventCalendarService.getAll();

		promise.then(function(data) {
		  if (!_.isEmpty(data)) { // TODO: remove null check.
		    $scope.events = data;
		    $scope.eventSources.push($scope.events);
		  }
		});
	}

  	organizationCalendar.init = init;
})();


var organization = {};
(function (){
	var $scope;

	function init(_$scope) {
		$scope = _$scope;
		
		setDefaults();
		wireHandlers();
	}

	function setDefaults() {
		$scope.instructors = getInstructors();
		$scope.calendarConfig = {eventType: 'organization'};
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

	organization.init = init;
})();

function organizationCtrl ($scope, $q, EventCalendarService) {
	organizationCalendar.init($scope, $q, EventCalendarService);  
	organization.init($scope);
}

angular.module('features.organization.organizationController', [])
.controller('OrganizationCtrl', organizationCtrl);