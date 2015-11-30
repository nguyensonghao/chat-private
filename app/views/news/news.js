'use strict';

angular.module('mazii')

.controller('NewsController', ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", function($rootScope, $scope, $state, $timeout, maziiServ, dictUtilSer, historyServ, localstoreServ) {
    
    var positionX, positionY;

    $scope.showVideo = false;
    $rootScope.title = 'Đọc báo';
    var needReregisterEvent = false;
    $scope.$on("changeDetailNews", function (event, data) {
        // query detail news
        maziiServ.getDetailNews(data.id).then(function (data) {
            $scope.currentNews = data;
            $scope.showVideo = false;
            if (newsReadIds.indexOf(data._id) == -1) {
                newsReadIds.push(data._id);
                localStorage.setItem("news_read", JSON.stringify(newsReadIds));
            }
        });
    });
    
    $scope.playVideo = function () {
        $scope.showVideo = true;
    }
    
    $scope.getNewsReadClass = function (id) {
        var className = newsReadIds.indexOf(id) != -1 ? 'news_read' : ''; 
        return className;
    }
    
    $scope.checkLink = function (url) {
        if (url.indexOf("http") != -1) {
            return url;
        } else {
            var baseUrl = $scope.currentNews.link;
            var indexSplash = 0;
            for (var i = baseUrl.length - 1; i >= 0; i--) {
                if (baseUrl[i] == "/") {
                    indexSplash = i;
                    break;
                }
            }

            baseUrl = baseUrl.substring(0, indexSplash + 1);
            return baseUrl + url;
        }
    }
    
    $scope.getVideo = function () {
        if ($scope.isMobile()) {
            return '<video class="movie-news-sm movie-news-md" controls> \
                    <source src="https://nhkmovs-i.akamaihd.net/i/news/' + 
                        $scope.currentNews.content.video
                    + '/master.m3u8" type="video/mp4"> \
                    Your browser does not support the video tag. \
                    </video>';
        }
        
        return '<object type="application/x-shockwave-flash" data="http://www3.nhk.or.jp/news/player5.swf" class="movie-news-sm movie-news-md" id="news_image_div3" style="visibility: visible;"> \
            <param name="allowScriptAccess" value="sameDomain"> \
            <param name="allowFullScreen" value="true"> \
            <param name="wmode" value="direct"> \
            <param name="quality" value="high"> \
            <param name="bgcolor" value="#000000"> \
            <param name="flashvars" value="fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&amp;movie=' + $scope.currentNews.content.video +'"></object>';
    }

    $scope.getAudio = function () {
        var urlAudio = $scope.currentNews.content.audio;
        urlAudio = "http://www3.nhk.or.jp/news/easy/" + urlAudio.replace(".mp3", "") + "/" + urlAudio;
        return '<audio controls><source src="' + urlAudio + '" type="audio/mpeg"></audio>';
    }
    
    $scope.videoAvailable = function () {
        if (typeof device !== "undefined"
 && navigator.connection.type == Connection.NONE) {
            return false;
        }
        
        var link = $scope.currentNews.content.video;
        if (link == null ||
           link == '')
            return false;
        
        return true;
    }
    
    $scope.audioAvailable = function () {
        if (typeof device !== "undefined"
 && navigator.connection.type == Connection.NONE) {
            return false;
        }
        
        var link = $scope.currentNews.content.audio;
        if (link == null ||
           link == '')
            return false;
        
        return true;
    }
    
    $scope.imageAvailable = function () {
        if (typeof device !== "undefined"
 && navigator.connection.type == Connection.NONE) {
            return false;
        }
        
        var link = $scope.currentNews.content.image;
        if (link == null ||
           link == '')
            return false;
        
        return true;
    }

    $scope.isMobile = function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }

        return false;
    }
    
    maziiServ.getHeadNews().then(function (data) {
        $scope.lastestNews = data;
        
        var newId = data[0].value.id;
        // query detail news
        maziiServ.getDetailNews(newId).then(function (data) {
            $scope.currentNews = data;
        })
    });
    
    var newsReadIds = JSON.parse(localStorage.getItem("news_read"));
    if (newsReadIds == null) {
        newsReadIds = [];
    }
    
    $(document).on("click", "a.dicWin", function(e) {
        var unders = $(e.currentTarget).find(".under");
        var content = '';
        for (var i = 0; i < unders.length; i++) {
            content += unders[i].innerText;
        }
        
        content = content.trim();
        if (content == '')
            return;
        
        $rootScope.$broadcast("query", { type: 'word', query: content });
    });

    $scope.translate = function () {
        $rootScope.$broadcast("query", { type: 'word', query: $scope.text });
        $('.box-search').css('display', 'none');
    }

    $scope.selectText = function () {
        var Kolich;
        if(!window.Kolich){
            Kolich = {};
        }

        Kolich.Selector = {};
        Kolich.Selector.getSelected = function(){
            var t = '';
            if(window.getSelection){
                t = window.getSelection();
            }else if(document.getSelection){
                t = document.getSelection();
            }else if(document.selection){
                t = document.selection.createRange().text;
            }
            return t;
        }

        Kolich.Selector.mouseup = function(){
            var st = Kolich.Selector.getSelected();
            if(st!=''){
                $scope.text = st.toString();
                $('.box-search').css('display', 'block');
                $('.box-search').css('left', $scope.x - 100);
                $('.box-search').css('top', $scope.y - 200);
            }
        }

        $(document).ready(function(){
            $(document).bind("mouseup", Kolich.Selector.mouseup);
        });
    };

    $( document ).on( "mousemove", function( event ) {
        $scope.x = event.pageX;
        $scope.y = event.pageY;
    });

    // $('*').click(function (e) {
    //     if (!$(e.target).is(".box-search")) {
    //         $('.box-search').css('display', 'none');
    //     }
    // })

    var showFurigana = function () {
        var showFurigana = localstoreServ.getItem('showFurigana');
        if (showFurigana != null && showFurigana == false) {
            // add css to hide furigana
            $('body').append('<style id="setting_css">rt{display: none;}</style>');
        } else {
            $('#setting_css').remove();
        }
    }

    $rootScope.$on('changeShowFurigana', function(data){
        showFurigana();
    });
    $scope.selectText();
    showFurigana();
    
}]);
