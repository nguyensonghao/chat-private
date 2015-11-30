angular.module('mazii')


.directive('ngSetting', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/setting/setting-template.html',
        controller: ["$rootScope", "$scope", "$http", "localstoreServ", "$state", function ($rootScope, $scope, $http, localstoreServ, $state) {
            
        	$scope.furigana = localstoreServ.getItem('showFurigana');
            $scope.suggest = localstoreServ.getItem('showSuggest');

            $scope.showFurigana = function () {
            	localstoreServ.setItem('showFurigana', $scope.furigana);
            	$scope.$emit('changeShowFurigana', $scope.furigana);
            }

            $scope.showSuggestSearch = function () {
                localstoreServ.setItem('showSuggest', $scope.suggest);
                $scope.$emit('chaneShowSuggest', $scope.suggest);
            }
        }]
    }
})
