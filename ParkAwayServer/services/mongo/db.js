const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/park-away', {
	auth: {authSource: "admin"},
	user: "admin",
	pass: "password",
	useNewUrlParser: true,
	keepAlive: true,
	keepAliveInitialDelay: 300000
});

var userSchema = new mongoose.Schema({
  name: String,
  location: { type: Schema.Types.ObjectId, ref: "location" }
});

var locationSchema = new mongoose.Schema({
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  user: { type: Schema.Types.ObjectId, ref: "user" }
});

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

module.exports = { Connection: mongoose.connection, Mongoose: mongoose, LocationSchema: locationSchema , UserSchema: userSchema, getDistanceFromLatLonInKm }

