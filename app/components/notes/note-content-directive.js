angular.module('mazii')


.directive('ngNoteContent', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/notes/note-content-template.html',
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", function ($rootScope, $scope, $http, noteServ, $state) {
            
            $scope.category = noteServ.getCategory();

            $scope.cate = '';
            $scope.query = '';
            $scope.type = '';
            $scope.grammarID = '';

            $scope.saveNoteMe = function (cate) {
                console.log('ID', $scope.grammarID);
                if($scope.grammarID != ''){
                    console.log('ID', $scope.grammarID);
                    noteServ.pushGrammar(cate, $scope.query, $scope.type, $scope.grammarID);
                }else if($scope.query != '' && $scope.type != ''){
                    console.log('Vao test', $scope.grammarID);
                    noteServ.pushNote(cate, $scope.query, $scope.type);
                }
                $scope.cate = '';
                $scope.query = '';
                $scope.type = '';
                $scope.grammarID = '';
                $("#myNote").modal('hide');
            }

            $scope.$on("setQueryType", function (event, data) {
                // console.log('okemen', data.query,data.type);
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

            $scope.getTime = function (date) {
                var time = new Date(date);
                return time.toDateString();
            }
        }]
    }
})