var initSearchCtrl = false;
SERVER_ADRESS = 'http://crazyjapanese.com:8989';

// Declare app level module which depends on views, and components
angular.module('mazii', [
  'ui.router',
  'mazii.service.history',
  'mazii.service.note',
  'mazii.service.util',
  'mazii.service.search',
  'mazii.service.auth',
  'mazii.service.auth-test',
  'ngAudio',
  'ngSanitize'
  //'templates-main'
])

.config(["$stateProvider", "$urlRouterProvider", "$sceProvider", function($stateProvider, $urlRouterProvider, $sceProvider) {
    
    $urlRouterProvider.otherwise('search');
    $urlRouterProvider.when("/search?type&query", function ($match, $stateParams) {
        if (initSearchCtrl) {
            return true;
        }
        
        return false;
    });
    
    
    $stateProvider

    .state('/', {
        url: '/',
        abstract: true,
    })
    
    .state('search', {
        url: '/search?type&query',
        views: {
            "main": {
                templateUrl: 'views/search/main.html',
                controller: 'SearchController'
            },
            "right": {
                templateUrl: 'views/search/right.html'
            }
        }
    })
    
    .state('news', {
        url: '/news',
        views: {
            "main": {
                templateUrl: 'views/news/main.html',
                controller: 'NewsController'
            },
            "right": {
                templateUrl: 'views/news/right.html',
            }
        }
    })
    
    .state('jlpt', {
        url: '/jlpt',
        views: {
            "main": {
                templateUrl: 'views/jlpt/main.html',
                controller: 'JLPTController'
            },
            "right": {
                templateUrl: 'views/jlpt/right.html'
            }
        }
    })
    .state('note', {
        url: '/note',
        views: {
            "main": {
                templateUrl: 'views/note/main.html',
                controller: 'NoteController'
            },
            "right": {
                templateUrl: 'views/note/right.html'
            }
        }
    })

    .state('write', {
        url: '/write',
        views: {
            "main": {
                templateUrl: 'views/write/main.html',
                controller: 'WriteController'
            },
            "right": {
                templateUrl: 'views/write/right.html'
            }
        }
    })
    
    .state('help', {
        url: '/help',
        views: {
            "main": {
                templateUrl: 'views/help/main.html',
                controller: 'HelpController'
            }
        }
    })
    
    .state('about', {
        url: '/about',
        views: {
            "main": {
                templateUrl: 'views/about/main.html',
                controller: 'AboutController'
            }
        }
    })

    .state('chat', {
        url: '/chat',
        views: {
            "main": {
                templateUrl: 'views/chat/main.html',
                controller: 'ChatController'
            }
        }
    })

    .state('term', {
        url: '/term',
        views: {
            "main": {
                templateUrl: 'views/term/main.html',
                controller: 'TermController'
            }
        }
    });
    
    $sceProvider.enabled(false);
}])

