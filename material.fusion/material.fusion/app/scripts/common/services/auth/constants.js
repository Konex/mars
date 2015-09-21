(function() {
    'use strict';

    var authConstants = angular.module('common.services.auth.constants', []);

    authConstants.constant('AUTH_EVENTS', {
        signinSuccess: 'auth-login-success',
        signinFailed: 'auth-login-failed',
        signoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    authConstants.constant('USER_ROLES', {
        all: 1,
        member: 2,
        friend: 4,
        admin: 8
    });

    var USER_ROLES = {
        all: 1,
        member: 2,
        friend: 4,
        admin: 8
    };

    authConstants.constant('ACCESS_LEVEL', {
        ALL:     USER_ROLES.all |
                 USER_ROLES.member |
                 USER_ROLES.friend |
                 USER_ROLES.admin,
        MEMBER:  USER_ROLES.member |
                 USER_ROLES.admin, 
        FRIEND:  USER_ROLES.friend |
                 USER_ROLES.admin,
        ADMIN:   USER_ROLES.admin       
    });
})();