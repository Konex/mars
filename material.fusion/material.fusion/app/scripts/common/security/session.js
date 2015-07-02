'use strict';

function session () {
    this.create = function (sessionId, userId, userRoles) {
        this.id = sessionId;
        this.userId = userId;
        this.userRoles = userRoles;
    };
    
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRoles = null;
    };
    return this;
}

angular.module('common.security.session', []).service('Session', session);