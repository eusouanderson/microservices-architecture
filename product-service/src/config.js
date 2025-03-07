const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    PORT: 3003,
    DB_URI: process.env.DB_URI_PRODUCT,
    JWT_SECRET: process.env.JWT_SECRET,
};

console.log("DB_URI:", process.env.DB_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);