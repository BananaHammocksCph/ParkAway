const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
var mq_client = require('../rpc/client');


router.post('/park', function (req, res) {
  let id = req.params.id;


  var msg_payload = { "email": email, "password": password, "type": "loginDriver" };

  mq_client.make_request('driver_queue', msg_payload, function (err, results) {

    if (err) {
      console.log(err);
      res.send(err);
    }
    else {

      if (results.status == 200) {

        console.log("IN IF OF DRIVER LOGIN");
        req.session.driver_id = results.result.driver_id;
        req.session.d_first_name = results.result.d_first_name;
        req.session.d_last_name = results.result.d_last_name;
        console.log(results.result);
        res.status(200).send("success");

      }
      else {

        console.log("IN ELSE OF DRIVER LOGIN");

        res.status(404).send(" Invalid Usernam & Password! Please try again.");
      }
    }
  });

});

router.post('/directions', function (req, res) {
  let id = req.params.id;

});


module.exports = router;