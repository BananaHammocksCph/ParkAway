const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
var mq_client = require('../rpc/client');

router.post("/", function(req, res) {
  console.log('Hit park!');
  let msg_payload = {
    user_id: req.body.user_id,
    coordinates: req.body.coordinates,
    image: req.body.image,
    type: "park"
  };

  console.log(msg_payload);

  mq_client.make_request("park_queue", msg_payload, function(err, results) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (results.status == 200) {
        console.log(results.result);
        res.status(200).json(results);
      } else {
        console.log("Something went wrong");
        res.status(500).send("Something went wrong");
      }
    }
  });
});

router.post("/direction", function(req, res) {
  let msg_payload = {
    user_id: req.body.user_id,
    coordinates: req.body.coordinates,
    type: "direction"
  };

  console.log(msg_payload);

  mq_client.make_request("user_queue", msg_payload, function(err, results) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (results.status == 200) {
        console.log(results.result);

          res.status(200).json(results);
      } else {
        console.log("Something went wrong");
        res.status(500).send("Something went wrong");
      }
    }
  });
});

module.exports = router;