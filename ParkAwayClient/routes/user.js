const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
var mq_client = require('../rpc/client');

router.post('/', function (req, res) {
  var msg_payload = {
    "name": req.body.name,
    "type": "create"
  };

  console.log(msg_payload);

  mq_client.make_json_request('user_queue', msg_payload, function (err, results) {

    if (err) {
      console.log(err);
      res.send(err);
    }
    else {

      if (results.status == 200) {

        console.log("User Created!");
        console.log(results.results);

        res.status(200).send(JSON.stringify(results));

      }
      else {

        console.log("Something went wrong");

        res.status(500).send("Something went wrog");
      }
    }
  });
});

router.get('/', function (req, res) {
  let id = req.params.id;

});


module.exports = router;