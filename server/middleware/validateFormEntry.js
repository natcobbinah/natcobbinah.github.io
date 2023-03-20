const removeWhiteSpace = (data) => {
    return {
        senderName: data.senderName,
        email: data.email.replace(/\s+/g, ''),
        subject: data.subject,
        message: data.message,
    }
}

const validateEmail = (data) => {
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (pattern.test(data["email"])) {
        return data;
    }
}

const checkIfNameEmailSubjectNotNull = (data) => {
    if (data["subject"] !== "") {
        return data;
    }
}

const ValidateFormData = async (req, res, next) => {
    let dataContentChecked = checkIfNameEmailSubjectNotNull(req.body);
    if (!dataContentChecked) {
        return res.status(400).json({
            error: 'Please add [subject] to your email address :)'
        })
    } else {
        let trimmedData = removeWhiteSpace(dataContentChecked);
        let emailCheckValid = validateEmail(trimmedData);
        if (emailCheckValid) {
            next();
        } else {
            return res.status(400).json({
                error: 'Email Invalid! Please Check your email address'
            })
        }
    }
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