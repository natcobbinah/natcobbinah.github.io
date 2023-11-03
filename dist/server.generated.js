/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/controllers/email.controller.js":
/*!************************************************!*\
  !*** ./server/controllers/email.controller.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\r\nconst CURRENT_WORKING_DIR = process.cwd();\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({\r\n    path: path.join(CURRENT_WORKING_DIR, './server/env/.env')\r\n});\r\nlet { smtpTransport } = __webpack_require__(/*! ../services/emailService */ \"./server/services/emailService.js\")\r\nconst { IncomingForm } = __webpack_require__(/*! formidable */ \"formidable\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\")\r\n\r\nconst sendEmail = (req, res) => {\r\n    let options = {\r\n        keepExtensions: true,\r\n        multiples: true\r\n    }\r\n\r\n    let form = new IncomingForm(options);\r\n    form.parse(req, async (err, fields, files) => {\r\n        if (err) {\r\n            return res.status(400).json({\r\n                error: \"form data could not be uploaded\"\r\n            })\r\n        }\r\n\r\n        let attachmentData = [];\r\n        let fileData = [];\r\n        \r\n        //console.log(files)\r\n\r\n        if (files) {\r\n            for (const [key, value] of Object.entries(files)) {\r\n                fileData.push(JSON.stringify(value));\r\n            }\r\n\r\n            fileData.forEach((fileObj) => {\r\n                let parsedFileObjValue = JSON.parse(fileObj);\r\n                \r\n                console.log(parsedFileObjValue.filepath)\r\n\r\n                attachmentData.push({\r\n                    content: fs.createReadStream(parsedFileObjValue.filepath),\r\n                    filename: JSON.stringify(parsedFileObjValue.originalFilename),\r\n                    contentType: JSON.stringify(parsedFileObjValue.mimetype)\r\n                })\r\n            })\r\n        }\r\n\r\n        //console.log(fields)\r\n        /*sample output of form field values received from frontend\r\n          and we need only the Array values to form our email body\r\n            {\r\n            '0': [ 'senderName', 'Nathaniel Cobbinah' ],\r\n            '1': [ 'email', 'baby.hugo74@yahoo.com' ],\r\n            '2': [ 'subject', 'subject' ],\r\n            '3': [ 'message', 'message' ],\r\n            '4': [ 'file' ],\r\n            '5': [ 'file' ]\r\n          }*/\r\n\r\n        let formFieldValues = [];\r\n        for (const [key, value] of Object.entries(fields)) {\r\n            formFieldValues.push(value[1]);\r\n        }\r\n\r\n        try {\r\n            smtpTransport.verify((error, progress) => {\r\n                if (error) {\r\n                    console.log(error);\r\n                } else {\r\n                    console.log('Server is ready to take our messages');\r\n                }\r\n            });\r\n\r\n            const mailOptions = {\r\n                from: formFieldValues[1],\r\n                to: process.env.USER_EMAIL,\r\n                subject: formFieldValues[2],\r\n                html: `\r\n                       Hello, I am a ${formFieldValues[0]},\r\n                       <p>${formFieldValues[3]}</p>\r\n                       <p>Kind Regards</p>\r\n                       <p>${formFieldValues[0]}\r\n                    `,\r\n                attachments: attachmentData\r\n            };\r\n\r\n            smtpTransport.sendMail(mailOptions, (error, info) => {\r\n                if (error) {\r\n                    return res.status(400).json({\r\n                          error: \"Error sending email! Try again later\"\r\n                      }) \r\n                } else {\r\n                    console.log('Email sent: ' + info.response);\r\n                    return res.status(200).json({\r\n                         message: \"Email sent successfully\"\r\n                     }); \r\n                }\r\n            });\r\n        } catch (err) {\r\n            //console.log(err)\r\n            return res.status(400).json({\r\n                 error: \"Error sending email!\"\r\n             }) \r\n        }\r\n    })\r\n}\r\n\r\nmodule.exports = {\r\n    sendEmail\r\n}\r\n\n\n//# sourceURL=webpack://githubportfoliopage/./server/controllers/email.controller.js?");

/***/ }),

/***/ "./server/middleware/validateFormEntry.js":
/*!************************************************!*\
  !*** ./server/middleware/validateFormEntry.js ***!
  \************************************************/
