var authServ = angular.module('mazii.service.auth', []);

authServ.factory('authServ', ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", function($rootScope, $q, $http, $timeout, $stateParams, $state) {

	var service = {};

	function getInformationFacebook () {
		var deferred = $q.defer();

		FB.api('/me', function(response) {
			var email = response.email;
			if (typeof(email) ==  'undefined' ||email == null || email == '') {
				response.email = response.id + '@gmail.com';
			}
	        deferred.resolve(response);
	    });

	    return deferred.promise;

	}

	service.loginFacebook = function () {
		var deferred = $q.defer();

		FB.login(function(response) {
			if(response.status === 'connected') {
	        	getInformationFacebook().then(function (data) {
	       			deferred.resolve(data); 		
	        	});
	       	} else {
	       		deferred.resolve(null); 		
	       	}
       	});

       	return deferred.promise;

	}

	service.logoutFacebook = function () {
		FB.logout();
	}


	service.init = function () {
		FB.getLoginStatus(function(response) {
		    if (response.status === 'connected') {
		    	getInformationFacebook().then(function (data) {
		    		var email = data.email;
		    		if (email == null || email == '') {
		    			data.email = data.id + '@gmail.com';
		    		}
		    		$rootScope.user = data;
		    		$rootScope.$broadcast('loadFBDone');
		    	})
		    } else {
		    	$rootScope.$broadcast('loadFBDone');
		    }
		});

	}


	return service;

}]);