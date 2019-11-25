var db = require('./mongo/db');

function handleRequest(msg, callback) {
  console.log("Handling request");
  switch (msg.type) {
    case "direction":
      direction(msg, callback);
      break;
    case "park":
      park(msg, callback);
  }
}

// Updates the User with a location object ( _id: xxx, {coordinates: {lat: xxx,  lon:xxx} })
// POST     api/user/park
// @RETURNS n/a
// Example POSTMAN input : { "coordinates": {"latitude": 22, "longitude": 22 }, "user_id": "5dd5eb668051f22040d20608" }
function park(msg, callback) {
  let response;
  let Location = db.Mongoose.model("location", db.LocationSchema, "location");
  let newLocation = new Location({ coordinates: msg.coordinates, user: msg.user_id });
  
  newLocation.save(function(err, doc) {
    // console.log("Park Hit!");
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