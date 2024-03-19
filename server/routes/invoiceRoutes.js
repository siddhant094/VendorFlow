const express = require('express');
const {
    createInvoice,
    getAllInvoices,
    handleInvoicePayment,
} = require('../controllers/invoiceController');
const router = express.Router();

router.post('/new', createInvoice);
router.get('/invoices/:userId', getAllInvoices);
router.post('/pay', handleInvoicePayment);
// router.post('/login', loginUser);

module.exports = router;
