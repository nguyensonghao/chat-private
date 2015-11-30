'use strict';

angular.module('mazii')

.controller('HelpController', ['$rootScope', 'dictUtilSer', function ($rootScope, dictUtilSer) {

	$rootScope.title = 'Trợ giúp';
    
    if (typeof FB === 'undefined') {
    } else {
        FB.XFBML.parse();
    }
    
    $('#forward-to-chat').click(function(e) {
        document.getElementById('facebook-chat').scrollIntoView();
        e.preventDefault();    
    });

    dictUtilSer.showTitlePage();
    
}]);