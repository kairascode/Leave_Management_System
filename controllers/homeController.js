const express= require('express')
const router=express.Router();
const mysql=require('mysql2');
// const bc=require('bcryptjs')
const session=require('express-session')
const dbs=require('../models/db.js');
// const { exit } = require('process');


router.get('/',(req,res)=>{
     if(req.session.loggedin){
        var prof=`logged in as ${req.session.email}`
        dashboardContent(prof,res)
    }
   })
   
    function dashboardContent(prof,res){
            var query=`select sum(tbl.EachCount) as totals
            from
            (
                select count(*) as EachCount from paternity_leave
                UNION ALL
                select count(*) as EachCount from annual_leave
                UNION ALL
                select count(*) as EachCount from maternity_leave
                UNION ALL
                select count(*) as EachCount from terminal_leave
                UNION ALL
                select count(*) as EachCount from sick_leave
                )tbl;`
            dbs.query(query,(err,result)=>{
                if(err){
                    throw err
                }else
                {
                    var total=result[0].totals
                    query=`select count(*) as staffno from staff_leave`
                    var q=dbs.query(query,(err,result)=>{
                         if(err){
                             throw err
                         }
                         var staffnos=result[0].staffno
                          
                        male=`select count(*) as male from staff_leave where gender='male'` 
                        
                        dbs.query(male,(err,result)=>{
                            if(err){
                                throw err
                            }

                            var male=result[0].male
                            female=`select count(*) as female from staff_leave where gender='female'`
                            dbs.query(female,(err,result)=>{
                                if(err){
                                    throw err
                                }
                                var fem=result[0].female
                                exits=`select count(*) as exits from staff_leave where status=1`
                                dbs.query(exits,(err,results)=>{
                                    if(err){
                                        throw err
                                    }
                                    var exits=results[0].exits
                                    return res.render('index',{total,staffnos,male,fem,exits,prof})
                                })
                                 
                            })
                              
                        })
                        
                    })  
                    
                }
            })
        }

router.get('/logout',(req,res)=>{
            req.session.destroy(()=>{
               //window.alert("Are you sure you want to Logout...")
              // dbs.close()
                res.redirect('/')
            })
        })
module.exports=router;