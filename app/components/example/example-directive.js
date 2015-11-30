angular.module('mazii')


.directive('ngExample', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/example/example-template.html',
        scope: {
            data: '=data',
            index: '@'
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
            if (dictUtilSer.isJapanese($scope.data.mean)) {
                $scope.isJapanese = false;
                $scope.mergeExample = dictUtilSer.mergeKanjiAndHiragana($scope.data.mean, $scope.data.transcription);
            } else {
                $scope.isJapanese = true;
                $scope.mergeExample = dictUtilSer.mergeKanjiAndHiragana($scope.data.content, $scope.data.transcription);
            }
        }]
    }
})