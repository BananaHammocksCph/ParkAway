
var amqp = require('amqp'), util = require('util');

var user = require('./services/user');
var park = require('./services/park');

var mq_cnn = amqp.createConnection({
    host: '127.0.0.1'
});

var cron = require('node-cron');
var json2csv = require('json2csv').parse;
var db = require('./services/mongo/db');

mq_cnn.on('ready', function () {

// cron.schedule('* * * * *', () => {

// var User = db.Mongoose.model("user", db.UserSchema, "user");

    // csv = 'test,test, test';

    // console.log('Cron');

    // mq_cnn.publish('csv_queue', csv, {
    //     contentType: 'text/csv',
    //     contentEncoding: 'utf-8'
    // }, function () {
    //     console.log("Published" + csv);
    // });
// });

    console.log("listening on user_queue");

    mq_cnn.queue('user_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.handleRequest(message, function (err, res) {
                console.log("Listening user_queue" + message);
                //return index sent
                mq_cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    console.log("listening on park_queue");

    mq_cnn.queue('park_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            park.handleRequest(message, function (err, res) {
                console.log("Listening park_queue" + message);
                //return index sent
                mq_cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
});