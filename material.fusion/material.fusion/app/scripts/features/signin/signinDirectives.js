(function() {
  'use strict';

  var signinDirectives = angular.module('features.signinDirectives', [])


  signinDirectives.directive('formAutofillFix', [
      '$timeout',

      function ($timeout) {
          return function (scope, element, attrs) {
              element.prop('method', 'post');
              if (attrs.ngSubmit) {
                $timeout(function () {
                      element
                      .unbind('submit')
                      .bind('submit', function (event) {
                      event.preventDefault();
                      element.find('input')
                      .triggerHandler('change')
                      .triggerHandler('keydown');
                      scope.$apply(attrs.ngSubmit);
                    });
                });
              }
          };
      }
  ]);


  signinDirectives.directive('signInDialog', [
      'AUTH_EVENTS',

      function (AUTH_EVENTS) {
        return {
          restrict: 'A',
          template: '<div ng-if="visible" ng-include="templates\'features\'me\'signin\'signin.html\'">',
          link: function (scope) {
            var showDialog = function () {
            scope.visible = true;
            };
            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
          }
        };
      }
  ]);


  // Use this when we want validation on blur out 
  signinDirectives.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$focused = false;
        element.bind('focus', function(evt) {
          element.addClass(FOCUS_CLASS);
          scope.$apply(function() {ctrl.$focused = true;});
        }).bind('blur', function(evt) {
          element.removeClass(FOCUS_CLASS);
          scope.$apply(function() {ctrl.$focused = false;});
        });
      }
    }
  }]);


  // TODO: wire it up for sign UP feature
  signinDirectives.directive('ensureUnique', [
      '$http', 
      '$timeout', 

      function($http, $timeout) {
          var checking = null;
          return {
              require: 'ngModel',
              link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function(newVal) {
                  if (!checking) {
                    checking = $timeout(function() {
                      $http({
                          method: 'POST',
                          url: '/api/signup/checkIfUsernameUnique' + attrs.ensureUnique,
                          data: {'field': attrs.ensureUnique}
                      }).success(function(data, status, headers, cfg) {
                          c.$setValidity('unique', data.isUnique);
                          checking = null;
                      }).error(function(data, status, headers, cfg) {
                          checking = null;
                      });
                    }, 500);
                  }
                });
              }
          }
      }
  ]);
})();