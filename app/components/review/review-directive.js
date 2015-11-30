angular.module('mazii')


.directive('ngReview', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/review/review-template.html',
        scope: {
            type: '=type'
        },
        controller: ["$rootScope", "$scope", "$http", "historyServ", "$state", function ($rootScope, $scope, $http, historyServ, $state) {
            
            $scope.history = historyServ.get();
            $scope.search = function (type, query) {
                
                $rootScope.$broadcast("query", { type: type, query: query });
            }
            
            $scope.words = ['頑張る'];
            $scope.kanjis = ['忍'];
            
            
            if ($scope.history == null)
                return;
            
            for (var i = 0; i < $scope.history.length; i++) {
                
                if (type == 'word') {
                    // get list word in the past
                    if ($scope.history[i].type == 'word') {
                        $scope.words.push($scope.history[i].query);
                    }    
                
                } else if (type == 'kanji') {
                    // get list kanji in the past
                    if ($scope.history[i].type == 'kanji') {
                        $scope.kanjis.push($scope.history[i].query);
                    }    
                }
            }
            
            
            
        }]
    }
})