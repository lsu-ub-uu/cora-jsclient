window.addEventListener("load", function() {
	var authInfo2 = {
		"userId" : "Webredirect fake login",
		"token" : "fd6d7fab-6c90-4cc1-a699-46134cb25937",
		"validForNoSeconds" : "600",
		"actionLinks" : {
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://localhost:8080/login/rest/apptoken/141414"
			}
		}
	};
	window.opener.jsClient.getDependencies().globalInstances.loginManager
			.authInfoCallback(authInfo2);
	window.opener.focus();
	window.close();
});

export {};
