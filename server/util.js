var methods = {};

methods.check_exits_user = function (user, listUser) {
    for (var i = 0; i < listUser.length; i++) {
        if (user.username == listUser[i].username || user.email == listUser[i].email) {
            return true;
        }
    }

    return false;
}

methods.check_exits_email = function (user, listUser) {
    for (var i = 0; i < listUser.length; i++) {
        if (user.email == listUser[i].email) {
            return true;
        }
    }

    return false;   
}

methods.get_time = function () {
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime;
}

methods.get_date_time = function () {
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - " ;
    return datetime;   
}


// Hàm khởi tạo khi người dùng vào hệ thống
methods.contruct_systerm = function (socket, MongoClient, listUser, users) {
    // Gửi tin nhắn về cho client khi truy cập (không bắt buộc đăng nhập)
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

        var collection_user = db.collection('user');
        collection_user.find().toArray(function (err, item) {
            if (err) {
                console.log('error get list user');
            } else {
                socket.emit('get-list-user', item);
            }
        })        
        console.log('struct systerm success');
    });

    // Thay đổi socket của người dùng khi người dùng đã có tài khoản
    socket.on('reset-socket-user', function (user) {
        if (methods.check_exits_user(user, listUser)) {
            users[user.email] = socket;
        }
    })

}

module.exports = {
    check_exits_user : methods.check_exits_user,
    check_exits_email : methods.check_exits_email,
    get_time : methods.get_time,
    get_date_time : methods.get_date_time,
    contruct_systerm : methods.contruct_systerm
}