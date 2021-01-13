const express= require('express')
const mysql=require('mysql2');
const bc=require('bcryptjs')
const session=require('express-session')
const router=express.Router();
const dbs=require('../models/db.js');
const {check, validationResult} = require('express-validator');

router.get('/',(req,res)=>{

   return res.render('login');
});

router.post('/log',[
check('logger','Email is requied').isEmail(),check('accode').isLength({min:3})],

(req,res)=>{
    var errors = validationResult(req)
   
    
    if(!errors.isEmpty()){
        console.log(error);
        var error=`Invalid Email or password`
        return res.render('404',{error})
        
    }
    var email=req.body.logger
    var pass=req.body.accode
    var dbpass
    
    var sq=`select * from loggers where email='${email}'`
    
    dbs.query(sq,(err,result)=>{

        if(err){
            throw err
        }
        else
    
       if(result!=0){
             dbpass=result[0].pass
             bc.compare(pass,dbpass,(error,isMatch)=>{
                if(error){
                    throw error                       
                }
                else if(isMatch){ 
                    req.session.loggedin=true
                    req.session.email=email        
                   return res.redirect('/home')
                                                            
                }else
                    var error=`Wrong password`

                    return res.render('404',{error})
             })
        }
       else
               
                return res.redirect('/')
           
    })
    
})


router.get('/reg',(req,res)=>{
 return   res.render('signup')
})

router.post('/signup',(req,res)=>{
    var email=req.body.email;
    var user=req.body.logger;
    var pwd=req.body.pass;
    var sq=`select * from loggers where email='${email}'`
    
    dbs.query(sq,(err,result)=>{

        if(err){
            throw err
        }
        else
    
       if(result!=0){
        var message=`The email '${email}' has already been used to register a user`

        res.render('signup',{message})
            
        }
       else
            bc.hash(pwd,10,(err,pass)=>{
                if(err){
                    throw err
                }
                else
                var sql='INSERT INTO loggers SET ?'
                var values={user,email,pass}
        
                dbs.query(sql,values,(err,results)=>{
                    if(err){
                        throw err
                    }
                    else
                    //var message=`Successfully registered as a user...`
                    res.redirect('/')
                }) 
            })  
    })
    
})

module.exports=router;