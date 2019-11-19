var mysql = require('./mysql');
var mongo = require('./mongo/db');
var Location = mongo.Location;
var fs = require('fs');


function handleRequest(msg, callback) {

    switch (msg.type) {
        case "create":
            create(msg, callback);
        case "getAll":
            getAll(msg, callback);
    }
}

function create(msg, callback) {
    var db = require('../db');
    var User = db.Mongoose.model('user', db.User, 'user');
    var user = User.create({
        name: msg.name
    })
    .lean()
    .exec(function(err, docs) {
        if(err) {
            response =({
                status:500, 
                message: "Server Error"
            });
			callback(null, response);
        }
        
        response =({
            status:200,
            availability_flag, message: "User Created.",
            user_id: user._id
        });
        callback(null, response);      
      });
}

function getAll(msg, callback) {

}