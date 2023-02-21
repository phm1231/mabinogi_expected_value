const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.post("/text", (req, res)=>{
    const toolname = req.body.name;
    let sendData;
    switch(toolname.normalize("NFD")){
        case "정교한 세공 도구".normalize("NFD"):
            sendData = {
                data: '정세공',
              };
            break;
        case "영롱한 세공 도구".normalize("NFD"):
            sendData = {
                data: '영세공',
              };
            break;
        default:
            sendData = {
                data: '그이외',
              };
            break;
    }
    console.log("sendData is " + sendData.data);
    res.send(sendData);
});

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})