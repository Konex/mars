'use strict';

function authService ($http, ApiService, API_NAME, Session, ACCESS_LEVEL, _) {
    var authService = {};

    authService.signin = function (credentials) {
        return $http
        .get('scripts/common/stubs/me/signin/data.json', credentials)
        .then(function (res) {
            Session.create(res.data.value[0].sessionId, res.data.value[0].id, res.data.value[0].roles);
            return res.data;
        });
    };

    authService.signup = function (credentials) {
        var uri = ApiService.getApiUri(API_NAME.signup);

        $http.post(uri, credentials).success(function(response) {
                // If successful we assign the response to the global user model
                //$scope.authentication.user = response;

                // And redirect to the index page
                //$location.path('/');
            }).error(function(response) {
                //$scope.error = response.message;
            });
    }

    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (accessLevel) {
        if(accessLevel == ACCESS_LEVEL.ALL) return true; 

        var accessMaskSum = 0;
        _.each(Session.userRoles, function(userRole) {
            accessMaskSum += userRole && accessLevel; 
        });

        return (authService.isAuthenticated() && accessMaskSum > 0); 
    };

    return authService;
}

angular.module('common.security.auth', []).config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }
]).factory('AuthService', authService);