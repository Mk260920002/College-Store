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
const passport=require('passport')
const Emitter=require('events')
const moment=require('moment')
// data base connection 
const url=process.env.MONGO_CONNECTION_URL;
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
// Event Emitter
const eventEmitter=new Emitter();
app.set('eventEmitter',eventEmitter);
// session configuration
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  store:mongoStore,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}
}))
// passport config
app.use(passport.initialize());
app.use(passport.session());
const passportInit=require('./app/config/passport')
passportInit(passport);
// global local middleware
app.use((req,res,next)=>{
    
    res.locals.session=req.session;
    res.locals.user=req.user;
    res.locals.moment=moment;
    next();
})
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)
app.use((req,res)=>{
  res.status(404).render('error/404.ejs')
})



const server=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
//socket
const io=require('socket.io')(server);

io.on('connection',(socket)=>{
  socket.on('join',(roomNo)=>{
    
    socket.join(roomNo)
  })
})

eventEmitter.on('orderUpdated',data=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data);
})
eventEmitter.on('orderPlaced',data=>{
    io.to('adminRoom').emit('orderPlaced',data);
})







