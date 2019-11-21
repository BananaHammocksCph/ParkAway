var mongo = require('./mongo/db');
var Location = mongo.Location;
var fs = require('fs');


function handleRequest(msg, callback) {
console.log("Handling request");
    switch (msg.type) {
        case "park":
            park(msg, callback);
        case "directions":
            directions(msg, callback);
    }
}

function park(msg, callback) {
 let response;
 let Location = db.Mongoose.model("location", db.locationSchema, "location");
 var newLocation = new Location({
   coordinates: msg.coordinates
 });

const filter = { _id: msg.user_id };
const update = { location: newLocation };

 User.findOneAndUpdate(filter, update, {},  function(err) {
   console.log("Park Hit!");
   if (err) {
     response = {
       status: 500,
       message: "Server Error"
     };
     callback(null, response);
   }

   response = {
     status: 200,
     message: "Park Success."
   };
   callback(null, response);
 });
}

function directions(msg, callback) {

}

exports.handleRequest=handleRequest;