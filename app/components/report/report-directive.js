angular.module('mazii')


.directive('ngReport', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/report/report-template.html',
        scope: {
            data: '=data',
            type: '@'
        },
        controller: ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
            $scope.showReportDialog = function () {
                
                var type = $scope.type;
                var id = '';
                var entry = '';
                if (type == 'grammar') {
                    id = $scope.data._id;
                    entry = $scope.data.title;
                } else if (type == 'kanji') {
                    id = $scope.data._id;
                    entry = $scope.data.kanji;
                } else if (type == 'word') {
                    id = $scope.data._id;
                    entry = $scope.data.word;
                } else if (type == 'grammarDetail') {
                    type = 'grammar';
                    id = $scope.data._id;
                    entry = $scope.data.title;
                }
                
                $rootScope.report.type = type;
                $rootScope.report.entry = entry;
                $rootScope.report.id = id;
                $rootScope.report.comment = '';
                
                // show modal
                $("#reportModal").modal({ backdrop: 'static'   });
            }
            
        }]
    }
});