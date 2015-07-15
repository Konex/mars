'use strict';

var ApiServiceConfig = {};
(function () {
	var apiEnv = {
		stub: 'stub',
		dev: 'dev',
		prod: 'prod'
	};

	var apiEnvConfig = {
		signin: apiEnv.dev,
		signup: apiEnv.dev,
		createOrganization: apiEnv.dev,
		getAllOrganization: apiEnv.dev
	};

	ApiServiceConfig.apiEnvConfig = apiEnvConfig;
})();
