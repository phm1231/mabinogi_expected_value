const express = require('express');
const router = express.Router();

router.post("/", (req, res)=>{
    console.log("Here is Index Post");
})

module.exports = router;