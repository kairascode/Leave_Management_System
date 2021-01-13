const express=require('express');
const session=require('express-session')
const app=express();
const path=require('path')
require('dotenv').config()


const bodyParser=require('body-parser');
const RegController=require('./controllers/RegController');
const leaveController=require('./controllers/leaveController');
const loginController=require('./controllers/loginController');
const emailController=require('./controllers/emailController');
const homeController=require('./controllers/homeController');

app.use(session({
 secret:'secret',
 resave:true,
saveUninitialized:true   
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','pug');

app.use('/public',express.static(path.join(__dirname,'public')));

app.disable('etag')

app.use('/',loginController);
app.use('/home',homeController);
app.use('/register',RegController);
app.use('/leave',leaveController);
app.use('/email',emailController);

const port=process.env.SERVER_PORT

app.listen(port,()=>{
    console.log('Server started on port :'+port);
});