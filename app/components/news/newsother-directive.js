angular.module('mazii')

.directive('ngNewsother', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/news/newsother-template.html',
        controller: ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", function($rootScope, $scope, $state, $timeout, maziiServ, dictUtilSer, historyServ) {
            $scope.clickID = -1;
           maziiServ.getHeadNews().then(function (data) {
		        $scope.lastestNews = data;
		        
		        var newId = data[0].value.id;
		        // query detail news
                $scope.clickID = newId;
		        maziiServ.getDetailNews(newId).then(function (data) {
		            $scope.currentNews = data;
		        })
		    });
            $scope.changeDetailNews = function (id) {
                if($scope.clickID == id){
                    return false;
                }
                $scope.clickID = id;
                $('.news-link>a').removeClass('news_active');
                $('.news-link>#' + id).addClass('news_active');
                $rootScope.$broadcast("changeDetailNews", {id: id});
                if (newsReadIds.indexOf(id) == -1) {
                    newsReadIds.push(id);
                    localStorage.setItem("news_read", JSON.stringify(newsReadIds));
                }
                
            }
            $scope.getNewsReadClass = function (id) {
                var className;
                if ($scope.clickID == id) {
                    className = 'news_active';
                }else{
                    className = newsReadIds.indexOf(id) != -1 ? 'news_read' : '';
                }
                return className;
            }
            var newsReadIds = JSON.parse(localStorage.getItem("news_read"));
            if (newsReadIds == null) {
                newsReadIds = [];
            }
        }]
    }
})