angular.module('mazii')


.directive('ngVerbConjugtion', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        templateUrl: 'components/verb-conjugtion/verb-conjugtion-template.html',
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
        }]
    }
});