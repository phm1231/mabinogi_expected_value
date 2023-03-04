const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/probs', router);


app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})