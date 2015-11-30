angular.module('mazii')


.directive('ngGoogleTranslate', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        templateUrl: 'components/google-translate/google-translate-template.html',
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
        }]
    }
});