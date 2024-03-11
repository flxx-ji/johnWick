const express = require('express');
const router = express.Router();

const personnageRouter = require('./personnage');


router.use('/personnage', personnageRouter);


module.exports = router;
