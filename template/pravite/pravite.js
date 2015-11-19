'use strict';

angular.module('chat.pravite', []).controller('PraviteController', ['$scope', '$rootScope', '$ionicPopup', 'localServ', '$ionicPopover', 'dialogServ', 'ultiServ', '$stateParams', '$ionicScrollDelegate', '$state',
    function ($scope, $rootScope, $ionicPopup, localServ, $ionicPopover, dialogServ, ultiServ, $stateParams, $ionicScrollDelegate, $state) {

    var socket = io.connect(SERVER_ADRESS);
    $scope.form = {};
    $scope.userReceive = {
        username : $stateParams.username,
        email : $stateParams.email
    };

    $scope.list_message = [];

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
        $scope.list_message.push(data);
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    })

    // Gửi tin nhắn lên server 
    $scope.form.sendMessage = function () {
        console.log('test');
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

    // Đăng nhập thành công hệ thống
    socket.on('login-success', function (user_resquest) {
        user = user_resquest;
        localServ.setItem('user', user);
        $ionicPopup.alert({
            title: 'Thông báo!',
            template: 'Đăng nhập thành công'
        });
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
        $scope.list_message.push(msg);
        $scope.$apply();
        $ionicScrollDelegate.scrollBottom(true);
    })

}]);

