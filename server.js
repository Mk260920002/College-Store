const express=require('express')
const app=express()
const path=require('path')
const ejs=require('ejs')
const expressLayouts=require('express-ejs-layouts')
const PORT=process.env.PORT || 3000
app.use(express.static('public'))
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)




app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})