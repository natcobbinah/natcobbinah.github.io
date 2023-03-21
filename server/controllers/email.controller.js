const  path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config({ 
    path: path.join(CURRENT_WORKING_DIR,'./server/env/.env')
});

let {smtpTransport} = require('../services/emailService')

const sendEmail = async (req, res) => {
    //console.log(req.body.email)
    try {
        smtpTransport.verify( (error, progress) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.USER_EMAIL,
            subject: req.body.subject,
            html: `
                   Hello, I am a ${req.body.senderName},
                   <p>${req.body.message}</p>
                   <p>Kind Regards</p>
                   <p>${req.body.senderName}
                `
        };

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    error: "Error sending email! Try again later"
                })
            } else {
                //console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    message: "Email sent successfully"
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error sending email!"
        })
    }   
}

module.exports = {
    sendEmail
}
