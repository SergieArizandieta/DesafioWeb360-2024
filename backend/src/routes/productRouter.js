const express = require("express");
const router = express.Router();
const { create, read ,update, readAll } = require('../controllers/ProductsController');


router.post('/create', create);
router.get('/read', read);
router.put('/update', update);
router.get('/readAll', readAll);


module.exports = router;