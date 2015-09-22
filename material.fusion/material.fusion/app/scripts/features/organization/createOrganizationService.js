(function() {
	'use strict';

	function createOrganizationService ($http, $q, ApiService, API_NAME, Session, HOME_RESOURCE) {
		this.create = function(organization) {
			var deferred = $q.defer();
	        
			if (!Session.user) {
				deferred.reject(HOME_RESOURCE.USER_UNAUTHENTICATED);
			} else {
				organization.owner = user;
				var uri = ApiService.getApiUri(API_NAME.createOrganization);

		        $http.post(uri, organization).success(function(response) {                    
		                deferred.resolve(response);
		            }).error(function(response) {
		                deferred.reject(response.message);
		            });	
			}

	        return deferred.promise;
		};

		return this;
	}

	angular.module('features.organization.createOrganizationService' ,[]).service('CreateOrganizationService', createOrganizationService);

	createOrganizationService.$inject = ['$http', '$q', 'ApiService', 'API_NAME', 'Session', 'HOME_RESOURCE'];	
})();