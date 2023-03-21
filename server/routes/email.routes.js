const express = require('express');
const router = express.Router();
const emailController = require("../controllers/email.controller.js");
const verifyFormData = require("../middleware/validateFormEntry.js")

router.route('/api/sendMail')
      .post(verifyFormData.ValidateFormData, emailController.sendEmail);

module.exports = router;