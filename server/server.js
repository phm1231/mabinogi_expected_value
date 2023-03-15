const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes/index.js');
const option = require('./option.js');

/*
 const fileLogger = require('./fileLogger.js');
 const login = require('./login.js);
*/
const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json;charset=UTF-8' }));

app.use('/api/probs', router);
app.use('/api/options', option);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})