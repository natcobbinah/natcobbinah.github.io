const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config({
    path: path.join(CURRENT_WORKING_DIR, './server/env/.env')
});
let { smtpTransport } = require('../services/emailService')
const { IncomingForm } = require('formidable');
const fs = require("fs");

// Store user email timestamps (email -> timestamp)
const emailCooldownMap = new Map();
const COOLDOWN_PERIOD = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const sendEmail = (req, res) => {
    let options = {
        keepExtensions: true,
        multiples: true
    }

    let form = new IncomingForm(options);
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Form data could not be uploaded"
            })
        }

        let attachmentData = [];
        let fileData = [];

        if (files) {
            for (const [key, value] of Object.entries(files)) {
                fileData.push(JSON.stringify(value));
            }

            fileData.forEach((fileObj) => {
                let parsedFileObjValue = JSON.parse(fileObj);

                attachmentData.push({
                    content: fs.createReadStream(parsedFileObjValue.filepath),
                    filename: parsedFileObjValue.originalFilename,
                    contentType: parsedFileObjValue.mimetype
                })
            })
        }

        //console.log(fields)
        /*sample output of form field values received from frontend
          and we need only the Array values to form our email body
            {
            '0': [ 'senderName', 'Nathaniel Cobbinah' ],
            '1': [ 'email', 'baby.hugo74@yahoo.com' ],
            '2': [ 'subject', 'subject' ],
            '3': [ 'message', 'message' ],
            '4': [ 'file' ],
            '5': [ 'file' ]
          }*/

        // Extract form fields
        let formFieldValues = [];
        for (const [key, value] of Object.entries(fields)) {
            formFieldValues.push(value[1]);
        }

        const senderEmail = formFieldValues[1];

        // Check if sender is still on cooldown
        if (emailCooldownMap.has(senderEmail)) {
            const lastSent = emailCooldownMap.get(senderEmail);
            const now = Date.now();
            const timePassed = now - lastSent;

            if (timePassed < COOLDOWN_PERIOD) {
                const remaining = Math.ceil((COOLDOWN_PERIOD - timePassed) / (1000 * 60 * 60));
                return res.status(429).json({
                    error: `You can only send one email every 12 hours. Try again in ${remaining} hour(s).`
                });
            }
        }

        try {
            smtpTransport.verify((error) => {
                if (error) {
                    return res.status(400).json({
                        error: "Error sending email! Try again later"
                    }) 
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            const mailOptions = {
                from: senderEmail,
                to: process.env.USER_EMAIL,
                subject: formFieldValues[2],
                html: `
                       Hello, I am ${formFieldValues[0]},
                       <p>${formFieldValues[3]}</p>
                       <p>Kind Regards</p>
                       <p>${formFieldValues[0]}</p>
                `,
                attachments: attachmentData
            };

            smtpTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(400).json({
                        error: "Error sending email! Try again later"
                    }) 
                } else {
                    console.log('Email sent: ' + info.response);

                    // Save timestamp when email is successfully sent
                    emailCooldownMap.set(senderEmail, Date.now());

                    // Schedule cleanup after 12 hours
                    setTimeout(() => {
                        emailCooldownMap.delete(senderEmail);
                        console.log(`Cooldown expired for ${senderEmail}`);
                    }, COOLDOWN_PERIOD);

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
    })
}

module.exports = {
    sendEmail
}
