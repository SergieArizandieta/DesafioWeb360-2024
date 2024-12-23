const express = require("express");
const router = express.Router();
const { create, read, update } = require('../controllers/categoryController');

router.get('/read', read);
router.post('/create', create);
router.put('/update', update);


module.exports = router;