'use strict';

var dialogServ = angular.module('chat.dialog', []);

dialogServ.factory('dialogServ', ['$rootScope', '$ionicModal', '$q', 'localServ', function($rootScope, $ionicModal, $q, localServ){
	var service = {};

	service.showLogin = function (type) {
		var deferred = $q.defer();
        console.log(type);
        var user = localServ.getItem('user');
        $rootScope.showLoginModal = {};
        if (type == 'changeUsername') {
            $rootScope.showLoginModal.login = false;
            $rootScope.showLoginModal.username = user.username;
        } else {
            $rootScope.showLoginModal.login = true;
        }

        $ionicModal.fromTemplateUrl('template/modal/login.html', {
            scope: $rootScope,
            animation: 'mh-slide'
        }).then(function(modal) {
                $rootScope.ShowLoginModal = modal;
                modal.backdropClickToClose = false;
                modal.show();
            }).then(function (answer) {
	            }, function () {
	                deferred.reject();
	            });

        $rootScope.showLoginModal.showLoginClose = function(){
            delete  $rootScope.showLoginModal;
            $rootScope.ShowLoginModal.remove();
            deferred.resolve(null);
        }

        $rootScope.showLoginModal.showLoginSave = function(username, email){
        	var user  = {
        		username : username,
        		email : email
        	}
            delete  $rootScope.showLoginModal;
            $rootScope.ShowLoginModal.remove();
            deferred.resolve(user);
        }

        return deferred.promise;

	}

	return service;
}])