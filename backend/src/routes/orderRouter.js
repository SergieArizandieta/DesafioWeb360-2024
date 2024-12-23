const express = require("express");
const router = express.Router();
const { create, update, read } = require('../controllers/orderController');

router.get('/read', read);
router.post('/create', create);
router.put('/update', update);


module.exports = router;