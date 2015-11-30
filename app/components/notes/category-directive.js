angular.module('mazii')


.directive('ngCategory', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/notes/category-template.html',
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", function ($rootScope, $scope, $http, noteServ, $state) {
            $scope.nameCategory = '';
            $scope.cate = '';
            $scope.query = '';
            $scope.type = '';
            $scope.grammarID = '';
            $scope.saveCategory = function () {
                if($scope.nameCategory != ''){
                    noteServ.pushCategory($scope.nameCategory);
                    noteServ.pushNote($scope.nameCategory, $scope.query, $scope.type);
                }
                $scope.nameCategory = '';
                $scope.cate = '';
                $scope.query = '';
                $scope.type = '';
                $("#myCategory").modal('hide');
            }

            $scope.saveNoteMe = function (cate) {
                if($scope.grammarID != ''){
                    noteServ.pushGrammar(cate, $scope.query, $scope.type, $scope.grammarID);
                }else if($scope.query != '' && $scope.type != ''){
                    noteServ.pushNote(cate, $scope.query, $scope.type);
                }
                $scope.cate = '';
                $scope.query = '';
                $scope.type = '';
                $scope.grammarID = '';
                $("#myNote").modal('hide');
            }

            $scope.$on("setQueryType", function (event, data) {
                if(data.query != '' || data.query != null){
                    $scope.query = data.query;
                }
                if(data.type != '' || data.type != null){
                    $scope.type = data.type;
                }
            });

            $scope.$on("setQueryGrammar", function (event, data) {
                if(data.query != '' || data.query != null){
                    $scope.query = data.query;
                }
                if(data.type != '' || data.type != null){
                    $scope.type = data.type;
                }
                if(data.id != '' || data.id != null){
                    $scope.grammarID = data.id;
                }
            });
            
            $scope.$on("set", function (event, data) {
                if(data.query != '' || data.query != null){
                    $scope.query = data.query;
                }
                if(data.type != '' || data.type != null){
                    $scope.type = data.type;
                }
            });

        }]
    }
})