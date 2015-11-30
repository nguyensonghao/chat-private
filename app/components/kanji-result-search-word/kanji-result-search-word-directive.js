angular.module('mazii')

.directive('ngKanjiResultSearchWord', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/kanji-result-search-word/kanji-result-search-word-template.html',
        scope: {
            data: '=data'
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
            $scope.collapse = false;
            if ($scope.data != null && $scope.data.detail != null)
                $scope.details = $scope.data.detail.split("##");
            $scope.getTitle = function () {
                    $scope.title = '';
                    var details = $scope.data.detail.split("##");
                    for (var i = 0; i < details.length; i++) {
                        var sen = details[i];
                        for (var j = 0; j < sen.length; j++) {
                            if (sen[j] == '.') {
                                $scope.title += sen.substr(0, j + 1) + ' ';
                                break;
                            }
                        }
                    }
                    
                    return $scope.title;
                }

            $scope.search = function (query) {
                $rootScope.$broadcast("searchKanji", query);
            }

            $scope.viewDetail = function (query) {
                $rootScope.$broadcast("searchKanji", query);   
            }
        }]
    }
})
