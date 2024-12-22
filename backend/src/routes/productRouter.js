const express = require("express");
const router = express.Router();
const { create } = require('../controllers/ProductsController');


router.post('/create', create);
// router.post('/read', logout);
// router.post('/update', refreshToken);
// router.post('/delete', refreshToken);


module.exports = router;