/***/ ((module) => {

eval("const removeWhiteSpace = (data) => {\r\n    return {\r\n        senderName: data.senderName,\r\n        email: data.email.replace(/\\s+/g, ''),\r\n        subject: data.subject,\r\n        message: data.message,\r\n    }\r\n}\r\n\r\nconst validateEmail = (data) => {\r\n    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\r\n    if (pattern.test(data[\"email\"])) {\r\n        return data;\r\n    }\r\n}\r\n\r\nconst checkIfNameEmailSubjectNotNull = (data) => {\r\n    if (data[\"subject\"] !== \"\") {\r\n        return data;\r\n    }\r\n}\r\n\r\nconst ValidateFormData = async (req, res, next) => {\r\n    let dataContentChecked = checkIfNameEmailSubjectNotNull(req.body);\r\n    if (!dataContentChecked) {\r\n        return res.status(400).json({\r\n            error: 'Please add [subject] to your email address :)'\r\n        })\r\n    } else {\r\n        let trimmedData = removeWhiteSpace(dataContentChecked);\r\n        let emailCheckValid = validateEmail(trimmedData);\r\n        if (emailCheckValid) {\r\n            next();\r\n        } else {\r\n            return res.status(400).json({\r\n                error: 'Email Invalid! Please Check your email address'\r\n            })\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n/* const userdata = {\r\n    body: {\r\n        senderName: \" Nathaniel Cobbinah \",\r\n        email: \"hello@gmail.com\",\r\n        subject: \"ds\",\r\n        message: \"\"\r\n    }\r\n};\r\n\r\nconst ValidateFormDataTest =  (data) => {\r\n    let dataContentChecked = checkIfNameEmailSubjectNotNull(data.body);\r\n    if (!dataContentChecked) {\r\n        return {\r\n            error: 'Please add [subject] to your email address :)'\r\n        }\r\n    } else {\r\n        let trimmedData = removeWhiteSpace(dataContentChecked);\r\n        let emailCheckValid = validateEmail(trimmedData);\r\n        if (emailCheckValid) {\r\n            return {\r\n                success: \"Success\"\r\n            }\r\n        } else {\r\n            return {\r\n                error: 'Email Invalid! Please Check your email address'\r\n            }\r\n        }\r\n    }\r\n}  \r\n\r\nconst result = ValidateFormDataTest(userdata);\r\nconsole.log(result) */\r\n \r\nmodule.exports = {\r\n    ValidateFormData\r\n}     \n\n//# sourceURL=webpack://githubportfoliopage/./server/middleware/validateFormEntry.js?");

/***/ }),

/***/ "./server/routes/email.routes.js":
/*!***************************************!*\
  !*** ./server/routes/email.routes.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst emailController = __webpack_require__(/*! ../controllers/email.controller.js */ \"./server/controllers/email.controller.js\");\r\nconst verifyFormData = __webpack_require__(/*! ../middleware/validateFormEntry.js */ \"./server/middleware/validateFormEntry.js\")\r\n\r\n\r\nrouter.route('/api/sendMail')\r\n  .post( emailController.sendEmail);\r\n  //verifyFormData.ValidateFormData,\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack://githubportfoliopage/./server/routes/email.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\nconst express = __webpack_require__(/*! express */ \"express\")\r\n;\r\nconst CURRENT_WORKING_DIR = process.cwd();\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({ \r\n    path: path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIR,'./server/env/.env')\r\n});\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\")\r\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\")\r\nconst compress = __webpack_require__(/*! compression */ \"compression\");\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst emailRoute = __webpack_require__(/*! ./routes/email.routes.js */ \"./server/routes/email.routes.js\");\r\n\r\nconst app = express()\r\napp.use(bodyParser.json())\r\napp.use(bodyParser.urlencoded({ extended: true }))\r\napp.use(cookieParser())\r\napp.use(compress())\r\napp.use(cors())\r\n\r\n\r\napp.use('/dist', express.static(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIR,'dist')))\r\napp.use('/assets', express.static(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIR, 'assets')))\r\n\r\napp.get('/', (req,res) => {\r\n    res.status(200).sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIR,'index.html'));\r\n})\r\n\r\n//routes\r\napp.use('/', emailRoute);\r\n\r\nlet port = process.env.PORT;\r\napp.listen(port, function onStart(err){\r\n    if(err){\r\n        console.log(err)\r\n    }\r\n    console.info('Server started on port %s.',port)\r\n    console.info('Site Portfolio available at  http://localhost:%d',port)\r\n})\r\n\n\n//# sourceURL=webpack://githubportfoliopage/./server/server.js?");

/***/ }),

/***/ "./server/services/emailService.js":
/*!*****************************************!*\
  !*** ./server/services/emailService.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\r\nconst  path = __webpack_require__(/*! path */ \"path\");\r\nconst CURRENT_WORKING_DIR = process.cwd();\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({ \r\n    path: path.join(CURRENT_WORKING_DIR,'./server/env/.env')\r\n});\r\n\r\nlet smtpTransport = nodemailer.createTransport({\r\n    service: 'gmail',\r\n    host: 'smtp.gmail.com',\r\n    port: 587,\r\n    secure: false,\r\n    auth: {\r\n        user: process.env.USER_EMAIL,\r\n        pass: process.env.USER_PASS,\r\n    },\r\n    tls: {\r\n        // do not fail on invalid certs\r\n        rejectUnauthorized: false,\r\n    },\r\n});\r\n\r\nmodule.exports = {\r\n    smtpTransport,\r\n};\r\n  \n\n//# sourceURL=webpack://githubportfoliopage/./server/services/emailService.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("formidable");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;