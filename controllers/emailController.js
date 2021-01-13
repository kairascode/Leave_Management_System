const express=require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
const path = require('path')
require('dotenv').config()

router.get('/',(req,res)=>{
    if(req.session.loggedin){
        var prof=`logged in as ${req.session.email}`
    res.render('emailer',{prof});
    }
})

            
router.post('/',(req,res)=>{
    if(req.session.loggedin){
            var prof=`logged in as ${req.session.email}`
            let email=req.body.email;
            let subject=req.body.subject;
            let message=req.body.message;
            
            //STEP 1 create transporter
            let transporter=nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 465,
                // secure: true,
                service:'Gmail',
                auth:{
                    user:process.env.EMAIL_HOST,
                    pass:process.env.EMAIL_PASS,    
                }
            });
            //STEP 2 create message structure
            let mailOptions={
            from:process.env.EMAIL_HOST,
            to:email,
            subject:subject,
            text:message,
            };

            //STEP 3 
            transporter.sendMail(mailOptions,(error)=>{
                if(error){
                    return res.render('errors',{error,prof})
                }else{
                    var message=`Email has been sent to ${email}`
                    return res.render('result',{message,prof})
                }
            })    
     }       
                    
});
    
module.exports=router;