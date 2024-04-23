const  express=require('express')
const router=require('./src/route/api')
const app=new express();
const bodyPerser=require('body-parser');


//Security Middleware
const rateLimit=require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');


//Database



// Front End Tagging
app.use(express.static('client/build'))
app.get("*",function (req,res){
    req.sendFile(path.resolve(__dirname,'client','build','index.html'));
})




const mongoose=require('mongoose');
const {path} = require("express/lib/application");

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())


//Body Parser Implement
app.use(bodyPerser.json())

//Rate Limiter
const limiter=rateLimit({windowMs:15*60*100,max:3000})

//Database Connection

app.use("/api/v1",router)

module.exports = app;