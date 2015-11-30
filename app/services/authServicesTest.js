var authServTest = angular.module('mazii.service.auth-test', []);

authServ.factory('authServTest', ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", "localstoreServ",
	function($rootScope, $q, $http, $timeout, $stateParams, $state, localstoreServ) {

	var service = {};

	function getInformationFacebook () {
		var deferred = $q.defer();
	    var ran = Math.random();

	    setTimeout(function () {
	    	var user = {
		    	email : 'test' + ran + '@gmail.com',
		    	name : 'test' + ran,
		    	id : ran
		    }

		    deferred.resolve(user);
	    }, 200);

	    return deferred.promise;

	}

	service.loginFacebook = function () {
		var deferred = $q.defer();
			
		setTimeout(function () {
	    	getInformationFacebook().then(function (data) { 
	    		deferred.resolve(data); 		
	    	});
	    }, 200);

       	return deferred.promise;

	}

	service.logoutFacebook = function () {
		localstoreServ.deleteItem('user');
		$rootScope.user = null;
	}

	service.init = function () {
		setTimeout(function () {
			var user = localstoreServ.getItem('user');

			if (user != null) {
				$rootScope.user = user;
				$rootScope.$broadcast('loadFBDone');
			} else {
				$rootScope.$broadcast('loadFBDone');
			}	
		}, 1000)
	}


	return service;

}]);