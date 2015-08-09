'use strict';
 
function busService ($rootScope) {
               
                this.emitMsg = function(msg) {
                $rootScope.$emit(msg);
                };
 
                this.onMsg = function(msg, scope, func) {
    var unbind = $rootScope.$on(msg, func);
                scope.$on('$destroy', unbind);
                };
               
                return this;
}
 
 
angular.module('common.services.messaging.busService', [])
.service('BusService', busService);
 
 

// usage: 
//BusService.emitMsg('myEventName');

// BusService.onMsg('myEventName', $scope, function() {
//    var dummy = 'do you what you need to do here';
// });