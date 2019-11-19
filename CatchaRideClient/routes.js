const express = require('express');
const bookingRoutes = require('./routes/booking');
const rideOfferRoutes = require("./routes/rideOffer");
const router = express.Router();

router.use('/user', bookingRoutes);
router.use('/park', rideOfferRoutes);

module.exports = router;