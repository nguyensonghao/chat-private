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
    $scope.listmessageReceive = []
    $scope.countMessage = 0;
    $scope.newMessage = 0;
    $scope.showloadMore = false;

    var showboxSetting = false;
    var socket = io.connect(SERVER_ADRESS);
    var user = localServ.getItem('user');
    var listIdPravite = [];
    var indexMessage = 0; // Số thứ tự để load tin nhắn
    var indexUser = 0;

    if (user != null) {
        socket.emit('reset-socket-user', user);
        socket.emit('get-list-message-private-in-public', user);
        socket.emit('get-list-data');
    }

    // Hàm nhận tin danh sách tin nhắn private từ server 

    socket.on('receive-list-message-private-in-public', function (message) {

        var size = $scope.listmessageReceive.length;
        if (size == 0) {
            $scope.listmessageReceive.push(message);
            listIdPravite.push(message.your_id);
        } else {
            for (var i = 0; i < size; i++) {
                // Kiểm tra xem tin nhắn này đã có người gửi trước chưa
                if (listIdPravite.indexOf(message.your_id) == -1) {
                    listIdPravite.push(message.your_id);
                    $scope.listmessageReceive.push(message);
                    $scope.newMessage ++;
                } else {
                    // Kiểm tra xem tin nhắn có bị trùng không
                    var size = $scope.listmessageReceive.length;
                    var k = 0;
                    for (var j = 0; j < size; j++) {
                        var e = $scope.listmessageReceive[i];
                        if (e.your_id == message.your_id) {
                            // Bị trùng
                            $scope.listmessageReceive[j] = message;
                            k++;
                        }
                    }
                    if (k == 0) {
                        // Không bị trùng
                        if (message.status == 0 && message.flag == 1) {
                            // Nếu tin nhắn chưa được đọc thì là tin nhắn mới
                            $scope.newMessage ++;
                        }
                        $scope.listmessageReceive.push(message);
                    }
                }
            }
        }

        for (var i = 0; i < $scope.listmessageReceive.length; i++) {
            $scope.newMessage = 0;
            if ($scope.listmessageReceive[i].status == 0) {
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

    $scope.formChat.enterChat = function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    }

    $scope.formChat.sendChat = function () {
        sendMessage();
    }

    var sendMessage = function () {
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
            _id : user._id
        })
    }

    $scope.redirectMessagePravite = function (username, id) {
        // lưu lại trang thái đã đọc cho tin nhắn mới
        var data = {
            userSend : user,
            userReceive : {username : username, _id : id}
        }
        socket.emit('read-message-private', data);
        $state.go('chatpravite', {
            username : username,
            _id : id
        })
    }

    $scope.randomColor = function () {
        return list_color[Math.floor(Math.random() * list_color.length)];
    }

    // Lấy danh sách tin nhắn của hệ thống
    socket.on('get-list-message', function (listMessage) {
        var size = listMessage.length;
        $scope.listMessage = [];
        for (var i = 0; i < size; i++) {
            var message = {
                username : listMessage[i].username.slice(0, 1).toUpperCase(),
                message : listMessage[i].content
            }
            $scope.listMessage.unshift(message);
        }
        $scope.$apply();
    })

    // Lấy danh sách người dùng của hệ thống
    socket.on('get-list-user', function (listUser) {
        var size = listUser.length;
        $scope.listUser = [];
        for (var i = 0; i < size; i++) {
            var e = listUser[i];
            if (user == null || e._id != user._id) {
                $scope.listUser.push(e);    
            }
        }
        $scope.$apply();
        // $ionicScrollDelegate.scrollBottom(true);
    })

    // Người dùng đăng nhập thành công
    socket.on('login-success', function (userLogin) {
        user = userLogin;
        localServ.setItem('user', user);
        $ionicPopup.alert({
            title: 'Thông báo!',
            template: 'Đăng nhập thành công'
        });
    })

    // Thêm người dùng đăng nhập
    socket.on('add-user-public', function (userAdd) {
        if (user == null || userAdd._id != user._id) {
            $scope.listUser.push(userAdd);
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
        if (listMessage == null || listMessage.length == 0)  
            return;
        
        var size = listMessage.length;
        for (var i = 0; i < size; i++) {
            var message = {
                username : listMessage[i].username.slice(0, 1).toUpperCase(),
                message : listMessage[i].content
            }
            $scope.listMessage.unshift(message);
        }
        $scope.$apply();
    })

    socket.on('get-more-user', function (listUser) {
        if (listUser == null || listUser.length == 0)  
            return;
        
        var size = listUser.length;
        for (var i = 0; i < size; i++) {
            $scope.listUser.unshift(listUser[i]);
        }
        $scope.$apply();
    })

    // Nhận tin nhắn private
    socket.on('receive-message-pravite', function (msg) {
        // Kiểm tra xem tin nhắn mới nhận có là của người đã gửi không
        var size = $scope.listmessageReceive.length;
        var k = 0;
        var last_message;
        for (var i = 0; i < size; i++) {
            var e = $scope.listmessageReceive[i];
            if (e.your_username == msg.your_username) {
                $scope.listmessageReceive[i] = msg;
                k++;
            }
        }
        if (k == 0) {
            $scope.listmessageReceive.push(msg);
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
            if ($scope.tab_1 == 'menu-active') {
                ++indexMessage;
                socket.emit('load-more-message', indexMessage);
            } else if ($scope.tab_3 == 'menu-active') {
                ++indexUser;
                socket.emit('load-more-user', indexUser);
            }
        }
    }

    $scope.loadDone = true;
    ultiServ.showLoading(false);
}]);

