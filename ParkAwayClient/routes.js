const express = require('express');
const userRoutes = require('./routes/user');
const parkRoutes = require("./routes/park");
const router = express.Router();

router.use('/user', userRoutes);
router.use('/park', parkRoutes);

module.exports = router;