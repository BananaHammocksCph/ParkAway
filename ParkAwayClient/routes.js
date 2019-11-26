const express = require('express');
const userRoutes = require('./routes/user');
const parkRoutes = require("./routes/park");
const csvRoutes = require("./routes/csv");
const router = express.Router();

router.use('/user', userRoutes);
router.use('/park', parkRoutes);
router.use('/csv', csvRoutes);

module.exports = router;