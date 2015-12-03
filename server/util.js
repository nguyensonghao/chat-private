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

methods.check_exits_fbId = function (user, listUser) {
    for (var i = 0; i < listUser.length; i++) {
        if (user.id == listUser[i].fbId) {
            return true;
        }
    }

    return false;   
}

methods.get_time = function () {
    var currentdate = new Date(); 
    var datetime =  (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getDate() + "/"
                            + currentdate.getFullYear() + " "
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();
    return datetime;
}

methods.get_date_time = function () {
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear();
    return datetime;   
}


methods.remove_list_email = function (listUser) {
    var size = listUser.length;
    for (var i = 0; i < size; i++) {
        delete listUser[i].email;
    }
    return listUser;
}

methods.remove_email = function (user) {
    delete user.email;
    return user;
}

module.exports = {
    check_exits_user : methods.check_exits_user,
    check_exits_email : methods.check_exits_email,
    get_time : methods.get_time,
    get_date_time : methods.get_date_time,
    remove_email : methods.remove_email,
    remove_list_email : methods.remove_list_email,
    check_exits_fbId : methods.check_exits_fbId
}