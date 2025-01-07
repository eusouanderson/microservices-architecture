require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/auth-service',
    JWT_SECRET: process.env.JWT_SECRET || 'secretkey',
};

console.log("DB_URI:", process.env.DB_URI );
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
