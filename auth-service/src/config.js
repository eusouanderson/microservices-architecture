const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    PORT: 3001,
    DB_URI: process.env.DB_URI_AUTH,  
    JWT_SECRET: process.env.JWT_SECRET,
};

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_AUTH, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


console.log("DB_URI:", process.env.DB_URI || "N/A");
console.log("PORT:", process.env.PORT || "N/A");
console.log("JWT_SECRET:", process.env.JWT_SECRET || "N/A");

