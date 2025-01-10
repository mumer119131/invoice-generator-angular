const express = require('express');
const {authenticate} = require('../middleware/authorize');
const { createInvoice, getInvoices } = require('../controller/invoiceController');

const router = express.Router();

router.get('/', authenticate, getInvoices);
router.get('/create', authenticate, createInvoice);



module.exports = router;