const express = require("express");
const router = express.Router();
const { create, read, update } = require('../controllers/clientController');

router.post('/create', create);
router.get('/read', read);
router.put('/update', update);


module.exports = router;