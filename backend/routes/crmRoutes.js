const express = require('express');
const { pushToCRM } = require('../controllers/crmController');

const router = express.Router();

router.post('/', pushToCRM);

module.exports = router;
