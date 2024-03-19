const Invoice = require('../models/invoice');
const User = require('../models/user');
const mongoose = require('mongoose');
var shortid = require('shortid');
const axios = require('axios');

const createInvoice = async (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body.name || !body.amount || !body.userId)
        return res
            .status(400)
            .json({ error: 'Missing Parameters in request body.' });

    const createdInvoice = await Invoice.create({
        name: body.name,
        shortId: shortid.generate(),
        status: 'pending',
        amount: body.amount,
        creator: body.userId,
        visitHistory: [{ timestamp: Date.now() }],
    });

    let user;

    try {
        user = await User.findById(body.userId);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }

    if (!user) {
        return res
            .status(400)
            .json({ error: 'Could not find user for provided id.' });
    }
    // console.log(user);
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdInvoice.save({ session: sess });
        user.invoices.push(createdInvoice);
        await user.save({ session: sess });
        await sess.commitTransaction();
        sess.endSession();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Creating Invoice Failed', err });
    }
    res.send(createdInvoice);
    // res.send("TEST")
};

const getAllInvoices = async (req, res) => {
    const userId = req.params.userId;
    let user;
    try {
        user = await User.findById(userId).populate('invoices');
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
    if (!user) {
        return res
            .status(400)
            .json({ error: 'Could not find user for provided id.' });
    }
    // console.log(req.body);
    if (!userId) res.status(400).send('userId is missing.');
    res.send(user.invoices);
};

const handleInvoicePayment = async (req, res) => {
    // res.send('WORKS');
    // res.send({
    //     error: 'ER_001',
    //     status: 'failed',
    //     utr_no: null,
    //     vendor_id: '65f81441b71817940a11eb94',
    // });
    try {
        const data = req.body;
        // console.log('DATA: ' + data);
        let paymentStatus;
        const apiUrl =
            'https://shz1z2l4lb.execute-api.ap-south-1.amazonaws.com/Prod/initiate';
        const response = await axios
            .post(apiUrl, data)
            .then((response) => {
                paymentStatus = response.data;
                console.log(paymentStatus);
                // res.send(response.data);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });

        let entry;

        if (paymentStatus.status == 'success') {
            console.log('INSIDE SUCCESS');
            entry = await Invoice.findOneAndUpdate(
                { _id: data.vendor_id },
                {
                    status: 'success',
                    utrNumber: paymentStatus.utr_no,
                    $push: {
                        visitHistory: { timestamp: Date.now() },
                    },
                }
            );
        } else {
            console.log('INSIDE FAILURE');
            entry = await Invoice.findOneAndUpdate(
                { _id: data.vendor_id },
                {
                    status: 'failed',
                    $push: {
                        visitHistory: {
                            timestamp: Date.now(),
                            code: paymentStatus.error,
                        },
                    },
                }
            );
        }
        if (entry) {
            console.log('Entry updated successfully: ', entry);
            res.send(paymentStatus);
        } else {
            console.log('No entry found for the specified shortId');
            res.send('No entry found for the specified shortId');
        }
        // res.send('POST request sent successfully ' + response);
    } catch (error) {
        console.error('Error occurred while sending POST request: ', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    handleInvoicePayment,
};
