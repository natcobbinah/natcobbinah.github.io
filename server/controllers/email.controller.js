const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config({
    path: path.join(CURRENT_WORKING_DIR, './server/env/.env')
});
let { smtpTransport } = require('../services/emailService')
const { IncomingForm } = require('formidable');
const fs = require("fs")


const sendEmail = (req, res) => {
    let options = {
        keepExtensions: true,
        multiples: true
    }

    let form = new IncomingForm(options);
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "form data could not be uploaded"
            })
        }

        let attachmentData = [];
        let fileData = [];
        
        //console.log(files)

        if (files) {
            for (const [key, value] of Object.entries(files)) {
                fileData.push(JSON.stringify(value));
            }

            fileData.forEach((fileObj) => {
                let parsedFileObjValue = JSON.parse(fileObj);
                
                //console.log(parsedFileObjValue.filepath)

                attachmentData.push({
                    content: fs.createReadStream(parsedFileObjValue.filepath),
                    filename: JSON.stringify(parsedFileObjValue.originalFilename),
                    contentType: JSON.stringify(parsedFileObjValue.mimetype)
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

        let formFieldValues = [];
        for (const [key, value] of Object.entries(fields)) {
            formFieldValues.push(value[1]);
        }

        try {
            smtpTransport.verify((error, progress) => {
                if (error) {
                    //console.log(error);
                    return res.status(400).json({
                        error: "Error sending email! Try again later"
                    }) 
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            const mailOptions = {
                from: formFieldValues[1],
                to: process.env.USER_EMAIL,
                subject: formFieldValues[2],
                html: `
                       Hello, I am a ${formFieldValues[0]},
                       <p>${formFieldValues[3]}</p>
                       <p>Kind Regards</p>
                       <p>${formFieldValues[0]}
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
                    return res.status(200).json({
                         message: "Email sent successfully"
                     }); 
                }
            });
        } catch (err) {
            //console.log(err)
            return res.status(400).json({
                 error: "Error sending email!"
             }) 
        }
    })
}

module.exports = {
    sendEmail
}
