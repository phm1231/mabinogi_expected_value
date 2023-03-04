const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const option = require('./option.js');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json;charset=UTF-8' }));

app.use('/probs', router);
app.use('/options', option);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})