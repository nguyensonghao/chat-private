'use strict';

angular.module('chat.pravite', []).controller('PraviteController', ['$scope', '$rootScope', '$ionicPopup', 'localServ', '$ionicPopover', 'dialogServ', 'ultiServ', '$stateParams', '$ionicScrollDelegate', '$state',
    function ($scope, $rootScope, $ionicPopup, localServ, $ionicPopover, dialogServ, ultiServ, $stateParams, $ionicScrollDelegate, $state) {

    var socket = io.connect(SERVER_ADRESS);
    var indexMessage = 0;
    $scope.form = {};
    $scope.userReceive = {
        username : $stateParams.username,
        _id : $stateParams._id
    };

    $scope.listMessage = [];

    var user = localServ.getItem('user');

    // Lấy tin nhắn từ server về tương ứng với người gửi và người nhận
    if (user != null) {
        socket.emit('contruct-chat-private', {
            userReceive : $scope.userReceive,
            userSend : user
        })
    }

    // Lấy danh sách tin nhắn

    socket.on('receive-list-chat-private', function (data) {
        $scope.listMessage = data;
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    })

    $scope.form.enterMessage = function (event) {
        if (event.keyCode == 13) {
            sendMessagetoServer();    
        }
    }

    // Gửi tin nhắn lên server 
    $scope.form.sendMessage = function () {
        sendMessagetoServer();
    }

    var sendMessagetoServer = function () {
        var message = $('#enter-chat-pravite-message').val();
        if (message == null || message == '')
            return;

        if (user == null) {
            dialogServ.showLogin().then(function (data) {
                if (data == null)
                    return;

                socket.emit('user-join-public', data);
            })
        } else {
            var msg = {
                userReceive : $scope.userReceive,
                userSend : user, 
                message : message
            }

            // Gửi tin nhắn cho server 
            socket.emit('send-message-private', msg);
            $('#enter-chat-pravite-message').val('');
        }
    }

    $scope.backScreen = function () {
        $state.go('home');
    }

    $scope.scroll = function (scrollTop, scrollLeft) {
        if (scrollTop >= 0 && scrollTop <= 10) {
            indexMessage ++;
            socket.emit('load-more-message-private', {
                userReceive : $scope.userReceive,
                userSend : user,
                index : indexMessage
            });
        }
    }

    // Đăng nhập thành công hệ thống
    socket.on('login-success', function (userLogin) {
        user = userLogin;
        localServ.setItem('user', user);
        $ionicPopup.alert({
            title: 'Thông báo!',
            template: 'Đăng nhập thành công'
        });
    })

    // Load thêm tin nhắn
    socket.on('receive-load-more-message-private', function (listMessage) {
        var size = listMessage.length;
        for (var i = 0; i < size; i++) {
            var message = listMessage[i];
            $scope.listMessage.unshift(message);
        }
        $scope.$apply();
    })

    // Đăng nhập thất bại
    socket.on('error-login', function (error) {
        if (error == -1) {
            $ionicPopup.alert({
                title: 'Thông báo!',
                template: 'Tài khoản đã bị trùng'
            });
        }
    })

    // Nhận tin nhắn mới
    socket.on('receive-message-pravite', function (msg) {
        $scope.listMessage.push(msg);
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    })

}]);

