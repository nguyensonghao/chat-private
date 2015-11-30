angular.module('mazii')

.directive('ngKanjiRecognize', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/kanji-recognize/kanji-recognize-template.html',
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function ($rootScope, $scope, $http, dictUtilSer) {
        
        setTimeout(function () {
            var kanjiWriter = new KanjiWriter({
                canvasId: "draw-canvas",
                colorDraw: "black",
                lineWidthDraw: 4,
                resultId: "#draw-kanji-result",
                clearButtonId: "#draw-clear",
                backButtonId: "#draw-back",
                classResult: "draw-kanji-suggest",
                resultClickCallback: function() {
                    var k = $(this).text();
                    if (k != null &&
                       k != "") {
                        $("#draw-clear").trigger("click");
                        $rootScope.$broadcast('insertQueryText', k);
                    }
                }
            });
            
        }, 100)    
        
            
            
        }]
    }
})
