require('dotenv').config()
const express=require('express')
const app=express()
const path=require('path')
const ejs=require('ejs')
const expressLayouts=require('express-ejs-layouts')
const PORT=process.env.PORT || 3000
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore = require('connect-mongo')
// data base connection 
const url='mongodb://localhost:27017/MDS';
mongoose.connect(url);
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Databse connected....');
});
//databse connection to cookie
let mongoStore =  MongoDbStore.create({
    mongoUrl:url,
    mongooseConnection : connection,
    collection: 'session'
})
// session configuration
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  store:mongoStore,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}
}))
// global local middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next();
})
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(express.json())
app.use(express.static('public'))
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)




app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})