'use strict';

var localServ = angular.module('chat.local', []);

localServ.service('localServ', [ function(){
	var service = {};

    service.setItem = function (key, value) {
        localStorage.setItem(key, angular.toJson(value))
    };

    service.getItem = function (key) {
        var result = localStorage.getItem(key);
        return angular.fromJson(result);
    };

    service.deleteItem = function (key) {
        localStorage.removeItem(key);
    };

    service.clear = function () {
        localStorage.clear();
    };

    return service;
}]);