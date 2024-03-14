const express = require('express');
const { createInvoice } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/new', createInvoice);
// router.post('/login', loginUser);

module.exports = router;
