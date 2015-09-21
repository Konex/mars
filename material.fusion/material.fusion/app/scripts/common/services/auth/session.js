(function() {
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
            this.user = null;
        };

        this.user = function (user) {
            this.user = user
        };
        
        return this;
    }

    angular.module('common.services.auth.session', []).service('Session', session);
})();