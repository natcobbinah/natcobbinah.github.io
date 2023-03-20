const express = require('express')
import path from 'path'
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config({ 
    path: path.join(CURRENT_WORKING_DIR,'./server/.env')
});
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression');
const cors = require('cors');
const emailRoute = require('./routes/email.routes.js');
import { ValidateFormData } from './middleware/validateFormEntry.js';

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(cors())


app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,'dist')))
app.use('/assets', express.static(path.join(CURRENT_WORKING_DIR, 'assets')))

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(CURRENT_WORKING_DIR,'index.html'));
})

//routes
//form fields validation added as middleware
app.use('/', ValidateFormData, emailRoute);


let port = process.env.PORT;
app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Server started on port %s.',port)
})
