'use strict';

var signinController = angular.module('features.signinController', []);

signinController.controller('SignInCtrl', [
  '$scope', 
  '$rootScope',
  '$state', 
  'AUTH_EVENTS', 
  'AuthService',
  
  function($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {

    $scope.credentials = {username: '', password: ''};

     $scope.signin = function () {
        $scope.signInForm.submitted = false;
        if($scope.signInForm.$valid) {
            AuthService.signin($scope.credentials).then(function(data) {
                    $scope.user = data;    
                    $state.go('tab.home');
                }, function(error) {
                    $scope.error = error;
                });
        } else {
            $scope.signInForm.submitted = true;
        }
    };
}]);