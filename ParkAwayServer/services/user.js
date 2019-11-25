var db = require('./mongo/db');

function handleRequest(msg, callback) {
  console.log("Handling request");
  switch (msg.type) {
    case "create":
      create(msg, callback);
      break;
    case "getAll":
      getAll(msg, callback);
      break;
  }
}

function create(msg, callback) {
  var response;
  var User = db.Mongoose.model('user', db.UserSchema, 'user')
  var newUser = new User({name: msg.name});
  
  newUser.save(function(err) {
    // console.log('Create Hit!');
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

// Returns a list of all existing users 
function getAll(msg, callback) {
  let response;
  let User = db.Mongoose.model("user", db.UserSchema, "user");
  
  User.find(function(err, users) {
    // console.log('Get All Hit!');
    if (err) {
      response = {
        status: 500,
        message: "Server Error"
      };
      callback(null, response);
    }
    
    response = {
      status: 200,
      message: "Users Found.",
      users: users
    };
    callback(null, response);
  });
}

exports.handleRequest=handleRequest;