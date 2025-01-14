const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const { PORT, DB_URI } = require('./config');

const app = express();

app.use(express.json());

app.use('/order', orderRoutes);
    
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Order Service - Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));  


    app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
