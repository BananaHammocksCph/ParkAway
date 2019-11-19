var mongo = require('./mongo/db');
var Location = mongo.Location;
var fs = require('fs');


function handleRequest(msg, callback) {

    switch (msg.type) {
        case "park":
            park(msg, callback);
        case "directions":
            directions(msg, callback);
    }
}

function park(msg, callback) {

}

function directions(msg, callback) {

}

exports.handleRequest=handleRequest;