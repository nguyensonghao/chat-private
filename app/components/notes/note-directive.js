angular.module('mazii')


.directive('ngNote', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/notes/note-template.html',
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", function ($rootScope, $scope, $http, noteServ, $state) {
            $scope.note = [];
            $scope.state = false;
            if(noteServ.getCategory().length > 0)
                $scope.note = noteServ.getNoteItem(noteServ.getCategory()[noteServ.getCategory().length - 1].category);
            $scope.search = function (type, query) {
                $rootScope.$broadcast("query", { type: type, query: query });
            }
            $scope.deleteNote = function (id) {
                noteServ.removeNote(id);
            }
            $scope.deleteGrammar = function (id) {
                noteServ.removeGrammar(id);
            }

            $scope.getDeleteState = function () {
                if($scope.state){
                    return '';
                }else{
                    return 'hidden-note-delete';
                }
            }

            $scope.showEditNote = function () {
                if($scope.state == false){
                    $scope.state = true;
                }else{
                    $scope.state = false;
                }
            }
            $scope.$on("getNoteItem", function (event, data) {
                if(data.cate == ''){
                    $scope.note = [];
                }else{
                    $scope.note = noteServ.getNoteItem(data.cate);
                }
            });

            $scope.getTime = function (date) {
                var time = new Date(date);
                return time.toDateString();
            }
        }]
    }
})