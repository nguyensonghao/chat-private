'use strict';

angular.module('chat.home', []).controller('HomeController', ['$scope', '$rootScope', '$ionicPopup', 'localServ', '$ionicPopover', 'dialogServ', 'ultiServ', '$state', '$ionicScrollDelegate',
    function ($scope, $rootScope, $ionicPopup, localServ, $ionicPopover, dialogServ, ultiServ, $state, $ionicScrollDelegate) {

    $scope.loadDone = false;
    ultiServ.showLoading(true);
    $scope.tab_active = 1;
    $scope.tab_1 = 'menu-active';
    $scope.formChat = {};
    $scope.listMessage = [];
    $scope.listUser = [];
    $scope.listMessageRecive = [];
    $scope.countMessage = 0;
    $scope.newMessage = 0;
    $scope.showloadMore = false;

    var showboxSetting = false;
    var socket = io.connect(SERVER_ADRESS);
    var user = localServ.getItem('user');
    var list_email_pravite = [];
    var indexMessage = 0; // Số thứ tự để load tin nhắn

    if (user != null) {
        socket.emit('reset-socket-user', user);
        socket.emit('get-list-message-private-in-public', user);
        socket.emit('get-list-data');
    }

    // Hàm nhận tin danh sách tin nhắn private từ server 

    socket.on('receive-list-message-private-in-public', function (message) {

        var size = $scope.listMessageRecive.length;
        if (size == 0) {
            $scope.listMessageRecive.push(message);
            list_email_pravite.push(message.your_email);
        } else {
            for (var i = 0; i < size; i++) {
                // Kiểm tra xem tin nhắn này đã có người gửi trước chưa
                if (list_email_pravite.indexOf(message.your_email) == -1) {
                    list_email_pravite.push(message.your_email);
                    $scope.listmessageReceive.push(message);
                    $scope.newMessage ++;
                } else {
                    // Kiểm tra xem tin nhắn có bị trùng không
                    var size_of_listMessageRecive = $scope.listMessageRecive.length;
                    var k = 0;
                    for (var j = 0; j < size; j++) {
                        var e = $scope.listMessageRecive[i];
                        if (e.your_email == message.your_email) {
                            // Bị trùng
                            $scope.listMessageRecive[j] = message;
                            k++;
                        }
                    }
                    if (k == 0) {
                        // Không bị trùng
                        if (message.status == 0 && message.flag == 1) {
                            // Nếu tin nhắn chưa được đọc thì là tin nhắn mới
                            $scope.newMessage ++;
                        }
                        $scope.listMessageRecive.push(message);
                    }
                }
            }
        }

        for (var i = 0; i < $scope.listMessageRecive.length; i++) {
            $scope.newMessage = 0;
            if ($scope.listMessageRecive[i].status == 0) {
                $scope.newMessage ++;
            }
        }
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    }); 

    $scope.change_tab = function (index) {
        $scope.tab_active = index;
        if (index == 1) {
            $scope.tab_1 = 'menu-active';
            $scope.tab_2 = $scope.tab_3 = '';
            $ionicScrollDelegate.scrollBottom();
        } else if (index == 2) {
            $scope.tab_2 = 'menu-active';
            $scope.tab_1 = $scope.tab_3 = '';
            $ionicScrollDelegate.scrollTop();
        } else {
            $scope.tab_3 = 'menu-active';
            $scope.tab_2 = $scope.tab_1 = '';
            $ionicScrollDelegate.scrollTop();
        }
    }

    $scope.changeUsername = function () {
        dialogServ.showLogin().then(function (data) {
            if (data == null)
                return;

            // Gửi tin nhắn có 1 user login
            socket.emit('user-join-public', data);
        });
    }

    $scope.showBoxSetting = function () {
        if (showboxSetting) {
            $('.box-setting').css('display', 'none');
            $('.cover').css('display', 'none');
        } else {
            $('.box-setting').css('display', 'block');
            $('.cover').css('display', 'block');
        }

        showboxSetting =  !showboxSetting;
    }

    $scope.formChat.sendChat = function () {
        var message = $('#enter-chat-message').val();
        if (message == null || message == '')
            return;

        if (user == null || user == '') {
            dialogServ.showLogin().then(function (data) {
                if (data == null)
                    return;

                // Gửi tin nhắn có 1 user login
                socket.emit('user-join-public', data);
            });
        } else {
            var msg = {
                user : user,
                message : message
            };
            // Gửi tin nhắn tới server 
            socket.emit('send-message-public', msg);
            $('#enter-chat-message').val('');
        }

    }


    // Chuyển sang màn hình pravite
    $scope.sendMessagePrivate = function (user) {
        $state.go('chatpravite', {
            username : user.username,
            email : user.email
        })
    }

    $scope.redirectMessagePravite = function (username, email) {
        // lưu lại trang thái đã đọc cho tin nhắn mới
        var data = {
            userSend : user,
            userReceive : {username : username, email : email}
        }
        socket.emit('read-message-private', data);
        $state.go('chatpravite', {
            username : username,
            email : email
        })
    }

    $scope.randomColor = function () {
        return list_color[Math.floor(Math.random() * list_color.length)];
    }

    // Lấy danh sách tin nhắn của hệ thống
    socket.on('get-list-message', function (list_message) {
        var size_of_list_message = list_message.length;
        $scope.listMessage = [];
        for (var i = 0; i < size_of_list_message; i++) {
            var message = {
                username : list_message[i].username.slice(0, 1).toUpperCase(),
                message : list_message[i].content
            }
            $scope.listMessage.unshift(message);
        }
        $scope.$apply();
    })

    // Lấy danh sách người dùng của hệ thống
    socket.on('get-list-user', function (list_user) {
        var size_of_list_user = list_user.length;
        $scope.listUser = [];
        $scope.$apply();
        for (var i = 0; i < size_of_list_user; i++) {
            var user_current = list_user[i];
            if (user == null || list_user[i].email != user.email) {
                $scope.listUser.push(user_current);    
            }
        }
        $scope.$apply();
        // $ionicScrollDelegate.scrollBottom(true);
    })

    // Người dùng đăng nhập thành công
    socket.on('login-success', function (user_resquest) {
        user = user_resquest;
        localServ.setItem('user', user);
        $ionicPopup.alert({
            title: 'Thông báo!',
            template: 'Đăng nhập thành công'
        });
    })

    // Thêm người dùng đăng nhập
    socket.on('add-user-public', function (user_current) {
        if (user == null || user_current.email != user.email) {
            $scope.listUser.push(user_current);
            $scope.$apply();
        }
        
    })

    // Lỗi đăng nhập hệ thống
    socket.on('error-login', function (error) {
        if (error == -1) {
            $ionicPopup.alert({
                title: 'Thông báo!',
                template: 'Email đã bị trùng'
            });
        }
    })

    // Nhận tin nhắn public
    socket.on('receive-message-public', function (msg) {
        msg.username = msg.user.username.slice(0, 1).toUpperCase();
        $scope.listMessage.push(msg);
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom();
    })

    socket.on('get-more-message', function (listMessage) {
        if (listMessage == null || listMessage.length == 0)  {
            $ionicPopup.alert({
                template: 'Đã load hết tin nhắn'
            });
            $scope.$apply();
        } else {
            var size = listMessage.length;
            for (var i = 0; i < size; i++) {
                var message = {
                    username : listMessage[i].username.slice(0, 1).toUpperCase(),
                    message : listMessage[i].content
                }
                $scope.listMessage.unshift(message);
            }
            $('.button-loadmore').removeClass('fadeIn');
            $scope.showloadMore = false;
            $scope.$apply();
        }
    })

    // Nhận tin nhắn private
    socket.on('receive-message-pravite', function (msg) {
        // Kiểm tra xem tin nhắn mới nhận có là của người đã gửi không
        var size = $scope.listMessageRecive.length;
        var k = 0;
        var last_message;
        for (var i = 0; i < size; i++) {
            var e = $scope.listMessageRecive[i];
            if (e.your_username == msg.your_username) {
                $scope.listMessageRecive[i] = msg;
                k++;
            }
        }
        if (k == 0) {
            $scope.listMessageRecive.push(msg);
        }

        // Thêm nhận biết là có tin nhắn mới. Kiểm tra xem tin nhắn cũ có là tin nhắn mới không. Nếu có thì không phải tăng nữa vì nó vẫn là tin nhắn mới
        if (msg.status == 0 && msg.flag == 1) {
            $scope.newMessage ++;
            $scope.$apply();
        }

        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);

    })

    // Sự kiện người dùng kéo màn hình lên trên cùng
    $scope.scroll = function (scrollTop, scrollLeft) {
        if (scrollTop >= 0 && scrollTop <= 10) {
            $scope.showloadMore = true;
            $scope.$apply();
            $('.button-loadmore').addClass('fadeIn');
        } else {
            $scope.showloadMore = false;
            $('.button-loadmore').removeClass('fadeIn');
            $scope.$apply();
        }
    }

    $scope.loadMore = function () {
        ++indexMessage;
        socket.emit('load-more-message', indexMessage);
    }

    $scope.loadDone = true;
    ultiServ.showLoading(false);
}]);

