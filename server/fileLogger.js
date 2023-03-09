const express = require('express');
const router = express.Router();


router.post("/", (req, res)=>{
    console.log("fileLogger.post");
    console.log(req.body);
    res.send("Hello Post")
})

module.exports = router;