'use strict';

function signupController ($scope, $http, AuthService) {
	$scope.authentication = AuthService;

	if (AuthService.user) $state.go('tab.me');

	$scope.signup = function() {
		$http.post('/auth/signup', $scope.credentials).success(function(response) {
			// If successful we assign the response to the global user model
			$scope.authentication.user = response;

			$state.go('tab.me');
		}).error(function(response) {
			$scope.error = response.message;
		});
	};
}

angular.module('features.signupController').controller('SignupController', signupController);