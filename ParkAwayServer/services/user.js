var db = require('./mongo/db');

function handleRequest(msg, callback) {

    console.log(msg);
    switch (msg.type) {
        case "create":
            create(msg, callback);
        case "getAll":
            getAll(msg, callback);
    }
}

function create(msg, callback) {
    var response;
    var User = db.Mongoose.model('user', db.UserSchema, 'user')
    var newUser = new User({name: msg.name});
    
    newUser.save(function(err) {
        console.log('Create Hit!');
        if(err) {
            response =({
                status:500, 
                message: "Server Error"
            });
			callback(null, response);
        }
        
        response = ({
            status:200,
            message: "User Created.",
            user_id: newUser._id
        });
        callback(null, response);
    });
}

function getAll(msg, callback) {

}

exports.handleRequest=handleRequest;