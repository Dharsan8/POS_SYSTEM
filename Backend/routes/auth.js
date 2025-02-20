const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin@123";

router.post('/login',(req,res)=>{
    const {username, password} = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.json({success:true, message : "Login Successful",token});
    }

    return res.status(401).json({success:false,message:"Invalid credentials"});
})

module.exports = router;