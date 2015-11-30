var socketIO = require('socket.io'),
util = require('./util');
http = require('http'),

port = process.env.PORT || 9500,
ip = process.env.IP || '127.0.0.1',

// create server 
server = http.createServer().listen(port, ip, function(){
    console.log("Listening on http://127.0.0.1:" + port + "/");
}),

io = socketIO.listen(server);
io.set('match origin procotol', true);
io.set('origins', '*:*');


// connect to server mongodb
MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

var users = {}; 
var listUser = []; // list user active
var ITEM = 10;

// Load list user trong cơ sở dữ liệu
MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
  var collectionUser = db.collection('user');
  collectionUser.find().toArray(function (err, item) {
    listUser = item;
  })
});


MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
if(err) { 
    console.log('erorr connect server mognodb');
} else {
    io.sockets.on('connect', function (socket) {
    var currentUser;
    var currentIndexMessage = 0; 
    var currentIndexUser = 0; 
    var currentIndexMessagePrivate = 0;
    var collectionUser = db.collection('user');
    var collectionMessage = db.collection('message');
    var collectionMessagePrivate = db.collection('message_private');

    // Người dùng đăng nhập vào hệ thống
    
    socket.on('user-join-public', function (user) {
        if (util.check_exits_email(user, listUser)) {
            console.log('exist email'); // Thực ra email không thể trùng
        } else {
            // insert user to database
            console.log(user);
            var userInsert = {
                username : user.name,
                email : user.email,
                date_register : util.get_time(),
                fbId : user.id,
                status : 1 // 1 => user online , 0 => user offline
            }

            collectionUser.insert(userInsert, function (err, result) {
                if (err) {
                    console.log('insert user err');
                } else {
                    console.log('insert user success');
                    listUser.push(userInsert);
                    currentUser = result.ops[0];
                    users[result.ops[0]._id] = socket;
                    ++currentIndexUser;
                    console.log(result.ops[0]));
                    socket.emit('login-success', util.remove_email(result.ops[0]));
                    io.sockets.emit('add-user-public', util.remove_email(result.ops[0]));
                }
            })
        }
    })

    // Thay đổi socket của người dùng khi người dùng đã có tài khoản
    socket.on('reset-socket-user', function (user) {
        console.log(user);
        if (util.check_exits_email(user, listUser)) {
            collectionUser.find({fbId : user.fbId}).toArray(function (err, item) {
                if (err) {
                    console.log('error get list message');
                } else {
                    var result = item[0];
                    currentUser = result;
                    users[currentUser._id] = socket;
                    socket.emit('reset-socket-success', util.remove_email(currentUser));
                    // Update trạng thái của người dùng là đang online
                    collectionUser.update({_id : new ObjectID(currentUser._id)}, {$set: { "status": 1 }}, function (err, re) {
                        if (err) {
                            console.log('update user online fails');
                        } else {
                            console.log('user is updated online');
                            var size = listUser.length;
                            for (var i = 0; i < size; i++) {
                                var e = listUser[i];
                                if (e._id == currentUser._id) {
                                    listUser[i].status = 1;
                                    collectionUser.find({status : 1}).sort({_id: -1}).limit(ITEM).skip(0).toArray(function (err, item) {
                                        if (err) {
                                            console.log('error get list message');
                                        } else {
                                            io.sockets.emit('get-list-user', util.remove_list_email(item));
                                        }
                                    })
                                    break;
                                }
                            }
                        }
                    })
                }
            }) 

        } else {
            var userInsert = {
                username : user.name,
                email : user.email,
                date_register : util.get_time(),
                fbId : user.id,
                status : 1 // 1 => user online , 0 => user offline
            }

            collectionUser.insert(userInsert, function (err, result) {
                if (err) {
                    console.log('insert user err');
                } else {
                    console.log('insert user success');
                    listUser.push(userInsert);
                    currentUser = result.ops[0];
                    users[result.ops[0]._id] = socket;
                    ++currentIndexUser;
                    socket.emit('login-success', util.remove_email(result.ops[0]));
                    io.sockets.emit('add-user-public', util.remove_email(result.ops[0]));
                }
            })
        }

    })

    // Hàm được gọi khi quay lại màn hình
    socket.on('get-list-data', function () {
        currentIndexMessage = 0;
        currentIndexUser = 0;
        collectionMessage.find({index : 0}).sort({_id: -1}).limit(ITEM).skip(0).toArray(function (err, item) {
            if (err) {
                console.log('error get list message');
            } else {
                socket.emit('get-list-message', item);
            }
        })

        collectionUser.find({status : 1}).sort({_id: -1}).limit(ITEM).skip(0).toArray(function (err, item) {
            if (err) {
                console.log('error get list message');
            } else {
                io.sockets.emit('get-list-user', util.remove_list_email(item));
            }
        })        
    })

    socket.on('get-list-message-jltp', function (data) {
        var index = data;
        currentIndexMessage = 0;
        collectionMessage.find({index : index}).sort({_id: -1}).limit(ITEM).skip(0).toArray(function (err, item) {
            if (err) {
                console.log('error get list message');
            } else {
                socket.emit('get-list-message', item);
            }
        })
    })

    // Load more message
    socket.on('load-more-message', function (index) {
        collectionMessage.find().sort({_id: -1}).limit(ITEM).skip(index * ITEM + currentIndexMessage).toArray(function (err, item) {
            if (err) {
                console.log('error load more message');
            } else {
                socket.emit('get-more-message', item);
            }
        })
    })

    socket.on('load-more-message-jlpt', function (data) {
        var index  = data.index;
        var indexMessage = data.indexMessage;
        collectionMessage.find({index : index}).sort({_id: -1}).limit(ITEM).skip(indexMessage * ITEM + currentIndexMessage).toArray(function (err, item) {
            if (err) {
                console.log('error load more message');
            } else {
                socket.emit('get-more-message', item);
            }
        })
    })

    // Load more user
    socket.on('load-more-user', function (index) {
        collectionUser.find().sort({_id: -1}).limit(1).skip(index * 1 + currentIndexUser).toArray(function (err, item) {
            if (err) {
                console.log('error load more user');
            } else {
                socket.emit('get-more-user', util.remove_list_email(item));
            }
        })
    })
    
    // Hàm gửi tin nhắn public
    socket.on('send-message-public', function (msg) {
        msg.user.username = msg.user.username;
        ++currentIndexMessage;

        // save message to database
        var message = {
            userId : msg.user._id,
            username : msg.user.username,
            content : msg.message,
            date_send : util.get_time(),
            index : msg.index
        }

        collectionMessage.insert(message, function (err, result) {
            if (err) {
                console.log('insert message err');
            } else {
                console.log('insert message success');
                io.sockets.emit('receive-message-public', result.ops[0]);
            }
        })

    })

    // Hàm lấy danh sách tin nhắn đã nhắn trong màn hình public
    socket.on('get-list-message-private-in-public', function (user) {
        var id = user._id;
        var collectionMessagePrivate = db.collection('message_private');
        var cursor = collectionMessagePrivate.find({"my_id" : id});
        cursor.each(function(err, doc) {
            if (doc != null) {
               socket.emit('receive-list-message-private-in-public', doc);
            } 
        });
    
    })


    // Nhận tin nhắn private
    socket.on('send-message-private', function (msg) {
        ++ currentIndexMessagePrivate;
        var userReceive = msg.userReceive;
        var userSend = msg.userSend;
        var message = msg.message;
        if (util.check_exits_user(userReceive, listUser)) {

              // Lưu tin nhắn cho người gửi
            var message_send = {
                my_username : userSend.username,
                my_id : userSend._id,
                your_username : userReceive.username,
                your_id : userReceive._id,
                message : msg.message,
                date : util.get_date_time(),
                flag : 0
            }

            collectionMessagePrivate.insert(message_send, function (err, re) {
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
                my_username : userReceive.username,
                my_id : userReceive._id,
                your_username : userSend.username,
                your_id : userSend._id,
                message : msg.message,
                date : util.get_date_time(),
                flag : 1,
                status : 0
            }
            collectionMessagePrivate.insert(message_recieve, function (err, re) {
                if (err) {
                    console.log('insert message private fail');
                } else {
                    console.log('insert message private success');
                }
            })
              // Gửi tin nhắn tới người nhận => try catch la de khi nguoi dung khong online khonh bi lo
            try {
                users[userReceive._id].emit('receive-message-pravite', message_recieve);
            }
            catch(err) {
                console.log('user recieve not online');
            }
        } else {
            socket.emit('error-send-message-pravite', -1);
        }
    })

    // Hàm lấy tin nhắn private về cho client
    socket.on('contruct-chat-private', function (data) {
        currentIndexMessagePrivate = 0;
        var userReceive = data.userReceive;
        var userSend = data.userSend;
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
            if(err) { 
                console.log('erorr connect server mognodb');
            }

            var collectionMessagePrivate = db.collection('message_private');
            collectionMessagePrivate.find({'my_id' : userSend._id, 'your_id' : userReceive._id}).sort({_id : -1}).limit(ITEM).skip(0).toArray(function (err, item) {
                socket.emit('receive-list-chat-private', item);  
            })
        });
    })

    socket.on('load-more-message-private', function (data) {
        console.log(data);
        var userReceive = data.userReceive;
        var userSend = data.userSend;
        var index = data.index;
        MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
            if(err) { 
                console.log('erorr connect server mognodb');
            }

            var collectionMessagePrivate = db.collection('message_private');
            collectionMessagePrivate.find({'my_id' : userSend._id, 'your_id' : userReceive._id}).sort({_id : -1}).limit(ITEM).skip(index * ITEM + currentIndexMessagePrivate).toArray(function (err, item) {
                socket.emit('receive-load-more-message-private', item);  
            })
        });
    })

    // Người dùng vào đọc tin nhắn mới. Phải chuyển trạng thái sang là đã đọc
    socket.on('read-message-private', function (data) {
        var userSend = data.userSend;
        var userReceive = data.userReceive;
        
        // Lấy tin nhắn cuối cùng
        collectionMessagePrivate.find({'my_id' : userSend._id, 'your_id' : userReceive._id}, function (err, cursor) {
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
                    collectionMessagePrivate.update({_id : new ObjectID(last_message._id)}, {$set: { "status": 1 }}, function (err, re) {
                        if (err) {
                            console.log('update message error');
                        } else {
                            console.log('update message success');
                        }
                    })
                }
            })
        })
    })

    // Người dùng rời hệ thống => chuyển trạng thái sang offline
    socket.on('disconnect', function () {
        if (currentUser != null) {
            collectionUser.update({_id : new ObjectID(currentUser._id)}, {$set: { "status": 0 }}, function (err, re) {
                if (err) {
                    console.log('update user error');
                } else {
                    console.log('update user success');
                    var size = listUser.length;
                    for (var i = 0; i < size; i++) {
                        var e = listUser[i];
                        if (e._id == currentUser._id) {
                            listUser[i].status = 0;
                            collectionUser.find({status : 1}).sort({_id: -1}).limit(ITEM).skip(0).toArray(function (err, item) {
                                if (err) {
                                    console.log('error get list message');
                                } else {
                                    currentIndexUser = 0;
                                    io.sockets.emit('get-list-user', util.remove_list_email(item));
                                }
                            })
                            console.log('user offline');
                            break;
                        }
                    }
                }
            })
        }

    })

})

}

});


