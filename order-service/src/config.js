const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    PORT: 3002,
    DB_URI: process.env.DB_URI_ORDER,
    JWT_SECRET: process.env.JWT_SECRET,
};

mongoose.connect(process.env.DB_URI_ORDER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

console.log("DB_URI:", process.env.DB_URI || "N/A");
console.log("PORT:", process.env.PORT || "N/A");
console.log("JWT_SECRET:", process.env.JWT_SECRET);