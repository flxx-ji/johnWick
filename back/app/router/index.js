const express = require('express');
const router = express.Router();

const personnageRouter = require('./personnage');
const origineRouter = require('./origine');
const filmRouter = require ('./film');


router.use('/personnage', personnageRouter);
router.use('/origine', origineRouter);
router.use('/film', filmRouter)


module.exports = router;
