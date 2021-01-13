var db=require('./models/db');



let sql='insert into staff(pf,sname,desig)VALUES("2007021714","alex kaira","ICTO II")';

db.query=(sql,(err,result)=>{
if(err){
    throw err
}
else{
    data={};

    data=result;
}

});

module.exports=db;
