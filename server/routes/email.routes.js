const express = require('express');
const router = express.Router();
const emailController = require("../controllers/email.controller.js");

router.route('/api/sendMail')
      .post(emailController.sendEmail);

module.exports = router;