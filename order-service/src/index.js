const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

//Order Service
app.post('/order_service', (req, res) => {
    
    res.send('Order Service');
});


app.listen(config.PORT, () => {
    console.log(`Auth Service running on port ${config.PORT}`);
});
