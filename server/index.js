const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');

const PORT = 9000;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) =>
        console.log('Error while connecting to database. ERROR: ' + err)
    );

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Route is Working');
});

app.use('/u', authRoutes);
// app.use('/i', invoiceRoutes);

app.listen(PORT, (error) => {
    if (!error)
        console.log(
            'Server is Successfully Running, and App is listening on Port: ' +
                PORT
        );
    else console.log("Error occurred, server can't start", error);
});
