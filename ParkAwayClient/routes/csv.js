const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
var util = require('util');
var amqp =  require('amqp');
var mq_cnn = amqp.createConnection({
  host: '127.0.0.1'
});

// var _queue = null;
var _consumerTag = null;
var _message = "fok mai laif";

router.get('/', function (req, res) {
    mq_cnn.queue('csv_queue', function (q) {
      console.log("got queue");
      // _queue = queue;
      // q.subscribe(function (message) {
      //   console.log(message);
      //   _message = message;
      //   queue.shift(false, false);
      //   res.status(200).json('heya');
      // }).addCallback(function(res) {
      //   // Hold on to the consumer tag so we can unsubscribe later
      //   _consumerTag = res.consumerTag;
      //   res.status(200).json('heya');
      // });
      // q.unsubscribe(_consumerTag);
    });

    // res.status(200).json(_message);
});

module.exports = router;