'use strict';

function authService ($http, $q, ApiService, API_NAME, Session, ACCESS_LEVEL, _) {
    var authService = {};

    authService.signin = function (credentials) {
        var deferred = $q.defer();
        var uri = ApiService.getApiUri(API_NAME.signin);

        $http.post(uri, credentials).success(function(response) {            
                Session.user(response);
                deferred.resolve(response);
            }).error(function(response) {
                deferred.reject(response.message);
            });

        return deferred.promise;    
    };

    authService.signup = function (credentials) {
        var deferred = $q.defer();
        var uri = ApiService.getApiUri(API_NAME.signup);
        
        $http.post(uri, credentials).success(function(response) {
                Session.user(response);
                deferred.resolve(response);
            }).error(function(response) {
                deferred.reject(response.message);
            });

        return deferred.promise;    
    }

    authService.isAuthenticated = function () {
        return !!Session.userId || Session.user;
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

angular.module('common.services.auth.authService', []).config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }
]).factory('AuthService', authService);