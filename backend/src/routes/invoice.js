const express = require('express');
const {authenticate} = require('../middleware/authorize');
const { createInvoice, getInvoices, saveInvoice, getInvoice } = require('../controller/invoiceController');

const router = express.Router();

router.get('/', authenticate, getInvoices);
router.get('/:invoiceId', authenticate, getInvoice);
router.get('/create', authenticate, createInvoice);
router.post('/save', authenticate, saveInvoice);


module.exports = router;