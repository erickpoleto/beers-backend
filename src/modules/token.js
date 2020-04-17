const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth') 
require("dotenv").config()

module.exports = {
        token(params = {}) {
            return jwt.sign(params, process.env.AUTH, {
            expiresIn: 86400,
        })
    }
}