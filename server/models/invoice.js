const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    visitHistory: [{ timestamp: { type: Number }, code: String }],
    utrNumber: Number,
});

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

module.exports = InvoiceModel;
