'use strict';

var auth = angular.module('common.security.auth', []);

auth.config([
    '$httpProvider',

    function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
}]);

auth.factory('AuthService', [
    '$http',
    'Session',
    'ACCESS_LEVEL',
    '_',

    function ($http, Session, ACCESS_LEVEL, _) {
    var authService = {};

    authService.signin = function (credentials) {
        return $http
        .get('scripts/common/stubs/me/signin/data.json', credentials)
        .then(function (res) {
            Session.create(res.data.value[0].sessionId, res.data.value[0].id, res.data.value[0].roles);
            return res.data;
        });
    };

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
}]);