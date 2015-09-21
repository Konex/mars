(function() {
    'use strict';

    function signInCtrl ($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
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
    }

    angular.module('features.signinController', []).controller('SignInCtrl', signInCtrl);
})();