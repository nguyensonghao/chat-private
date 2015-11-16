'use strict';

var ultiServ = angular.module('chat.ulti', []);

ultiServ.service('ultiServ', ['$ionicLoading', function($ionicLoading){
	var service = {};

	service.showLoading = function (state) {
		if (state) {
			$ionicLoading.show();
		} else {
			$ionicLoading.hide();
		}
	}

	return service;

}]);
