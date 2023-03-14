const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    
    const { visited } = req.cookies;
    if(!visited){
        res.cookie('visited', true, {
            maxAge: 1000*60*60*24
        })
    }
    else{
        console.log("Already Have Cookie, connect.sid is ", req.cookies['connect.sid']);
    }    
    res.send("Login");
});

module.exports = router;