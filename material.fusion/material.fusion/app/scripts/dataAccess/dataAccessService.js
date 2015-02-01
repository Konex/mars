'use strict';

var dataAccessService = angular.module('dataAccess.dataAccessService', []);

dataAccessService.factory('DataAccessService', [

	function () {

		

		return {
			get: get,
			getAll: getAll,
			set: set,
			remove: remove
		};
}]);