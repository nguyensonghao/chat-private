'use strict';

angular.module('mazii')

.controller('AboutController', ['$rootScope', 'dictUtilSer', function ($rootScope, dictUtilSer) {

	$rootScope.title = 'Về Mazii';

	dictUtilSer.showTitlePage();
    
}]);