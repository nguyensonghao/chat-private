angular.module('mazii')


.directive('ngSynonyms', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        templateUrl: 'components/synonyms/synonyms-template.html',
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
            
            $scope.searchThis = function (query) {
                $rootScope.$broadcast("query", query);
            }
            
        }]
    }
});