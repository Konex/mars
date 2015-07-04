'use strict';

function apiService (API_ENV_BASE_URI, API_ROUTE, API_NAME) {
	this.getApiUri = function (apiName) {
		var env = ApiServiceConfig.apiEnvConfig[apiName];
		return API_ENV_BASE_URI[env] + API_ROUTE[apiName] 
	};

	return this;
}

angular.module('common.services.api.apiService', []).service('ApiService', apiService);