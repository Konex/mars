'use strict';
var homeController = angular.module('features.homeController', []);


var homeUi = {};
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
		
	}

	homeUi.init = init;

})();


homeController.controller('HomeCtrl', [
	'$scope',

	function($scope) {
  		homeUi.init($scope);
	}
]);