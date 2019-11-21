
var amqp = require('amqp'), util = require('util');

var user = require('./services/user');
var park = require('./services/park');

var cnn = amqp.createConnection({
    host: '127.0.0.1'
});
var mongoose = require('mongoose');
var connection = mongoose.connect(
  "mongodb://admin:password@127.0.0.1:27017/park-away"
);

cnn.on('ready', function () {
    console.log("listening on user_queue");

    cnn.queue('user_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.handleRequest(message, function (err, res) {
                console.log("Listening customer_queue" + message);
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    console.log("listening on driver_queue");

    cnn.queue('park_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            park.handleRequest(message, function (err, res) {
                console.log("Listening driver_queue" + message);
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
});