.run(["$rootScope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "$stateParams", "$location", "authServ", "authServTest",
 function($rootScope, $state, $timeout, maziiServ, dictUtilSer, historyServ, $stateParams, $location, authServ, authServTest) {
    
    // Load facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '507429472761274',
          xfbml      : true,
          version    : 'v2.5'
        });

        authServ.init();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $rootScope.getState = function (state) {
        if ($state.current.name == state) {
            return "active";
        } else {
            return "";
        }
    }
    
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        if (from.name == 'search') {
            initSearchCtrl = false;
        }
        
        if (to.name !== 'search') {
            $rootScope.enableInstantView = true;
        } else {
            $rootScope.enableInstantView = false;
        }
        
        setLayout();
    });
    
    $rootScope.noResults = false;
    $rootScope.examples = null;
    $rootScope.words = null;
    $rootScope.kanjis = null;
    $rootScope.grammars = null;
    $rootScope.tabSelected = 0;
    $rootScope.showLoading = false;
    $rootScope.currentKanjiSelected = 0;
    
    $rootScope.showKanjiDraw = false;
    $rootScope.showKanjiDrawTable = function () {
        $rootScope.showKanjiDraw = !$rootScope.showKanjiDraw;
    }
    
    $rootScope.$on("query", function (event, data) {
        
        if (data == null)
            return;
        
        // not working in search screen
        if ($state.current.name == "search" && (data.type == "word" || data.type == "kanji" || data.type == "grammar")) {
            return;
        }
        
        if (data.query == null) {
            $rootScope.startQuery(data, true);
        } else {
            $rootScope.setTabByChar(data.type[0]);
            if (data.type != 'grammarDetail') {
                $rootScope.startQuery(data.query, true);
            } else {
                $rootScope.queryGrammarDetail(data.query);
            }
        }
        
        // show modal
        $("#instant-search").modal();
        
    });
    
    $rootScope.lang = "JA";
    $rootScope.changeLang = function () {
        if ($rootScope.lang == "JA") {
            $rootScope.lang = "VI"
        } else {
            $rootScope.lang = "JA";
        }
    }
    
    $rootScope.queryGrammarDetail = function (grammarId) {
        
        $rootScope.noResults = false;
        $rootScope.examples = null;
        $rootScope.words = null;
        $rootScope.kanjis = null;
        $rootScope.grammars = null;
        $rootScope.grammarDetail = null;
        $rootScope.suggest = null;
        $rootScope.googleTranslate = null;
        
        maziiServ.search("grammar_detail", grammarId).then (function (data) {
            $rootScope.titleInstantSearch = "Tra nhanh ngữ pháp: ";
            $rootScope.grammarDetail = data;
            $rootScope.noResults = false;
        })
        
    }
    
    $rootScope.startQuery = function (query) {
        $rootScope.noResults = false;
        $rootScope.examples = null;
        $rootScope.words = null;
        $rootScope.kanjis = null;
        $rootScope.grammars = null;
        $rootScope.grammarDetail = null;
        $rootScope.suggest = null;
        $rootScope.googleTranslate = null;
        
        var inputIsVietnamese = false;
        if (dictUtilSer.isJapanese(query) == false) {
            if (!dictUtilSer.isVietnamese(query) && forceVietnamese == null) {

                // check auto capital first letter
                if (query[0] == query[0].toUpperCase() &&
                   query[1] == query[1].toLowerCase()) {
                   query = query.toLowerCase();
                }

                query = wanakana.toKana(query);
            } else {
                query = query.toLowerCase();
                inputIsVietnamese = true;
            }
        }
        
        if ($rootScope.tabSelected == 0) {
            $rootScope.titleInstantSearch = "Tra nhanh từ vựng: " + query;
            historyServ.push(query, "word", inputIsVietnamese ? "VI" : "JA");
            
            var dict = "javi";
            if (inputIsVietnamese) {
                dict = "vija";
            }
            
            maziiServ.search("word", query).then(function (data) {
                
                var from = 'ja';
                var to = 'vi';
                
                if (inputIsVietnamese) {
                    from = 'vi';
                    to = 'ja';
                } else {
                    from = 'ja';
                    to = 'vi';
                }
                
                if (data.status == 200) {
                                    
                    // select words match
                    if (data.found == false) {
                        $rootScope.suggest = data.data;
                    } else {
                        
                        if ($rootScope.lang != "JA") {
                            from = 'vi'
                            to = 'ja';
                        } else {
                            from = 'ja';
                            to = 'vi';
                        }
                        
                        $rootScope.words = [];
                        $rootScope.suggest = [];
                        
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].word == query) {
                                $rootScope.words.push(data.data[i]);
                            } else {
                                $rootScope.suggest.push(data.data[i]);
                            }
                        }
                    }
                    
                    $rootScope.showLoading = false;
                } else {
                    $rootScope.words = null;
                    $rootScope.showLoading = false;
                    
                    if ($rootScope.lang != "JA") {
                        from = 'vi'
                        to = 'ja';
                    } else {
                        from = 'ja';
                        to = 'vi';
                    }
                }
                
                maziiServ.googleTranslate(query, from, to).then(function (data) {
                    $rootScope.googleTranslate = data;
                    if ($rootScope.$$phase == null)
                        $rootScope.$apply();
                })
                
            }, function (err) {
                $rootScope.words = null;
                $rootScope.showLoading = false;
                $rootScope.noResults = true;
            });
            
        } else if ($rootScope.tabSelected == 1) {
            $rootScope.titleInstantSearch = "Tra nhanh hán tự: " + query;
            
            
            maziiServ.search("kanji", query).then(function (data) {
                $rootScope.currentKanjiSelected = 0;
                if (data.status == 200) {
                    var kanjis = dictUtilSer.getKanjiChara(query);
                    
                    $rootScope.kanjis = dictUtilSer.sortHVDataByKeyWord(kanjis, data.results);
                    $rootScope.showLoading = false;
                    historyServ.push(query, "kanji");
                } else {
                    $rootScope.kanjis = null;
                    $rootScope.showLoading = false;
                    $rootScope.noResults = true;
                }

            }, function (err) {
                $rootScope.kanjis = null;
                $rootScope.showLoading = false;
                $rootScope.noResults = true;
            });
            
        } else if ($rootScope.tabSelected == 3) {
            $rootScope.titleInstantSearch = "Tra nhanh ngữ pháp: " + query;
            
            maziiServ.search("grammar", query).then(function (data) {
                if (data.status == 200) {
                    $rootScope.grammars = data.results;
                    $rootScope.showLoading = false;
                    historyServ.push(query, "grammar");
                } else {
                    $rootScope.grammars = null;
                    $rootScope.showLoading = false;
                    $rootScope.noResults = true;
                }

            }, function (err) {
                $rootScope.grammars = null;
                $rootScope.showLoading = false;
                $rootScope.noResults = true;
            });
            
            
        } else if ($rootScope.tabSelected == 2) {
            
            maziiServ.search("example", query).then(function (data) {
                if (data.status == 200) {
                    $rootScope.examples = data.results;
                    $rootScope.showLoading = false;
                    historyServ.push(query, "example");
                } else {
                    $rootScope.examples = null;
                    $rootScope.showLoading = false;
                    $rootScope.noResults = true;
                }

            }, function (err) {
                $rootScope.examples = null;
                $rootScope.showLoading = false;
                $rootScope.noResults = true;
            });
        }
    };
    
    $rootScope.changeKanjiShow = function (index) {
        $rootScope.currentKanjiSelected = index;
    }
    
    $rootScope.getCurrentKanji = function () {
        return $rootScope.kanjis[$rootScope.currentKanjiSelected];
    }
    
    $rootScope.kanjiSeletectClass = function ($index) {
        if ($rootScope.currentKanjiSelected == $index) {
            return "selected";
        }
        
        return "";
    }
    
    $rootScope.getCurrentType = function () {
        switch ($rootScope.tabSelected) {
            case 0:
                return "w";
            case 1:
                return "k";
            case 2:
                return "s";
            case 3:
                return "g";
        }
        
        return "w";
    }
    
    $rootScope.setTabByChar = function (c) {
        if (c == null || c == "") {
            $rootScope.tabSelected = 0;
        } else {
            if (c == "w") {
                $rootScope.tabSelected = 0;
            } else if (c == "k") {
                $rootScope.tabSelected = 1;
            } else if (c == "e") {
                $rootScope.tabSelected = 2;
            } else if (c == "g") {
                $rootScope.tabSelected = 3;
            } else if (c == "s") {
                $rootScope.tabSelected = 2;
            }
        }
    }

    $rootScope.report = {};
    $rootScope.alert = {};
    $rootScope.report.send = function (comment) {
        if (comment == null || comment == '') {
            $rootScope.report.noComment = true;
        } else {
            
            if ($rootScope.report.id == null ||
               $rootScope.report.type == null) {
                $("#reportModal").modal('hide');
                    $rootScope.showAlert("Báo lỗi không thành công, bạn hãy thử lại.");
            }
            
            // send to server
            var ReportWrong = Parse.Object.extend("ReportWrong");
            var report = new ReportWrong();
            
            report.save({
                entryId: $rootScope.report.id,
                type: $rootScope.report.type,
                comment: $rootScope.report.comment,
                entry: $rootScope.report.entry
            }, {
                success: function(results) {
                    $("#reportModal").modal('hide');
                    $rootScope.showAlert("Cảm ơn bạn. Chúng tôi sẽ xem xét và sửa lại nội dung này.");
                },
                error: function(results, error) {
                    $("#reportModal").modal('hide');
                    $rootScope.showAlert("Báo lỗi không thành công, bạn hãy thử lại.");
                }
            })
        }
        
    };
    
    $rootScope.showAlert = function (message) {
        $rootScope.alert.message = message;
        $("#alertModal").modal();
    }
    
    var setLayout = function () {
        var stateName = $state.current.name;
        var view1 = '', view2 = '', view3 = '';
        if(stateName == 'search' || stateName == 'write' || stateName == 'term'){
            view1 = 'col-md-12 col-xs-12';
            view2 = 'col-md-3 col-lg-3';
            view3 = 'col-md-3 col-lg-3';
        } else if (stateName == 'news') {
            view1 = 'col-md-8 col-lg-8';
            view2 = 'col-md-4 col-lg-4';
            view3 = '';
        } else if (stateName == 'note') {
            view1 = 'col-md-6 col-lg-6';
            view2 = 'col-md-6 col-lg-6';
            view3 = 'col-md-3 col-lg-3';
        } else if (stateName == 'help' || stateName == 'about') {
            view1 = 'col-md-12 col-lg-12';
            view2 = '';
            view3 = '';
        } else if (stateName == 'jlpt') {
            view1 = 'col-md-12 col-xs-12';
            view2 = 'col-md-3 col-lg-3';
            view3 = 'col-md-3 col-lg-3';
        } else if (stateName == 'chat') {
            view1 = 'col-md-12 col-xs-12';
            view2 = 'col-md-3 col-lg-3';
            view3 = 'col-md-3 col-lg-3';
        } else {
            view1 = 'col-md-6 col-lg-6';
            view2 = 'col-md-3 col-lg-3';
            view3 = 'col-md-3 col-lg-3';
        }
        
        $("#view1").attr("class", view1);
        $("#view2").attr("class", view2);
        $("#view3").attr("class", view3);
        
        console.log("set layout");
    }

    function isMobileDevice() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }

        return false;
    }
    
    function registerEventForChatBox() {
    
        // remove chat if is mobile device
        if (isMobileDevice()) {
            $("#chat-module").html("");
            $("#chat-module").addClass("removed");
        } else {
            $("#chat-module").removeClass("removed");
        }

        $(".chat-box-control .suggest-chat-close").click(function (e) {
            $("#chat-module").html("");
            $("#chat-module").addClass("removed");
        });

        $(".chat-title").click(function (e) {
            $("#chat-module").removeClass("hide-chat");
        });

        $(".chat-close").click(function (e) {
            $("#chat-module").addClass("hide-chat");
        });
    }

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        if (to.name == 'search') {
            $rootScope.showButtonHistory = true;
        } else {
            $rootScope.showButtonHistory = false;
        }

        var elementMenu = $('.menu-left li a[href="#'+to.name+'"]');
        $('.menu-left li').removeClass('menu-left-active');
        elementMenu.parent().addClass('menu-left-active');

        dictUtilSer.closePanel();
    });
    
    registerEventForChatBox();
    
    Parse.initialize("GnmiBlYGB7SXRQZjRTYrWFx2LgXccdjaTiRtDIos", "gcTf8iCxURq0XTuwvrLmKUKYbrHelJphX8b3dm4E");
}])



.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.directive('focusMe', ["$timeout",
    function ($timeout) {
        return {
            link: function (scope, element, attrs) {

                $timeout(function () {
                    element[0].focus();
                }, 500);
            }
        };
}]);
