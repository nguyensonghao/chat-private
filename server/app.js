var socketIO = require('socket.io'),
util = require('./util');
http = require('http'),

port = process.env.PORT || 8989,
ip = process.env.IP || '127.0.0.1',

// create server 
server = http.createServer().listen(port, ip, function(){
    console.log('Started Socket.IO');
}),

// config socket.io
io = socketIO.listen(server);
io.set('match origin procotol', true);
io.set('origins', '*:*');


// connect to server mongodb
MongoClient = require('mongodb').MongoClient;

var users = {}; 
var listUser = []; // list user active

// Load list user trong cơ sở dữ liệu
MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
  var collection = db.collection('user');
  collection.find().toArray(function (err, item) {
    listUser = item;
  })

});


io.sockets.on('connect', function (socket) {
    var current_user;

    // Thay đổi socket của người dùng khi người dùng đã có tài khoản
    socket.on('reset-socket-user', function (user) {
        current_user = user;
        if (util.check_exits_user(user, listUser)) {
            users[user.email] = socket;

            // Update trạng thái của người dùng là đang online
            MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
              if(err) { 
                console.log('erorr connect server mognodb');
              }

              var collection = db.collection('user');
              collection.update({email : user.email}, {$set: { "status": 1 }}, function (err, re) {
                if (err) {
                    console.log('update user online fails');
                } else {
                    console.log('user is updated online');
                    var size = listUser.length;
                    for (var i = 0; i < size; i++) {
                        var e = listUser[i];
                        if (e.email == user.email) {
                            listUser[i].status = 1;
                            console.log(listUser);
                            io.sockets.emit('get-list-user', listUser);
                            break;
                        }
                    }
                }
              })

            });
        }
    })

    // Hàm khởi tại khi người dùng vào hệ thống sẽ gửi toàn bộ tin nhắn và danh sách người dùng đang online về

    MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
        if(err) { 
            console.log('erorr connect server mognodb');
        }

        var collection_message = db.collection('message');
        collection_message.find().toArray(function (err, item) {
            if (err) {
                console.log('error get list message');
            } else {
                socket.emit('get-list-message', item);
            }
        })

        socket.emit('get-list-user', listUser);
    });

    // Người dùng lần đầu đăng nhập vào hệ thống
    
    socket.on('user-join-public', function (user) {
        // if (util.check_exits_user(user, listUser)) {
        //     socket.emit('error-login', -1);
        if (util.check_exits_email(user, listUser)) {
            socket.emit('error-login', -1);
        } else {

            // save list user in database
            MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
              if(err) { 
                console.log('erorr connect server mognodb');
              }

              var collection = db.collection('user');
              var user_database = {
                _id : util.get_time(),
                username : user.username,
                email : user.email,
                date_register : util.get_time(),
                status : 1 // 1 => user online , 0 => user offline
              }
              collection.insert(user_database, function (err, result) {
                if (err) {
                    console.log('insert user err');
                } else {
                    console.log('insert user success');
                    listUser.push(user_database);
                    current_user = user;
                    users[user.email] = socket;
                    socket.emit('login-success', user_database);
                    io.sockets.emit('add-user-public', user_database);
                }
              })

            });

        }
    })
    
    // Hàm gửi tin nhắn public
    socket.on('send-message-public', function (msg) {
        io.sockets.emit('receive-message-public', msg);

        // save message to database
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
          if(err) { 
            console.log('erorr connect server mognodb');
          }

          var collection = db.collection('message');
          var message = {
            _id : util.get_time(),
            username : msg.user.username,
            content : msg.message,
            date_send : util.get_time()
          }
          collection.insert(message, function (err, result) {
            if (err) {
                console.log('insert message err');
            } else {
                console.log('insert message success');
            }
          })

        });

    })

    // Hàm lấy danh sách tin nhắn đã nhắn trong màn hình public
    socket.on('get-list-message-private-in-public', function (user) {
        var email = user.email;
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
            if(err) { 
                console.log('erorr connect server mognodb');
            }

            var collection = db.collection('message_private');
            var cursor =db.collection('message_private').find({"my_email" : email});
            cursor.each(function(err, doc) {
                if (doc != null) {
                   socket.emit('receive-list-message-private-in-public', doc);
                } 
            });
        });
    
    })


    // Nhận tin nhắn private
    socket.on('send-message-private', function (msg) {
        var userReceive = msg.userReceive;
        var userSend = msg.userSend;
        var message = msg.message;
        if (util.check_exits_user(userReceive, listUser)) {

            // Lưu tin nhắn vào database
            MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
              if(err) { 
                console.log('erorr connect server mognodb');
              }

              var collection = db.collection('message_private');
              // Lưu tin nhắn cho người gửi
              var message_send = {
                _id : util.get_time(),
                my_username : userSend.username,
                my_email : userSend.email,
                your_username : userReceive.username,
                your_email : userReceive.email,
                message : msg.message,
                date : util.get_date_time(),
                flag : 0
              }

              collection.insert(message_send, function (err, re) {
                if (err) {
                    console.log('insert message private fail');
                } else {
                    console.log('insert message private success');
                }
              })

              // Gửi tin nhắn cho người gửi
              socket.emit('receive-message-pravite', message_send);

              // Lưu tin nhắn cho người nhận
              var message_recieve = {
                _id : util.get_time()+'receive',
                my_username : userReceive.username,
                my_email : userReceive.email,
                your_username : userSend.username,
                your_email : userSend.email,
                message : msg.message,
                date : util.get_date_time(),
                flag : 1,
                status : 0
              }
              collection.insert(message_recieve, function (err, re) {
                if (err) {
                    console.log('insert message private fail');
                } else {
                    console.log('insert message private success');
                }
              })

              // Gửi tin nhắn tới người nhận
              users[userReceive.email].emit('receive-message-pravite', message_recieve);

            });
        } else {
            socket.emit('error-send-message-pravite', -1);
        }
    })

    // Hàm lấy tin nhắn private về cho client
    socket.on('contruct-chat-private', function (data) {
        var userReceive = data.userReceive;
        var userSend = data.userSend;
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
            if(err) { 
                console.log('erorr connect server mognodb');
            }

            var collection = db.collection('message_private');
            var cursor =db.collection('message_private').find({"my_username" : userSend.username, "your_username" : userReceive.username});
            cursor.each(function(err, doc) {
                if (doc != null) {
                   socket.emit('receive-list-chat-private', doc);
                } 
            });
            
        });
    
    })

    // Người dùng vào đọc tin nhắn mới. Phải chuyển trạng thái sang là đã đọc
    socket.on('read-message-private', function (data) {
        var userSend = data.userSend;
        var userReceive = data.userReceive;
        
        // Lấy tin nhắn cuối cùng
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
          var collection = db.collection('message_private');
          collection.find({'my_email' : userSend.email, 'your_email' : userReceive.email}, function (err, cursor) {
            cursor.toArray(function(err, item) {
                var last_message = item.pop();
                // Kiểm tra xem tin nhắn cuối cùng là do mình gửi hay không
                if (last_message.flag == 0) {
                    return;
                // Kiểm tra xem người dùng xem tin nhắn hay chưa
                } else if (last_message.status == 1) {
                    return;
                } else {
                    // Thay đổi trạng thái của tin nhắn là đã đọc
                    collection.update({_id : last_message._id}, {$set: { "status": 1 }}, function (err, re) {
                        if (err) {
                            console.log('update message error');
                        } else {
                            console.log('update message success');
                        }
                    })
                }
            })
          })

        });
    })

    // Người dùng rời hệ thống => chuyển trạng thái sang offline
    socket.on('disconnect', function () {
        if (current_user != null) {
            MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
              if(err) { 
                console.log('erorr connect server mognodb');
              }

              var collection = db.collection('user');
              collection.update({email : current_user.email}, {$set: { "status": 0 }}, function (err, re) {
                if (err) {
                    console.log('update user error');
                } else {
                    console.log('update user success');
                    var size = listUser.length;
                    for (var i = 0; i < size; i++) {
                        var e = listUser[i];
                        if (e.email == current_user.email) {
                            listUser[i].status = 0;
                            io.sockets.emit('get-list-user', listUser);
                            console.log('User offline');
                            console.log(listUser);
                            break;
                        }
                    }
                }
              })

            });
        }

    })

})



