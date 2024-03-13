const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    vendors: [
        { type: mongoose.Types.ObjectId, required: true, ref: 'Invoice' },
    ],
    history: [
        {
            timestamp: { type: Number, required: true },
            invoice: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Invoice',
            },
            status: { type: String, required: true },
            status: String,
            action: String,
        },
    ],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
