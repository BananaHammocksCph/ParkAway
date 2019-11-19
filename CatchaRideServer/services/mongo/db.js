var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:27017/park-away');

var Location;
var User;

var location = new mongoose.Schema({
	user_id: String,
	coordinates: {
		latitude: Number,
		longitude: Number
	}
});

var user = new mongoose.Schema({
	name: String,
	location: Location
});

location = mongoose.model('location', location);
user = mongoose.model('user', user);

function getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2) {
	var p = 0.017453292519943295;    //This is  Math.PI / 180
	var c = Math.cos;
	var a = 0.5 - c((latitude2 - latitude1) * p) / 2 +
		c(latitude1 * p) * c(latitude2 * p) *
		(1 - c((longitude2 - longitude1) * p)) / 2;
	var R = 6371; //  Earth distance in km so it will return the distance in km
	var dist = 2 * R * Math.asin(Math.sqrt(a));
	return dist;
}


module.exports = { Mongoose: mongoose, Location: location, User: user, getDistanceFromLatLonInKm }

