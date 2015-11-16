'use strict';

var dialogServ = angular.module('chat.dialog', []);

dialogServ.factory('dialogServ', ['$rootScope', '$ionicModal', '$q', 'localServ', function($rootScope, $ionicModal, $q, localServ){
	var service = {};

	service.showLogin = function () {
		var deferred = $q.defer();
        var user = localServ.getItem('user');
        $rootScope.showLoginModal = {};
        if (user == null) {
            $rootScope.showLoginModal.disabledEmail = false;
        } else {
            $rootScope.showLoginModal.disabledEmail = true;
            $rootScope.showLoginModal.username = user.username;
            $rootScope.showLoginModal.email = user.email;
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