const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

app.get('/auth', (req, res) => {
    res.send('Auth Service');
})

//Login
app.post('/login', (req, res) => {
    
    res.send('Login');
});

//Register
app.post('/register', (req, res) => {
    
    res.send('Register');
});

app.listen(config.PORT, () => {
    console.log(`Auth Service running on URL http://localhost:${config.PORT} port  ${config.PORT}`);
});
