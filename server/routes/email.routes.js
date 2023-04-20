const express = require('express');
const router = express.Router();
const emailController = require("../controllers/email.controller.js");
const verifyFormData = require("../middleware/validateFormEntry.js")


router.route('/api/sendMail')
  .post( emailController.sendEmail);
  //verifyFormData.ValidateFormData,

module.exports = router;