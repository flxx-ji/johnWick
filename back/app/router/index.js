const express = require('express');
const router = express.Router();

const personnageRouter = require('./personnage');
const origineRouter = require('./origine');


router.use('/personnage', personnageRouter);
router.use('/origine', origineRouter);


module.exports = router;
