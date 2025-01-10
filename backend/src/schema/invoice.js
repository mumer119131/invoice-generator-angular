const mongoose = require('mongoose');

// Sub-schema for toDetails and fromDetails
const detailsSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  zip: { type: String },
  city: { type: String },
  country: { type: String },
  email: { type: String },
  phone: { type: String },
});

// Sub-schema for paymentInfo
const paymentInfoSchema = new mongoose.Schema({
  bankName: { type: String },
  accountName: { type: String },
  accountNumber: { type: String },
});

// Sub-schema for invoiceDetails
const invoiceDetailsSchema = new mongoose.Schema({
  invoiceNumber: { type: String },
  invoiceDate: { type: Date },
  dueDate: { type: Date },
  currency: { type: String },
  invoiceLogo: { type: String },
});

// Sub-schema for items
const itemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default: null },
  name: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  description: { type: String },
});

// Sub-schema for summaryDetails
const summaryDetailsSchema = new mongoose.Schema({
  tax: { type: Number },
  taxType: { type: String, enum: ['value', 'percentage'] },
  discount: { type: Number },
  discountType: { type: String, enum: ['value', 'percentage'] },
  shipping: { type: Number },
  shippingType: { type: String, enum: ['value', 'percentage'] },
  total: { type: Number },
  additionalInfo: { type: String },
  paymentTerms: { type: String },
  signature: { type: String },
  subTotal: { type: Number },
  isTaxValue: { type: Boolean },
  isDiscountValue: { type: Boolean },
  isShippingValue: { type: Boolean },
  isTotalInWords: { type: Boolean },
});

const invoiceMetaDataSchema = new mongoose.Schema({
  invoiceName: { type: String },
  invoiceAlternativeId: { type: String },
});

// Main schema
const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceMetaData: { type: invoiceMetaDataSchema },
    toDetails: { type: detailsSchema },
    fromDetails: { type: detailsSchema },
    paymentInfo: { type: paymentInfoSchema },
    invoiceDetails: { type: invoiceDetailsSchema },
    items: { type: [itemSchema] },
    summaryDetails: { type: summaryDetailsSchema },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
