const express= require('express');
const mysql=require('mysql2');
const path = require('path')
require('dotenv').config()
 
const conf={
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATA,
}
 const db=mysql.createConnection(conf);

db.connect((err)=>{
    if(err){
        console.log('DB connection failed'+err);
      
        
    }
    else
        console.log('Connected...');
});
module.exports=db;