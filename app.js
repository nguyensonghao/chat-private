 SERVER_ADRESS = 'http://128.199.117.217:8989';
//SERVER_ADRESS = 'http://127.0.0.1:9500';
angular.module('App', [
    'ionic',
    'chat.home',
    'chat.dialog',
    'chat.local',
    'chat.ulti',
    'chat.pravite',
    'chat.navbar'
])


.config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", "$sceProvider", "$httpProvider", function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceProvider, $httpProvider) {
    
    $httpProvider.defaults.timeout = 5000;
    $sceProvider.enabled(false);
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    .state('home', {
        url: '/home',
        cache: false,
        views: {
            "main-content": {
                templateUrl: 'template/home/main.html',
                controller: 'HomeController'
            }
        }
    })

    .state('chatpravite', {
        url: '/home/:username/:email',
        cache: false,
        views: {
            "main-content": {
                templateUrl: 'template/pravite/main.html',
                controller: 'PraviteController'
            }
        }
    })

}])
    
