const Invoice = require('../models/invoice')
const User = require('../models/user')
const mongoose = require('mongoose');


const createInvoice = async (req, res) => {
    const body = req.body;
    console.log(body)
    if (!body.name || !body.amount || !body.userId) return res.status(400).json({ error: 'Missing Parameters in request body.' });

    const createdInvoice = await Invoice.create({
        name: body.name,
        status: 'pending',
        amount: body.amount,
        creator: body.userId,
        visitHistory: [{ timestamp: Date.now() }],
    })

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
        console.log(err)
        return res.status(400).json({ error: 'Creating Invoice Failed', err });
    }
    res.send(createdInvoice);
    // res.send("TEST")
}

module.exports = {
    createInvoice
};
