var db = require('./mongo/db');

function handleRequest(msg, callback) {
    console.log(msg);
    switch (msg.type) {
      case "create":
        create(msg, callback);
        break;
      case "getAll":
        getAll(msg, callback);
        break;
      case "direction":
        direction(msg, callback);
        break;
      case "park":
        park(msg, callback);
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

// Returns a list of all existing users 
function getAll(msg, callback) {
let response;
let User = db.Mongoose.model("user", db.UserSchema, "user");

User.find(function(err, users) {
  console.log("Create Hit!");
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

// Temp placeholder for park, as locationqueue gives a timeout
// Updates the User with a location object ( _id: xxx, {coordinates: {lat: xxx,  lon:xxx} })
// POST     api/user/park
// @RETURNS n/a
// Example POSTMAN input : { "coordinates": {"latitude": 22, "longitude": 22 }, "user_id": "5dd5eb668051f22040d20608" }
function park(msg, callback) {
  let response;

  let Location = db.Mongoose.model("location", db.LocationSchema, "location");
let newLocation = new Location({ coordinates: msg.coordinates, user: msg.user_id });

newLocation.save(function(err, doc) {
  let User = db.Mongoose.model("user", db.UserSchema, "user");
  User.findOneAndUpdate({ _id: msg.user_id }, {location: doc._id}, function(err, user) {
  if (err) {
    console.log(err);
    response = {
      status: 500,
      message: "Server Error"
    };
    callback(null, response);
  }

  response = {
    status: 200,
    message: "Park Success.",
    location_id: newLocation._id
  };
  callback(null, response);
});
})

}

// Temp placeholder for park, as other queue gives a timeout
// Calculates the distance to the User park location from the given coordinates
 // POST     api/user/direction
// @RETURNS { Distance (int) }
// Example POSTMAN input :{ "coordinates": {"latitude": 24, "longitude": 24 }, "user_id": "5dd5eb668051f22040d20608" }
function direction(msg, callback) {
  let response;
  let User = db.Mongoose.model("user", db.UserSchema, "user");

User.findOne({ _id: msg.user_id })
  .exec(function(err, doc) {
 let Location = db.Mongoose.model("location", db.LocationSchema, "location");
   console.log("HER IT CUMS :"+ doc.location._id);
     Location.findOne({ _id: doc.location._id}, function(err2, loc) {
       if (err) {
         response = {
           status: 500,
           message: "Server Error"
         };
         callback(null, response);
       }
       
       let calcDistance = db.getDistanceFromLatLonInKm(
         msg.coordinates.latitude,
         msg.coordinates.longitude,
         loc.coordinates.latitude,
         loc.coordinates.longitude
       );
       response = {
         status: 200,
         message: "Direction Success.",
         distance: calcDistance
       };
       callback(null, response);
     });
  });
}

exports.handleRequest=handleRequest;