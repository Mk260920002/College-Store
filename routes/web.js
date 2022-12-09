function init_routes(app){
    
 app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/cart',(req,res)=>{
    res.render('customer/cart.ejs')
 })
app.get('/login',(req,res)=>{
   res.render('auth/login.ejs')
})
app.get('/register',(req,res)=>{
    res.render('auth/register.ejs')
})
app.get('/customer_adress',(req,res)=>{
    res.render('customer/adress.ejs')
})
}
module.exports=init_routes