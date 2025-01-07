const express = require("express");
const router = express.Router();
const { create, update, read, readByClient, readDetailByOrder } = require('../controllers/orderController');

router.get('/read', read);
router.post('/create', create);
router.put('/update', update);
router.get('/readByClient', readByClient);
router.get('/readDetailByOrder', readDetailByOrder);


module.exports = router;