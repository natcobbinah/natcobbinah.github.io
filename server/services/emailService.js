const nodemailer = require("nodemailer");
const  path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config({ 
    path: path.join(CURRENT_WORKING_DIR,'./server/env/.env')
});

let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});

module.exports = {
    smtpTransport,
};
  