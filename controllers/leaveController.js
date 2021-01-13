const express= require('express')
const router=express.Router();
const mysql=require('mysql2');
const bc=require('bcryptjs')
const session=require('express-session')
const dbs=require('../models/db.js');
const {check, validationResult} = require('express-validator');

router.get('/',(req,res)=>{
 if(req.session.loggedin){
    var prof=`logged in as ${req.session.email}`
    res.render('leform',{prof})
     }
})  

router.post('/',[check('pf').isInt()],
(req,res)=>{
    if(req.session.loggedin){
        var prof=`logged in as ${req.session.email}`
      
        var errors=validationResult(req)
        console.log(errors);
        
         if(!errors.isEmpty()){
             var error=`invalid Personal Number detected!!`
             return res.render('errors',{error,prof})
         }
            var pf=req.body.pf;
        // if(pf.length>9){
                    let sql=`select * from staff_leave where pf=${pf}`

                        dbs.query(sql,(err,result)=>{

                            if(err)
                            throw err
                            else
                            if 
                            (result!=0) {
                                //return res.render('pfile',{result})
                                return res.render('leaveProfoma',{result,prof})
                                //next()
                            }
                            else
                        // result=0
                            var error=`No record found`
                            return res.render('errors',{error,prof})
                            
                        })
    }  
 })

 router.post('/calc',[check('address').isMobilePhone()],
 (req,res)=>
 {
    if(req.session.loggedin){
        var prof=`logged in as ${req.session.email}`
        var errors=validationResult(req)
        if(!errors.isEmpty()){
            var error=`Invalid Mobile Phone #`
            return res.render('errors',{error,prof})
        }
      
                var sname=req.body.sname
                var ltyp=req.body.leavetyp
                var pf=req.body.pf
                var address=req.body.address
                var desig=req.body.desig
                var startsOn=req.body.startsOn
                var endsOn=req.body.endsOn
                var station=req.body.station
                var lastleave=req.body.endsOn
                var dateApplied=req.body.dApplied
                var gender=req.body.gender
                var start=new Date(startsOn)
                var ends=new Date(endsOn)
                var ndays=Math.abs(ends-start)
                var nodays=Math.ceil(ndays/(1000*60*60*24)+1)
                //get Month from date
                var b=start.toLocaleString('default',{month:'short'})
                
               
                if(startsOn<endsOn && dateApplied<startsOn)
                {
                        if(ltyp=='annual_leave')
                        {
                            //check for leave type duration validity
                            if(nodays>45){
                                var error=`${ltyp} leave application cannot exceed 45 days`
                            return res.render('errors',{error,prof})
                                
                            }
                            else{
                            
                            insertRec(ltyp)
                            
                            }
                                
                        }else if(ltyp=='paternity_leave'){
                          if(gender=='male'){
                                if(nodays!=15){
                                    var error=`${ltyp} leave application has to be 15 days. Check your dates`
                                    return res.render('errors',{error,prof})
                                    
                                    
                                }else{
                                
                                    insertRec(ltyp)    
                                }
                            }else{
                                var error=`Only Male officers are allowed to apply for Paternity Leave`
                                return res.render('errors',{error,prof})
                            }
                                
                        } else if(ltyp=='maternity_leave'){
                            if(gender=='female'){
                                if(nodays!=90){
                                    var error=`${ltyp} leave application has to be 90 days. Check your dates`
                                    return res.render('errors',{error,prof}) 
                                    
                                }else{
                                
                                    insertRec(ltyp)
                                }
                            }else{
                                var error=`Only Female officers are allowed to apply for Maternity Leave`
                                return res.render('errors',{error,prof})
                            }
                                    
                        } else if(ltyp=='sick_leave'){
                            if(nodays>60){
                                var error=`${ltyp} leave application cannot exceed 60 days`
                                    return res.render('errors',{error,prof}) 
                                    
                            }else{
                            
                                insertRec(ltyp)
                                
                            }
                                
                        } 
                        else{
                            if(nodays>30){
                                    var error=`${ltyp} leave application cannot exceed 30 days. Check your dates`
                                    return res.render('errors',{error,prof})  
                                
                            }else{
                        
                                insertRec(ltyp)
                            }
                        }
                        
                }else{
                    var error=`Leave Application Failed..Wrong dates input during the application process`
                    return res.render('errors',{error,prof})
                
                }
                function insertRec(data_table){
                    var b=`select * from ${data_table} where pf=${pf}`

                    dbs.query(b,(err,result)=>{
                        if(err){
                            throw err
                        }
                        else
                        {
                            if(result!=0){
                                var status=result[0].status
                                if(status==0){
                                    var bal=result[0].balance 
                                    if(nodays>bal){
                                        const error=`Failed,Insufficient leave balance. Leave balance is ${bal}`
                                        return res.render('errors',{error,prof})
                                    }
                                    else
                                    {
                                        var daysapplied=daysCalculator(nodays)
                                        var  balance=bal-daysapplied
                                        holiday=holidaysInYear(start,ends)
                                        var status=1
                                        sql=`update ${data_table} set balance=${balance} and status=${status} where pf=${pf}`

                                        dbs.query(sql,(err,result)=>{
                                            if(err){
                                                throw err
                                            }else if(result!=0)
                                            
                                            var message=`${ltyp} leave application of ${daysapplied} days for ${sname} has been booked. ${holidays} holiday(s) has been excluded`
                                                return res.render('result',{message,prof})
                                        })       
                                    }

                                }
                                else
                                {
                                    const error=`Leave processing failed. Staff already on Leave`
                                    return res.render('errors',{error,prof})
                                }
                            }
                            if(data_table=='annual_leave'){
                               var bals=30
                               var ldesc='Annual'
                               processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                            }else if(data_table=='maternity_leave'){
                                var bals=90
                                var ldesc='Maternity'
                                processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                            }else if(data_table=='paternity_leave'){
                                var bals=15
                                var ldesc='Paternity'
                                processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                            }else if(data_table=='terminal_leave'){
                                var bals=30
                                var ldesc='Terminal'
                                processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                            }else{
                                var bals=60
                                var ldesc='Sick'
                                processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                            }
                         
                        }

                    })
                          
                }
                function   processLeave(bals,ldesc,startsOn,data_table,dateApplied,address,endsOn)
                {   
                    var daysapplied=daysCalculator(nodays)
                    var balance=bals-daysapplied
                    holiday=holidaysInYear(start,ends)
                    var status=1
                    var leavestarts=startsOn
                    const q=`insert into ${data_table} SET ?`
                    var VALUES={pf,daysapplied,dateApplied,address,balance,status,leavestarts,endsOn}
                        
                    dbs.query(q,VALUES,(err,result)=>{
                        if(err){
                            throw err
                        }else if(result!=0){
                            var message=`${ldesc} leave application of ${daysapplied} days for ${sname} has been booked. ${holiday} holiday(s) have been excluded`
                            return res.render('result',{message,prof})
                        }
                    })
                }
                function daysCalculator(nodays){
                    var holidayNo= holidaysInYear(start,ends)
                    var daysapplied=nodays-holidayNo
                    return daysapplied
                }
                function  holidaysInYear(start,ends){
                    //HOLIDAYS DICTIONARY
                    const holidays=[{month:'January',days:1},{month:'February',days:0},{month:'March',days:0},
                    {month:'April',days:2},{month:'May',days:2},{month:'June',days:1},{month:'July',days:0},
                    {month:'August',days:0},{month:'September',days:1},{month:'October',days:2},
                    {month:'November',days:1},{month:'December',days:3}]

                    //STEP 1 - TOTAL HOLIDAYS IN AN YEAR
                    var sum = holidays.reduce(function(prev, cur) {
                        return prev + cur.days;
                    }, 0)
                    
                    //STEP 2 - Convert date input into array index
                    var startMonth=start.getMonth()
                    var endMonth=ends.getMonth()

                    //STEP 3 - Retrieve no of holidays between start and end from the holidays dictionary
                    //create a sub-array containing holidays for the leave period
                    var ft=holidays.slice(startMonth,endMonth+1)
                    //calculate totals for the sub-array
                    var sums = ft.reduce(function(prev, cur) {
                        return prev + cur.days;
                    }, 0)
                    
                    return sums 
                }
        }
   })

module.exports=router;