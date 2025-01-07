const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');

const app = express();

app.get('/', (req, res) => {
    res.send('Gateway');
})

// Configura os proxies
app.use('/auth', createProxyMiddleware({
    target: 'http://auth-service:3001',
    changeOrigin: true,
    secure: false
}));

app.use('/order', createProxyMiddleware({
    target: 'http://order-service:3002',
    changeOrigin: true,
    secure: false
}));

app.use('/product', createProxyMiddleware({
    target: 'http://product-service:3003',
    changeOrigin: true,
    secure: false
}));

app.listen(config.PORT, () => {
    console.log(`Gateway running on port ${config.PORT}`);
});
