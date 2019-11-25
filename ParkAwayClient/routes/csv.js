const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
var mq_client = require('../rpc/jsonclient');


router.get('/csv', function (req, res) {
    
    mq_client.connection.queue('csv_queue', function (q) {
      q.subscribe(function (message) {
        console.log('Got message', message);
        queue.shift(false, false);
      }).addCallback(function(res) {
        // Hold on to the consumer tag so we can unsubscribe later
        _consumerTag = res.consumerTag;
      }).unsubscribe();
    });
});

module.exports = router;