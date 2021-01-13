const express=require('express');
const mysql=require('mysql2');
const router=express.Router();
const dbs=require('../models/db.js');
const {check, validationResult} = require('express-validator');


router.get('/',(req,res)=>{
if(req.session.loggedin){
    var prof=`logged in as ${req.session.email}`
    res.render('register',{prof});
    }   
});

//INSERT DATA TO DB
router.post('/',[check('pf').isInt(),check('sname').escape(),check('desig').escape(),
check('email').isEmail(),check('station').escape()],
(req,res)=>{
    if(req.session.loggedin){
        var prof=`logged in as ${req.session.email}`
        var errors=validationResult(req)
        if(!errors.isEmpty()){
        var error=`Invalid details`
        return res.render('errors',{error,prof})
        }
            insertStaff(req,res,prof);
        }   


});

function insertStaff(req,res,prof){
    
 var pf=req.body.pf;
 var sname=req.body.sname;
 var desig=req.body.desig;
 var email=req.body.email;
 var station=req.body.station;
 var gender=req.body.gender;
 var modifiedby=req.session.email
 var status=0

 var sql='INSERT INTO staff_leave SET ?';
 var VALUES={pf,sname,desig,email,station,gender,modifiedby,status};

 var sq=`SELECT * from staff_leave where pf=${pf}`;

    dbs.query(sq,(err,results)=>{  
  
        if (err){
         throw err;
        }
        else{
                        
                if(results!=0){
                    var error=`Personal File Number ${pf} is already registered in the system`
                    return res.render('errors',{error,prof})
                
                }else
                { 
                    dbs.query(sql,VALUES,(err,result)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            
                        return  res.redirect('register/list');
                        }
                    }); 
                }                
            }
    });
}

//GENERATE DB LIST
 router.get('/list',(req,res)=>{
    if(req.session.loggedin){   
        var prof=`logged in as ${req.session.email}`    
            let sql='SELECT * FROM staff_leave where status=0';

            dbs.query(sql,(err,result)=>{
                if(err){
                    throw err;
                }
                else
           
               return res.render('list',{result,prof});
                
               
            });

    }
});

        //RETRIEVE  DATA IN DB BY ID
router.get('/edit/:id',(req, res)=>{
    if(req.session.loggedin){   
        var prof=`logged in as ${req.session.email}`
            var rid=req.params.id;
        
        let sql=`select * from staff_leave where pf=${rid} and status=0`;

        dbs.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
                    return res.render('edit',{result,prof});
            
        })
    }
});

//UPDATE DATA IN DB BY ID
router.post('/update',(req,res)=>{
    if(req.session.loggedin){   
            var prof=`logged in as ${req.session.email}`
        var pf=req.body.pf;
        var sname=req.body.sname;
        var desig=req.body.desig;
        var sid=req.body.sid;
        var email=req.body.email;
        var station=req.body.station;

        let sql=`UPDATE staff_leave SET pf=?,sname=?,desig=?,email=?,station=? WHERE pf =?`;

            data=[pf,sname,desig,email,station,pf];

        dbs.query(sql,data,(err,result,fields)=>{

            if(err){
                throw err;
            }
            else{
                dbs.query(`select * from staff`,(err,result)=>{
                    if(err){
                        throw err;
                    }
                    res.render('list',{result,prof});
                });
            
            }
        });
    }

});

//DELETE DATA IN DB BY ID
router.get('/delete/:id',(req,res)=>{
    if(req.session.loggedin){   
        var prof=`logged in as ${req.session.email}`
            var del_id=req.params.id;

            let sql=`update staff_leave set status=1 WHERE pf=?`;
                
            dbs.query(sql,del_id,(err,data)=>{
                if(err){
                    throw err;
                }
            dbs.query(`select * from staff_leave where status=0`,(err,result)=>{

                res.render('list',{result,prof});
              
                
            });      
                
            });
        }

});

module.exports=router;