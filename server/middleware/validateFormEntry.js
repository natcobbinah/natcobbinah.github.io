const { IncomingForm } = require('formidable');

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

const removeWhiteSpace = (data) => {
    console.log("removeWhiteSpace")
    console.log(data)
    console.log("removeWhiteSpace")

    return {
        senderName: data['0'][1], //senderName
        email: data['1'][1].replace(/\s+/g, ''), //email
        subject: data['2'][1], //subject
        message: data['3'][1], //message
    }

}

const validateEmail = (data) => {
    console.log("validateEmail")
    console.log(data)
    console.log("validateEmail")

    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return pattern.test(data['email'])
}

const checkIfNameEmailSubjectNotNull = (data) => {
    console.log("checkIfNameEmailSubjectNotNull")
    console.log(data)
    console.log("checkIfNameEmailSubjectNotNull")

    if (data['2'][1] !== "") {
        return data;
    }
    return false;
}

const ValidateFormData = async (req, res, next) => {

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

        //console.log(files)
        //console.log(fields)


        let dataContentChecked = checkIfNameEmailSubjectNotNull(fields);
       
        if (dataContentChecked === false) {
            console.log(dataContentChecked)

            return res.status(400).json({
                error: 'Please add [subject] to your email address'
            })
        } else {
            let trimmedData = removeWhiteSpace(dataContentChecked);
            let emailCheckValid = validateEmail(trimmedData);
            if (emailCheckValid === true) {
                next();
            } else {
                return res.status(400).json({
                    error: 'Email Invalid! Please Check your email address'
                })
            }
        }
    })

}



/* const userdata = {
    body: {
        senderName: " Nathaniel Cobbinah ",
        email: "hello@gmail.com",
        subject: "ds",
        message: ""
    }
};

const ValidateFormDataTest =  (data) => {
    let dataContentChecked = checkIfNameEmailSubjectNotNull(data.body);
    if (!dataContentChecked) {
        return {
            error: 'Please add [subject] to your email address :)'
        }
    } else {
        let trimmedData = removeWhiteSpace(dataContentChecked);
        let emailCheckValid = validateEmail(trimmedData);
        if (emailCheckValid) {
            return {
                success: "Success"
            }
        } else {
            return {
                error: 'Email Invalid! Please Check your email address'
            }
        }
    }
}  

const result = ValidateFormDataTest(userdata);
console.log(result) */

module.exports = {
    ValidateFormData
}     