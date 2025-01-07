const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

//Product Service
app.post('/product_service', (req, res) => {
    
    res.send('Order Service');
});


app.listen(config.PORT, () => {
    console.log(`Auth Service running on port ${config.PORT}`);
});
