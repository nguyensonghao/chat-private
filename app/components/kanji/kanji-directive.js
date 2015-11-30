angular.module('mazii')


.directive('ngKanji', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/kanji/kanji-template.html',
        scope: {
            data: '=data'
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
            $scope.collapse = false;
            if ($scope.data != null && $scope.data.detail != null)
                $scope.details = $scope.data.detail.split("##");
            console.log($scope.details);


            $scope.getDetails = function () {
                $scope.details = $scope.data.detail.split("##");
                console.log($scope.details);
                return $scope.details;
            }

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

    	   $scope.showCollapse = function () {
                if ($scope.collapse == true) {
                    $('.list-collapse').slideUp(100);
                } else {
                    $('.list-collapse').slideDown(100);
                }
                $scope.collapse = !$scope.collapse;
            }

            $scope.setQueryType = function (query, type) {
                $rootScope.$broadcast("setQueryType", {query: query, type: type});
            }
        }]
    }
})
